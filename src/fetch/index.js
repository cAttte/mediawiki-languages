/**
 * This directory should only be executed in maintenance.
 * It is not part of the exposed interface, and depends on dev-dependencies.
 */
const fs = require("fs/promises")
const { promisify } = require("util")
const rimraf = promisify(require("rimraf"))
const { Octokit } = require("@octokit/rest")
const fetchList = require("./fetchList")
const fetchBlob = require("./fetchBlob")
const extractName = require("./extractName")
const generateTypings = require("./generateTypings")
const deserialize = { php: require("./deserialize/php") }

const repo = { owner: "wikimedia", repo: "mediawiki" }
const remk = async dir => {
    await rimraf(`${__dirname}/${dir}`)
    await fs.mkdir(`${__dirname}/${dir}`)
}

async function main() {
    await remk("../data")
    await remk("../typings")

    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
    const list = await fetchList(octokit, repo)
    /** @type {typeof list} */
    const englishData = {}

    for (const set of Object.keys(list)) await fs.mkdir(`${__dirname}/../data/${set}`)
    for (const [set, blobs] of Object.entries(list)) {
        for (const blob of blobs) {
            const content = await fetchBlob(octokit, repo, blob.hash)
            const ext = blob.name.match(/\.(.*)$/)[1]
            const data = deserialize[ext](content)
            const json = JSON.stringify(data)
            const language = extractName(blob.name)
            await fs.writeFile(`${__dirname}/../data/${set}/${language}.json`, json)
            console.log(`Fetched ${set}/${language}.json.`)
            if (language === "en") englishData[set] = data
        }
    }

    for (const [set, data] of Object.entries(englishData)) {
        const interface = set[0].toUpperCase() + set.slice(1)
        const typings = generateTypings(data, interface)
        const code = `export default ${typings}\n`
        await fs.writeFile(`${__dirname}/../typings/${interface}.d.ts`, code)
        console.log(`Generated typings for ${interface}.d.ts.`)
    }
}

main()
