const { Octokit } = require("@octokit/rest")

/**
 * @param {Octokit} octokit
 * @param {{ owner: string, repo: string }} repo
 */
module.exports = async function fetchList(octokit, repo) {
    const commitResponse = await octokit.repos.listCommits({ per_page: 1, ...repo })
    const commit = commitResponse.data[0].commit
    const hash = commit.tree.sha

    const treeResponse = await octokit.git.getTree({ ...repo, tree_sha: hash })
    const tree = treeResponse.data.tree

    const lang = tree.find(item => item.path === "languages")
    const langTreeResponse = await octokit.git.getTree({ ...repo, tree_sha: lang.sha })
    const langTree = langTreeResponse.data.tree

    /** @typedef {{ name: string, hash: string }[]} BlobList */
    /** @type {{ messages: BlobList }} */
    const output = { messages: null /*, data: null, i18n: null */ }

    for (const setName of ["messages" /*, "data", "i18n" */]) {
        const set = langTree.find(item => item.path === setName)
        const setTreeResponse = await octokit.git.getTree({ ...repo, tree_sha: set.sha })
        const setTree = setTreeResponse.data.tree
        const blobs = setTree.filter(item => item.type === "blob")
        output[setName] = blobs.map(blob => ({ name: blob.path, hash: blob.sha }))
    }

    return output
}
