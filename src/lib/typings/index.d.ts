import LanguageData from "../../data/typings/LanguageData"
import Language from "../../data/typings/Language"

export default class MediaWikiLanguages {
    /**
     * Do not instantiate this class. All of its methods and properties are static.
     */
    private constructor()
    /**
     * The absolute path pointing to the location of the JSON files.
     * The directory structure is `(set)/(language).json`
     */
    static path: string
    /**
     * All of the language data, in format `{ language: { set: data } }`.
     */
    static data: Record<Language, LanguageData>
    /**
     * The available language data sets. Will be populated on the first `load()` execution.
     */
    static sets?: Set[]
    /**
     * Load one (or multiple) languages.
     * @param languages The language(s) to load
     */
    static async load(...languages: Language[]): Promise<void>
    /**
     * Load all languages.
     */
    static async load(): Promise<void>
}

export { LanguageData, Language }
