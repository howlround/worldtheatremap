// From https://github.com/yahoo/react-intl/blob/54d40377e1f6c2daf27030a8a5cda4cd2530060e/examples/translations/scripts/translate.js
import * as fs from 'fs';
import {sync as globSync} from 'glob';
import {sync as mkdirpSync} from 'mkdirp';
import Translator from './lib/translator';

// const MESSAGES_PATTERN = './i18n/imports/**/*.json';
const MESSAGES_PATTERN = './public/i18n/imports/**/*.json';
const LANG_DIR         = './public/i18n/';

// Aggregates the default messages that were extracted from the example app's
// React components via the React Intl Babel plugin. An error will be thrown if
// there are messages in different components that use the same `id`. The result
// is a flat collection of `id: message` pairs for the app's default locale.
let defaultMessages = globSync(MESSAGES_PATTERN)
    .map((filename) => fs.readFileSync(filename, 'utf8'))
    .map((file) => JSON.parse(file))
    .reduce((collection, descriptors) => {
        descriptors.forEach(({id, defaultMessage}) => {
            if (collection.hasOwnProperty(id)) {
                // throw new Error(`Duplicate message id: ${id}`);
                console.log(`Skipping duplicate message id: ${id}`)
            } else {
              collection[id] = defaultMessage;
            }

        });

        return collection;
    }, {});

// For the purpose of this example app a fake locale: `en-UPPER` is created and
// the app's default messages are "translated" into this new "locale" by simply
// UPPERCASING all of the message text. In a real app this would be through some
// offline process to get the app's messages translated by machine or
// processional translators.
// let uppercaseTranslator = new Translator((text) => text.toUpperCase());
// let uppercaseMessages = Object.keys(defaultMessages)
//     .map((id) => [id, defaultMessages[id]])
//     .reduce((collection, [id, defaultMessage]) => {
//         collection[id] = uppercaseTranslator.translate(defaultMessage);
//         return collection;
//     }, {});

mkdirpSync(LANG_DIR);
fs.writeFileSync(LANG_DIR + 'en.json', JSON.stringify(defaultMessages, null, 2) + '\r\n');
// fs.writeFileSync(LANG_DIR + 'en-UPPER.json', JSON.stringify(uppercaseMessages, null, 2));
