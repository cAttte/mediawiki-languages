import LanguageData from "../data/typings/LanguageData"
import Language from "../data/typings/Language"

type Set = keyof LanguageData

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
    static load(...languages: Language[]): Promise<void>
    /**
     * Load all languages.
     */
    static load(): Promise<void>
    /**
     * Used internally by `load()`.
     */
    private static loadSingle(language: Language, set: Set): Promise<void>
    /**
     * Get language data for a language.
     * @param language The language to obtain
     */
    static get(language: Language): LanguageData
    /**
     * Get specific language data.
     * @param language The language to obtain
     * @param set The data set
     */
    static get<S extends Set>(language: Language, set: S): LanguageData[S]
    /**
     * Fallback data from the `messages` set, to make sure the dataset is complete.
     * @param data
     * @param english
     */
    static fallback(
        data: Language | LanguageData | LanguageData["messages"],
        english?: boolean
    ): LanguageData["messages"]
}

export { LanguageData, Language }
