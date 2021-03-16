/// <reference types="./typings/index" />
const path = require("path")
const fs = require("fs/promises")

module.exports = class MediaWikiLanguages {
    constructor() {
        throw new Error("MediaWikiLanguages should not be instantiated.")
    }

    static path = path.resolve(`${__dirname}/../data`)
    static data = {}
    static sets = null
    /**
     * @param  {...string} languages
     */
    static async load(...languages) {
        if (!this.sets)
            this.sets = (await fs.readdir(this.path)).filter(d => d !== "typings")

        if (languages.length) {
            for (const set of this.sets) {
                for (const language of languages) {
                    await this.loadSingle(set, language)
                }
            }
        } else {
            for (const set of this.sets) {
                const files = await fs.readdir(`${this.path}/${set}`)
                for (const file of files) {
                    const language = file.replace(/\.json$/, "")
                    await this.loadSingle(set, language)
                }
            }
        }
    }

    /**
     * @param {string} set
     * @param {string} language
     */
    static async loadSingle(set, language) {
        const content = await fs
            .readFile(`${this.path}/${set}/${language}.json`)
            .then(buffer => buffer.toString())
            .catch(() => {
                throw new Error(`"${language}" is not a valid language.`)
            })
        if (!this.data[language]) this.data[language] = {}
        this.data[language][set] = JSON.parse(content)
    }
}
