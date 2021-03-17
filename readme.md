# mediawiki-languages

Language data from the [MediaWiki software](https://github.com/wikimedia/mediawiki), in JSON and with typings.

The JSON data is only fetched and deserialized by the package maintainers (in a "development" environment). The data comes along with the interface, and it is not fetched at runtime.

This package uses a [PHP parser](https://www.npmjs.com/package/php-parser) to parse the source files containing language data under the `/languages/` directory of MediaWiki. It then converts this data into JSON, and generates TypeScript declaration files from it.

For now, only the `/messages/` set is supported. `/data/` and `/i18n/` may be published in the future under separate packages.

## Installation

    $ npm install mediawiki-languages

This will install the library interface, its typings, and the JSON data, which takes ~1.6 MB.

## Usage

The module default-exports one class, `MediaWikiLanguages`. Its methods and fields are all static, which means you should not instantiate it, and use it like a regular object/namespace instead.

The actual TypeScript typings depend on each release of this package, as they are automatically generated. More generic types like `string` are provided here for convenience, but the real types are stricter.

-   [load()](#loadlanguages-string-promisevoid)
-   [get()](#getlanguage-string-set-string-object)
-   [fallback()](#fallbackdata-string--object-english-boolean-object)
-   [path](#path-string)
-   [data](#data-object)
-   [sets](#sets-string)

### load(...languages?: string[]): Promise<&ZeroWidthSpace;Object>

You may not want to load and parse almost 2 MB of data immediately, so no languages are loaded by default. You can use this method to load languages. If no languages are provided, all of them will be loaded. This method will return the data, but also store it in `data`, which you can retrieve with `get()`.

If multiple (or all) languages are provided, an object will be returned in the same structure as `data` (`{ language: { set: data } }`). If a single language is provided, only the data for that language will be returned (`{ set: data }`).

### get(language: string, set?: string): Object

Get the language data for a language. You can also directly access the `data` property. If `set` is not provided, all sets will be returned within an object. Otherwise, only the specific data for that set will be returned.

### fallback(data: string | Object, english?: boolean): Object

Fallback data from the `messages` set, to make sure the dataset is complete. It will merge the data with its fallbacks', its fallbacks' with its fallbacks' fallbacks', and so on. You can disable `english` to _not_ merge missing data with English at the lowest level, though all top-level fallback languages are complete anyway. The `data` parameter can be a language code, or custom language data with a `fallback` property.

### path: string

The absolute path pointing to the location of the JSON files. The directory structure is `(set)/(language).json`. You can use this if, for some reason, you want to manipulate the JSON files directly.

### data: Object

All of the language data, in format `{ language: { set: data } }`.

### sets: string[]

The available language data sets. Will be populated on the first `load()` execution. An array containing only `messages` for now.
