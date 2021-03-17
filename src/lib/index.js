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
     * @param {...string?} languages
     * @returns {Promise<Object>}
     */
    static async load(...languages) {
        if (!this.sets)
            this.sets = (await fs.readdir(this.path)).filter(d => d !== "typings")

        if (languages.length) {
            const output = {}
            for (const set of this.sets) {
                for (const language of languages) {
                    if (!output[language]) output[language] = {}
                    output[language][set] = await this.loadSingle(set, language)
                }
            }
            if (languages.length === 1) return output[languages[0]]
            return output
        } else {
            for (const set of this.sets) {
                const files = await fs.readdir(`${this.path}/${set}`)
                for (const file of files) {
                    const language = file.replace(/\.json$/, "")
                    await this.loadSingle(set, language)
                }
            }
            return this.data
        }
    }

    /**
     * @param {string} set
     * @param {string} language
     * @returns {Object}
     * @private
     */
    static async loadSingle(set, language) {
        if (this.data[language] && this.data[language][set])
            return this.data[language][set]

        const content = await fs
            .readFile(`${this.path}/${set}/${language}.json`)
            .then(buffer => buffer.toString())
            .catch(() => {
                throw new Error(`"${language}" is not a valid language.`)
            })
        const data = JSON.parse(content)

        if (!this.data[language]) this.data[language] = {}
        this.data[language][set] = data
        return data
    }

    /**
     * @param {string} language
     * @param {string?} set
     * @returns {Record<string, unknown> | null}
     */
    static get(language, set) {
        const forLanguage = this.data[language]
        if (!forLanguage) return null
        if (!set) return forLanguage
        return forLanguage[set] || null
    }

    /**
     * @param {string | Record<string, unknown>} data
     * @param {boolean?} english
     * @returns {Promise<Record<string, unknown>>}
     */
    static async fallback(data, english = true) {
        await this.load("en")
        const englishData = this.get("en", "messages")
        if (typeof data === "string") {
            await this.load(data)
            data = this.get(data, "messages")
        } else if (data.messages) {
            data = data.messages
        }

        const ideal = data => {
            for (const key in englishData) if (!data[key]) return false
            return true
        }

        if (!ideal(data) && data.fallback) {
            let fallbacks = data.fallback.split(", ")

            for (const fallback of fallbacks) {
                await this.load(fallback)
                const fallbackData = this.get(fallback)
                const fellbackFallbackData = await this.fallback(fallbackData)
                data = Object.assign(fellbackFallbackData, data)
                if (ideal(data)) break
            }
        }

        if (english) data = Object.assign(englishData, data)
        return data
    }
}
