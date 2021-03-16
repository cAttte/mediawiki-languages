/**
 * @param {string} filename
 */
module.exports = function extractName(filename) {
    const phpMatch = filename.match(/Messages(.*)\.php/)
    if (phpMatch) {
        const language = phpMatch[1]
        return language.toLowerCase()
    } else if (filename.endsWith(".json")) {
        return filename.replace(/\.json$/, "")
    }
}
