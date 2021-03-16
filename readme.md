# mediawiki-languages

Language data from the [MediaWiki software](https://github.com/wikimedia/mediawiki), in JSON.

## Coverage

For now, only the `/messages/` set is supported. `/data/` and `/i18n/` may be published in the future under separate packages.

## How

This package uses a [PHP parser](https://www.npmjs.com/package/php-parser) to parse the source files containing language data under the `/languages/` directory of MediaWiki. It then converts this data into JSON.

This data is only gathered by the package maintainers. The data is packaged with the interface, and it is not fetched at runtime.
