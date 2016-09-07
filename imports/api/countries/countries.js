// Meteor
import { Mongo } from 'meteor/mongo';
import React from 'react';
import ReactSelect from 'react-select';
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
  const ExistingCountries = Countries.find().fetch();

  // Country template
  const existingCountriesTags = t.form.Form.templates.select.clone({
    renderSelect: (locals) => {
      function onChange(options) {
        const values = (options || []).map(({ value }) => value);
        locals.onChange(values);
      }
      return (
        <ReactSelect
          multi
          autoBlur
          options={ExistingCountries}
          value={locals.value}
          onChange={onChange}
          className="country-select-edit"
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

export const AllCountriesFactory = () => {
  // allCountries options
  const AllCountries = [
    { value: 'Afghanistan', label: 'Afghanistan' },
    { value: 'Akrotiri', label: 'Akrotiri' },
    { value: 'Albania', label: 'Albania' },
    { value: 'Algeria', label: 'Algeria' },
    { value: 'American Samoa', label: 'American Samoa' },
    { value: 'Andorra', label: 'Andorra' },
    { value: 'Angola', label: 'Angola' },
    { value: 'Anguilla', label: 'Anguilla' },
    { value: 'Antarctica', label: 'Antarctica' },
    { value: 'Antigua and Barbuda', label: 'Antigua and Barbuda' },
    { value: 'Argentina', label: 'Argentina' },
    { value: 'Armenia', label: 'Armenia' },
    { value: 'Aruba', label: 'Aruba' },
    { value: 'Ashmore and Cartier Islands', label: 'Ashmore and Cartier Islands' },
    { value: 'Australia', label: 'Australia' },
    { value: 'Austria', label: 'Austria' },
    { value: 'Azerbaijan', label: 'Azerbaijan' },
    { value: 'Bahamas, The', label: 'Bahamas, The' },
    { value: 'Bahrain', label: 'Bahrain' },
    { value: 'Baker Island', label: 'Baker Island' },
    { value: 'Bangladesh', label: 'Bangladesh' },
    { value: 'Barbados', label: 'Barbados' },
    { value: 'Belarus', label: 'Belarus' },
    { value: 'Belgium', label: 'Belgium' },
    { value: 'Belize', label: 'Belize' },
    { value: 'Benin', label: 'Benin' },
    { value: 'Bermuda', label: 'Bermuda' },
    { value: 'Bhutan', label: 'Bhutan' },
    { value: 'Bolivia', label: 'Bolivia' },
    { value: 'Bosnia and Herzegovina', label: 'Bosnia and Herzegovina' },
    { value: 'Botswana', label: 'Botswana' },
    { value: 'Bouvet Island', label: 'Bouvet Island' },
    { value: 'Brazil', label: 'Brazil' },
    { value: 'British Indian Ocean Territory', label: 'British Indian Ocean Territory' },
    { value: 'Brunei', label: 'Brunei' },
    { value: 'Bulgaria', label: 'Bulgaria' },
    { value: 'Burkina Faso', label: 'Burkina Faso' },
    { value: 'Burma', label: 'Burma' },
    { value: 'Burundi', label: 'Burundi' },
    { value: 'Cabo Verde', label: 'Cabo Verde' },
    { value: 'Cambodia', label: 'Cambodia' },
    { value: 'Cameroon', label: 'Cameroon' },
    { value: 'Canada', label: 'Canada' },
    { value: 'Cayman Islands', label: 'Cayman Islands' },
    { value: 'Central African Republic', label: 'Central African Republic' },
    { value: 'Chad', label: 'Chad' },
    { value: 'Chile', label: 'Chile' },
    { value: 'China', label: 'China' },
    { value: 'Christmas Island', label: 'Christmas Island' },
    { value: 'Clipperton Island', label: 'Clipperton Island' },
    { value: 'Cocos (Keeling) Islands', label: 'Cocos (Keeling) Islands' },
    { value: 'Colombia', label: 'Colombia' },
    { value: 'Comoros', label: 'Comoros' },
    { value: 'Congo (Brazzaville)', label: 'Congo (Brazzaville)' },
    { value: 'Congo (Kinshasa)', label: 'Congo (Kinshasa)' },
    { value: 'Cook Islands', label: 'Cook Islands' },
    { value: 'Coral Sea Islands', label: 'Coral Sea Islands' },
    { value: 'Costa Rica', label: 'Costa Rica' },
    { value: 'Côte d\'Ivoire', label: 'Côte d\'Ivoire' },
    { value: 'Croatia', label: 'Croatia' },
    { value: 'Cuba', label: 'Cuba' },
    { value: 'Curaçao', label: 'Curaçao' },
    { value: 'Cyprus', label: 'Cyprus' },
    { value: 'Czechia', label: 'Czechia' },
    { value: 'Denmark', label: 'Denmark' },
    { value: 'Dhekelia', label: 'Dhekelia' },
    { value: 'Djibouti', label: 'Djibouti' },
    { value: 'Dominica', label: 'Dominica' },
    { value: 'Dominican Republic', label: 'Dominican Republic' },
    { value: 'Ecuador', label: 'Ecuador' },
    { value: 'Egypt', label: 'Egypt' },
    { value: 'El Salvador', label: 'El Salvador' },
    { value: 'Equatorial Guinea', label: 'Equatorial Guinea' },
    { value: 'Eritrea', label: 'Eritrea' },
    { value: 'Estonia', label: 'Estonia' },
    { value: 'Ethiopia', label: 'Ethiopia' },
    { value: 'Falkland Islands (Islas Malvinas)', label: 'Falkland Islands (Islas Malvinas)' },
    { value: 'Faroe Islands', label: 'Faroe Islands' },
    { value: 'Fiji', label: 'Fiji' },
    { value: 'Finland', label: 'Finland' },
    { value: 'France', label: 'France' },
    { value: 'French Southern and Antarctic Lands', label: 'French Southern and Antarctic Lands' },
    { value: 'French Guiana', label: 'French Guiana' },
    { value: 'French Polynesia', label: 'French Polynesia' },
    { value: 'Gabon', label: 'Gabon' },
    { value: 'Gambia, The', label: 'Gambia, The' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Germany', label: 'Germany' },
    { value: 'Ghana', label: 'Ghana' },
    { value: 'Gibraltar', label: 'Gibraltar' },
    { value: 'Greece', label: 'Greece' },
    { value: 'Greenland', label: 'Greenland' },
    { value: 'Grenada', label: 'Grenada' },
    { value: 'Guadeloupe', label: 'Guadeloupe' },
    { value: 'Guam', label: 'Guam' },
    { value: 'Guatemala', label: 'Guatemala' },
    { value: 'Guernsey', label: 'Guernsey' },
    { value: 'Guinea', label: 'Guinea' },
    { value: 'Guinea-Bissau', label: 'Guinea-Bissau' },
    { value: 'Guyana', label: 'Guyana' },
    { value: 'Haiti', label: 'Haiti' },
    { value: 'Heard Island and McDonald Islands', label: 'Heard Island and McDonald Islands' },
    { value: 'Holy See', label: 'Holy See' },
    { value: 'Honduras', label: 'Honduras' },
    { value: 'Hong Kong', label: 'Hong Kong' },
    { value: 'Howland Island', label: 'Howland Island' },
    { value: 'Hungary', label: 'Hungary' },
    { value: 'Iceland', label: 'Iceland' },
    { value: 'India', label: 'India' },
    { value: 'Indonesia', label: 'Indonesia' },
    { value: 'Iran', label: 'Iran' },
    { value: 'Iraq', label: 'Iraq' },
    { value: 'Ireland', label: 'Ireland' },
    { value: 'Isle of Man', label: 'Isle of Man' },
    { value: 'Israel', label: 'Israel' },
    { value: 'Italy', label: 'Italy' },
    { value: 'Jamaica', label: 'Jamaica' },
    { value: 'Jan Mayen', label: 'Jan Mayen' },
    { value: 'Japan', label: 'Japan' },
    { value: 'Jarvis Island', label: 'Jarvis Island' },
    { value: 'Jersey', label: 'Jersey' },
    { value: 'Johnston Atoll', label: 'Johnston Atoll' },
    { value: 'Jordan', label: 'Jordan' },
    { value: 'Kazakhstan', label: 'Kazakhstan' },
    { value: 'Kenya', label: 'Kenya' },
    { value: 'Kingman Reef', label: 'Kingman Reef' },
    { value: 'Kiribati', label: 'Kiribati' },
    { value: 'Korea, North', label: 'Korea, North' },
    { value: 'Korea, South', label: 'Korea, South' },
    { value: 'Kosovo', label: 'Kosovo' },
    { value: 'Kuwait', label: 'Kuwait' },
    { value: 'Kyrgyzstan', label: 'Kyrgyzstan' },
    { value: 'Laos', label: 'Laos' },
    { value: 'Latvia', label: 'Latvia' },
    { value: 'Lebanon', label: 'Lebanon' },
    { value: 'Lesotho', label: 'Lesotho' },
    { value: 'Liberia', label: 'Liberia' },
    { value: 'Libya', label: 'Libya' },
    { value: 'Liechtenstein', label: 'Liechtenstein' },
    { value: 'Lithuania', label: 'Lithuania' },
    { value: 'Luxembourg', label: 'Luxembourg' },
    { value: 'Macau', label: 'Macau' },
    { value: 'Macedonia', label: 'Macedonia' },
    { value: 'Madagascar', label: 'Madagascar' },
    { value: 'Malawi', label: 'Malawi' },
    { value: 'Malaysia', label: 'Malaysia' },
    { value: 'Maldives', label: 'Maldives' },
    { value: 'Mali', label: 'Mali' },
    { value: 'Malta', label: 'Malta' },
    { value: 'Marshall Islands', label: 'Marshall Islands' },
    { value: 'Martinique', label: 'Martinique' },
    { value: 'Mauritania', label: 'Mauritania' },
    { value: 'Mauritius', label: 'Mauritius' },
    { value: 'Mayotte', label: 'Mayotte' },
    { value: 'Mexico', label: 'Mexico' },
    { value: 'Micronesia, Federated States of', label: 'Micronesia, Federated States of' },
    { value: 'Midway Islands', label: 'Midway Islands' },
    { value: 'Moldova', label: 'Moldova' },
    { value: 'Monaco', label: 'Monaco' },
    { value: 'Mongolia', label: 'Mongolia' },
    { value: 'Montenegro', label: 'Montenegro' },
    { value: 'Montserrat', label: 'Montserrat' },
    { value: 'Morocco', label: 'Morocco' },
    { value: 'Mozambique', label: 'Mozambique' },
    { value: 'Namibia', label: 'Namibia' },
    { value: 'Nauru', label: 'Nauru' },
    { value: 'Navassa Island', label: 'Navassa Island' },
    { value: 'Nepal', label: 'Nepal' },
    { value: 'Netherlands', label: 'Netherlands' },
    { value: 'New Caledonia', label: 'New Caledonia' },
    { value: 'New Zealand', label: 'New Zealand' },
    { value: 'Nicaragua', label: 'Nicaragua' },
    { value: 'Niger', label: 'Niger' },
    { value: 'Nigeria', label: 'Nigeria' },
    { value: 'Niue', label: 'Niue' },
    { value: 'Norfolk Island', label: 'Norfolk Island' },
    { value: 'Northern Mariana Islands', label: 'Northern Mariana Islands' },
    { value: 'Norway', label: 'Norway' },
    { value: 'Oman', label: 'Oman' },
    { value: 'Pakistan', label: 'Pakistan' },
    { value: 'Palau', label: 'Palau' },
    { value: 'Palestine', label: 'Palestine' },
    { value: 'Palmyra Atoll', label: 'Palmyra Atoll' },
    { value: 'Panama', label: 'Panama' },
    { value: 'Papua New Guinea', label: 'Papua New Guinea' },
    { value: 'Paracel Islands', label: 'Paracel Islands' },
    { value: 'Paraguay', label: 'Paraguay' },
    { value: 'Peru', label: 'Peru' },
    { value: 'Philippines', label: 'Philippines' },
    { value: 'Pitcairn Islands', label: 'Pitcairn Islands' },
    { value: 'Poland', label: 'Poland' },
    { value: 'Portugal', label: 'Portugal' },
    { value: 'Puerto Rico', label: 'Puerto Rico' },
    { value: 'Qatar', label: 'Qatar' },
    { value: 'Reunion', label: 'Reunion' },
    { value: 'Romania', label: 'Romania' },
    { value: 'Russia', label: 'Russia' },
    { value: 'Rwanda', label: 'Rwanda' },
    { value: 'Saint Barthelemy', label: 'Saint Barthelemy' },
    { value: 'Saint Helena', label: 'Saint Helena' },
    { value: 'Saint Kitts and Nevis', label: 'Saint Kitts and Nevis' },
    { value: 'Saint Lucia', label: 'Saint Lucia' },
    { value: 'Saint Martin', label: 'Saint Martin' },
    { value: 'Saint Pierre and Miquelon', label: 'Saint Pierre and Miquelon' },
    { value: 'Saint Vincent and the Grenadines', label: 'Saint Vincent and the Grenadines' },
    { value: 'Samoa', label: 'Samoa' },
    { value: 'San Marino', label: 'San Marino' },
    { value: 'Sao Tome and Principe', label: 'Sao Tome and Principe' },
    { value: 'Saudi Arabia', label: 'Saudi Arabia' },
    { value: 'Senegal', label: 'Senegal' },
    { value: 'Serbia', label: 'Serbia' },
    { value: 'Seychelles', label: 'Seychelles' },
    { value: 'Sierra Leone', label: 'Sierra Leone' },
    { value: 'Singapore', label: 'Singapore' },
    { value: 'Sint Maarten', label: 'Sint Maarten' },
    { value: 'Slovakia', label: 'Slovakia' },
    { value: 'Slovenia', label: 'Slovenia' },
    { value: 'Solomon Islands', label: 'Solomon Islands' },
    { value: 'Somalia', label: 'Somalia' },
    { value: 'South Africa', label: 'South Africa' },
    { value: 'South Georgia and the South Sandwich Islands', label: 'South Georgia and the South Sandwich Islands' },
    { value: 'South Sudan', label: 'South Sudan' },
    { value: 'Spain', label: 'Spain' },
    { value: 'Spratly Islands', label: 'Spratly Islands' },
    { value: 'Sri Lanka', label: 'Sri Lanka' },
    { value: 'Sudan', label: 'Sudan' },
    { value: 'Suriname', label: 'Suriname' },
    { value: 'Svalbard', label: 'Svalbard' },
    { value: 'Swaziland', label: 'Swaziland' },
    { value: 'Sweden', label: 'Sweden' },
    { value: 'Switzerland', label: 'Switzerland' },
    { value: 'Syria', label: 'Syria' },
    { value: 'Tajikistan', label: 'Tajikistan' },
    { value: 'Tanzania', label: 'Tanzania' },
    { value: 'Thailand', label: 'Thailand' },
    { value: 'Timor-Leste', label: 'Timor-Leste' },
    { value: 'Togo', label: 'Togo' },
    { value: 'Tokelau', label: 'Tokelau' },
    { value: 'Tonga', label: 'Tonga' },
    { value: 'Trinidad and Tobago', label: 'Trinidad and Tobago' },
    { value: 'Tunisia', label: 'Tunisia' },
    { value: 'Turkey', label: 'Turkey' },
    { value: 'Turkmenistan', label: 'Turkmenistan' },
    { value: 'Turks and Caicos Islands', label: 'Turks and Caicos Islands' },
    { value: 'Tuvalu', label: 'Tuvalu' },
    { value: 'Uganda', label: 'Uganda' },
    { value: 'Ukraine', label: 'Ukraine' },
    { value: 'United Arab Emirates', label: 'United Arab Emirates' },
    { value: 'United Kingdom', label: 'United Kingdom' },
    { value: 'United States', label: 'United States' },
    { value: 'Uruguay', label: 'Uruguay' },
    { value: 'Uzbekistan', label: 'Uzbekistan' },
    { value: 'Vanuatu', label: 'Vanuatu' },
    { value: 'Venezuela', label: 'Venezuela' },
    { value: 'Vietnam', label: 'Vietnam' },
    { value: 'Virgin Islands, British', label: 'Virgin Islands, British' },
    { value: 'Virgin Islands, U.S.', label: 'Virgin Islands, U.S.' },
    { value: 'Wake Island', label: 'Wake Island' },
    { value: 'Wallis and Futuna', label: 'Wallis and Futuna' },
    { value: 'Western Sahara', label: 'Western Sahara' },
    { value: 'Yemen', label: 'Yemen' },
    { value: 'Zambia', label: 'Zambia' },
    { value: 'Zimbabwe', label: 'Zimbabwe' },
  ];

  // allCountries template
  const allCountriesTags = t.form.Form.templates.select.clone({
    renderSelect: (locals) => {
      function onChange(options) {
        if (options) {
          locals.onChange(options.value);
        } else {
          locals.onChange(null);
        }
      }
      return (
        <ReactSelect
          autoBlur
          options={AllCountries}
          value={locals.value}
          onChange={onChange}
          className="profile-organization-types-edit"
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
