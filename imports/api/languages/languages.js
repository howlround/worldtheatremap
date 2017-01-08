// Utilities
import { Mongo } from 'meteor/mongo';
import React from 'react';
import ReactSelect from 'react-select';
import { FormattedMessage } from 'react-intl';
import t from 'tcomb-form';

class LanguagesCollection extends Mongo.Collection {
  // insert(profile, callback) {
  // }
  // remove(selector, callback) {
  // }
}

export const Languages = new LanguagesCollection('Languages');

// Deny all client-side updates since we will be using methods to manage this collection
Languages.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Languages.publicFields = {
  value: 1,
  label: 1,
};

export const existingLanguagesFactory = () => {
  // Langauge options
  const ExistingLanguages = Languages.find({}, { sort: { label: 1 } }).fetch();

  // Langauge template
  const existingLanguagesTags = t.form.Form.templates.select.clone({
    renderSelect: (locals) => {
      function onChange(options) {
        const values = (options || []).map(({ value }) => value);
        locals.onChange(values);
      }
      return (
        <ReactSelect
          multi
          autoBlur
          options={ExistingLanguages}
          value={locals.value}
          onChange={onChange}
          className="language-select-edit"
        />
      );
    },
  });

  // Langauge factory function
  class ReactSelectExistingLanguagesFactory extends t.form.Component {
    getTemplate() {
      return existingLanguagesTags;
    }
  }

  // Langauge transformer
  ReactSelectExistingLanguagesFactory.transformer = t.form.List.transformer;

  return ReactSelectExistingLanguagesFactory;
};

export const AllLanguagesFactory = (multiValue = false) => {
  // allLanguages options
  const AllLanguages = [
    {
      value: 'Abkhazian',
      label: <FormattedMessage
        id="language.Abkhazian"
        description="Language options: Abkhazian"
        defaultMessage="Abkhazian"
      />,
    },
    {
      value: 'Acehnese',
      label: <FormattedMessage
        id="language.Acehnese"
        description="Language options: Acehnese"
        defaultMessage="Acehnese"
      />,
    },
    {
      value: 'Adyghe',
      label: <FormattedMessage
        id="language.Adyghe"
        description="Language options: Adyghe"
        defaultMessage="Adyghe"
      />,
    },
    {
      value: 'Afar',
      label: <FormattedMessage
        id="language.Afar"
        description="Language options: Afar"
        defaultMessage="Afar"
      />,
    },
    {
      value: 'Afrikaans',
      label: <FormattedMessage
        id="language.Afrikaans"
        description="Language options: Afrikaans"
        defaultMessage="Afrikaans"
      />,
    },
    {
      value: 'Akan',
      label: <FormattedMessage
        id="language.Akan"
        description="Language options: Akan"
        defaultMessage="Akan"
      />,
    },
    {
      value: 'Albanian',
      label: <FormattedMessage
        id="language.Albanian"
        description="Language options: Albanian"
        defaultMessage="Albanian"
      />,
    },
    {
      value: 'Alemannic',
      label: <FormattedMessage
        id="language.Alemannic"
        description="Language options: Alemannic"
        defaultMessage="Alemannic"
      />,
    },
    {
      value: 'Amharic',
      label: <FormattedMessage
        id="language.Amharic"
        description="Language options: Amharic"
        defaultMessage="Amharic"
      />,
    },
    {
      value: 'Anglo-Saxon',
      label: <FormattedMessage
        id="language.Anglo-Saxon"
        description="Language options: Anglo-Saxon"
        defaultMessage="Anglo-Saxon"
      />,
    },
    {
      value: 'Arabic',
      label: <FormattedMessage
        id="language.Arabic"
        description="Language options: Arabic"
        defaultMessage="Arabic"
      />,
    },
    {
      value: 'Aragonese',
      label: <FormattedMessage
        id="language.Aragonese"
        description="Language options: Aragonese"
        defaultMessage="Aragonese"
      />,
    },
    {
      value: 'Aramaic',
      label: <FormattedMessage
        id="language.Aramaic"
        description="Language options: Aramaic"
        defaultMessage="Aramaic"
      />,
    },
    {
      value: 'Armenian',
      label: <FormattedMessage
        id="language.Armenian"
        description="Language options: Armenian"
        defaultMessage="Armenian"
      />,
    },
    {
      value: 'Aromanian',
      label: <FormattedMessage
        id="language.Aromanian"
        description="Language options: Aromanian"
        defaultMessage="Aromanian"
      />,
    },
    {
      value: 'Assamese',
      label: <FormattedMessage
        id="language.Assamese"
        description="Language options: Assamese"
        defaultMessage="Assamese"
      />,
    },
    {
      value: 'Asturian',
      label: <FormattedMessage
        id="language.Asturian"
        description="Language options: Asturian"
        defaultMessage="Asturian"
      />,
    },
    {
      value: 'Avar',
      label: <FormattedMessage
        id="language.Avar"
        description="Language options: Avar"
        defaultMessage="Avar"
      />,
    },
    {
      value: 'Aymara',
      label: <FormattedMessage
        id="language.Aymara"
        description="Language options: Aymara"
        defaultMessage="Aymara"
      />,
    },
    {
      value: 'Azerbaijani',
      label: <FormattedMessage
        id="language.Azerbaijani"
        description="Language options: Azerbaijani"
        defaultMessage="Azerbaijani"
      />,
    },
    {
      value: 'Bambara',
      label: <FormattedMessage
        id="language.Bambara"
        description="Language options: Bambara"
        defaultMessage="Bambara"
      />,
    },
    {
      value: 'Banjar',
      label: <FormattedMessage
        id="language.Banjar"
        description="Language options: Banjar"
        defaultMessage="Banjar"
      />,
    },
    {
      value: 'Banyumasan',
      label: <FormattedMessage
        id="language.Banyumasan"
        description="Language options: Banyumasan"
        defaultMessage="Banyumasan"
      />,
    },
    {
      value: 'Bashkir',
      label: <FormattedMessage
        id="language.Bashkir"
        description="Language options: Bashkir"
        defaultMessage="Bashkir"
      />,
    },
    {
      value: 'Basque',
      label: <FormattedMessage
        id="language.Basque"
        description="Language options: Basque"
        defaultMessage="Basque"
      />,
    },
    {
      value: 'Bavarian',
      label: <FormattedMessage
        id="language.Bavarian"
        description="Language options: Bavarian"
        defaultMessage="Bavarian"
      />,
    },
    {
      value: 'Belarusian',
      label: <FormattedMessage
        id="language.Belarusian"
        description="Language options: Belarusian"
        defaultMessage="Belarusian"
      />,
    },
    {
      value: 'Belarusian (Taraškievica)',
      label: <FormattedMessage
        id="language.Belarusian (Taraškievica)"
        description="Language options: Belarusian (Taraškievica)"
        defaultMessage="Belarusian (Taraškievica)"
      />,
    },
    {
      value: 'Bengali',
      label: <FormattedMessage
        id="language.Bengali"
        description="Language options: Bengali"
        defaultMessage="Bengali"
      />,
    },
    {
      value: 'Bihari',
      label: <FormattedMessage
        id="language.Bihari"
        description="Language options: Bihari"
        defaultMessage="Bihari"
      />,
    },
    {
      value: 'Bishnupriya Manipuri',
      label: <FormattedMessage
        id="language.Bishnupriya Manipuri"
        description="Language options: Bishnupriya Manipuri"
        defaultMessage="Bishnupriya Manipuri"
      />,
    },
    {
      value: 'Bislama',
      label: <FormattedMessage
        id="language.Bislama"
        description="Language options: Bislama"
        defaultMessage="Bislama"
      />,
    },
    {
      value: 'Bosnian',
      label: <FormattedMessage
        id="language.Bosnian"
        description="Language options: Bosnian"
        defaultMessage="Bosnian"
      />,
    },
    {
      value: 'Breton',
      label: <FormattedMessage
        id="language.Breton"
        description="Language options: Breton"
        defaultMessage="Breton"
      />,
    },
    {
      value: 'Buginese',
      label: <FormattedMessage
        id="language.Buginese"
        description="Language options: Buginese"
        defaultMessage="Buginese"
      />,
    },
    {
      value: 'Bulgarian',
      label: <FormattedMessage
        id="language.Bulgarian"
        description="Language options: Bulgarian"
        defaultMessage="Bulgarian"
      />,
    },
    {
      value: 'Burmese',
      label: <FormattedMessage
        id="language.Burmese"
        description="Language options: Burmese"
        defaultMessage="Burmese"
      />,
    },
    {
      value: 'Buryat',
      label: <FormattedMessage
        id="language.Buryat"
        description="Language options: Buryat"
        defaultMessage="Buryat"
      />,
    },
    {
      value: 'Cantonese',
      label: <FormattedMessage
        id="language.Cantonese"
        description="Language options: Cantonese"
        defaultMessage="Cantonese"
      />,
    },
    {
      value: 'Catalan',
      label: <FormattedMessage
        id="language.Catalan"
        description="Language options: Catalan"
        defaultMessage="Catalan"
      />,
    },
    {
      value: 'Cebuano',
      label: <FormattedMessage
        id="language.Cebuano"
        description="Language options: Cebuano"
        defaultMessage="Cebuano"
      />,
    },
    {
      value: 'Central Bicolano',
      label: <FormattedMessage
        id="language.Central Bicolano"
        description="Language options: Central Bicolano"
        defaultMessage="Central Bicolano"
      />,
    },
    {
      value: 'Chamorro',
      label: <FormattedMessage
        id="language.Chamorro"
        description="Language options: Chamorro"
        defaultMessage="Chamorro"
      />,
    },
    {
      value: 'Chavacano',
      label: <FormattedMessage
        id="language.Chavacano"
        description="Language options: Chavacano"
        defaultMessage="Chavacano"
      />,
    },
    {
      value: 'Chechen',
      label: <FormattedMessage
        id="language.Chechen"
        description="Language options: Chechen"
        defaultMessage="Chechen"
      />,
    },
    {
      value: 'Cherokee',
      label: <FormattedMessage
        id="language.Cherokee"
        description="Language options: Cherokee"
        defaultMessage="Cherokee"
      />,
    },
    {
      value: 'Cheyenne',
      label: <FormattedMessage
        id="language.Cheyenne"
        description="Language options: Cheyenne"
        defaultMessage="Cheyenne"
      />,
    },
    {
      value: 'Chichewa',
      label: <FormattedMessage
        id="language.Chichewa"
        description="Language options: Chichewa"
        defaultMessage="Chichewa"
      />,
    },
    {
      value: 'Chinese',
      label: <FormattedMessage
        id="language.Chinese"
        description="Language options: Chinese"
        defaultMessage="Chinese"
      />,
    },
    {
      value: 'Choctaw',
      label: <FormattedMessage
        id="language.Choctaw"
        description="Language options: Choctaw"
        defaultMessage="Choctaw"
      />,
    },
    {
      value: 'Chuvash',
      label: <FormattedMessage
        id="language.Chuvash"
        description="Language options: Chuvash"
        defaultMessage="Chuvash"
      />,
    },
    {
      value: 'Classical Chinese',
      label: <FormattedMessage
        id="language.Classical Chinese"
        description="Language options: Classical Chinese"
        defaultMessage="Classical Chinese"
      />,
    },
    {
      value: 'Cornish',
      label: <FormattedMessage
        id="language.Cornish"
        description="Language options: Cornish"
        defaultMessage="Cornish"
      />,
    },
    {
      value: 'Corsican',
      label: <FormattedMessage
        id="language.Corsican"
        description="Language options: Corsican"
        defaultMessage="Corsican"
      />,
    },
    {
      value: 'Cree',
      label: <FormattedMessage
        id="language.Cree"
        description="Language options: Cree"
        defaultMessage="Cree"
      />,
    },
    {
      value: 'Crimean Tatar',
      label: <FormattedMessage
        id="language.Crimean Tatar"
        description="Language options: Crimean Tatar"
        defaultMessage="Crimean Tatar"
      />,
    },
    {
      value: 'Croatian',
      label: <FormattedMessage
        id="language.Croatian"
        description="Language options: Croatian"
        defaultMessage="Croatian"
      />,
    },
    {
      value: 'Czech',
      label: <FormattedMessage
        id="language.Czech"
        description="Language options: Czech"
        defaultMessage="Czech"
      />,
    },
    {
      value: 'Danish',
      label: <FormattedMessage
        id="language.Danish"
        description="Language options: Danish"
        defaultMessage="Danish"
      />,
    },
    {
      value: 'Divehi',
      label: <FormattedMessage
        id="language.Divehi"
        description="Language options: Divehi"
        defaultMessage="Divehi"
      />,
    },
    {
      value: 'Dutch',
      label: <FormattedMessage
        id="language.Dutch"
        description="Language options: Dutch"
        defaultMessage="Dutch"
      />,
    },
    {
      value: 'Dutch Low Saxon',
      label: <FormattedMessage
        id="language.Dutch Low Saxon"
        description="Language options: Dutch Low Saxon"
        defaultMessage="Dutch Low Saxon"
      />,
    },
    {
      value: 'Dzongkha',
      label: <FormattedMessage
        id="language.Dzongkha"
        description="Language options: Dzongkha"
        defaultMessage="Dzongkha"
      />,
    },
    {
      value: 'Eastern Punjabi',
      label: <FormattedMessage
        id="language.Eastern Punjabi"
        description="Language options: Eastern Punjabi"
        defaultMessage="Eastern Punjabi"
      />,
    },
    {
      value: 'Egyptian Arabic',
      label: <FormattedMessage
        id="language.Egyptian Arabic"
        description="Language options: Egyptian Arabic"
        defaultMessage="Egyptian Arabic"
      />,
    },
    {
      value: 'Emilian-Romagnol',
      label: <FormattedMessage
        id="language.Emilian-Romagnol"
        description="Language options: Emilian-Romagnol"
        defaultMessage="Emilian-Romagnol"
      />,
    },
    {
      value: 'English',
      label: <FormattedMessage
        id="language.English"
        description="Language options: English"
        defaultMessage="English"
      />,
    },
    {
      value: 'Erzya',
      label: <FormattedMessage
        id="language.Erzya"
        description="Language options: Erzya"
        defaultMessage="Erzya"
      />,
    },
    {
      value: 'Esperanto',
      label: <FormattedMessage
        id="language.Esperanto"
        description="Language options: Esperanto"
        defaultMessage="Esperanto"
      />,
    },
    {
      value: 'Estonian',
      label: <FormattedMessage
        id="language.Estonian"
        description="Language options: Estonian"
        defaultMessage="Estonian"
      />,
    },
    {
      value: 'Ewe',
      label: <FormattedMessage
        id="language.Ewe"
        description="Language options: Ewe"
        defaultMessage="Ewe"
      />,
    },
    {
      value: 'Extremaduran',
      label: <FormattedMessage
        id="language.Extremaduran"
        description="Language options: Extremaduran"
        defaultMessage="Extremaduran"
      />,
    },
    {
      value: 'Faroese',
      label: <FormattedMessage
        id="language.Faroese"
        description="Language options: Faroese"
        defaultMessage="Faroese"
      />,
    },
    {
      value: 'Fiji Hindi',
      label: <FormattedMessage
        id="language.Fiji Hindi"
        description="Language options: Fiji Hindi"
        defaultMessage="Fiji Hindi"
      />,
    },
    {
      value: 'Fijian',
      label: <FormattedMessage
        id="language.Fijian"
        description="Language options: Fijian"
        defaultMessage="Fijian"
      />,
    },
    {
      value: 'Finnish',
      label: <FormattedMessage
        id="language.Finnish"
        description="Language options: Finnish"
        defaultMessage="Finnish"
      />,
    },
    {
      value: 'Franco-Provençal',
      label: <FormattedMessage
        id="language.Franco-Provençal"
        description="Language options: Franco-Provençal"
        defaultMessage="Franco-Provençal"
      />,
    },
    {
      value: 'French',
      label: <FormattedMessage
        id="language.French"
        description="Language options: French"
        defaultMessage="French"
      />,
    },
    {
      value: 'Friulian',
      label: <FormattedMessage
        id="language.Friulian"
        description="Language options: Friulian"
        defaultMessage="Friulian"
      />,
    },
    {
      value: 'Fula',
      label: <FormattedMessage
        id="language.Fula"
        description="Language options: Fula"
        defaultMessage="Fula"
      />,
    },
    {
      value: 'Gagauz',
      label: <FormattedMessage
        id="language.Gagauz"
        description="Language options: Gagauz"
        defaultMessage="Gagauz"
      />,
    },
    {
      value: 'Galician',
      label: <FormattedMessage
        id="language.Galician"
        description="Language options: Galician"
        defaultMessage="Galician"
      />,
    },
    {
      value: 'Gan',
      label: <FormattedMessage
        id="language.Gan"
        description="Language options: Gan"
        defaultMessage="Gan"
      />,
    },
    {
      value: 'Georgian',
      label: <FormattedMessage
        id="language.Georgian"
        description="Language options: Georgian"
        defaultMessage="Georgian"
      />,
    },
    {
      value: 'German',
      label: <FormattedMessage
        id="language.German"
        description="Language options: German"
        defaultMessage="German"
      />,
    },
    {
      value: 'Gilaki',
      label: <FormattedMessage
        id="language.Gilaki"
        description="Language options: Gilaki"
        defaultMessage="Gilaki"
      />,
    },
    {
      value: 'Goan Konkani',
      label: <FormattedMessage
        id="language.Goan Konkani"
        description="Language options: Goan Konkani"
        defaultMessage="Goan Konkani"
      />,
    },
    {
      value: 'Gothic',
      label: <FormattedMessage
        id="language.Gothic"
        description="Language options: Gothic"
        defaultMessage="Gothic"
      />,
    },
    {
      value: 'Greek',
      label: <FormattedMessage
        id="language.Greek"
        description="Language options: Greek"
        defaultMessage="Greek"
      />,
    },
    {
      value: 'Greenlandic',
      label: <FormattedMessage
        id="language.Greenlandic"
        description="Language options: Greenlandic"
        defaultMessage="Greenlandic"
      />,
    },
    {
      value: 'Guarani',
      label: <FormattedMessage
        id="language.Guarani"
        description="Language options: Guarani"
        defaultMessage="Guarani"
      />,
    },
    {
      value: 'Gujarati',
      label: <FormattedMessage
        id="language.Gujarati"
        description="Language options: Gujarati"
        defaultMessage="Gujarati"
      />,
    },
    {
      value: 'Haitian',
      label: <FormattedMessage
        id="language.Haitian"
        description="Language options: Haitian"
        defaultMessage="Haitian"
      />,
    },
    {
      value: 'Hakka',
      label: <FormattedMessage
        id="language.Hakka"
        description="Language options: Hakka"
        defaultMessage="Hakka"
      />,
    },
    {
      value: 'Hausa',
      label: <FormattedMessage
        id="language.Hausa"
        description="Language options: Hausa"
        defaultMessage="Hausa"
      />,
    },
    {
      value: 'Hawaiian',
      label: <FormattedMessage
        id="language.Hawaiian"
        description="Language options: Hawaiian"
        defaultMessage="Hawaiian"
      />,
    },
    {
      value: 'Hebrew',
      label: <FormattedMessage
        id="language.Hebrew"
        description="Language options: Hebrew"
        defaultMessage="Hebrew"
      />,
    },
    {
      value: 'Herero',
      label: <FormattedMessage
        id="language.Herero"
        description="Language options: Herero"
        defaultMessage="Herero"
      />,
    },
    {
      value: 'Hill Mari',
      label: <FormattedMessage
        id="language.Hill Mari"
        description="Language options: Hill Mari"
        defaultMessage="Hill Mari"
      />,
    },
    {
      value: 'Hindi',
      label: <FormattedMessage
        id="language.Hindi"
        description="Language options: Hindi"
        defaultMessage="Hindi"
      />,
    },
    {
      value: 'Hiri Motu',
      label: <FormattedMessage
        id="language.Hiri Motu"
        description="Language options: Hiri Motu"
        defaultMessage="Hiri Motu"
      />,
    },
    {
      value: 'Hungarian',
      label: <FormattedMessage
        id="language.Hungarian"
        description="Language options: Hungarian"
        defaultMessage="Hungarian"
      />,
    },
    {
      value: 'Icelandic',
      label: <FormattedMessage
        id="language.Icelandic"
        description="Language options: Icelandic"
        defaultMessage="Icelandic"
      />,
    },
    {
      value: 'Ido',
      label: <FormattedMessage
        id="language.Ido"
        description="Language options: Ido"
        defaultMessage="Ido"
      />,
    },
    {
      value: 'Igbo',
      label: <FormattedMessage
        id="language.Igbo"
        description="Language options: Igbo"
        defaultMessage="Igbo"
      />,
    },
    {
      value: 'Ilokano',
      label: <FormattedMessage
        id="language.Ilokano"
        description="Language options: Ilokano"
        defaultMessage="Ilokano"
      />,
    },
    {
      value: 'Indonesian',
      label: <FormattedMessage
        id="language.Indonesian"
        description="Language options: Indonesian"
        defaultMessage="Indonesian"
      />,
    },
    {
      value: 'Interlingua',
      label: <FormattedMessage
        id="language.Interlingua"
        description="Language options: Interlingua"
        defaultMessage="Interlingua"
      />,
    },
    {
      value: 'Interlingue',
      label: <FormattedMessage
        id="language.Interlingue"
        description="Language options: Interlingue"
        defaultMessage="Interlingue"
      />,
    },
    {
      value: 'Inuktitut',
      label: <FormattedMessage
        id="language.Inuktitut"
        description="Language options: Inuktitut"
        defaultMessage="Inuktitut"
      />,
    },
    {
      value: 'Inupiak',
      label: <FormattedMessage
        id="language.Inupiak"
        description="Language options: Inupiak"
        defaultMessage="Inupiak"
      />,
    },
    {
      value: 'Irish',
      label: <FormattedMessage
        id="language.Irish"
        description="Language options: Irish"
        defaultMessage="Irish"
      />,
    },
    {
      value: 'Italian',
      label: <FormattedMessage
        id="language.Italian"
        description="Language options: Italian"
        defaultMessage="Italian"
      />,
    },
    {
      value: 'Jamaican Patois',
      label: <FormattedMessage
        id="language.Jamaican Patois"
        description="Language options: Jamaican Patois"
        defaultMessage="Jamaican Patois"
      />,
    },
    {
      value: 'Japanese',
      label: <FormattedMessage
        id="language.Japanese"
        description="Language options: Japanese"
        defaultMessage="Japanese"
      />,
    },
    {
      value: 'Javanese',
      label: <FormattedMessage
        id="language.Javanese"
        description="Language options: Javanese"
        defaultMessage="Javanese"
      />,
    },
    {
      value: 'Kabardian',
      label: <FormattedMessage
        id="language.Kabardian"
        description="Language options: Kabardian"
        defaultMessage="Kabardian"
      />,
    },
    {
      value: 'Kabyle',
      label: <FormattedMessage
        id="language.Kabyle"
        description="Language options: Kabyle"
        defaultMessage="Kabyle"
      />,
    },
    {
      value: 'Kalmyk',
      label: <FormattedMessage
        id="language.Kalmyk"
        description="Language options: Kalmyk"
        defaultMessage="Kalmyk"
      />,
    },
    {
      value: 'Kannada',
      label: <FormattedMessage
        id="language.Kannada"
        description="Language options: Kannada"
        defaultMessage="Kannada"
      />,
    },
    {
      value: 'Kapampangan',
      label: <FormattedMessage
        id="language.Kapampangan"
        description="Language options: Kapampangan"
        defaultMessage="Kapampangan"
      />,
    },
    {
      value: 'Karachay-Balkar',
      label: <FormattedMessage
        id="language.Karachay-Balkar"
        description="Language options: Karachay-Balkar"
        defaultMessage="Karachay-Balkar"
      />,
    },
    {
      value: 'Karakalpak',
      label: <FormattedMessage
        id="language.Karakalpak"
        description="Language options: Karakalpak"
        defaultMessage="Karakalpak"
      />,
    },
    {
      value: 'Kashmiri',
      label: <FormattedMessage
        id="language.Kashmiri"
        description="Language options: Kashmiri"
        defaultMessage="Kashmiri"
      />,
    },
    {
      value: 'Kashubian',
      label: <FormattedMessage
        id="language.Kashubian"
        description="Language options: Kashubian"
        defaultMessage="Kashubian"
      />,
    },
    {
      value: 'Kazakh',
      label: <FormattedMessage
        id="language.Kazakh"
        description="Language options: Kazakh"
        defaultMessage="Kazakh"
      />,
    },
    {
      value: 'Khmer',
      label: <FormattedMessage
        id="language.Khmer"
        description="Language options: Khmer"
        defaultMessage="Khmer"
      />,
    },
    {
      value: 'Kikuyu',
      label: <FormattedMessage
        id="language.Kikuyu"
        description="Language options: Kikuyu"
        defaultMessage="Kikuyu"
      />,
    },
    {
      value: 'Kinyarwanda',
      label: <FormattedMessage
        id="language.Kinyarwanda"
        description="Language options: Kinyarwanda"
        defaultMessage="Kinyarwanda"
      />,
    },
    {
      value: 'Kirghiz',
      label: <FormattedMessage
        id="language.Kirghiz"
        description="Language options: Kirghiz"
        defaultMessage="Kirghiz"
      />,
    },
    {
      value: 'Kirundi',
      label: <FormattedMessage
        id="language.Kirundi"
        description="Language options: Kirundi"
        defaultMessage="Kirundi"
      />,
    },
    {
      value: 'Komi',
      label: <FormattedMessage
        id="language.Komi"
        description="Language options: Komi"
        defaultMessage="Komi"
      />,
    },
    {
      value: 'Komi-Permyak',
      label: <FormattedMessage
        id="language.Komi-Permyak"
        description="Language options: Komi-Permyak"
        defaultMessage="Komi-Permyak"
      />,
    },
    {
      value: 'Kongo',
      label: <FormattedMessage
        id="language.Kongo"
        description="Language options: Kongo"
        defaultMessage="Kongo"
      />,
    },
    {
      value: 'Korean',
      label: <FormattedMessage
        id="language.Korean"
        description="Language options: Korean"
        defaultMessage="Korean"
      />,
    },
    {
      value: 'Kurdish (Kurmanji)',
      label: <FormattedMessage
        id="language.Kurdish (Kurmanji)"
        description="Language options: Kurdish (Kurmanji)"
        defaultMessage="Kurdish (Kurmanji)"
      />,
    },
    {
      value: 'Kurdish (Sorani)',
      label: <FormattedMessage
        id="language.Kurdish (Sorani)"
        description="Language options: Kurdish (Sorani)"
        defaultMessage="Kurdish (Sorani)"
      />,
    },
    {
      value: 'Ladino',
      label: <FormattedMessage
        id="language.Ladino"
        description="Language options: Ladino"
        defaultMessage="Ladino"
      />,
    },
    {
      value: 'Lak',
      label: <FormattedMessage
        id="language.Lak"
        description="Language options: Lak"
        defaultMessage="Lak"
      />,
    },
    {
      value: 'Lao',
      label: <FormattedMessage
        id="language.Lao"
        description="Language options: Lao"
        defaultMessage="Lao"
      />,
    },
    {
      value: 'Latgalian',
      label: <FormattedMessage
        id="language.Latgalian"
        description="Language options: Latgalian"
        defaultMessage="Latgalian"
      />,
    },
    {
      value: 'Latin',
      label: <FormattedMessage
        id="language.Latin"
        description="Language options: Latin"
        defaultMessage="Latin"
      />,
    },
    {
      value: 'Latvian',
      label: <FormattedMessage
        id="language.Latvian"
        description="Language options: Latvian"
        defaultMessage="Latvian"
      />,
    },
    {
      value: 'Lezgian',
      label: <FormattedMessage
        id="language.Lezgian"
        description="Language options: Lezgian"
        defaultMessage="Lezgian"
      />,
    },
    {
      value: 'Ligurian',
      label: <FormattedMessage
        id="language.Ligurian"
        description="Language options: Ligurian"
        defaultMessage="Ligurian"
      />,
    },
    {
      value: 'Limburgish',
      label: <FormattedMessage
        id="language.Limburgish"
        description="Language options: Limburgish"
        defaultMessage="Limburgish"
      />,
    },
    {
      value: 'Lingala',
      label: <FormattedMessage
        id="language.Lingala"
        description="Language options: Lingala"
        defaultMessage="Lingala"
      />,
    },
    {
      value: 'Lithuanian',
      label: <FormattedMessage
        id="language.Lithuanian"
        description="Language options: Lithuanian"
        defaultMessage="Lithuanian"
      />,
    },
    {
      value: 'Livvi-Karelian',
      label: <FormattedMessage
        id="language.Livvi-Karelian"
        description="Language options: Livvi-Karelian"
        defaultMessage="Livvi-Karelian"
      />,
    },
    {
      value: 'Lojban',
      label: <FormattedMessage
        id="language.Lojban"
        description="Language options: Lojban"
        defaultMessage="Lojban"
      />,
    },
    {
      value: 'Lombard',
      label: <FormattedMessage
        id="language.Lombard"
        description="Language options: Lombard"
        defaultMessage="Lombard"
      />,
    },
    {
      value: 'Low Saxon',
      label: <FormattedMessage
        id="language.Low Saxon"
        description="Language options: Low Saxon"
        defaultMessage="Low Saxon"
      />,
    },
    {
      value: 'Lower Sorbian',
      label: <FormattedMessage
        id="language.Lower Sorbian"
        description="Language options: Lower Sorbian"
        defaultMessage="Lower Sorbian"
      />,
    },
    {
      value: 'Luganda',
      label: <FormattedMessage
        id="language.Luganda"
        description="Language options: Luganda"
        defaultMessage="Luganda"
      />,
    },
    {
      value: 'Luxembourgish',
      label: <FormattedMessage
        id="language.Luxembourgish"
        description="Language options: Luxembourgish"
        defaultMessage="Luxembourgish"
      />,
    },
    {
      value: 'Macedonian',
      label: <FormattedMessage
        id="language.Macedonian"
        description="Language options: Macedonian"
        defaultMessage="Macedonian"
      />,
    },
    {
      value: 'Maithili',
      label: <FormattedMessage
        id="language.Maithili"
        description="Language options: Maithili"
        defaultMessage="Maithili"
      />,
    },
    {
      value: 'Malagasy',
      label: <FormattedMessage
        id="language.Malagasy"
        description="Language options: Malagasy"
        defaultMessage="Malagasy"
      />,
    },
    {
      value: 'Malay',
      label: <FormattedMessage
        id="language.Malay"
        description="Language options: Malay"
        defaultMessage="Malay"
      />,
    },
    {
      value: 'Malayalam',
      label: <FormattedMessage
        id="language.Malayalam"
        description="Language options: Malayalam"
        defaultMessage="Malayalam"
      />,
    },
    {
      value: 'Maltese',
      label: <FormattedMessage
        id="language.Maltese"
        description="Language options: Maltese"
        defaultMessage="Maltese"
      />,
    },
    {
      value: 'Manx',
      label: <FormattedMessage
        id="language.Manx"
        description="Language options: Manx"
        defaultMessage="Manx"
      />,
    },
    {
      value: 'Maori',
      label: <FormattedMessage
        id="language.Maori"
        description="Language options: Maori"
        defaultMessage="Maori"
      />,
    },
    {
      value: 'Marathi',
      label: <FormattedMessage
        id="language.Marathi"
        description="Language options: Marathi"
        defaultMessage="Marathi"
      />,
    },
    {
      value: 'Mazandarani',
      label: <FormattedMessage
        id="language.Mazandarani"
        description="Language options: Mazandarani"
        defaultMessage="Mazandarani"
      />,
    },
    {
      value: 'Meadow Mari',
      label: <FormattedMessage
        id="language.Meadow Mari"
        description="Language options: Meadow Mari"
        defaultMessage="Meadow Mari"
      />,
    },
    {
      value: 'Min Dong',
      label: <FormattedMessage
        id="language.Min Dong"
        description="Language options: Min Dong"
        defaultMessage="Min Dong"
      />,
    },
    {
      value: 'Min Nan',
      label: <FormattedMessage
        id="language.Min Nan"
        description="Language options: Min Nan"
        defaultMessage="Min Nan"
      />,
    },
    {
      value: 'Minangkabau',
      label: <FormattedMessage
        id="language.Minangkabau"
        description="Language options: Minangkabau"
        defaultMessage="Minangkabau"
      />,
    },
    {
      value: 'Mingrelian',
      label: <FormattedMessage
        id="language.Mingrelian"
        description="Language options: Mingrelian"
        defaultMessage="Mingrelian"
      />,
    },
    {
      value: 'Mirandese',
      label: <FormattedMessage
        id="language.Mirandese"
        description="Language options: Mirandese"
        defaultMessage="Mirandese"
      />,
    },
    {
      value: 'Moksha',
      label: <FormattedMessage
        id="language.Moksha"
        description="Language options: Moksha"
        defaultMessage="Moksha"
      />,
    },
    {
      value: 'Mongolian',
      label: <FormattedMessage
        id="language.Mongolian"
        description="Language options: Mongolian"
        defaultMessage="Mongolian"
      />,
    },
    {
      value: 'Muscogee',
      label: <FormattedMessage
        id="language.Muscogee"
        description="Language options: Muscogee"
        defaultMessage="Muscogee"
      />,
    },
    {
      value: 'Nahuatl',
      label: <FormattedMessage
        id="language.Nahuatl"
        description="Language options: Nahuatl"
        defaultMessage="Nahuatl"
      />,
    },
    {
      value: 'Nauruan',
      label: <FormattedMessage
        id="language.Nauruan"
        description="Language options: Nauruan"
        defaultMessage="Nauruan"
      />,
    },
    {
      value: 'Navajo',
      label: <FormattedMessage
        id="language.Navajo"
        description="Language options: Navajo"
        defaultMessage="Navajo"
      />,
    },
    {
      value: 'Ndonga',
      label: <FormattedMessage
        id="language.Ndonga"
        description="Language options: Ndonga"
        defaultMessage="Ndonga"
      />,
    },
    {
      value: 'Neapolitan',
      label: <FormattedMessage
        id="language.Neapolitan"
        description="Language options: Neapolitan"
        defaultMessage="Neapolitan"
      />,
    },
    {
      value: 'Nepali',
      label: <FormattedMessage
        id="language.Nepali"
        description="Language options: Nepali"
        defaultMessage="Nepali"
      />,
    },
    {
      value: 'Newar',
      label: <FormattedMessage
        id="language.Newar"
        description="Language options: Newar"
        defaultMessage="Newar"
      />,
    },
    {
      value: 'Norfolk',
      label: <FormattedMessage
        id="language.Norfolk"
        description="Language options: Norfolk"
        defaultMessage="Norfolk"
      />,
    },
    {
      value: 'Norman',
      label: <FormattedMessage
        id="language.Norman"
        description="Language options: Norman"
        defaultMessage="Norman"
      />,
    },
    {
      value: 'North Frisian',
      label: <FormattedMessage
        id="language.North Frisian"
        description="Language options: North Frisian"
        defaultMessage="North Frisian"
      />,
    },
    {
      value: 'Northern Luri',
      label: <FormattedMessage
        id="language.Northern Luri"
        description="Language options: Northern Luri"
        defaultMessage="Northern Luri"
      />,
    },
    {
      value: 'Northern Sami',
      label: <FormattedMessage
        id="language.Northern Sami"
        description="Language options: Northern Sami"
        defaultMessage="Northern Sami"
      />,
    },
    {
      value: 'Northern Sotho',
      label: <FormattedMessage
        id="language.Northern Sotho"
        description="Language options: Northern Sotho"
        defaultMessage="Northern Sotho"
      />,
    },
    {
      value: 'Norwegian (Bokmål)',
      label: <FormattedMessage
        id="language.Norwegian (Bokmål)"
        description="Language options: Norwegian (Bokmål)"
        defaultMessage="Norwegian (Bokmål)"
      />,
    },
    {
      value: 'Norwegian (Nynorsk)',
      label: <FormattedMessage
        id="language.Norwegian (Nynorsk)"
        description="Language options: Norwegian (Nynorsk)"
        defaultMessage="Norwegian (Nynorsk)"
      />,
    },
    {
      value: 'Novial',
      label: <FormattedMessage
        id="language.Novial"
        description="Language options: Novial"
        defaultMessage="Novial"
      />,
    },
    {
      value: 'Nuosu',
      label: <FormattedMessage
        id="language.Nuosu"
        description="Language options: Nuosu"
        defaultMessage="Nuosu"
      />,
    },
    {
      value: 'Occitan',
      label: <FormattedMessage
        id="language.Occitan"
        description="Language options: Occitan"
        defaultMessage="Occitan"
      />,
    },
    {
      value: 'Old Church Slavonic',
      label: <FormattedMessage
        id="language.Old Church Slavonic"
        description="Language options: Old Church Slavonic"
        defaultMessage="Old Church Slavonic"
      />,
    },
    {
      value: 'Oriya',
      label: <FormattedMessage
        id="language.Oriya"
        description="Language options: Oriya"
        defaultMessage="Oriya"
      />,
    },
    {
      value: 'Oromo',
      label: <FormattedMessage
        id="language.Oromo"
        description="Language options: Oromo"
        defaultMessage="Oromo"
      />,
    },
    {
      value: 'Ossetian',
      label: <FormattedMessage
        id="language.Ossetian"
        description="Language options: Ossetian"
        defaultMessage="Ossetian"
      />,
    },
    {
      value: 'Palatinate German',
      label: <FormattedMessage
        id="language.Palatinate German"
        description="Language options: Palatinate German"
        defaultMessage="Palatinate German"
      />,
    },
    {
      value: 'Pali',
      label: <FormattedMessage
        id="language.Pali"
        description="Language options: Pali"
        defaultMessage="Pali"
      />,
    },
    {
      value: 'Pangasinan',
      label: <FormattedMessage
        id="language.Pangasinan"
        description="Language options: Pangasinan"
        defaultMessage="Pangasinan"
      />,
    },
    {
      value: 'Papiamentu',
      label: <FormattedMessage
        id="language.Papiamentu"
        description="Language options: Papiamentu"
        defaultMessage="Papiamentu"
      />,
    },
    {
      value: 'Pashto',
      label: <FormattedMessage
        id="language.Pashto"
        description="Language options: Pashto"
        defaultMessage="Pashto"
      />,
    },
    {
      value: 'Pennsylvania German',
      label: <FormattedMessage
        id="language.Pennsylvania German"
        description="Language options: Pennsylvania German"
        defaultMessage="Pennsylvania German"
      />,
    },
    {
      value: 'Persian',
      label: <FormattedMessage
        id="language.Persian"
        description="Language options: Persian"
        defaultMessage="Persian"
      />,
    },
    {
      value: 'Picard',
      label: <FormattedMessage
        id="language.Picard"
        description="Language options: Picard"
        defaultMessage="Picard"
      />,
    },
    {
      value: 'Piedmontese',
      label: <FormattedMessage
        id="language.Piedmontese"
        description="Language options: Piedmontese"
        defaultMessage="Piedmontese"
      />,
    },
    {
      value: 'Polish',
      label: <FormattedMessage
        id="language.Polish"
        description="Language options: Polish"
        defaultMessage="Polish"
      />,
    },
    {
      value: 'Pontic',
      label: <FormattedMessage
        id="language.Pontic"
        description="Language options: Pontic"
        defaultMessage="Pontic"
      />,
    },
    {
      value: 'Portuguese',
      label: <FormattedMessage
        id="language.Portuguese"
        description="Language options: Portuguese"
        defaultMessage="Portuguese"
      />,
    },
    {
      value: 'Quechua',
      label: <FormattedMessage
        id="language.Quechua"
        description="Language options: Quechua"
        defaultMessage="Quechua"
      />,
    },
    {
      value: 'Ripuarian',
      label: <FormattedMessage
        id="language.Ripuarian"
        description="Language options: Ripuarian"
        defaultMessage="Ripuarian"
      />,
    },
    {
      value: 'Romani',
      label: <FormattedMessage
        id="language.Romani"
        description="Language options: Romani"
        defaultMessage="Romani"
      />,
    },
    {
      value: 'Romanian',
      label: <FormattedMessage
        id="language.Romanian"
        description="Language options: Romanian"
        defaultMessage="Romanian"
      />,
    },
    {
      value: 'Romansh',
      label: <FormattedMessage
        id="language.Romansh"
        description="Language options: Romansh"
        defaultMessage="Romansh"
      />,
    },
    {
      value: 'Russian',
      label: <FormattedMessage
        id="language.Russian"
        description="Language options: Russian"
        defaultMessage="Russian"
      />,
    },
    {
      value: 'Rusyn',
      label: <FormattedMessage
        id="language.Rusyn"
        description="Language options: Rusyn"
        defaultMessage="Rusyn"
      />,
    },
    {
      value: 'Sakha',
      label: <FormattedMessage
        id="language.Sakha"
        description="Language options: Sakha"
        defaultMessage="Sakha"
      />,
    },
    {
      value: 'Samoan',
      label: <FormattedMessage
        id="language.Samoan"
        description="Language options: Samoan"
        defaultMessage="Samoan"
      />,
    },
    {
      value: 'Samogitian',
      label: <FormattedMessage
        id="language.Samogitian"
        description="Language options: Samogitian"
        defaultMessage="Samogitian"
      />,
    },
    {
      value: 'Sango',
      label: <FormattedMessage
        id="language.Sango"
        description="Language options: Sango"
        defaultMessage="Sango"
      />,
    },
    {
      value: 'Sanskrit',
      label: <FormattedMessage
        id="language.Sanskrit"
        description="Language options: Sanskrit"
        defaultMessage="Sanskrit"
      />,
    },
    {
      value: 'Sardinian',
      label: <FormattedMessage
        id="language.Sardinian"
        description="Language options: Sardinian"
        defaultMessage="Sardinian"
      />,
    },
    {
      value: 'Saterland Frisian',
      label: <FormattedMessage
        id="language.Saterland Frisian"
        description="Language options: Saterland Frisian"
        defaultMessage="Saterland Frisian"
      />,
    },
    {
      value: 'Scots',
      label: <FormattedMessage
        id="language.Scots"
        description="Language options: Scots"
        defaultMessage="Scots"
      />,
    },
    {
      value: 'Scottish Gaelic',
      label: <FormattedMessage
        id="language.Scottish Gaelic"
        description="Language options: Scottish Gaelic"
        defaultMessage="Scottish Gaelic"
      />,
    },
    {
      value: 'Serbian',
      label: <FormattedMessage
        id="language.Serbian"
        description="Language options: Serbian"
        defaultMessage="Serbian"
      />,
    },
    {
      value: 'Serbo-Croatian',
      label: <FormattedMessage
        id="language.Serbo-Croatian"
        description="Language options: Serbo-Croatian"
        defaultMessage="Serbo-Croatian"
      />,
    },
    {
      value: 'Sesotho',
      label: <FormattedMessage
        id="language.Sesotho"
        description="Language options: Sesotho"
        defaultMessage="Sesotho"
      />,
    },
    {
      value: 'Shona',
      label: <FormattedMessage
        id="language.Shona"
        description="Language options: Shona"
        defaultMessage="Shona"
      />,
    },
    {
      value: 'Sicilian',
      label: <FormattedMessage
        id="language.Sicilian"
        description="Language options: Sicilian"
        defaultMessage="Sicilian"
      />,
    },
    {
      value: 'Silesian',
      label: <FormattedMessage
        id="language.Silesian"
        description="Language options: Silesian"
        defaultMessage="Silesian"
      />,
    },
    {
      value: 'Simple English',
      label: <FormattedMessage
        id="language.Simple English"
        description="Language options: Simple English"
        defaultMessage="Simple English"
      />,
    },
    {
      value: 'Sindhi',
      label: <FormattedMessage
        id="language.Sindhi"
        description="Language options: Sindhi"
        defaultMessage="Sindhi"
      />,
    },
    {
      value: 'Sinhalese',
      label: <FormattedMessage
        id="language.Sinhalese"
        description="Language options: Sinhalese"
        defaultMessage="Sinhalese"
      />,
    },
    {
      value: 'Slovak',
      label: <FormattedMessage
        id="language.Slovak"
        description="Language options: Slovak"
        defaultMessage="Slovak"
      />,
    },
    {
      value: 'Slovenian',
      label: <FormattedMessage
        id="language.Slovenian"
        description="Language options: Slovenian"
        defaultMessage="Slovenian"
      />,
    },
    {
      value: 'Somali',
      label: <FormattedMessage
        id="language.Somali"
        description="Language options: Somali"
        defaultMessage="Somali"
      />,
    },
    {
      value: 'Southern Azerbaijani',
      label: <FormattedMessage
        id="language.Southern Azerbaijani"
        description="Language options: Southern Azerbaijani"
        defaultMessage="Southern Azerbaijani"
      />,
    },
    {
      value: 'Spanish',
      label: <FormattedMessage
        id="language.Spanish"
        description="Language options: Spanish"
        defaultMessage="Spanish"
      />,
    },
    {
      value: 'Sranan',
      label: <FormattedMessage
        id="language.Sranan"
        description="Language options: Sranan"
        defaultMessage="Sranan"
      />,
    },
    {
      value: 'Sundanese',
      label: <FormattedMessage
        id="language.Sundanese"
        description="Language options: Sundanese"
        defaultMessage="Sundanese"
      />,
    },
    {
      value: 'Swahili',
      label: <FormattedMessage
        id="language.Swahili"
        description="Language options: Swahili"
        defaultMessage="Swahili"
      />,
    },
    {
      value: 'Swati',
      label: <FormattedMessage
        id="language.Swati"
        description="Language options: Swati"
        defaultMessage="Swati"
      />,
    },
    {
      value: 'Swedish',
      label: <FormattedMessage
        id="language.Swedish"
        description="Language options: Swedish"
        defaultMessage="Swedish"
      />,
    },
    {
      value: 'Tagalog',
      label: <FormattedMessage
        id="language.Tagalog"
        description="Language options: Tagalog"
        defaultMessage="Tagalog"
      />,
    },
    {
      value: 'Tahitian',
      label: <FormattedMessage
        id="language.Tahitian"
        description="Language options: Tahitian"
        defaultMessage="Tahitian"
      />,
    },
    {
      value: 'Tajik',
      label: <FormattedMessage
        id="language.Tajik"
        description="Language options: Tajik"
        defaultMessage="Tajik"
      />,
    },
    {
      value: 'Tamil',
      label: <FormattedMessage
        id="language.Tamil"
        description="Language options: Tamil"
        defaultMessage="Tamil"
      />,
    },
    {
      value: 'Tarantino',
      label: <FormattedMessage
        id="language.Tarantino"
        description="Language options: Tarantino"
        defaultMessage="Tarantino"
      />,
    },
    {
      value: 'Tatar',
      label: <FormattedMessage
        id="language.Tatar"
        description="Language options: Tatar"
        defaultMessage="Tatar"
      />,
    },
    {
      value: 'Telugu',
      label: <FormattedMessage
        id="language.Telugu"
        description="Language options: Telugu"
        defaultMessage="Telugu"
      />,
    },
    {
      value: 'Tetum',
      label: <FormattedMessage
        id="language.Tetum"
        description="Language options: Tetum"
        defaultMessage="Tetum"
      />,
    },
    {
      value: 'Thai',
      label: <FormattedMessage
        id="language.Thai"
        description="Language options: Thai"
        defaultMessage="Thai"
      />,
    },
    {
      value: 'Tibetan',
      label: <FormattedMessage
        id="language.Tibetan"
        description="Language options: Tibetan"
        defaultMessage="Tibetan"
      />,
    },
    {
      value: 'Tigrinya',
      label: <FormattedMessage
        id="language.Tigrinya"
        description="Language options: Tigrinya"
        defaultMessage="Tigrinya"
      />,
    },
    {
      value: 'Tok Pisin',
      label: <FormattedMessage
        id="language.Tok Pisin"
        description="Language options: Tok Pisin"
        defaultMessage="Tok Pisin"
      />,
    },
    {
      value: 'Tongan',
      label: <FormattedMessage
        id="language.Tongan"
        description="Language options: Tongan"
        defaultMessage="Tongan"
      />,
    },
    {
      value: 'Tsonga',
      label: <FormattedMessage
        id="language.Tsonga"
        description="Language options: Tsonga"
        defaultMessage="Tsonga"
      />,
    },
    {
      value: 'Tswana',
      label: <FormattedMessage
        id="language.Tswana"
        description="Language options: Tswana"
        defaultMessage="Tswana"
      />,
    },
    {
      value: 'Tulu',
      label: <FormattedMessage
        id="language.Tulu"
        description="Language options: Tulu"
        defaultMessage="Tulu"
      />,
    },
    {
      value: 'Tumbuka',
      label: <FormattedMessage
        id="language.Tumbuka"
        description="Language options: Tumbuka"
        defaultMessage="Tumbuka"
      />,
    },
    {
      value: 'Turkish',
      label: <FormattedMessage
        id="language.Turkish"
        description="Language options: Turkish"
        defaultMessage="Turkish"
      />,
    },
    {
      value: 'Turkmen',
      label: <FormattedMessage
        id="language.Turkmen"
        description="Language options: Turkmen"
        defaultMessage="Turkmen"
      />,
    },
    {
      value: 'Tuvan',
      label: <FormattedMessage
        id="language.Tuvan"
        description="Language options: Tuvan"
        defaultMessage="Tuvan"
      />,
    },
    {
      value: 'Twi',
      label: <FormattedMessage
        id="language.Twi"
        description="Language options: Twi"
        defaultMessage="Twi"
      />,
    },
    {
      value: 'Udmurt',
      label: <FormattedMessage
        id="language.Udmurt"
        description="Language options: Udmurt"
        defaultMessage="Udmurt"
      />,
    },
    {
      value: 'Ukrainian',
      label: <FormattedMessage
        id="language.Ukrainian"
        description="Language options: Ukrainian"
        defaultMessage="Ukrainian"
      />,
    },
    {
      value: 'Upper Sorbian',
      label: <FormattedMessage
        id="language.Upper Sorbian"
        description="Language options: Upper Sorbian"
        defaultMessage="Upper Sorbian"
      />,
    },
    {
      value: 'Urdu',
      label: <FormattedMessage
        id="language.Urdu"
        description="Language options: Urdu"
        defaultMessage="Urdu"
      />,
    },
    {
      value: 'Uyghur',
      label: <FormattedMessage
        id="language.Uyghur"
        description="Language options: Uyghur"
        defaultMessage="Uyghur"
      />,
    },
    {
      value: 'Uzbek',
      label: <FormattedMessage
        id="language.Uzbek"
        description="Language options: Uzbek"
        defaultMessage="Uzbek"
      />,
    },
    {
      value: 'Venda',
      label: <FormattedMessage
        id="language.Venda"
        description="Language options: Venda"
        defaultMessage="Venda"
      />,
    },
    {
      value: 'Venetian',
      label: <FormattedMessage
        id="language.Venetian"
        description="Language options: Venetian"
        defaultMessage="Venetian"
      />,
    },
    {
      value: 'Vepsian',
      label: <FormattedMessage
        id="language.Vepsian"
        description="Language options: Vepsian"
        defaultMessage="Vepsian"
      />,
    },
    {
      value: 'Vietnamese',
      label: <FormattedMessage
        id="language.Vietnamese"
        description="Language options: Vietnamese"
        defaultMessage="Vietnamese"
      />,
    },
    {
      value: 'Volapük',
      label: <FormattedMessage
        id="language.Volapük"
        description="Language options: Volapük"
        defaultMessage="Volapük"
      />,
    },
    {
      value: 'Võro',
      label: <FormattedMessage
        id="language.Võro"
        description="Language options: Võro"
        defaultMessage="Võro"
      />,
    },
    {
      value: 'Walloon',
      label: <FormattedMessage
        id="language.Walloon"
        description="Language options: Walloon"
        defaultMessage="Walloon"
      />,
    },
    {
      value: 'Waray',
      label: <FormattedMessage
        id="language.Waray"
        description="Language options: Waray"
        defaultMessage="Waray"
      />,
    },
    {
      value: 'Welsh',
      label: <FormattedMessage
        id="language.Welsh"
        description="Language options: Welsh"
        defaultMessage="Welsh"
      />,
    },
    {
      value: 'West Flemish',
      label: <FormattedMessage
        id="language.West Flemish"
        description="Language options: West Flemish"
        defaultMessage="West Flemish"
      />,
    },
    {
      value: 'West Frisian',
      label: <FormattedMessage
        id="language.West Frisian"
        description="Language options: West Frisian"
        defaultMessage="West Frisian"
      />,
    },
    {
      value: 'Western Punjabi',
      label: <FormattedMessage
        id="language.Western Punjabi"
        description="Language options: Western Punjabi"
        defaultMessage="Western Punjabi"
      />,
    },
    {
      value: 'Wolof',
      label: <FormattedMessage
        id="language.Wolof"
        description="Language options: Wolof"
        defaultMessage="Wolof"
      />,
    },
    {
      value: 'Wu',
      label: <FormattedMessage
        id="language.Wu"
        description="Language options: Wu"
        defaultMessage="Wu"
      />,
    },
    {
      value: 'Xhosa',
      label: <FormattedMessage
        id="language.Xhosa"
        description="Language options: Xhosa"
        defaultMessage="Xhosa"
      />,
    },
    {
      value: 'Yiddish',
      label: <FormattedMessage
        id="language.Yiddish"
        description="Language options: Yiddish"
        defaultMessage="Yiddish"
      />,
    },
    {
      value: 'Yoruba',
      label: <FormattedMessage
        id="language.Yoruba"
        description="Language options: Yoruba"
        defaultMessage="Yoruba"
      />,
    },
    {
      value: 'Zazaki',
      label: <FormattedMessage
        id="language.Zazaki"
        description="Language options: Zazaki"
        defaultMessage="Zazaki"
      />,
    },
    {
      value: 'Zeelandic',
      label: <FormattedMessage
        id="language.Zeelandic"
        description="Language options: Zeelandic"
        defaultMessage="Zeelandic"
      />,
    },
    {
      value: 'Zhuang',
      label: <FormattedMessage
        id="language.Zhuang"
        description="Language options: Zhuang"
        defaultMessage="Zhuang"
      />,
    },
    {
      value: 'Zulu',
      label: <FormattedMessage
        id="language.Zulu"
        description="Language options: Zulu"
        defaultMessage="Zulu"
      />,
    },
  ];

  // allLanguages template
  const allLanguagesTags = t.form.Form.templates.select.clone({
    renderSelect: (locals) => {
      function onChange(options) {
        if (multiValue === true) {
          const values = (options || []).map(({ value }) => value);
          locals.onChange(values);
        } else {
          if (options) {
            locals.onChange(options.value);
          } else {
            locals.onChange(null);
          }
        }
      }
      return (
        <ReactSelect
          multi={multiValue}
          autoBlur
          options={AllLanguages}
          value={locals.value}
          onChange={onChange}
          className="language-select-edit"
        />
      );
    },
  });

  // allLanguages factory function
  class ReactSelectAllLanguagesFactory extends t.form.Component {
    getTemplate() {
      return allLanguagesTags;
    }
  }

  return ReactSelectAllLanguagesFactory;
};
