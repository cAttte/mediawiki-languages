# mediawiki-languages

Language data from the [MediaWiki software](https://github.com/wikimedia/mediawiki), in JSON and with typings.

For now, only the `/messages/` set is supported. `/data/` and `/i18n/` may be published in the future under separate packages.

The JSON data is only fetched and deserialized by the package maintainers (in a "development" environment). The data comes along with the interface, and it is not fetched at runtime. This package uses a [PHP parser](https://www.npmjs.com/package/php-parser) to parse the source files containing language data under the `/languages/` directory of MediaWiki. It then converts this data into JSON, and generates TypeScript declaration files from it.
