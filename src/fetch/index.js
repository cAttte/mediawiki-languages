/**
 * This directory should only be executed in maintenance.
 * It is not part of the exposed interface, and depends on dev-dependencies.
 */
const fs = require("fs/promises")
const rimraf = require("rimraf")
const { promisify } = require("util")
const { Octokit } = require("@octokit/rest")
const fetchList = require("./fetchList")
const fetchBlob = require("./fetchBlob")
const extractName = require("./extractName")
const deserialize = { php: require("./deserialize/php") }

const repo = { owner: "wikimedia", repo: "mediawiki" }

async function main() {
    await promisify(rimraf)(`${__dirname}/../data/`)
    await fs.mkdir(`${__dirname}/../data/`)

    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
    const list = await fetchList(octokit, repo)

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
        }
    }
}

main()
