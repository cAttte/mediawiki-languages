# mediawiki-languages

Language data from the [MediaWiki software](https://github.com/wikimedia/mediawiki), in JSON and with typings.

The JSON data is only fetched and deserialized by the package maintainers (in a "development" environment). The data comes along with the interface, and it is not fetched at runtime.

This package uses a [PHP parser](https://www.npmjs.com/package/php-parser) to parse the source files containing language data under the `/languages/` directory of MediaWiki. It then converts this data into JSON, and generates TypeScript declaration files from it.

For now, only the `/messages/` set is supported. `/data/` and `/i18n/` may be published in the future under separate packages.

## Installation

    $ npm install mediawiki-languages

This will install the library interface, its typings, and the JSON data, which takes ~1.6 MB.

## Usage

The module default-exports one class, `MediaWikiLanguages`. Its methods and fields are all static, which means you should not instantiate it, and use it like a regular object instead.

### load(...languages?: string[]): Promise<void>

You may not want to load and parse almost 2 MB of data immediately, so no languages are loaded by default. You can use this method to load the languages. If no languages are provided, all of them will be loaded.
