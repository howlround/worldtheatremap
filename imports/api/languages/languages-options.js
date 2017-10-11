import { Meteor } from 'meteor/meteor';
import fs from 'fs';
import { _ } from 'meteor/underscore';
import { defineMessages } from 'react-intl';
import { Languages } from './languages.js';
import { TAPi18n } from 'meteor/tap:i18n';

const messages = defineMessages({
  'language.Abkhazian': {
    id: 'language.Abkhazian',
    defaultMessage: 'Abkhazian',
  },
  'language.Acehnese': {
    id: 'language.Acehnese',
    defaultMessage: 'Acehnese',
  },
  'language.Adyghe': {
    id: 'language.Adyghe',
    defaultMessage: 'Adyghe',
  },
  'language.Afar': {
    id: 'language.Afar',
    defaultMessage: 'Afar',
  },
  'language.Afrikaans': {
    id: 'language.Afrikaans',
    defaultMessage: 'Afrikaans',
  },
  'language.Akan': {
    id: 'language.Akan',
    defaultMessage: 'Akan',
  },
  'language.Albanian': {
    id: 'language.Albanian',
    defaultMessage: 'Albanian',
  },
  'language.Alemannic': {
    id: 'language.Alemannic',
    defaultMessage: 'Alemannic',
  },
  'language.Amharic': {
    id: 'language.Amharic',
    defaultMessage: 'Amharic',
  },
  'language.Anglo-Saxon': {
    id: 'language.Anglo-Saxon',
    defaultMessage: 'Anglo-Saxon',
  },
  'language.Arabic': {
    id: 'language.Arabic',
    defaultMessage: 'Arabic',
  },
  'language.Aragonese': {
    id: 'language.Aragonese',
    defaultMessage: 'Aragonese',
  },
  'language.Aramaic': {
    id: 'language.Aramaic',
    defaultMessage: 'Aramaic',
  },
  'language.Armenian': {
    id: 'language.Armenian',
    defaultMessage: 'Armenian',
  },
  'language.Aromanian': {
    id: 'language.Aromanian',
    defaultMessage: 'Aromanian',
  },
  'language.Assamese': {
    id: 'language.Assamese',
    defaultMessage: 'Assamese',
  },
  'language.Asturian': {
    id: 'language.Asturian',
    defaultMessage: 'Asturian',
  },
  'language.Avar': {
    id: 'language.Avar',
    defaultMessage: 'Avar',
  },
  'language.Aymara': {
    id: 'language.Aymara',
    defaultMessage: 'Aymara',
  },
  'language.Azerbaijani': {
    id: 'language.Azerbaijani',
    defaultMessage: 'Azerbaijani',
  },
  'language.Bambara': {
    id: 'language.Bambara',
    defaultMessage: 'Bambara',
  },
  'language.Banjar': {
    id: 'language.Banjar',
    defaultMessage: 'Banjar',
  },
  'language.Banyumasan': {
    id: 'language.Banyumasan',
    defaultMessage: 'Banyumasan',
  },
  'language.Bashkir': {
    id: 'language.Bashkir',
    defaultMessage: 'Bashkir',
  },
  'language.Basque': {
    id: 'language.Basque',
    defaultMessage: 'Basque',
  },
  'language.Bavarian': {
    id: 'language.Bavarian',
    defaultMessage: 'Bavarian',
  },
  'language.Belarusian': {
    id: 'language.Belarusian',
    defaultMessage: 'Belarusian',
  },
  'language.Belarusian (Taraškievica)': {
    id: 'language.Belarusian (Taraškievica)',
    defaultMessage: 'Belarusian (Taraškievica)',
  },
  'language.Bengali': {
    id: 'language.Bengali',
    defaultMessage: 'Bengali',
  },
  'language.Bihari': {
    id: 'language.Bihari',
    defaultMessage: 'Bihari',
  },
  'language.Bishnupriya Manipuri': {
    id: 'language.Bishnupriya Manipuri',
    defaultMessage: 'Bishnupriya Manipuri',
  },
  'language.Bislama': {
    id: 'language.Bislama',
    defaultMessage: 'Bislama',
  },
  'language.Bosnian': {
    id: 'language.Bosnian',
    defaultMessage: 'Bosnian',
  },
  'language.Breton': {
    id: 'language.Breton',
    defaultMessage: 'Breton',
  },
  'language.Buginese': {
    id: 'language.Buginese',
    defaultMessage: 'Buginese',
  },
  'language.Bulgarian': {
    id: 'language.Bulgarian',
    defaultMessage: 'Bulgarian',
  },
  'language.Burmese': {
    id: 'language.Burmese',
    defaultMessage: 'Burmese',
  },
  'language.Buryat': {
    id: 'language.Buryat',
    defaultMessage: 'Buryat',
  },
  'language.Cantonese': {
    id: 'language.Cantonese',
    defaultMessage: 'Cantonese',
  },
  'language.Catalan': {
    id: 'language.Catalan',
    defaultMessage: 'Catalan',
  },
  'language.Cebuano': {
    id: 'language.Cebuano',
    defaultMessage: 'Cebuano',
  },
  'language.Central Bicolano': {
    id: 'language.Central Bicolano',
    defaultMessage: 'Central Bicolano',
  },
  'language.Chamorro': {
    id: 'language.Chamorro',
    defaultMessage: 'Chamorro',
  },
  'language.Chavacano': {
    id: 'language.Chavacano',
    defaultMessage: 'Chavacano',
  },
  'language.Chechen': {
    id: 'language.Chechen',
    defaultMessage: 'Chechen',
  },
  'language.Cherokee': {
    id: 'language.Cherokee',
    defaultMessage: 'Cherokee',
  },
  'language.Cheyenne': {
    id: 'language.Cheyenne',
    defaultMessage: 'Cheyenne',
  },
  'language.Chichewa': {
    id: 'language.Chichewa',
    defaultMessage: 'Chichewa',
  },
  'language.Chinese': {
    id: 'language.Chinese',
    defaultMessage: 'Chinese',
  },
  'language.Choctaw': {
    id: 'language.Choctaw',
    defaultMessage: 'Choctaw',
  },
  'language.Chuvash': {
    id: 'language.Chuvash',
    defaultMessage: 'Chuvash',
  },
  'language.Classical Chinese': {
    id: 'language.Classical Chinese',
    defaultMessage: 'Classical Chinese',
  },
  'language.Cornish': {
    id: 'language.Cornish',
    defaultMessage: 'Cornish',
  },
  'language.Corsican': {
    id: 'language.Corsican',
    defaultMessage: 'Corsican',
  },
  'language.Cree': {
    id: 'language.Cree',
    defaultMessage: 'Cree',
  },
  'language.Crimean Tatar': {
    id: 'language.Crimean Tatar',
    defaultMessage: 'Crimean Tatar',
  },
  'language.Croatian': {
    id: 'language.Croatian',
    defaultMessage: 'Croatian',
  },
  'language.Czech': {
    id: 'language.Czech',
    defaultMessage: 'Czech',
  },
  'language.Danish': {
    id: 'language.Danish',
    defaultMessage: 'Danish',
  },
  'language.Divehi': {
    id: 'language.Divehi',
    defaultMessage: 'Divehi',
  },
  'language.Dutch': {
    id: 'language.Dutch',
    defaultMessage: 'Dutch',
  },
  'language.Dutch Low Saxon': {
    id: 'language.Dutch Low Saxon',
    defaultMessage: 'Dutch Low Saxon',
  },
  'language.Dzongkha': {
    id: 'language.Dzongkha',
    defaultMessage: 'Dzongkha',
  },
  'language.Eastern Punjabi': {
    id: 'language.Eastern Punjabi',
    defaultMessage: 'Eastern Punjabi',
  },
  'language.Egyptian Arabic': {
    id: 'language.Egyptian Arabic',
    defaultMessage: 'Egyptian Arabic',
  },
  'language.Emilian-Romagnol': {
    id: 'language.Emilian-Romagnol',
    defaultMessage: 'Emilian-Romagnol',
  },
  'language.English': {
    id: 'language.English',
    defaultMessage: 'English',
  },
  'language.Erzya': {
    id: 'language.Erzya',
    defaultMessage: 'Erzya',
  },
  'language.Esperanto': {
    id: 'language.Esperanto',
    defaultMessage: 'Esperanto',
  },
  'language.Estonian': {
    id: 'language.Estonian',
    defaultMessage: 'Estonian',
  },
  'language.Ewe': {
    id: 'language.Ewe',
    defaultMessage: 'Ewe',
  },
  'language.Extremaduran': {
    id: 'language.Extremaduran',
    defaultMessage: 'Extremaduran',
  },
  'language.Faroese': {
    id: 'language.Faroese',
    defaultMessage: 'Faroese',
  },
  'language.Fiji Hindi': {
    id: 'language.Fiji Hindi',
    defaultMessage: 'Fiji Hindi',
  },
  'language.Fijian': {
    id: 'language.Fijian',
    defaultMessage: 'Fijian',
  },
  'language.Finnish': {
    id: 'language.Finnish',
    defaultMessage: 'Finnish',
  },
  'language.Franco-Provençal': {
    id: 'language.Franco-Provençal',
    defaultMessage: 'Franco-Provençal',
  },
  'language.French': {
    id: 'language.French',
    defaultMessage: 'French',
  },
  'language.Friulian': {
    id: 'language.Friulian',
    defaultMessage: 'Friulian',
  },
  'language.Fula': {
    id: 'language.Fula',
    defaultMessage: 'Fula',
  },
  'language.Gagauz': {
    id: 'language.Gagauz',
    defaultMessage: 'Gagauz',
  },
  'language.Galician': {
    id: 'language.Galician',
    defaultMessage: 'Galician',
  },
  'language.Gan': {
    id: 'language.Gan',
    defaultMessage: 'Gan',
  },
  'language.Georgian': {
    id: 'language.Georgian',
    defaultMessage: 'Georgian',
  },
  'language.German': {
    id: 'language.German',
    defaultMessage: 'German',
  },
  'language.Gilaki': {
    id: 'language.Gilaki',
    defaultMessage: 'Gilaki',
  },
  'language.Goan Konkani': {
    id: 'language.Goan Konkani',
    defaultMessage: 'Goan Konkani',
  },
  'language.Gothic': {
    id: 'language.Gothic',
    defaultMessage: 'Gothic',
  },
  'language.Greek': {
    id: 'language.Greek',
    defaultMessage: 'Greek',
  },
  'language.Greenlandic': {
    id: 'language.Greenlandic',
    defaultMessage: 'Greenlandic',
  },
  'language.Guarani': {
    id: 'language.Guarani',
    defaultMessage: 'Guarani',
  },
  'language.Gujarati': {
    id: 'language.Gujarati',
    defaultMessage: 'Gujarati',
  },
  'language.Haitian': {
    id: 'language.Haitian',
    defaultMessage: 'Haitian',
  },
  'language.Hakka': {
    id: 'language.Hakka',
    defaultMessage: 'Hakka',
  },
  'language.Hausa': {
    id: 'language.Hausa',
    defaultMessage: 'Hausa',
  },
  'language.Hawaiian': {
    id: 'language.Hawaiian',
    defaultMessage: 'Hawaiian',
  },
  'language.Hebrew': {
    id: 'language.Hebrew',
    defaultMessage: 'Hebrew',
  },
  'language.Herero': {
    id: 'language.Herero',
    defaultMessage: 'Herero',
  },
  'language.Hill Mari': {
    id: 'language.Hill Mari',
    defaultMessage: 'Hill Mari',
  },
  'language.Hindi': {
    id: 'language.Hindi',
    defaultMessage: 'Hindi',
  },
  'language.Hiri Motu': {
    id: 'language.Hiri Motu',
    defaultMessage: 'Hiri Motu',
  },
  'language.Hungarian': {
    id: 'language.Hungarian',
    defaultMessage: 'Hungarian',
  },
  'language.Icelandic': {
    id: 'language.Icelandic',
    defaultMessage: 'Icelandic',
  },
  'language.Ido': {
    id: 'language.Ido',
    defaultMessage: 'Ido',
  },
  'language.Igbo': {
    id: 'language.Igbo',
    defaultMessage: 'Igbo',
  },
  'language.Ilokano': {
    id: 'language.Ilokano',
    defaultMessage: 'Ilokano',
  },
  'language.Indonesian': {
    id: 'language.Indonesian',
    defaultMessage: 'Indonesian',
  },
  'language.Interlingua': {
    id: 'language.Interlingua',
    defaultMessage: 'Interlingua',
  },
  'language.Interlingue': {
    id: 'language.Interlingue',
    defaultMessage: 'Interlingue',
  },
  'language.Inuktitut': {
    id: 'language.Inuktitut',
    defaultMessage: 'Inuktitut',
  },
  'language.Inupiak': {
    id: 'language.Inupiak',
    defaultMessage: 'Inupiak',
  },
  'language.Irish': {
    id: 'language.Irish',
    defaultMessage: 'Irish',
  },
  'language.Italian': {
    id: 'language.Italian',
    defaultMessage: 'Italian',
  },
  'language.Jamaican Patois': {
    id: 'language.Jamaican Patois',
    defaultMessage: 'Jamaican Patois',
  },
  'language.Japanese': {
    id: 'language.Japanese',
    defaultMessage: 'Japanese',
  },
  'language.Javanese': {
    id: 'language.Javanese',
    defaultMessage: 'Javanese',
  },
  'language.Kabardian': {
    id: 'language.Kabardian',
    defaultMessage: 'Kabardian',
  },
  'language.Kabyle': {
    id: 'language.Kabyle',
    defaultMessage: 'Kabyle',
  },
  'language.Kalmyk': {
    id: 'language.Kalmyk',
    defaultMessage: 'Kalmyk',
  },
  'language.Kannada': {
    id: 'language.Kannada',
    defaultMessage: 'Kannada',
  },
  'language.Kapampangan': {
    id: 'language.Kapampangan',
    defaultMessage: 'Kapampangan',
  },
  'language.Karachay-Balkar': {
    id: 'language.Karachay-Balkar',
    defaultMessage: 'Karachay-Balkar',
  },
  'language.Karakalpak': {
    id: 'language.Karakalpak',
    defaultMessage: 'Karakalpak',
  },
  'language.Kashmiri': {
    id: 'language.Kashmiri',
    defaultMessage: 'Kashmiri',
  },
  'language.Kashubian': {
    id: 'language.Kashubian',
    defaultMessage: 'Kashubian',
  },
  'language.Kazakh': {
    id: 'language.Kazakh',
    defaultMessage: 'Kazakh',
  },
  'language.Khmer': {
    id: 'language.Khmer',
    defaultMessage: 'Khmer',
  },
  'language.Kikuyu': {
    id: 'language.Kikuyu',
    defaultMessage: 'Kikuyu',
  },
  'language.Kinyarwanda': {
    id: 'language.Kinyarwanda',
    defaultMessage: 'Kinyarwanda',
  },
  'language.Kirghiz': {
    id: 'language.Kirghiz',
    defaultMessage: 'Kirghiz',
  },
  'language.Kirundi': {
    id: 'language.Kirundi',
    defaultMessage: 'Kirundi',
  },
  'language.Komi': {
    id: 'language.Komi',
    defaultMessage: 'Komi',
  },
  'language.Komi-Permyak': {
    id: 'language.Komi-Permyak',
    defaultMessage: 'Komi-Permyak',
  },
  'language.Kongo': {
    id: 'language.Kongo',
    defaultMessage: 'Kongo',
  },
  'language.Korean': {
    id: 'language.Korean',
    defaultMessage: 'Korean',
  },
  'language.Kurdish (Kurmanji)': {
    id: 'language.Kurdish (Kurmanji)',
    defaultMessage: 'Kurdish (Kurmanji)',
  },
  'language.Kurdish (Sorani)': {
    id: 'language.Kurdish (Sorani)',
    defaultMessage: 'Kurdish (Sorani)',
  },
  'language.Ladino': {
    id: 'language.Ladino',
    defaultMessage: 'Ladino',
  },
  'language.Lak': {
    id: 'language.Lak',
    defaultMessage: 'Lak',
  },
  'language.Lao': {
    id: 'language.Lao',
    defaultMessage: 'Lao',
  },
  'language.Latgalian': {
    id: 'language.Latgalian',
    defaultMessage: 'Latgalian',
  },
  'language.Latin': {
    id: 'language.Latin',
    defaultMessage: 'Latin',
  },
  'language.Latvian': {
    id: 'language.Latvian',
    defaultMessage: 'Latvian',
  },
  'language.Lezgian': {
    id: 'language.Lezgian',
    defaultMessage: 'Lezgian',
  },
  'language.Ligurian': {
    id: 'language.Ligurian',
    defaultMessage: 'Ligurian',
  },
  'language.Limburgish': {
    id: 'language.Limburgish',
    defaultMessage: 'Limburgish',
  },
  'language.Lingala': {
    id: 'language.Lingala',
    defaultMessage: 'Lingala',
  },
  'language.Lithuanian': {
    id: 'language.Lithuanian',
    defaultMessage: 'Lithuanian',
  },
  'language.Livvi-Karelian': {
    id: 'language.Livvi-Karelian',
    defaultMessage: 'Livvi-Karelian',
  },
  'language.Lojban': {
    id: 'language.Lojban',
    defaultMessage: 'Lojban',
  },
  'language.Lombard': {
    id: 'language.Lombard',
    defaultMessage: 'Lombard',
  },
  'language.Low Saxon': {
    id: 'language.Low Saxon',
    defaultMessage: 'Low Saxon',
  },
  'language.Lower Sorbian': {
    id: 'language.Lower Sorbian',
    defaultMessage: 'Lower Sorbian',
  },
  'language.Luganda': {
    id: 'language.Luganda',
    defaultMessage: 'Luganda',
  },
  'language.Luxembourgish': {
    id: 'language.Luxembourgish',
    defaultMessage: 'Luxembourgish',
  },
  'language.Macedonian': {
    id: 'language.Macedonian',
    defaultMessage: 'Macedonian',
  },
  'language.Maithili': {
    id: 'language.Maithili',
    defaultMessage: 'Maithili',
  },
  'language.Malagasy': {
    id: 'language.Malagasy',
    defaultMessage: 'Malagasy',
  },
  'language.Malay': {
    id: 'language.Malay',
    defaultMessage: 'Malay',
  },
  'language.Malayalam': {
    id: 'language.Malayalam',
    defaultMessage: 'Malayalam',
  },
  'language.Maltese': {
    id: 'language.Maltese',
    defaultMessage: 'Maltese',
  },
  'language.Manx': {
    id: 'language.Manx',
    defaultMessage: 'Manx',
  },
  'language.Maori': {
    id: 'language.Maori',
    defaultMessage: 'Maori',
  },
  'language.Marathi': {
    id: 'language.Marathi',
    defaultMessage: 'Marathi',
  },
  'language.Mazandarani': {
    id: 'language.Mazandarani',
    defaultMessage: 'Mazandarani',
  },
  'language.Meadow Mari': {
    id: 'language.Meadow Mari',
    defaultMessage: 'Meadow Mari',
  },
  'language.Min Dong': {
    id: 'language.Min Dong',
    defaultMessage: 'Min Dong',
  },
  'language.Min Nan': {
    id: 'language.Min Nan',
    defaultMessage: 'Min Nan',
  },
  'language.Minangkabau': {
    id: 'language.Minangkabau',
    defaultMessage: 'Minangkabau',
  },
  'language.Mingrelian': {
    id: 'language.Mingrelian',
    defaultMessage: 'Mingrelian',
  },
  'language.Mirandese': {
    id: 'language.Mirandese',
    defaultMessage: 'Mirandese',
  },
  'language.Moksha': {
    id: 'language.Moksha',
    defaultMessage: 'Moksha',
  },
  'language.Mongolian': {
    id: 'language.Mongolian',
    defaultMessage: 'Mongolian',
  },
  'language.Muscogee': {
    id: 'language.Muscogee',
    defaultMessage: 'Muscogee',
  },
  'language.Nahuatl': {
    id: 'language.Nahuatl',
    defaultMessage: 'Nahuatl',
  },
  'language.Nauruan': {
    id: 'language.Nauruan',
    defaultMessage: 'Nauruan',
  },
  'language.Navajo': {
    id: 'language.Navajo',
    defaultMessage: 'Navajo',
  },
  'language.Ndonga': {
    id: 'language.Ndonga',
    defaultMessage: 'Ndonga',
  },
  'language.Neapolitan': {
    id: 'language.Neapolitan',
    defaultMessage: 'Neapolitan',
  },
  'language.Nepali': {
    id: 'language.Nepali',
    defaultMessage: 'Nepali',
  },
  'language.Newar': {
    id: 'language.Newar',
    defaultMessage: 'Newar',
  },
  'language.Norfolk': {
    id: 'language.Norfolk',
    defaultMessage: 'Norfolk',
  },
  'language.Norman': {
    id: 'language.Norman',
    defaultMessage: 'Norman',
  },
  'language.North Frisian': {
    id: 'language.North Frisian',
    defaultMessage: 'North Frisian',
  },
  'language.Northern Luri': {
    id: 'language.Northern Luri',
    defaultMessage: 'Northern Luri',
  },
  'language.Northern Sami': {
    id: 'language.Northern Sami',
    defaultMessage: 'Northern Sami',
  },
  'language.Northern Sotho': {
    id: 'language.Northern Sotho',
    defaultMessage: 'Northern Sotho',
  },
  'language.Norwegian (Bokmål)': {
    id: 'language.Norwegian (Bokmål)',
    defaultMessage: 'Norwegian (Bokmål)',
  },
  'language.Norwegian (Nynorsk)': {
    id: 'language.Norwegian (Nynorsk)',
    defaultMessage: 'Norwegian (Nynorsk)',
  },
  'language.Novial': {
    id: 'language.Novial',
    defaultMessage: 'Novial',
  },
  'language.Nuosu': {
    id: 'language.Nuosu',
    defaultMessage: 'Nuosu',
  },
  'language.Occitan': {
    id: 'language.Occitan',
    defaultMessage: 'Occitan',
  },
  'language.Old Church Slavonic': {
    id: 'language.Old Church Slavonic',
    defaultMessage: 'Old Church Slavonic',
  },
  'language.Oriya': {
    id: 'language.Oriya',
    defaultMessage: 'Oriya',
  },
  'language.Oromo': {
    id: 'language.Oromo',
    defaultMessage: 'Oromo',
  },
  'language.Ossetian': {
    id: 'language.Ossetian',
    defaultMessage: 'Ossetian',
  },
  'language.Palatinate German': {
    id: 'language.Palatinate German',
    defaultMessage: 'Palatinate German',
  },
  'language.Pali': {
    id: 'language.Pali',
    defaultMessage: 'Pali',
  },
  'language.Pangasinan': {
    id: 'language.Pangasinan',
    defaultMessage: 'Pangasinan',
  },
  'language.Papiamentu': {
    id: 'language.Papiamentu',
    defaultMessage: 'Papiamentu',
  },
  'language.Pashto': {
    id: 'language.Pashto',
    defaultMessage: 'Pashto',
  },
  'language.Pennsylvania German': {
    id: 'language.Pennsylvania German',
    defaultMessage: 'Pennsylvania German',
  },
  'language.Persian': {
    id: 'language.Persian',
    defaultMessage: 'Persian',
  },
  'language.Picard': {
    id: 'language.Picard',
    defaultMessage: 'Picard',
  },
  'language.Piedmontese': {
    id: 'language.Piedmontese',
    defaultMessage: 'Piedmontese',
  },
  'language.Polish': {
    id: 'language.Polish',
    defaultMessage: 'Polish',
  },
  'language.Pontic': {
    id: 'language.Pontic',
    defaultMessage: 'Pontic',
  },
  'language.Portuguese': {
    id: 'language.Portuguese',
    defaultMessage: 'Portuguese',
  },
  'language.Quechua': {
    id: 'language.Quechua',
    defaultMessage: 'Quechua',
  },
  'language.Ripuarian': {
    id: 'language.Ripuarian',
    defaultMessage: 'Ripuarian',
  },
  'language.Romani': {
    id: 'language.Romani',
    defaultMessage: 'Romani',
  },
  'language.Romanian': {
    id: 'language.Romanian',
    defaultMessage: 'Romanian',
  },
  'language.Romansh': {
    id: 'language.Romansh',
    defaultMessage: 'Romansh',
  },
  'language.Russian': {
    id: 'language.Russian',
    defaultMessage: 'Russian',
  },
  'language.Rusyn': {
    id: 'language.Rusyn',
    defaultMessage: 'Rusyn',
  },
  'language.Sakha': {
    id: 'language.Sakha',
    defaultMessage: 'Sakha',
  },
  'language.Samoan': {
    id: 'language.Samoan',
    defaultMessage: 'Samoan',
  },
  'language.Samogitian': {
    id: 'language.Samogitian',
    defaultMessage: 'Samogitian',
  },
  'language.Sango': {
    id: 'language.Sango',
    defaultMessage: 'Sango',
  },
  'language.Sanskrit': {
    id: 'language.Sanskrit',
    defaultMessage: 'Sanskrit',
  },
  'language.Sardinian': {
    id: 'language.Sardinian',
    defaultMessage: 'Sardinian',
  },
  'language.Saterland Frisian': {
    id: 'language.Saterland Frisian',
    defaultMessage: 'Saterland Frisian',
  },
  'language.Scots': {
    id: 'language.Scots',
    defaultMessage: 'Scots',
  },
  'language.Scottish Gaelic': {
    id: 'language.Scottish Gaelic',
    defaultMessage: 'Scottish Gaelic',
  },
  'language.Serbian': {
    id: 'language.Serbian',
    defaultMessage: 'Serbian',
  },
  'language.Serbo-Croatian': {
    id: 'language.Serbo-Croatian',
    defaultMessage: 'Serbo-Croatian',
  },
  'language.Sesotho': {
    id: 'language.Sesotho',
    defaultMessage: 'Sesotho',
  },
  'language.Shona': {
    id: 'language.Shona',
    defaultMessage: 'Shona',
  },
  'language.Sicilian': {
    id: 'language.Sicilian',
    defaultMessage: 'Sicilian',
  },
  'language.Sign Language': {
    id: 'language.Sign Language',
    defaultMessage: 'Sign Language',
  },
  'language.Silesian': {
    id: 'language.Silesian',
    defaultMessage: 'Silesian',
  },
  'language.Simple English': {
    id: 'language.Simple English',
    defaultMessage: 'Simple English',
  },
  'language.Sindhi': {
    id: 'language.Sindhi',
    defaultMessage: 'Sindhi',
  },
  'language.Sinhalese': {
    id: 'language.Sinhalese',
    defaultMessage: 'Sinhalese',
  },
  'language.Slovak': {
    id: 'language.Slovak',
    defaultMessage: 'Slovak',
  },
  'language.Slovenian': {
    id: 'language.Slovenian',
    defaultMessage: 'Slovenian',
  },
  'language.Somali': {
    id: 'language.Somali',
    defaultMessage: 'Somali',
  },
  'language.Southern Azerbaijani': {
    id: 'language.Southern Azerbaijani',
    defaultMessage: 'Southern Azerbaijani',
  },
  'language.Spanish': {
    id: 'language.Spanish',
    defaultMessage: 'Spanish',
  },
  'language.Sranan': {
    id: 'language.Sranan',
    defaultMessage: 'Sranan',
  },
  'language.Sundanese': {
    id: 'language.Sundanese',
    defaultMessage: 'Sundanese',
  },
  'language.Swahili': {
    id: 'language.Swahili',
    defaultMessage: 'Swahili',
  },
  'language.Swati': {
    id: 'language.Swati',
    defaultMessage: 'Swati',
  },
  'language.Swedish': {
    id: 'language.Swedish',
    defaultMessage: 'Swedish',
  },
  'language.Tagalog': {
    id: 'language.Tagalog',
    defaultMessage: 'Tagalog',
  },
  'language.Tahitian': {
    id: 'language.Tahitian',
    defaultMessage: 'Tahitian',
  },
  'language.Tajik': {
    id: 'language.Tajik',
    defaultMessage: 'Tajik',
  },
  'language.Tamil': {
    id: 'language.Tamil',
    defaultMessage: 'Tamil',
  },
  'language.Tarantino': {
    id: 'language.Tarantino',
    defaultMessage: 'Tarantino',
  },
  'language.Tatar': {
    id: 'language.Tatar',
    defaultMessage: 'Tatar',
  },
  'language.Telugu': {
    id: 'language.Telugu',
    defaultMessage: 'Telugu',
  },
  'language.Tetum': {
    id: 'language.Tetum',
    defaultMessage: 'Tetum',
  },
  'language.Thai': {
    id: 'language.Thai',
    defaultMessage: 'Thai',
  },
  'language.Tibetan': {
    id: 'language.Tibetan',
    defaultMessage: 'Tibetan',
  },
  'language.Tigrinya': {
    id: 'language.Tigrinya',
    defaultMessage: 'Tigrinya',
  },
  'language.Tok Pisin': {
    id: 'language.Tok Pisin',
    defaultMessage: 'Tok Pisin',
  },
  'language.Tongan': {
    id: 'language.Tongan',
    defaultMessage: 'Tongan',
  },
  'language.Tsonga': {
    id: 'language.Tsonga',
    defaultMessage: 'Tsonga',
  },
  'language.Tswana': {
    id: 'language.Tswana',
    defaultMessage: 'Tswana',
  },
  'language.Tulu': {
    id: 'language.Tulu',
    defaultMessage: 'Tulu',
  },
  'language.Tumbuka': {
    id: 'language.Tumbuka',
    defaultMessage: 'Tumbuka',
  },
  'language.Turkish': {
    id: 'language.Turkish',
    defaultMessage: 'Turkish',
  },
  'language.Turkmen': {
    id: 'language.Turkmen',
    defaultMessage: 'Turkmen',
  },
  'language.Tuvan': {
    id: 'language.Tuvan',
    defaultMessage: 'Tuvan',
  },
  'language.Twi': {
    id: 'language.Twi',
    defaultMessage: 'Twi',
  },
  'language.Udmurt': {
    id: 'language.Udmurt',
    defaultMessage: 'Udmurt',
  },
  'language.Ukrainian': {
    id: 'language.Ukrainian',
    defaultMessage: 'Ukrainian',
  },
  'language.Upper Sorbian': {
    id: 'language.Upper Sorbian',
    defaultMessage: 'Upper Sorbian',
  },
  'language.Urdu': {
    id: 'language.Urdu',
    defaultMessage: 'Urdu',
  },
  'language.Uyghur': {
    id: 'language.Uyghur',
    defaultMessage: 'Uyghur',
  },
  'language.Uzbek': {
    id: 'language.Uzbek',
    defaultMessage: 'Uzbek',
  },
  'language.Venda': {
    id: 'language.Venda',
    defaultMessage: 'Venda',
  },
  'language.Venetian': {
    id: 'language.Venetian',
    defaultMessage: 'Venetian',
  },
  'language.Vepsian': {
    id: 'language.Vepsian',
    defaultMessage: 'Vepsian',
  },
  'language.Vietnamese': {
    id: 'language.Vietnamese',
    defaultMessage: 'Vietnamese',
  },
  'language.Volapük': {
    id: 'language.Volapük',
    defaultMessage: 'Volapük',
  },
  'language.Võro': {
    id: 'language.Võro',
    defaultMessage: 'Võro',
  },
  'language.Walloon': {
    id: 'language.Walloon',
    defaultMessage: 'Walloon',
  },
  'language.Waray': {
    id: 'language.Waray',
    defaultMessage: 'Waray',
  },
  'language.Welsh': {
    id: 'language.Welsh',
    defaultMessage: 'Welsh',
  },
  'language.West Flemish': {
    id: 'language.West Flemish',
    defaultMessage: 'West Flemish',
  },
  'language.West Frisian': {
    id: 'language.West Frisian',
    defaultMessage: 'West Frisian',
  },
  'language.Western Punjabi': {
    id: 'language.Western Punjabi',
    defaultMessage: 'Western Punjabi',
  },
  'language.Wolof': {
    id: 'language.Wolof',
    defaultMessage: 'Wolof',
  },
  'language.Wu': {
    id: 'language.Wu',
    defaultMessage: 'Wu',
  },
  'language.Xhosa': {
    id: 'language.Xhosa',
    defaultMessage: 'Xhosa',
  },
  'language.Yiddish': {
    id: 'language.Yiddish',
    defaultMessage: 'Yiddish',
  },
  'language.Yoruba': {
    id: 'language.Yoruba',
    defaultMessage: 'Yoruba',
  },
  'language.Zazaki': {
    id: 'language.Zazaki',
    defaultMessage: 'Zazaki',
  },
  'language.Zeelandic': {
    id: 'language.Zeelandic',
    defaultMessage: 'Zeelandic',
  },
  'language.Zhuang': {
    id: 'language.Zhuang',
    defaultMessage: 'Zhuang',
  },
  'language.Zulu': {
    id: 'language.Zulu',
    defaultMessage: 'Zulu',
  },
});

const supportedLanguages = TAPi18n.getLanguages();
delete supportedLanguages.en;

const meteorRoot = fs.realpathSync(`${process.cwd()}/../`);
const publicPath = `${meteorRoot}/web.browser/app/`;
const translations = {};
_.each(supportedLanguages, (name, locale) => {
  const translationFile = fs.readFileSync(`${publicPath}/i18n/${locale}.json`);
  translations[locale] = JSON.parse(translationFile);
});

const allLanguages = _.map(messages, language => (
  {
    value: language.defaultMessage,
    label: language.defaultMessage,
    i18n: {},
  }
));

// Populate each language translation
// Native forEach alters the interated object
allLanguages.forEach(language => {
  const thisLanguage = language;
  _.each(supportedLanguages, (name, locale) => {
    thisLanguage.i18n[locale] = {
      label: translations[locale][`language.${thisLanguage.value}`],
    };
  });
});

Meteor.startup(() => {
  /* eslint-disable no-console */
  console.log('Re-populating languages database...');
  allLanguages.forEach(language => {
    Languages.upsert({ value: language.value }, { $set: language });
  });
});
