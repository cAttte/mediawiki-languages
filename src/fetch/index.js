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

const repo = { owner: "wikimedia", repo: "mediawiki" }

async function main() {
    await promisify(rimraf)(__dirname + "/../data/").catch(() => null)
    await fs.mkdir(__dirname + "/../data/")

    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
    const list = await fetchList(octokit, repo)

    for (const [set, blobs] of Object.entries(list)) {
        for (const blob of blobs) {
            const content = await fetchBlob(octokit, repo, blob.hash)
            console.log([blob.name, content])
            break
        }
    }
}

main()
