const { Octokit } = require("@octokit/rest")

/**
 * @param {Octokit} octokit
 * @param {{ owner: string, repo: string }} repo
 * @param {*} commit
 */
module.exports = async function fetchList(octokit, repo, commit) {
    console.log("Fetching blob list...")
    const treeResponse = await octokit.git.getTree({ ...repo, tree_sha: commit.tree.sha })
    const tree = treeResponse.data.tree

    const lang = tree.find(item => item.path === "languages")
    const langTreeResponse = await octokit.git.getTree({ ...repo, tree_sha: lang.sha })
    const langTree = langTreeResponse.data.tree

    /** @typedef {{ name: string, hash: string }[]} BlobList */
    /** @type {{ messages: BlobList }} */
    const output = {}

    for (const setName of ["messages" /*, "data", "i18n" */]) {
        const set = langTree.find(item => item.path === setName)
        const setTreeResponse = await octokit.git.getTree({ ...repo, tree_sha: set.sha })
        const setTree = setTreeResponse.data.tree
        const blobs = setTree.filter(item => item.type === "blob")
        output[setName] = blobs.map(blob => ({ name: blob.path, hash: blob.sha }))
    }

    return output
}
