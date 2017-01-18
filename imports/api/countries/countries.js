// Utilities
import { Mongo } from 'meteor/mongo';
import React from 'react';
import ReactSelect from 'react-select';
import { FormattedMessage } from 'react-intl';
import t from 'tcomb-form';

class CountriesCollection extends Mongo.Collection {
  // insert(profile, callback) {
  // }
  // remove(selector, callback) {
  // }
}

export const Countries = new CountriesCollection('Countries');

// Deny all client-side updates since we will be using methods to manage this collection
Countries.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Countries.publicFields = {
  value: 1,
  label: 1,
};

export const existingCountriesFactory = () => {
  // Country options
  const ExistingCountries = Countries.find({}, { sort: { label: 1 } }).fetch();

  // Country template
  const existingCountriesTags = t.form.Form.templates.select.clone({
    renderSelect: (locals) => {
      function onChange(options) {
        const values = (options || []).map(({ value }) => value);
        locals.onChange(values);
      }

      const placeholder = <FormattedMessage
        id="forms.selectPlaceholder"
        description="Select widget placeholder"
        defaultMessage="Select..."
      />;

      return (
        <ReactSelect
          multi
          autoBlur
          options={ExistingCountries}
          value={locals.value}
          onChange={onChange}
          className="country-select-edit"
          placeholder={placeholder}
        />
      );
    },
  });

  // Country factory function
  class ReactSelectExistingCountriesFactory extends t.form.Component {
    getTemplate() {
      return existingCountriesTags;
    }
  }

  // Country transformer
  ReactSelectExistingCountriesFactory.transformer = t.form.List.transformer;

  return ReactSelectExistingCountriesFactory;
};

export const AllCountriesFactory = (multiValue = false) => {
  // allCountries options
  const AllCountries = [
    {
      value: 'Afghanistan',
      label: <FormattedMessage
        id="country.Afghanistan"
        description="Country options: Afghanistan"
        defaultMessage="Afghanistan"
      />,
    },
    {
      value: 'Akrotiri',
      label: <FormattedMessage
        id="country.Akrotiri"
        description="Country options: Akrotiri"
        defaultMessage="Akrotiri"
      />,
    },
    {
      value: 'Albania',
      label: <FormattedMessage
        id="country.Albania"
        description="Country options: Albania"
        defaultMessage="Albania"
      />,
    },
    {
      value: 'Algeria',
      label: <FormattedMessage
        id="country.Algeria"
        description="Country options: Algeria"
        defaultMessage="Algeria"
      />,
    },
    {
      value: 'American Samoa',
      label: <FormattedMessage
        id="country.American Samoa"
        description="Country options: American Samoa"
        defaultMessage="American Samoa"
      />,
    },
    {
      value: 'Andorra',
      label: <FormattedMessage
        id="country.Andorra"
        description="Country options: Andorra"
        defaultMessage="Andorra"
      />,
    },
    {
      value: 'Angola',
      label: <FormattedMessage
        id="country.Angola"
        description="Country options: Angola"
        defaultMessage="Angola"
      />,
    },
    {
      value: 'Anguilla',
      label: <FormattedMessage
        id="country.Anguilla"
        description="Country options: Anguilla"
        defaultMessage="Anguilla"
      />,
    },
    {
      value: 'Antarctica',
      label: <FormattedMessage
        id="country.Antarctica"
        description="Country options: Antarctica"
        defaultMessage="Antarctica"
      />,
    },
    {
      value: 'Antigua and Barbuda',
      label: <FormattedMessage
        id="country.Antigua and Barbuda"
        description="Country options: Antigua and Barbuda"
        defaultMessage="Antigua and Barbuda"
      />,
    },
    {
      value: 'Argentina',
      label: <FormattedMessage
        id="country.Argentina"
        description="Country options: Argentina"
        defaultMessage="Argentina"
      />,
    },
    {
      value: 'Armenia',
      label: <FormattedMessage
        id="country.Armenia"
        description="Country options: Armenia"
        defaultMessage="Armenia"
      />,
    },
    {
      value: 'Aruba',
      label: <FormattedMessage
        id="country.Aruba"
        description="Country options: Aruba"
        defaultMessage="Aruba"
      />,
    },
    {
      value: 'Ashmore and Cartier Islands',
      label: <FormattedMessage
        id="country.Ashmore and Cartier Islands"
        description="Country options: Ashmore and Cartier Islands"
        defaultMessage="Ashmore and Cartier Islands"
      />,
    },
    {
      value: 'Australia',
      label: <FormattedMessage
        id="country.Australia"
        description="Country options: Australia"
        defaultMessage="Australia"
      />,
    },
    {
      value: 'Austria',
      label: <FormattedMessage
        id="country.Austria"
        description="Country options: Austria"
        defaultMessage="Austria"
      />,
    },
    {
      value: 'Azerbaijan',
      label: <FormattedMessage
        id="country.Azerbaijan"
        description="Country options: Azerbaijan"
        defaultMessage="Azerbaijan"
      />,
    },
    {
      value: 'Bahamas, The',
      label: <FormattedMessage
        id="country.Bahamas, The"
        description="Country options: Bahamas, The"
        defaultMessage="Bahamas, The"
      />,
    },
    {
      value: 'Bahrain',
      label: <FormattedMessage
        id="country.Bahrain"
        description="Country options: Bahrain"
        defaultMessage="Bahrain"
      />,
    },
    {
      value: 'Baker Island',
      label: <FormattedMessage
        id="country.Baker Island"
        description="Country options: Baker Island"
        defaultMessage="Baker Island"
      />,
    },
    {
      value: 'Bangladesh',
      label: <FormattedMessage
        id="country.Bangladesh"
        description="Country options: Bangladesh"
        defaultMessage="Bangladesh"
      />,
    },
    {
      value: 'Barbados',
      label: <FormattedMessage
        id="country.Barbados"
        description="Country options: Barbados"
        defaultMessage="Barbados"
      />,
    },
    {
      value: 'Belarus',
      label: <FormattedMessage
        id="country.Belarus"
        description="Country options: Belarus"
        defaultMessage="Belarus"
      />,
    },
    {
      value: 'Belgium',
      label: <FormattedMessage
        id="country.Belgium"
        description="Country options: Belgium"
        defaultMessage="Belgium"
      />,
    },
    {
      value: 'Belize',
      label: <FormattedMessage
        id="country.Belize"
        description="Country options: Belize"
        defaultMessage="Belize"
      />,
    },
    {
      value: 'Benin',
      label: <FormattedMessage
        id="country.Benin"
        description="Country options: Benin"
        defaultMessage="Benin"
      />,
    },
    {
      value: 'Bermuda',
      label: <FormattedMessage
        id="country.Bermuda"
        description="Country options: Bermuda"
        defaultMessage="Bermuda"
      />,
    },
    {
      value: 'Bhutan',
      label: <FormattedMessage
        id="country.Bhutan"
        description="Country options: Bhutan"
        defaultMessage="Bhutan"
      />,
    },
    {
      value: 'Bolivia',
      label: <FormattedMessage
        id="country.Bolivia"
        description="Country options: Bolivia"
        defaultMessage="Bolivia"
      />,
    },
    {
      value: 'Bosnia and Herzegovina',
      label: <FormattedMessage
        id="country.Bosnia and Herzegovina"
        description="Country options: Bosnia and Herzegovina"
        defaultMessage="Bosnia and Herzegovina"
      />,
    },
    {
      value: 'Botswana',
      label: <FormattedMessage
        id="country.Botswana"
        description="Country options: Botswana"
        defaultMessage="Botswana"
      />,
    },
    {
      value: 'Bouvet Island',
      label: <FormattedMessage
        id="country.Bouvet Island"
        description="Country options: Bouvet Island"
        defaultMessage="Bouvet Island"
      />,
    },
    {
      value: 'Brazil',
      label: <FormattedMessage
        id="country.Brazil"
        description="Country options: Brazil"
        defaultMessage="Brazil"
      />,
    },
    {
      value: 'British Indian Ocean Territory',
      label: <FormattedMessage
        id="country.British Indian Ocean Territory"
        description="Country options: British Indian Ocean Territory"
        defaultMessage="British Indian Ocean Territory"
      />,
    },
    {
      value: 'Brunei',
      label: <FormattedMessage
        id="country.Brunei"
        description="Country options: Brunei"
        defaultMessage="Brunei"
      />,
    },
    {
      value: 'Bulgaria',
      label: <FormattedMessage
        id="country.Bulgaria"
        description="Country options: Bulgaria"
        defaultMessage="Bulgaria"
      />,
    },
    {
      value: 'Burkina Faso',
      label: <FormattedMessage
        id="country.Burkina Faso"
        description="Country options: Burkina Faso"
        defaultMessage="Burkina Faso"
      />,
    },
    {
      value: 'Burma',
      label: <FormattedMessage
        id="country.Burma"
        description="Country options: Burma"
        defaultMessage="Burma"
      />,
    },
    {
      value: 'Burundi',
      label: <FormattedMessage
        id="country.Burundi"
        description="Country options: Burundi"
        defaultMessage="Burundi"
      />,
    },
    {
      value: 'Cabo Verde',
      label: <FormattedMessage
        id="country.Cabo Verde"
        description="Country options: Cabo Verde"
        defaultMessage="Cabo Verde"
      />,
    },
    {
      value: 'Cambodia',
      label: <FormattedMessage
        id="country.Cambodia"
        description="Country options: Cambodia"
        defaultMessage="Cambodia"
      />,
    },
    {
      value: 'Cameroon',
      label: <FormattedMessage
        id="country.Cameroon"
        description="Country options: Cameroon"
        defaultMessage="Cameroon"
      />,
    },
    {
      value: 'Canada',
      label: <FormattedMessage
        id="country.Canada"
        description="Country options: Canada"
        defaultMessage="Canada"
      />,
    },
    {
      value: 'Cayman Islands',
      label: <FormattedMessage
        id="country.Cayman Islands"
        description="Country options: Cayman Islands"
        defaultMessage="Cayman Islands"
      />,
    },
    {
      value: 'Central African Republic',
      label: <FormattedMessage
        id="country.Central African Republic"
        description="Country options: Central African Republic"
        defaultMessage="Central African Republic"
      />,
    },
    {
      value: 'Chad',
      label: <FormattedMessage
        id="country.Chad"
        description="Country options: Chad"
        defaultMessage="Chad"
      />,
    },
    {
      value: 'Chile',
      label: <FormattedMessage
        id="country.Chile"
        description="Country options: Chile"
        defaultMessage="Chile"
      />,
    },
    {
      value: 'China',
      label: <FormattedMessage
        id="country.China"
        description="Country options: China"
        defaultMessage="China"
      />,
    },
    {
      value: 'Christmas Island',
      label: <FormattedMessage
        id="country.Christmas Island"
        description="Country options: Christmas Island"
        defaultMessage="Christmas Island"
      />,
    },
    {
      value: 'Clipperton Island',
      label: <FormattedMessage
        id="country.Clipperton Island"
        description="Country options: Clipperton Island"
        defaultMessage="Clipperton Island"
      />,
    },
    {
      value: 'Cocos (Keeling) Islands',
      label: <FormattedMessage
        id="country.Cocos (Keeling) Islands"
        description="Country options: Cocos (Keeling) Islands"
        defaultMessage="Cocos (Keeling) Islands"
      />,
    },
    {
      value: 'Colombia',
      label: <FormattedMessage
        id="country.Colombia"
        description="Country options: Colombia"
        defaultMessage="Colombia"
      />,
    },
    {
      value: 'Comoros',
      label: <FormattedMessage
        id="country.Comoros"
        description="Country options: Comoros"
        defaultMessage="Comoros"
      />,
    },
    {
      value: 'Congo (Brazzaville)',
      label: <FormattedMessage
        id="country.Congo (Brazzaville)"
        description="Country options: Congo (Brazzaville)"
        defaultMessage="Congo (Brazzaville)"
      />,
    },
    {
      value: 'Congo (Kinshasa)',
      label: <FormattedMessage
        id="country.Congo (Kinshasa)"
        description="Country options: Congo (Kinshasa)"
        defaultMessage="Congo (Kinshasa)"
      />,
    },
    {
      value: 'Cook Islands',
      label: <FormattedMessage
        id="country.Cook Islands"
        description="Country options: Cook Islands"
        defaultMessage="Cook Islands"
      />,
    },
    {
      value: 'Coral Sea Islands',
      label: <FormattedMessage
        id="country.Coral Sea Islands"
        description="Country options: Coral Sea Islands"
        defaultMessage="Coral Sea Islands"
      />,
    },
    {
      value: 'Costa Rica',
      label: <FormattedMessage
        id="country.Costa Rica"
        description="Country options: Costa Rica"
        defaultMessage="Costa Rica"
      />,
    },
    {
      value: 'Côte d\'Ivoire',
      label: <FormattedMessage
        id="country.Côte d'Ivoire"
        description="Country options: Côte d'Ivoire"
        defaultMessage="Côte d'Ivoire"
      />,
    },
    {
      value: 'Croatia',
      label: <FormattedMessage
        id="country.Croatia"
        description="Country options: Croatia"
        defaultMessage="Croatia"
      />,
    },
    {
      value: 'Cuba',
      label: <FormattedMessage
        id="country.Cuba"
        description="Country options: Cuba"
        defaultMessage="Cuba"
      />,
    },
    {
      value: 'Curaçao',
      label: <FormattedMessage
        id="country.Curaçao"
        description="Country options: Curaçao"
        defaultMessage="Curaçao"
      />,
    },
    {
      value: 'Cyprus',
      label: <FormattedMessage
        id="country.Cyprus"
        description="Country options: Cyprus"
        defaultMessage="Cyprus"
      />,
    },
    {
      value: 'Czechia',
      label: <FormattedMessage
        id="country.Czechia"
        description="Country options: Czechia"
        defaultMessage="Czechia"
      />,
    },
    {
      value: 'Denmark',
      label: <FormattedMessage
        id="country.Denmark"
        description="Country options: Denmark"
        defaultMessage="Denmark"
      />,
    },
    {
      value: 'Dhekelia',
      label: <FormattedMessage
        id="country.Dhekelia"
        description="Country options: Dhekelia"
        defaultMessage="Dhekelia"
      />,
    },
    {
      value: 'Djibouti',
      label: <FormattedMessage
        id="country.Djibouti"
        description="Country options: Djibouti"
        defaultMessage="Djibouti"
      />,
    },
    {
      value: 'Dominica',
      label: <FormattedMessage
        id="country.Dominica"
        description="Country options: Dominica"
        defaultMessage="Dominica"
      />,
    },
    {
      value: 'Dominican Republic',
      label: <FormattedMessage
        id="country.Dominican Republic"
        description="Country options: Dominican Republic"
        defaultMessage="Dominican Republic"
      />,
    },
    {
      value: 'Ecuador',
      label: <FormattedMessage
        id="country.Ecuador"
        description="Country options: Ecuador"
        defaultMessage="Ecuador"
      />,
    },
    {
      value: 'Egypt',
      label: <FormattedMessage
        id="country.Egypt"
        description="Country options: Egypt"
        defaultMessage="Egypt"
      />,
    },
    {
      value: 'El Salvador',
      label: <FormattedMessage
        id="country.El Salvador"
        description="Country options: El Salvador"
        defaultMessage="El Salvador"
      />,
    },
    {
      value: 'Equatorial Guinea',
      label: <FormattedMessage
        id="country.Equatorial Guinea"
        description="Country options: Equatorial Guinea"
        defaultMessage="Equatorial Guinea"
      />,
    },
    {
      value: 'Eritrea',
      label: <FormattedMessage
        id="country.Eritrea"
        description="Country options: Eritrea"
        defaultMessage="Eritrea"
      />,
    },
    {
      value: 'Estonia',
      label: <FormattedMessage
        id="country.Estonia"
        description="Country options: Estonia"
        defaultMessage="Estonia"
      />,
    },
    {
      value: 'Ethiopia',
      label: <FormattedMessage
        id="country.Ethiopia"
        description="Country options: Ethiopia"
        defaultMessage="Ethiopia"
      />,
    },
    {
      value: 'Falkland Islands (Islas Malvinas)',
      label: <FormattedMessage
        id="country.Falkland Islands (Islas Malvinas)"
        description="Country options: Falkland Islands (Islas Malvinas)"
        defaultMessage="Falkland Islands (Islas Malvinas)"
      />,
    },
    {
      value: 'Faroe Islands',
      label: <FormattedMessage
        id="country.Faroe Islands"
        description="Country options: Faroe Islands"
        defaultMessage="Faroe Islands"
      />,
    },
    {
      value: 'Fiji',
      label: <FormattedMessage
        id="country.Fiji"
        description="Country options: Fiji"
        defaultMessage="Fiji"
      />,
    },
    {
      value: 'Finland',
      label: <FormattedMessage
        id="country.Finland"
        description="Country options: Finland"
        defaultMessage="Finland"
      />,
    },
    {
      value: 'France',
      label: <FormattedMessage
        id="country.France"
        description="Country options: France"
        defaultMessage="France"
      />,
    },
    {
      value: 'French Southern and Antarctic Lands',
      label: <FormattedMessage
        id="country.French Southern and Antarctic Lands"
        description="Country options: French Southern and Antarctic Lands"
        defaultMessage="French Southern and Antarctic Lands"
      />,
    },
    {
      value: 'French Guiana',
      label: <FormattedMessage
        id="country.French Guiana"
        description="Country options: French Guiana"
        defaultMessage="French Guiana"
      />,
    },
    {
      value: 'French Polynesia',
      label: <FormattedMessage
        id="country.French Polynesia"
        description="Country options: French Polynesia"
        defaultMessage="French Polynesia"
      />,
    },
    {
      value: 'Gabon',
      label: <FormattedMessage
        id="country.Gabon"
        description="Country options: Gabon"
        defaultMessage="Gabon"
      />,
    },
    {
      value: 'Gambia, The',
      label: <FormattedMessage
        id="country.Gambia, The"
        description="Country options: Gambia, The"
        defaultMessage="Gambia, The"
      />,
    },
    {
      value: 'Georgia',
      label: <FormattedMessage
        id="country.Georgia"
        description="Country options: Georgia"
        defaultMessage="Georgia"
      />,
    },
    {
      value: 'Germany',
      label: <FormattedMessage
        id="country.Germany"
        description="Country options: Germany"
        defaultMessage="Germany"
      />,
    },
    {
      value: 'Ghana',
      label: <FormattedMessage
        id="country.Ghana"
        description="Country options: Ghana"
        defaultMessage="Ghana"
      />,
    },
    {
      value: 'Gibraltar',
      label: <FormattedMessage
        id="country.Gibraltar"
        description="Country options: Gibraltar"
        defaultMessage="Gibraltar"
      />,
    },
    {
      value: 'Greece',
      label: <FormattedMessage
        id="country.Greece"
        description="Country options: Greece"
        defaultMessage="Greece"
      />,
    },
    {
      value: 'Greenland',
      label: <FormattedMessage
        id="country.Greenland"
        description="Country options: Greenland"
        defaultMessage="Greenland"
      />,
    },
    {
      value: 'Grenada',
      label: <FormattedMessage
        id="country.Grenada"
        description="Country options: Grenada"
        defaultMessage="Grenada"
      />,
    },
    {
      value: 'Guadeloupe',
      label: <FormattedMessage
        id="country.Guadeloupe"
        description="Country options: Guadeloupe"
        defaultMessage="Guadeloupe"
      />,
    },
    {
      value: 'Guam',
      label: <FormattedMessage
        id="country.Guam"
        description="Country options: Guam"
        defaultMessage="Guam"
      />,
    },
    {
      value: 'Guatemala',
      label: <FormattedMessage
        id="country.Guatemala"
        description="Country options: Guatemala"
        defaultMessage="Guatemala"
      />,
    },
    {
      value: 'Guernsey',
      label: <FormattedMessage
        id="country.Guernsey"
        description="Country options: Guernsey"
        defaultMessage="Guernsey"
      />,
    },
    {
      value: 'Guinea',
      label: <FormattedMessage
        id="country.Guinea"
        description="Country options: Guinea"
        defaultMessage="Guinea"
      />,
    },
    {
      value: 'Guinea-Bissau',
      label: <FormattedMessage
        id="country.Guinea-Bissau"
        description="Country options: Guinea-Bissau"
        defaultMessage="Guinea-Bissau"
      />,
    },
    {
      value: 'Guyana',
      label: <FormattedMessage
        id="country.Guyana"
        description="Country options: Guyana"
        defaultMessage="Guyana"
      />,
    },
    {
      value: 'Haiti',
      label: <FormattedMessage
        id="country.Haiti"
        description="Country options: Haiti"
        defaultMessage="Haiti"
      />,
    },
    {
      value: 'Heard Island and McDonald Islands',
      label: <FormattedMessage
        id="country.Heard Island and McDonald Islands"
        description="Country options: Heard Island and McDonald Islands"
        defaultMessage="Heard Island and McDonald Islands"
      />,
    },
    {
      value: 'Holy See',
      label: <FormattedMessage
        id="country.Holy See"
        description="Country options: Holy See"
        defaultMessage="Holy See"
      />,
    },
    {
      value: 'Honduras',
      label: <FormattedMessage
        id="country.Honduras"
        description="Country options: Honduras"
        defaultMessage="Honduras"
      />,
    },
    {
      value: 'Hong Kong',
      label: <FormattedMessage
        id="country.Hong Kong"
        description="Country options: Hong Kong"
        defaultMessage="Hong Kong"
      />,
    },
    {
      value: 'Howland Island',
      label: <FormattedMessage
        id="country.Howland Island"
        description="Country options: Howland Island"
        defaultMessage="Howland Island"
      />,
    },
    {
      value: 'Hungary',
      label: <FormattedMessage
        id="country.Hungary"
        description="Country options: Hungary"
        defaultMessage="Hungary"
      />,
    },
    {
      value: 'Iceland',
      label: <FormattedMessage
        id="country.Iceland"
        description="Country options: Iceland"
        defaultMessage="Iceland"
      />,
    },
    {
      value: 'India',
      label: <FormattedMessage
        id="country.India"
        description="Country options: India"
        defaultMessage="India"
      />,
    },
    {
      value: 'Indonesia',
      label: <FormattedMessage
        id="country.Indonesia"
        description="Country options: Indonesia"
        defaultMessage="Indonesia"
      />,
    },
    {
      value: 'Iran',
      label: <FormattedMessage
        id="country.Iran"
        description="Country options: Iran"
        defaultMessage="Iran"
      />,
    },
    {
      value: 'Iraq',
      label: <FormattedMessage
        id="country.Iraq"
        description="Country options: Iraq"
        defaultMessage="Iraq"
      />,
    },
    {
      value: 'Ireland',
      label: <FormattedMessage
        id="country.Ireland"
        description="Country options: Ireland"
        defaultMessage="Ireland"
      />,
    },
    {
      value: 'Isle of Man',
      label: <FormattedMessage
        id="country.Isle of Man"
        description="Country options: Isle of Man"
        defaultMessage="Isle of Man"
      />,
    },
    {
      value: 'Israel',
      label: <FormattedMessage
        id="country.Israel"
        description="Country options: Israel"
        defaultMessage="Israel"
      />,
    },
    {
      value: 'Italy',
      label: <FormattedMessage
        id="country.Italy"
        description="Country options: Italy"
        defaultMessage="Italy"
      />,
    },
    {
      value: 'Jamaica',
      label: <FormattedMessage
        id="country.Jamaica"
        description="Country options: Jamaica"
        defaultMessage="Jamaica"
      />,
    },
    {
      value: 'Jan Mayen',
      label: <FormattedMessage
        id="country.Jan Mayen"
        description="Country options: Jan Mayen"
        defaultMessage="Jan Mayen"
      />,
    },
    {
      value: 'Japan',
      label: <FormattedMessage
        id="country.Japan"
        description="Country options: Japan"
        defaultMessage="Japan"
      />,
    },
    {
      value: 'Jarvis Island',
      label: <FormattedMessage
        id="country.Jarvis Island"
        description="Country options: Jarvis Island"
        defaultMessage="Jarvis Island"
      />,
    },
    {
      value: 'Jersey',
      label: <FormattedMessage
        id="country.Jersey"
        description="Country options: Jersey"
        defaultMessage="Jersey"
      />,
    },
    {
      value: 'Johnston Atoll',
      label: <FormattedMessage
        id="country.Johnston Atoll"
        description="Country options: Johnston Atoll"
        defaultMessage="Johnston Atoll"
      />,
    },
    {
      value: 'Jordan',
      label: <FormattedMessage
        id="country.Jordan"
        description="Country options: Jordan"
        defaultMessage="Jordan"
      />,
    },
    {
      value: 'Kazakhstan',
      label: <FormattedMessage
        id="country.Kazakhstan"
        description="Country options: Kazakhstan"
        defaultMessage="Kazakhstan"
      />,
    },
    {
      value: 'Kenya',
      label: <FormattedMessage
        id="country.Kenya"
        description="Country options: Kenya"
        defaultMessage="Kenya"
      />,
    },
    {
      value: 'Kingman Reef',
      label: <FormattedMessage
        id="country.Kingman Reef"
        description="Country options: Kingman Reef"
        defaultMessage="Kingman Reef"
      />,
    },
    {
      value: 'Kiribati',
      label: <FormattedMessage
        id="country.Kiribati"
        description="Country options: Kiribati"
        defaultMessage="Kiribati"
      />,
    },
    {
      value: 'Korea, North',
      label: <FormattedMessage
        id="country.Korea, North"
        description="Country options: Korea, North"
        defaultMessage="Korea, North"
      />,
    },
    {
      value: 'Korea, South',
      label: <FormattedMessage
        id="country.Korea, South"
        description="Country options: Korea, South"
        defaultMessage="Korea, South"
      />,
    },
    {
      value: 'Kosovo',
      label: <FormattedMessage
        id="country.Kosovo"
        description="Country options: Kosovo"
        defaultMessage="Kosovo"
      />,
    },
    {
      value: 'Kuwait',
      label: <FormattedMessage
        id="country.Kuwait"
        description="Country options: Kuwait"
        defaultMessage="Kuwait"
      />,
    },
    {
      value: 'Kyrgyzstan',
      label: <FormattedMessage
        id="country.Kyrgyzstan"
        description="Country options: Kyrgyzstan"
        defaultMessage="Kyrgyzstan"
      />,
    },
    {
      value: 'Laos',
      label: <FormattedMessage
        id="country.Laos"
        description="Country options: Laos"
        defaultMessage="Laos"
      />,
    },
    {
      value: 'Latvia',
      label: <FormattedMessage
        id="country.Latvia"
        description="Country options: Latvia"
        defaultMessage="Latvia"
      />,
    },
    {
      value: 'Lebanon',
      label: <FormattedMessage
        id="country.Lebanon"
        description="Country options: Lebanon"
        defaultMessage="Lebanon"
      />,
    },
    {
      value: 'Lesotho',
      label: <FormattedMessage
        id="country.Lesotho"
        description="Country options: Lesotho"
        defaultMessage="Lesotho"
      />,
    },
    {
      value: 'Liberia',
      label: <FormattedMessage
        id="country.Liberia"
        description="Country options: Liberia"
        defaultMessage="Liberia"
      />,
    },
    {
      value: 'Libya',
      label: <FormattedMessage
        id="country.Libya"
        description="Country options: Libya"
        defaultMessage="Libya"
      />,
    },
    {
      value: 'Liechtenstein',
      label: <FormattedMessage
        id="country.Liechtenstein"
        description="Country options: Liechtenstein"
        defaultMessage="Liechtenstein"
      />,
    },
    {
      value: 'Lithuania',
      label: <FormattedMessage
        id="country.Lithuania"
        description="Country options: Lithuania"
        defaultMessage="Lithuania"
      />,
    },
    {
      value: 'Luxembourg',
      label: <FormattedMessage
        id="country.Luxembourg"
        description="Country options: Luxembourg"
        defaultMessage="Luxembourg"
      />,
    },
    {
      value: 'Macau',
      label: <FormattedMessage
        id="country.Macau"
        description="Country options: Macau"
        defaultMessage="Macau"
      />,
    },
    {
      value: 'Macedonia',
      label: <FormattedMessage
        id="country.Macedonia"
        description="Country options: Macedonia"
        defaultMessage="Macedonia"
      />,
    },
    {
      value: 'Madagascar',
      label: <FormattedMessage
        id="country.Madagascar"
        description="Country options: Madagascar"
        defaultMessage="Madagascar"
      />,
    },
    {
      value: 'Malawi',
      label: <FormattedMessage
        id="country.Malawi"
        description="Country options: Malawi"
        defaultMessage="Malawi"
      />,
    },
    {
      value: 'Malaysia',
      label: <FormattedMessage
        id="country.Malaysia"
        description="Country options: Malaysia"
        defaultMessage="Malaysia"
      />,
    },
    {
      value: 'Maldives',
      label: <FormattedMessage
        id="country.Maldives"
        description="Country options: Maldives"
        defaultMessage="Maldives"
      />,
    },
    {
      value: 'Mali',
      label: <FormattedMessage
        id="country.Mali"
        description="Country options: Mali"
        defaultMessage="Mali"
      />,
    },
    {
      value: 'Malta',
      label: <FormattedMessage
        id="country.Malta"
        description="Country options: Malta"
        defaultMessage="Malta"
      />,
    },
    {
      value: 'Marshall Islands',
      label: <FormattedMessage
        id="country.Marshall Islands"
        description="Country options: Marshall Islands"
        defaultMessage="Marshall Islands"
      />,
    },
    {
      value: 'Martinique',
      label: <FormattedMessage
        id="country.Martinique"
        description="Country options: Martinique"
        defaultMessage="Martinique"
      />,
    },
    {
      value: 'Mauritania',
      label: <FormattedMessage
        id="country.Mauritania"
        description="Country options: Mauritania"
        defaultMessage="Mauritania"
      />,
    },
    {
      value: 'Mauritius',
      label: <FormattedMessage
        id="country.Mauritius"
        description="Country options: Mauritius"
        defaultMessage="Mauritius"
      />,
    },
    {
      value: 'Mayotte',
      label: <FormattedMessage
        id="country.Mayotte"
        description="Country options: Mayotte"
        defaultMessage="Mayotte"
      />,
    },
    {
      value: 'Mexico',
      label: <FormattedMessage
        id="country.Mexico"
        description="Country options: Mexico"
        defaultMessage="Mexico"
      />,
    },
    {
      value: 'Micronesia, Federated States of',
      label: <FormattedMessage
        id="country.Micronesia, Federated States of"
        description="Country options: Micronesia, Federated States of"
        defaultMessage="Micronesia, Federated States of"
      />,
    },
    {
      value: 'Midway Islands',
      label: <FormattedMessage
        id="country.Midway Islands"
        description="Country options: Midway Islands"
        defaultMessage="Midway Islands"
      />,
    },
    {
      value: 'Moldova',
      label: <FormattedMessage
        id="country.Moldova"
        description="Country options: Moldova"
        defaultMessage="Moldova"
      />,
    },
    {
      value: 'Monaco',
      label: <FormattedMessage
        id="country.Monaco"
        description="Country options: Monaco"
        defaultMessage="Monaco"
      />,
    },
    {
      value: 'Mongolia',
      label: <FormattedMessage
        id="country.Mongolia"
        description="Country options: Mongolia"
        defaultMessage="Mongolia"
      />,
    },
    {
      value: 'Montenegro',
      label: <FormattedMessage
        id="country.Montenegro"
        description="Country options: Montenegro"
        defaultMessage="Montenegro"
      />,
    },
    {
      value: 'Montserrat',
      label: <FormattedMessage
        id="country.Montserrat"
        description="Country options: Montserrat"
        defaultMessage="Montserrat"
      />,
    },
    {
      value: 'Morocco',
      label: <FormattedMessage
        id="country.Morocco"
        description="Country options: Morocco"
        defaultMessage="Morocco"
      />,
    },
    {
      value: 'Mozambique',
      label: <FormattedMessage
        id="country.Mozambique"
        description="Country options: Mozambique"
        defaultMessage="Mozambique"
      />,
    },
    {
      value: 'Namibia',
      label: <FormattedMessage
        id="country.Namibia"
        description="Country options: Namibia"
        defaultMessage="Namibia"
      />,
    },
    {
      value: 'Nauru',
      label: <FormattedMessage
        id="country.Nauru"
        description="Country options: Nauru"
        defaultMessage="Nauru"
      />,
    },
    {
      value: 'Navassa Island',
      label: <FormattedMessage
        id="country.Navassa Island"
        description="Country options: Navassa Island"
        defaultMessage="Navassa Island"
      />,
    },
    {
      value: 'Nepal',
      label: <FormattedMessage
        id="country.Nepal"
        description="Country options: Nepal"
        defaultMessage="Nepal"
      />,
    },
    {
      value: 'Netherlands',
      label: <FormattedMessage
        id="country.Netherlands"
        description="Country options: Netherlands"
        defaultMessage="Netherlands"
      />,
    },
    {
      value: 'New Caledonia',
      label: <FormattedMessage
        id="country.New Caledonia"
        description="Country options: New Caledonia"
        defaultMessage="New Caledonia"
      />,
    },
    {
      value: 'New Zealand',
      label: <FormattedMessage
        id="country.New Zealand"
        description="Country options: New Zealand"
        defaultMessage="New Zealand"
      />,
    },
    {
      value: 'Nicaragua',
      label: <FormattedMessage
        id="country.Nicaragua"
        description="Country options: Nicaragua"
        defaultMessage="Nicaragua"
      />,
    },
    {
      value: 'Niger',
      label: <FormattedMessage
        id="country.Niger"
        description="Country options: Niger"
        defaultMessage="Niger"
      />,
    },
    {
      value: 'Nigeria',
      label: <FormattedMessage
        id="country.Nigeria"
        description="Country options: Nigeria"
        defaultMessage="Nigeria"
      />,
    },
    {
      value: 'Niue',
      label: <FormattedMessage
        id="country.Niue"
        description="Country options: Niue"
        defaultMessage="Niue"
      />,
    },
    {
      value: 'Norfolk Island',
      label: <FormattedMessage
        id="country.Norfolk Island"
        description="Country options: Norfolk Island"
        defaultMessage="Norfolk Island"
      />,
    },
    {
      value: 'Northern Mariana Islands',
      label: <FormattedMessage
        id="country.Northern Mariana Islands"
        description="Country options: Northern Mariana Islands"
        defaultMessage="Northern Mariana Islands"
      />,
    },
    {
      value: 'Norway',
      label: <FormattedMessage
        id="country.Norway"
        description="Country options: Norway"
        defaultMessage="Norway"
      />,
    },
    {
      value: 'Oman',
      label: <FormattedMessage
        id="country.Oman"
        description="Country options: Oman"
        defaultMessage="Oman"
      />,
    },
    {
      value: 'Pakistan',
      label: <FormattedMessage
        id="country.Pakistan"
        description="Country options: Pakistan"
        defaultMessage="Pakistan"
      />,
    },
    {
      value: 'Palau',
      label: <FormattedMessage
        id="country.Palau"
        description="Country options: Palau"
        defaultMessage="Palau"
      />,
    },
    {
      value: 'Palestine',
      label: <FormattedMessage
        id="country.Palestine"
        description="Country options: Palestine"
        defaultMessage="Palestine"
      />,
    },
    {
      value: 'Palmyra Atoll',
      label: <FormattedMessage
        id="country.Palmyra Atoll"
        description="Country options: Palmyra Atoll"
        defaultMessage="Palmyra Atoll"
      />,
    },
    {
      value: 'Panama',
      label: <FormattedMessage
        id="country.Panama"
        description="Country options: Panama"
        defaultMessage="Panama"
      />,
    },
    {
      value: 'Papua New Guinea',
      label: <FormattedMessage
        id="country.Papua New Guinea"
        description="Country options: Papua New Guinea"
        defaultMessage="Papua New Guinea"
      />,
    },
    {
      value: 'Paracel Islands',
      label: <FormattedMessage
        id="country.Paracel Islands"
        description="Country options: Paracel Islands"
        defaultMessage="Paracel Islands"
      />,
    },
    {
      value: 'Paraguay',
      label: <FormattedMessage
        id="country.Paraguay"
        description="Country options: Paraguay"
        defaultMessage="Paraguay"
      />,
    },
    {
      value: 'Peru',
      label: <FormattedMessage
        id="country.Peru"
        description="Country options: Peru"
        defaultMessage="Peru"
      />,
    },
    {
      value: 'Philippines',
      label: <FormattedMessage
        id="country.Philippines"
        description="Country options: Philippines"
        defaultMessage="Philippines"
      />,
    },
    {
      value: 'Pitcairn Islands',
      label: <FormattedMessage
        id="country.Pitcairn Islands"
        description="Country options: Pitcairn Islands"
        defaultMessage="Pitcairn Islands"
      />,
    },
    {
      value: 'Poland',
      label: <FormattedMessage
        id="country.Poland"
        description="Country options: Poland"
        defaultMessage="Poland"
      />,
    },
    {
      value: 'Portugal',
      label: <FormattedMessage
        id="country.Portugal"
        description="Country options: Portugal"
        defaultMessage="Portugal"
      />,
    },
    {
      value: 'Puerto Rico',
      label: <FormattedMessage
        id="country.Puerto Rico"
        description="Country options: Puerto Rico"
        defaultMessage="Puerto Rico"
      />,
    },
    {
      value: 'Qatar',
      label: <FormattedMessage
        id="country.Qatar"
        description="Country options: Qatar"
        defaultMessage="Qatar"
      />,
    },
    {
      value: 'Reunion',
      label: <FormattedMessage
        id="country.Reunion"
        description="Country options: Reunion"
        defaultMessage="Reunion"
      />,
    },
    {
      value: 'Romania',
      label: <FormattedMessage
        id="country.Romania"
        description="Country options: Romania"
        defaultMessage="Romania"
      />,
    },
    {
      value: 'Russia',
      label: <FormattedMessage
        id="country.Russia"
        description="Country options: Russia"
        defaultMessage="Russia"
      />,
    },
    {
      value: 'Rwanda',
      label: <FormattedMessage
        id="country.Rwanda"
        description="Country options: Rwanda"
        defaultMessage="Rwanda"
      />,
    },
    {
      value: 'Saint Barthelemy',
      label: <FormattedMessage
        id="country.Saint Barthelemy"
        description="Country options: Saint Barthelemy"
        defaultMessage="Saint Barthelemy"
      />,
    },
    {
      value: 'Saint Helena',
      label: <FormattedMessage
        id="country.Saint Helena"
        description="Country options: Saint Helena"
        defaultMessage="Saint Helena"
      />,
    },
    {
      value: 'Saint Kitts and Nevis',
      label: <FormattedMessage
        id="country.Saint Kitts and Nevis"
        description="Country options: Saint Kitts and Nevis"
        defaultMessage="Saint Kitts and Nevis"
      />,
    },
    {
      value: 'Saint Lucia',
      label: <FormattedMessage
        id="country.Saint Lucia"
        description="Country options: Saint Lucia"
        defaultMessage="Saint Lucia"
      />,
    },
    {
      value: 'Saint Martin',
      label: <FormattedMessage
        id="country.Saint Martin"
        description="Country options: Saint Martin"
        defaultMessage="Saint Martin"
      />,
    },
    {
      value: 'Saint Pierre and Miquelon',
      label: <FormattedMessage
        id="country.Saint Pierre and Miquelon"
        description="Country options: Saint Pierre and Miquelon"
        defaultMessage="Saint Pierre and Miquelon"
      />,
    },
    {
      value: 'Saint Vincent and the Grenadines',
      label: <FormattedMessage
        id="country.Saint Vincent and the Grenadines"
        description="Country options: Saint Vincent and the Grenadines"
        defaultMessage="Saint Vincent and the Grenadines"
      />,
    },
    {
      value: 'Samoa',
      label: <FormattedMessage
        id="country.Samoa"
        description="Country options: Samoa"
        defaultMessage="Samoa"
      />,
    },
    {
      value: 'San Marino',
      label: <FormattedMessage
        id="country.San Marino"
        description="Country options: San Marino"
        defaultMessage="San Marino"
      />,
    },
    {
      value: 'Sao Tome and Principe',
      label: <FormattedMessage
        id="country.Sao Tome and Principe"
        description="Country options: Sao Tome and Principe"
        defaultMessage="Sao Tome and Principe"
      />,
    },
    {
      value: 'Saudi Arabia',
      label: <FormattedMessage
        id="country.Saudi Arabia"
        description="Country options: Saudi Arabia"
        defaultMessage="Saudi Arabia"
      />,
    },
    {
      value: 'Senegal',
      label: <FormattedMessage
        id="country.Senegal"
        description="Country options: Senegal"
        defaultMessage="Senegal"
      />,
    },
    {
      value: 'Serbia',
      label: <FormattedMessage
        id="country.Serbia"
        description="Country options: Serbia"
        defaultMessage="Serbia"
      />,
    },
    {
      value: 'Seychelles',
      label: <FormattedMessage
        id="country.Seychelles"
        description="Country options: Seychelles"
        defaultMessage="Seychelles"
      />,
    },
    {
      value: 'Sierra Leone',
      label: <FormattedMessage
        id="country.Sierra Leone"
        description="Country options: Sierra Leone"
        defaultMessage="Sierra Leone"
      />,
    },
    {
      value: 'Singapore',
      label: <FormattedMessage
        id="country.Singapore"
        description="Country options: Singapore"
        defaultMessage="Singapore"
      />,
    },
    {
      value: 'Sint Maarten',
      label: <FormattedMessage
        id="country.Sint Maarten"
        description="Country options: Sint Maarten"
        defaultMessage="Sint Maarten"
      />,
    },
    {
      value: 'Slovakia',
      label: <FormattedMessage
        id="country.Slovakia"
        description="Country options: Slovakia"
        defaultMessage="Slovakia"
      />,
    },
    {
      value: 'Slovenia',
      label: <FormattedMessage
        id="country.Slovenia"
        description="Country options: Slovenia"
        defaultMessage="Slovenia"
      />,
    },
    {
      value: 'Solomon Islands',
      label: <FormattedMessage
        id="country.Solomon Islands"
        description="Country options: Solomon Islands"
        defaultMessage="Solomon Islands"
      />,
    },
    {
      value: 'Somalia',
      label: <FormattedMessage
        id="country.Somalia"
        description="Country options: Somalia"
        defaultMessage="Somalia"
      />,
    },
    {
      value: 'South Africa',
      label: <FormattedMessage
        id="country.South Africa"
        description="Country options: South Africa"
        defaultMessage="South Africa"
      />,
    },
    {
      value: 'South Georgia and the South Sandwich Islands',
      label: <FormattedMessage
        id="country.South Georgia and the South Sandwich Islands"
        description="Country options: South Georgia and the South Sandwich Islands"
        defaultMessage="South Georgia and the South Sandwich Islands"
      />,
    },
    {
      value: 'South Sudan',
      label: <FormattedMessage
        id="country.South Sudan"
        description="Country options: South Sudan"
        defaultMessage="South Sudan"
      />,
    },
    {
      value: 'Spain',
      label: <FormattedMessage
        id="country.Spain"
        description="Country options: Spain"
        defaultMessage="Spain"
      />,
    },
    {
      value: 'Spratly Islands',
      label: <FormattedMessage
        id="country.Spratly Islands"
        description="Country options: Spratly Islands"
        defaultMessage="Spratly Islands"
      />,
    },
    {
      value: 'Sri Lanka',
      label: <FormattedMessage
        id="country.Sri Lanka"
        description="Country options: Sri Lanka"
        defaultMessage="Sri Lanka"
      />,
    },
    {
      value: 'Sudan',
      label: <FormattedMessage
        id="country.Sudan"
        description="Country options: Sudan"
        defaultMessage="Sudan"
      />,
    },
    {
      value: 'Suriname',
      label: <FormattedMessage
        id="country.Suriname"
        description="Country options: Suriname"
        defaultMessage="Suriname"
      />,
    },
    {
      value: 'Svalbard',
      label: <FormattedMessage
        id="country.Svalbard"
        description="Country options: Svalbard"
        defaultMessage="Svalbard"
      />,
    },
    {
      value: 'Swaziland',
      label: <FormattedMessage
        id="country.Swaziland"
        description="Country options: Swaziland"
        defaultMessage="Swaziland"
      />,
    },
    {
      value: 'Sweden',
      label: <FormattedMessage
        id="country.Sweden"
        description="Country options: Sweden"
        defaultMessage="Sweden"
      />,
    },
    {
      value: 'Switzerland',
      label: <FormattedMessage
        id="country.Switzerland"
        description="Country options: Switzerland"
        defaultMessage="Switzerland"
      />,
    },
    {
      value: 'Syria',
      label: <FormattedMessage
        id="country.Syria"
        description="Country options: Syria"
        defaultMessage="Syria"
      />,
    },
    {
      value: 'Tajikistan',
      label: <FormattedMessage
        id="country.Tajikistan"
        description="Country options: Tajikistan"
        defaultMessage="Tajikistan"
      />,
    },
    {
      value: 'Tanzania',
      label: <FormattedMessage
        id="country.Tanzania"
        description="Country options: Tanzania"
        defaultMessage="Tanzania"
      />,
    },
    {
      value: 'Thailand',
      label: <FormattedMessage
        id="country.Thailand"
        description="Country options: Thailand"
        defaultMessage="Thailand"
      />,
    },
    {
      value: 'Timor-Leste',
      label: <FormattedMessage
        id="country.Timor-Leste"
        description="Country options: Timor-Leste"
        defaultMessage="Timor-Leste"
      />,
    },
    {
      value: 'Togo',
      label: <FormattedMessage
        id="country.Togo"
        description="Country options: Togo"
        defaultMessage="Togo"
      />,
    },
    {
      value: 'Tokelau',
      label: <FormattedMessage
        id="country.Tokelau"
        description="Country options: Tokelau"
        defaultMessage="Tokelau"
      />,
    },
    {
      value: 'Tonga',
      label: <FormattedMessage
        id="country.Tonga"
        description="Country options: Tonga"
        defaultMessage="Tonga"
      />,
    },
    {
      value: 'Trinidad and Tobago',
      label: <FormattedMessage
        id="country.Trinidad and Tobago"
        description="Country options: Trinidad and Tobago"
        defaultMessage="Trinidad and Tobago"
      />,
    },
    {
      value: 'Tunisia',
      label: <FormattedMessage
        id="country.Tunisia"
        description="Country options: Tunisia"
        defaultMessage="Tunisia"
      />,
    },
    {
      value: 'Turkey',
      label: <FormattedMessage
        id="country.Turkey"
        description="Country options: Turkey"
        defaultMessage="Turkey"
      />,
    },
    {
      value: 'Turkmenistan',
      label: <FormattedMessage
        id="country.Turkmenistan"
        description="Country options: Turkmenistan"
        defaultMessage="Turkmenistan"
      />,
    },
    {
      value: 'Turks and Caicos Islands',
      label: <FormattedMessage
        id="country.Turks and Caicos Islands"
        description="Country options: Turks and Caicos Islands"
        defaultMessage="Turks and Caicos Islands"
      />,
    },
    {
      value: 'Tuvalu',
      label: <FormattedMessage
        id="country.Tuvalu"
        description="Country options: Tuvalu"
        defaultMessage="Tuvalu"
      />,
    },
    {
      value: 'Uganda',
      label: <FormattedMessage
        id="country.Uganda"
        description="Country options: Uganda"
        defaultMessage="Uganda"
      />,
    },
    {
      value: 'Ukraine',
      label: <FormattedMessage
        id="country.Ukraine"
        description="Country options: Ukraine"
        defaultMessage="Ukraine"
      />,
    },
    {
      value: 'United Arab Emirates',
      label: <FormattedMessage
        id="country.United Arab Emirates"
        description="Country options: United Arab Emirates"
        defaultMessage="United Arab Emirates"
      />,
    },
    {
      value: 'United Kingdom',
      label: <FormattedMessage
        id="country.United Kingdom"
        description="Country options: United Kingdom"
        defaultMessage="United Kingdom"
      />,
    },
    {
      value: 'United States',
      label: <FormattedMessage
        id="country.United States"
        description="Country options: United States"
        defaultMessage="United States"
      />,
    },
    {
      value: 'Uruguay',
      label: <FormattedMessage
        id="country.Uruguay"
        description="Country options: Uruguay"
        defaultMessage="Uruguay"
      />,
    },
    {
      value: 'Uzbekistan',
      label: <FormattedMessage
        id="country.Uzbekistan"
        description="Country options: Uzbekistan"
        defaultMessage="Uzbekistan"
      />,
    },
    {
      value: 'Vanuatu',
      label: <FormattedMessage
        id="country.Vanuatu"
        description="Country options: Vanuatu"
        defaultMessage="Vanuatu"
      />,
    },
    {
      value: 'Venezuela',
      label: <FormattedMessage
        id="country.Venezuela"
        description="Country options: Venezuela"
        defaultMessage="Venezuela"
      />,
    },
    {
      value: 'Vietnam',
      label: <FormattedMessage
        id="country.Vietnam"
        description="Country options: Vietnam"
        defaultMessage="Vietnam"
      />,
    },
    {
      value: 'Virgin Islands, British',
      label: <FormattedMessage
        id="country.Virgin Islands, British"
        description="Country options: Virgin Islands, British"
        defaultMessage="Virgin Islands, British"
      />,
    },
    {
      value: 'Virgin Islands, U.S.',
      label: <FormattedMessage
        id="country.Virgin Islands, U.S."
        description="Country options: Virgin Islands, U.S."
        defaultMessage="Virgin Islands, U.S."
      />,
    },
    {
      value: 'Wake Island',
      label: <FormattedMessage
        id="country.Wake Island"
        description="Country options: Wake Island"
        defaultMessage="Wake Island"
      />,
    },
    {
      value: 'Wallis and Futuna',
      label: <FormattedMessage
        id="country.Wallis and Futuna"
        description="Country options: Wallis and Futuna"
        defaultMessage="Wallis and Futuna"
      />,
    },
    {
      value: 'Western Sahara',
      label: <FormattedMessage
        id="country.Western Sahara"
        description="Country options: Western Sahara"
        defaultMessage="Western Sahara"
      />,
    },
    {
      value: 'Yemen',
      label: <FormattedMessage
        id="country.Yemen"
        description="Country options: Yemen"
        defaultMessage="Yemen"
      />,
    },
    {
      value: 'Zambia',
      label: <FormattedMessage
        id="country.Zambia"
        description="Country options: Zambia"
        defaultMessage="Zambia"
      />,
    },
    {
      value: 'Zimbabwe',
      label: <FormattedMessage
        id="country.Zimbabwe"
        description="Country options: Zimbabwe"
        defaultMessage="Zimbabwe"
      />,
    },
  ];

  // allCountries template
  const allCountriesTags = t.form.Form.templates.select.clone({
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

      const placeholder = <FormattedMessage
        id="forms.selectPlaceholder"
        description="Select widget placeholder"
        defaultMessage="Select..."
      />;

      return (
        <ReactSelect
          multi={multiValue}
          autoBlur
          options={AllCountries}
          value={locals.value}
          onChange={onChange}
          className="country-select-edit"
          placeholder={placeholder}
        />
      );
    },
  });

  // allCountries factory function
  class ReactSelectAllCountriesFactory extends t.form.Component {
    getTemplate() {
      return allCountriesTags;
    }
  }

  return ReactSelectAllCountriesFactory;
};
