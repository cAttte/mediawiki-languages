const { Octokit } = require("@octokit/rest")

/**
 * @param {Octokit} octokit
 * @param {{ owner: string, repo: string }} repo
 * @param {string} hash
 */
module.exports = async function fetchBlob(octokit, repo, hash) {
    const blobResponse = await octokit.git.getBlob({ ...repo, file_sha: hash })
    return blobResponse.data.content
}
