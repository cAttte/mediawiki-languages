const { Octokit } = require("@octokit/rest")

/**
 * @param {Octokit} octokit
 * @param {{ owner: string, repo: string }} repo
 */
module.exports = async function fetchList(octokit, repo) {
    const commitResponse = await octokit.repos.listCommits({ per_page: 1, ...repo })
    const commit = commitResponse.data[0]
    return commit
}
