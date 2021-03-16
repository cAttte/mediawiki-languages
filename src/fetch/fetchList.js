const { Octokit } = require("@octokit/rest")

/**
 * @param {Octokit} octokit
 */
module.exports = async function fetchList(octokit) {
    const repo = { owner: "wikimedia", repo: "mediawiki" }

    const commitResponse = await octokit.repos.listCommits({ per_page: 1, ...repo })
    const commit = commitResponse.data[0].commit
    const hash = commit.tree.sha

    const treeResponse = await octokit.git.getTree({ ...repo, tree_sha: hash })
    const tree = treeResponse.data.tree

    const lang = tree.find(item => item.path === "languages")
    const langTreeResponse = await octokit.git.getTree({ ...repo, tree_sha: lang.sha })
    const langTree = langTreeResponse.data.tree

    /** @type {{ messages: string[] }} */
    const output = { messages: null /*, data: null, i18n: null */ }

    for (const setName of ["messages" /*, "data", "i18n" */]) {
        const set = langTree.find(item => item.path === setName)
        const setTreeResponse = await octokit.git.getTree({ ...repo, tree_sha: set.sha })
        const setTree = setTreeResponse.data.tree
        const blobs = setTree.filter(item => item.type === "blob")
        output[setName] = blobs.map(blob => blob.path)
    }

    return output
}
