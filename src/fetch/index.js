/**
 * This directory should only be executed in maintenance.
 * It is not part of the exposed interface, and depends on dev-dependencies.
 */
const fs = require("fs/promises")
const rimraf = require("util").promisify(require("rimraf"))
const { Octokit } = require("@octokit/rest")
const fetchCommit = require("./fetchCommit")
const fetchList = require("./fetchList")
const fetchBlob = require("./fetchBlob")
const extractName = require("./extractName")
const generateTypings = require("./generateTypings")
const deserialize = { php: require("./deserialize/php") }

const repo = { owner: "wikimedia", repo: "mediawiki" }

async function main() {
    await rimraf(`${__dirname}/../data`)
    await fs.mkdir(`${__dirname}/../data`)

    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
    const commit = await fetchCommit(octokit, repo)
    const list = await fetchList(octokit, repo, commit)
    /** @type {typeof list} */
    const englishData = {}
    /** @type {string[]} */
    const languages = []

    for (const [set, blobs] of Object.entries(list)) {
        await fs.mkdir(`${__dirname}/../data/${set}`)
        for (const blob of blobs) {
            const content = await fetchBlob(octokit, repo, blob.hash)
            const ext = blob.name.match(/\.(.*)$/)[1]
            const data = deserialize[ext](content)
            const json = JSON.stringify(data)
            const language = extractName(blob.name)
            if (!languages.includes(language)) languages.push(language)

            await fs.writeFile(`${__dirname}/../data/${set}/${language}.json`, json)
            console.log(`Fetched ${set}/${language}.json.`)
            if (language === "en") englishData[set] = data
        }
    }

    console.log()
    await fs.mkdir(`${__dirname}/../data/typings`)

    let dataTypings = "\nexport default interface LanguageData {"
    for (const [set, data] of Object.entries(englishData)) {
        const interface = set[0].toUpperCase() + set.slice(1).toLowerCase()
        const typings = generateTypings(data, interface)
        const code = `export default ${typings}\n`
        await fs.writeFile(`${__dirname}/../data/typings/${interface}.d.ts`, code)
        console.log(`Generated typings for ${interface}.d.ts.`)
        dataTypings = `import ${interface} from "./${interface}"\n` + dataTypings
        dataTypings += `\n    ${set}: ${interface}`
    }
    dataTypings += "\n}\n"

    const languageUnion = languages.map(language => `"${language}"`).join(" | ")
    const languageTypings = `type Language = ${languageUnion}\nexport default Language\n`

    await fs.writeFile(`${__dirname}/../data/typings/Language.d.ts`, languageTypings)
    await fs.writeFile(`${__dirname}/../data/typings/LanguageData.d.ts`, dataTypings)
}

main()
