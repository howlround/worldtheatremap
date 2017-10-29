import { Meteor } from 'meteor/meteor';
import fs from 'fs';
import { _ } from 'meteor/underscore';
import { defineMessages } from 'react-intl';
import { TAPi18n } from 'meteor/tap:i18n';
import { Countries } from '../../api/countries/countries.js';

const messages = defineMessages({
  'country.Afghanistan': {
    id: 'country.Afghanistan',
    defaultMessage: 'Afghanistan',
  },
  'country.Akrotiri': {
    id: 'country.Akrotiri',
    defaultMessage: 'Akrotiri',
  },
  'country.Albania': {
    id: 'country.Albania',
    defaultMessage: 'Albania',
  },
  'country.Algeria': {
    id: 'country.Algeria',
    defaultMessage: 'Algeria',
  },
  'country.American Samoa': {
    id: 'country.American Samoa',
    defaultMessage: 'American Samoa',
  },
  'country.Andorra': {
    id: 'country.Andorra',
    defaultMessage: 'Andorra',
  },
  'country.Angola': {
    id: 'country.Angola',
    defaultMessage: 'Angola',
  },
  'country.Anguilla': {
    id: 'country.Anguilla',
    defaultMessage: 'Anguilla',
  },
  'country.Antarctica': {
    id: 'country.Antarctica',
    defaultMessage: 'Antarctica',
  },
  'country.Antigua and Barbuda': {
    id: 'country.Antigua and Barbuda',
    defaultMessage: 'Antigua and Barbuda',
  },
  'country.Argentina': {
    id: 'country.Argentina',
    defaultMessage: 'Argentina',
  },
  'country.Armenia': {
    id: 'country.Armenia',
    defaultMessage: 'Armenia',
  },
  'country.Aruba': {
    id: 'country.Aruba',
    defaultMessage: 'Aruba',
  },
  'country.Ashmore and Cartier Islands': {
    id: 'country.Ashmore and Cartier Islands',
    defaultMessage: 'Ashmore and Cartier Islands',
  },
  'country.Australia': {
    id: 'country.Australia',
    defaultMessage: 'Australia',
  },
  'country.Austria': {
    id: 'country.Austria',
    defaultMessage: 'Austria',
  },
  'country.Azerbaijan': {
    id: 'country.Azerbaijan',
    defaultMessage: 'Azerbaijan',
  },
  'country.Bahamas, The': {
    id: 'country.Bahamas, The',
    defaultMessage: 'Bahamas, The',
  },
  'country.Bahrain': {
    id: 'country.Bahrain',
    defaultMessage: 'Bahrain',
  },
  'country.Baker Island': {
    id: 'country.Baker Island',
    defaultMessage: 'Baker Island',
  },
  'country.Bangladesh': {
    id: 'country.Bangladesh',
    defaultMessage: 'Bangladesh',
  },
  'country.Barbados': {
    id: 'country.Barbados',
    defaultMessage: 'Barbados',
  },
  'country.Belarus': {
    id: 'country.Belarus',
    defaultMessage: 'Belarus',
  },
  'country.Belgium': {
    id: 'country.Belgium',
    defaultMessage: 'Belgium',
  },
  'country.Belize': {
    id: 'country.Belize',
    defaultMessage: 'Belize',
  },
  'country.Benin': {
    id: 'country.Benin',
    defaultMessage: 'Benin',
  },
  'country.Bermuda': {
    id: 'country.Bermuda',
    defaultMessage: 'Bermuda',
  },
  'country.Bhutan': {
    id: 'country.Bhutan',
    defaultMessage: 'Bhutan',
  },
  'country.Bolivia': {
    id: 'country.Bolivia',
    defaultMessage: 'Bolivia',
  },
  'country.Bosnia and Herzegovina': {
    id: 'country.Bosnia and Herzegovina',
    defaultMessage: 'Bosnia and Herzegovina',
  },
  'country.Botswana': {
    id: 'country.Botswana',
    defaultMessage: 'Botswana',
  },
  'country.Bouvet Island': {
    id: 'country.Bouvet Island',
    defaultMessage: 'Bouvet Island',
  },
  'country.Brazil': {
    id: 'country.Brazil',
    defaultMessage: 'Brazil',
  },
  'country.British Indian Ocean Territory': {
    id: 'country.British Indian Ocean Territory',
    defaultMessage: 'British Indian Ocean Territory',
  },
  'country.Brunei': {
    id: 'country.Brunei',
    defaultMessage: 'Brunei',
  },
  'country.Bulgaria': {
    id: 'country.Bulgaria',
    defaultMessage: 'Bulgaria',
  },
  'country.Burkina Faso': {
    id: 'country.Burkina Faso',
    defaultMessage: 'Burkina Faso',
  },
  'country.Myanmar (Burma)': {
    id: 'country.Myanmar (Burma)',
    defaultMessage: 'Myanmar (Burma)',
  },
  'country.Burundi': {
    id: 'country.Burundi',
    defaultMessage: 'Burundi',
  },
  'country.Cabo Verde': {
    id: 'country.Cabo Verde',
    defaultMessage: 'Cabo Verde',
  },
  'country.Cambodia': {
    id: 'country.Cambodia',
    defaultMessage: 'Cambodia',
  },
  'country.Cameroon': {
    id: 'country.Cameroon',
    defaultMessage: 'Cameroon',
  },
  'country.Canada': {
    id: 'country.Canada',
    defaultMessage: 'Canada',
  },
  'country.Cayman Islands': {
    id: 'country.Cayman Islands',
    defaultMessage: 'Cayman Islands',
  },
  'country.Central African Republic': {
    id: 'country.Central African Republic',
    defaultMessage: 'Central African Republic',
  },
  'country.Chad': {
    id: 'country.Chad',
    defaultMessage: 'Chad',
  },
  'country.Chile': {
    id: 'country.Chile',
    defaultMessage: 'Chile',
  },
  'country.China': {
    id: 'country.China',
    defaultMessage: 'China',
  },
  'country.Christmas Island': {
    id: 'country.Christmas Island',
    defaultMessage: 'Christmas Island',
  },
  'country.Clipperton Island': {
    id: 'country.Clipperton Island',
    defaultMessage: 'Clipperton Island',
  },
  'country.Cocos (Keeling) Islands': {
    id: 'country.Cocos (Keeling) Islands',
    defaultMessage: 'Cocos (Keeling) Islands',
  },
  'country.Colombia': {
    id: 'country.Colombia',
    defaultMessage: 'Colombia',
  },
  'country.Comoros': {
    id: 'country.Comoros',
    defaultMessage: 'Comoros',
  },
  'country.Congo (Brazzaville)': {
    id: 'country.Congo (Brazzaville)',
    defaultMessage: 'Congo (Brazzaville)',
  },
  'country.Congo (Kinshasa)': {
    id: 'country.Congo (Kinshasa)',
    defaultMessage: 'Congo (Kinshasa)',
  },
  'country.Cook Islands': {
    id: 'country.Cook Islands',
    defaultMessage: 'Cook Islands',
  },
  'country.Coral Sea Islands': {
    id: 'country.Coral Sea Islands',
    defaultMessage: 'Coral Sea Islands',
  },
  'country.Costa Rica': {
    id: 'country.Costa Rica',
    defaultMessage: 'Costa Rica',
  },
  'country.Côte d\'Ivoire': {
    id: 'country.Côte d\'Ivoire',
    defaultMessage: 'Côte d\'Ivoire',
  },
  'country.Croatia': {
    id: 'country.Croatia',
    defaultMessage: 'Croatia',
  },
  'country.Cuba': {
    id: 'country.Cuba',
    defaultMessage: 'Cuba',
  },
  'country.Curaçao': {
    id: 'country.Curaçao',
    defaultMessage: 'Curaçao',
  },
  'country.Cyprus': {
    id: 'country.Cyprus',
    defaultMessage: 'Cyprus',
  },
  'country.Czechia': {
    id: 'country.Czechia',
    defaultMessage: 'Czechia',
  },
  'country.Denmark': {
    id: 'country.Denmark',
    defaultMessage: 'Denmark',
  },
  'country.Dhekelia': {
    id: 'country.Dhekelia',
    defaultMessage: 'Dhekelia',
  },
  'country.Djibouti': {
    id: 'country.Djibouti',
    defaultMessage: 'Djibouti',
  },
  'country.Dominica': {
    id: 'country.Dominica',
    defaultMessage: 'Dominica',
  },
  'country.Dominican Republic': {
    id: 'country.Dominican Republic',
    defaultMessage: 'Dominican Republic',
  },
  'country.Ecuador': {
    id: 'country.Ecuador',
    defaultMessage: 'Ecuador',
  },
  'country.Egypt': {
    id: 'country.Egypt',
    defaultMessage: 'Egypt',
  },
  'country.El Salvador': {
    id: 'country.El Salvador',
    defaultMessage: 'El Salvador',
  },
  'country.Equatorial Guinea': {
    id: 'country.Equatorial Guinea',
    defaultMessage: 'Equatorial Guinea',
  },
  'country.Eritrea': {
    id: 'country.Eritrea',
    defaultMessage: 'Eritrea',
  },
  'country.Estonia': {
    id: 'country.Estonia',
    defaultMessage: 'Estonia',
  },
  'country.Ethiopia': {
    id: 'country.Ethiopia',
    defaultMessage: 'Ethiopia',
  },
  'country.Falkland Islands (Islas Malvinas)': {
    id: 'country.Falkland Islands (Islas Malvinas)',
    defaultMessage: 'Falkland Islands (Islas Malvinas)',
  },
  'country.Faroe Islands': {
    id: 'country.Faroe Islands',
    defaultMessage: 'Faroe Islands',
  },
  'country.Fiji': {
    id: 'country.Fiji',
    defaultMessage: 'Fiji',
  },
  'country.Finland': {
    id: 'country.Finland',
    defaultMessage: 'Finland',
  },
  'country.France': {
    id: 'country.France',
    defaultMessage: 'France',
  },
  'country.French Southern and Antarctic Lands': {
    id: 'country.French Southern and Antarctic Lands',
    defaultMessage: 'French Southern and Antarctic Lands',
  },
  'country.French Guiana': {
    id: 'country.French Guiana',
    defaultMessage: 'French Guiana',
  },
  'country.French Polynesia': {
    id: 'country.French Polynesia',
    defaultMessage: 'French Polynesia',
  },
  'country.Gabon': {
    id: 'country.Gabon',
    defaultMessage: 'Gabon',
  },
  'country.Gambia, The': {
    id: 'country.Gambia, The',
    defaultMessage: 'Gambia, The',
  },
  'country.Georgia': {
    id: 'country.Georgia',
    defaultMessage: 'Georgia',
  },
  'country.Germany': {
    id: 'country.Germany',
    defaultMessage: 'Germany',
  },
  'country.Ghana': {
    id: 'country.Ghana',
    defaultMessage: 'Ghana',
  },
  'country.Gibraltar': {
    id: 'country.Gibraltar',
    defaultMessage: 'Gibraltar',
  },
  'country.Greece': {
    id: 'country.Greece',
    defaultMessage: 'Greece',
  },
  'country.Greenland': {
    id: 'country.Greenland',
    defaultMessage: 'Greenland',
  },
  'country.Grenada': {
    id: 'country.Grenada',
    defaultMessage: 'Grenada',
  },
  'country.Guadeloupe': {
    id: 'country.Guadeloupe',
    defaultMessage: 'Guadeloupe',
  },
  'country.Guam': {
    id: 'country.Guam',
    defaultMessage: 'Guam',
  },
  'country.Guatemala': {
    id: 'country.Guatemala',
    defaultMessage: 'Guatemala',
  },
  'country.Guernsey': {
    id: 'country.Guernsey',
    defaultMessage: 'Guernsey',
  },
  'country.Guinea': {
    id: 'country.Guinea',
    defaultMessage: 'Guinea',
  },
  'country.Guinea-Bissau': {
    id: 'country.Guinea-Bissau',
    defaultMessage: 'Guinea-Bissau',
  },
  'country.Guyana': {
    id: 'country.Guyana',
    defaultMessage: 'Guyana',
  },
  'country.Haiti': {
    id: 'country.Haiti',
    defaultMessage: 'Haiti',
  },
  'country.Heard Island and McDonald Islands': {
    id: 'country.Heard Island and McDonald Islands',
    defaultMessage: 'Heard Island and McDonald Islands',
  },
  'country.Holy See': {
    id: 'country.Holy See',
    defaultMessage: 'Holy See',
  },
  'country.Honduras': {
    id: 'country.Honduras',
    defaultMessage: 'Honduras',
  },
  'country.Hong Kong': {
    id: 'country.Hong Kong',
    defaultMessage: 'Hong Kong',
  },
  'country.Howland Island': {
    id: 'country.Howland Island',
    defaultMessage: 'Howland Island',
  },
  'country.Hungary': {
    id: 'country.Hungary',
    defaultMessage: 'Hungary',
  },
  'country.Iceland': {
    id: 'country.Iceland',
    defaultMessage: 'Iceland',
  },
  'country.India': {
    id: 'country.India',
    defaultMessage: 'India',
  },
  'country.Indonesia': {
    id: 'country.Indonesia',
    defaultMessage: 'Indonesia',
  },
  'country.Iran': {
    id: 'country.Iran',
    defaultMessage: 'Iran',
  },
  'country.Iraq': {
    id: 'country.Iraq',
    defaultMessage: 'Iraq',
  },
  'country.Ireland': {
    id: 'country.Ireland',
    defaultMessage: 'Ireland',
  },
  'country.Isle of Man': {
    id: 'country.Isle of Man',
    defaultMessage: 'Isle of Man',
  },
  'country.Israel': {
    id: 'country.Israel',
    defaultMessage: 'Israel',
  },
  'country.Italy': {
    id: 'country.Italy',
    defaultMessage: 'Italy',
  },
  'country.Jamaica': {
    id: 'country.Jamaica',
    defaultMessage: 'Jamaica',
  },
  'country.Jan Mayen': {
    id: 'country.Jan Mayen',
    defaultMessage: 'Jan Mayen',
  },
  'country.Japan': {
    id: 'country.Japan',
    defaultMessage: 'Japan',
  },
  'country.Jarvis Island': {
    id: 'country.Jarvis Island',
    defaultMessage: 'Jarvis Island',
  },
  'country.Jersey': {
    id: 'country.Jersey',
    defaultMessage: 'Jersey',
  },
  'country.Johnston Atoll': {
    id: 'country.Johnston Atoll',
    defaultMessage: 'Johnston Atoll',
  },
  'country.Jordan': {
    id: 'country.Jordan',
    defaultMessage: 'Jordan',
  },
  'country.Kazakhstan': {
    id: 'country.Kazakhstan',
    defaultMessage: 'Kazakhstan',
  },
  'country.Kenya': {
    id: 'country.Kenya',
    defaultMessage: 'Kenya',
  },
  'country.Kingman Reef': {
    id: 'country.Kingman Reef',
    defaultMessage: 'Kingman Reef',
  },
  'country.Kiribati': {
    id: 'country.Kiribati',
    defaultMessage: 'Kiribati',
  },
  'country.North Korea': {
    id: 'country.North Korea',
    defaultMessage: 'North Korea',
  },
  'country.South Korea': {
    id: 'country.South Korea',
    defaultMessage: 'South Korea',
  },
  'country.Kosovo': {
    id: 'country.Kosovo',
    defaultMessage: 'Kosovo',
  },
  'country.Kuwait': {
    id: 'country.Kuwait',
    defaultMessage: 'Kuwait',
  },
  'country.Kyrgyzstan': {
    id: 'country.Kyrgyzstan',
    defaultMessage: 'Kyrgyzstan',
  },
  'country.Laos': {
    id: 'country.Laos',
    defaultMessage: 'Laos',
  },
  'country.Latvia': {
    id: 'country.Latvia',
    defaultMessage: 'Latvia',
  },
  'country.Lebanon': {
    id: 'country.Lebanon',
    defaultMessage: 'Lebanon',
  },
  'country.Lesotho': {
    id: 'country.Lesotho',
    defaultMessage: 'Lesotho',
  },
  'country.Liberia': {
    id: 'country.Liberia',
    defaultMessage: 'Liberia',
  },
  'country.Libya': {
    id: 'country.Libya',
    defaultMessage: 'Libya',
  },
  'country.Liechtenstein': {
    id: 'country.Liechtenstein',
    defaultMessage: 'Liechtenstein',
  },
  'country.Lithuania': {
    id: 'country.Lithuania',
    defaultMessage: 'Lithuania',
  },
  'country.Luxembourg': {
    id: 'country.Luxembourg',
    defaultMessage: 'Luxembourg',
  },
  'country.Macau': {
    id: 'country.Macau',
    defaultMessage: 'Macau',
  },
  'country.Macedonia': {
    id: 'country.Macedonia',
    defaultMessage: 'Macedonia',
  },
  'country.Madagascar': {
    id: 'country.Madagascar',
    defaultMessage: 'Madagascar',
  },
  'country.Malawi': {
    id: 'country.Malawi',
    defaultMessage: 'Malawi',
  },
  'country.Malaysia': {
    id: 'country.Malaysia',
    defaultMessage: 'Malaysia',
  },
  'country.Maldives': {
    id: 'country.Maldives',
    defaultMessage: 'Maldives',
  },
  'country.Mali': {
    id: 'country.Mali',
    defaultMessage: 'Mali',
  },
  'country.Malta': {
    id: 'country.Malta',
    defaultMessage: 'Malta',
  },
  'country.Marshall Islands': {
    id: 'country.Marshall Islands',
    defaultMessage: 'Marshall Islands',
  },
  'country.Martinique': {
    id: 'country.Martinique',
    defaultMessage: 'Martinique',
  },
  'country.Mauritania': {
    id: 'country.Mauritania',
    defaultMessage: 'Mauritania',
  },
  'country.Mauritius': {
    id: 'country.Mauritius',
    defaultMessage: 'Mauritius',
  },
  'country.Mayotte': {
    id: 'country.Mayotte',
    defaultMessage: 'Mayotte',
  },
  'country.Mexico': {
    id: 'country.Mexico',
    defaultMessage: 'Mexico',
  },
  'country.Micronesia, Federated States of': {
    id: 'country.Micronesia, Federated States of',
    defaultMessage: 'Micronesia, Federated States of',
  },
  'country.Midway Islands': {
    id: 'country.Midway Islands',
    defaultMessage: 'Midway Islands',
  },
  'country.Moldova': {
    id: 'country.Moldova',
    defaultMessage: 'Moldova',
  },
  'country.Monaco': {
    id: 'country.Monaco',
    defaultMessage: 'Monaco',
  },
  'country.Mongolia': {
    id: 'country.Mongolia',
    defaultMessage: 'Mongolia',
  },
  'country.Montenegro': {
    id: 'country.Montenegro',
    defaultMessage: 'Montenegro',
  },
  'country.Montserrat': {
    id: 'country.Montserrat',
    defaultMessage: 'Montserrat',
  },
  'country.Morocco': {
    id: 'country.Morocco',
    defaultMessage: 'Morocco',
  },
  'country.Mozambique': {
    id: 'country.Mozambique',
    defaultMessage: 'Mozambique',
  },
  'country.Namibia': {
    id: 'country.Namibia',
    defaultMessage: 'Namibia',
  },
  'country.Nauru': {
    id: 'country.Nauru',
    defaultMessage: 'Nauru',
  },
  'country.Navassa Island': {
    id: 'country.Navassa Island',
    defaultMessage: 'Navassa Island',
  },
  'country.Nepal': {
    id: 'country.Nepal',
    defaultMessage: 'Nepal',
  },
  'country.Netherlands': {
    id: 'country.Netherlands',
    defaultMessage: 'Netherlands',
  },
  'country.New Caledonia': {
    id: 'country.New Caledonia',
    defaultMessage: 'New Caledonia',
  },
  'country.New Zealand': {
    id: 'country.New Zealand',
    defaultMessage: 'New Zealand',
  },
  'country.Nicaragua': {
    id: 'country.Nicaragua',
    defaultMessage: 'Nicaragua',
  },
  'country.Niger': {
    id: 'country.Niger',
    defaultMessage: 'Niger',
  },
  'country.Nigeria': {
    id: 'country.Nigeria',
    defaultMessage: 'Nigeria',
  },
  'country.Niue': {
    id: 'country.Niue',
    defaultMessage: 'Niue',
  },
  'country.Norfolk Island': {
    id: 'country.Norfolk Island',
    defaultMessage: 'Norfolk Island',
  },
  'country.Northern Mariana Islands': {
    id: 'country.Northern Mariana Islands',
    defaultMessage: 'Northern Mariana Islands',
  },
  'country.Norway': {
    id: 'country.Norway',
    defaultMessage: 'Norway',
  },
  'country.Oman': {
    id: 'country.Oman',
    defaultMessage: 'Oman',
  },
  'country.Pakistan': {
    id: 'country.Pakistan',
    defaultMessage: 'Pakistan',
  },
  'country.Palau': {
    id: 'country.Palau',
    defaultMessage: 'Palau',
  },
  'country.Palestine': {
    id: 'country.Palestine',
    defaultMessage: 'Palestine',
  },
  'country.Palmyra Atoll': {
    id: 'country.Palmyra Atoll',
    defaultMessage: 'Palmyra Atoll',
  },
  'country.Panama': {
    id: 'country.Panama',
    defaultMessage: 'Panama',
  },
  'country.Papua New Guinea': {
    id: 'country.Papua New Guinea',
    defaultMessage: 'Papua New Guinea',
  },
  'country.Paracel Islands': {
    id: 'country.Paracel Islands',
    defaultMessage: 'Paracel Islands',
  },
  'country.Paraguay': {
    id: 'country.Paraguay',
    defaultMessage: 'Paraguay',
  },
  'country.Peru': {
    id: 'country.Peru',
    defaultMessage: 'Peru',
  },
  'country.Philippines': {
    id: 'country.Philippines',
    defaultMessage: 'Philippines',
  },
  'country.Pitcairn Islands': {
    id: 'country.Pitcairn Islands',
    defaultMessage: 'Pitcairn Islands',
  },
  'country.Poland': {
    id: 'country.Poland',
    defaultMessage: 'Poland',
  },
  'country.Portugal': {
    id: 'country.Portugal',
    defaultMessage: 'Portugal',
  },
  'country.Puerto Rico': {
    id: 'country.Puerto Rico',
    defaultMessage: 'Puerto Rico',
  },
  'country.Qatar': {
    id: 'country.Qatar',
    defaultMessage: 'Qatar',
  },
  'country.Reunion': {
    id: 'country.Reunion',
    defaultMessage: 'Reunion',
  },
  'country.Romania': {
    id: 'country.Romania',
    defaultMessage: 'Romania',
  },
  'country.Russia': {
    id: 'country.Russia',
    defaultMessage: 'Russia',
  },
  'country.Rwanda': {
    id: 'country.Rwanda',
    defaultMessage: 'Rwanda',
  },
  'country.Saint Barthelemy': {
    id: 'country.Saint Barthelemy',
    defaultMessage: 'Saint Barthelemy',
  },
  'country.Saint Helena': {
    id: 'country.Saint Helena',
    defaultMessage: 'Saint Helena',
  },
  'country.Saint Kitts and Nevis': {
    id: 'country.Saint Kitts and Nevis',
    defaultMessage: 'Saint Kitts and Nevis',
  },
  'country.Saint Lucia': {
    id: 'country.Saint Lucia',
    defaultMessage: 'Saint Lucia',
  },
  'country.Saint Martin': {
    id: 'country.Saint Martin',
    defaultMessage: 'Saint Martin',
  },
  'country.Saint Pierre and Miquelon': {
    id: 'country.Saint Pierre and Miquelon',
    defaultMessage: 'Saint Pierre and Miquelon',
  },
  'country.Saint Vincent and the Grenadines': {
    id: 'country.Saint Vincent and the Grenadines',
    defaultMessage: 'Saint Vincent and the Grenadines',
  },
  'country.Samoa': {
    id: 'country.Samoa',
    defaultMessage: 'Samoa',
  },
  'country.San Marino': {
    id: 'country.San Marino',
    defaultMessage: 'San Marino',
  },
  'country.Sao Tome and Principe': {
    id: 'country.Sao Tome and Principe',
    defaultMessage: 'Sao Tome and Principe',
  },
  'country.Saudi Arabia': {
    id: 'country.Saudi Arabia',
    defaultMessage: 'Saudi Arabia',
  },
  'country.Senegal': {
    id: 'country.Senegal',
    defaultMessage: 'Senegal',
  },
  'country.Serbia': {
    id: 'country.Serbia',
    defaultMessage: 'Serbia',
  },
  'country.Seychelles': {
    id: 'country.Seychelles',
    defaultMessage: 'Seychelles',
  },
  'country.Sierra Leone': {
    id: 'country.Sierra Leone',
    defaultMessage: 'Sierra Leone',
  },
  'country.Singapore': {
    id: 'country.Singapore',
    defaultMessage: 'Singapore',
  },
  'country.Sint Maarten': {
    id: 'country.Sint Maarten',
    defaultMessage: 'Sint Maarten',
  },
  'country.Slovakia': {
    id: 'country.Slovakia',
    defaultMessage: 'Slovakia',
  },
  'country.Slovenia': {
    id: 'country.Slovenia',
    defaultMessage: 'Slovenia',
  },
  'country.Solomon Islands': {
    id: 'country.Solomon Islands',
    defaultMessage: 'Solomon Islands',
  },
  'country.Somalia': {
    id: 'country.Somalia',
    defaultMessage: 'Somalia',
  },
  'country.South Africa': {
    id: 'country.South Africa',
    defaultMessage: 'South Africa',
  },
  'country.South Georgia and the South Sandwich Islands': {
    id: 'country.South Georgia and the South Sandwich Islands',
    defaultMessage: 'South Georgia and the South Sandwich Islands',
  },
  'country.South Sudan': {
    id: 'country.South Sudan',
    defaultMessage: 'South Sudan',
  },
  'country.Spain': {
    id: 'country.Spain',
    defaultMessage: 'Spain',
  },
  'country.Spratly Islands': {
    id: 'country.Spratly Islands',
    defaultMessage: 'Spratly Islands',
  },
  'country.Sri Lanka': {
    id: 'country.Sri Lanka',
    defaultMessage: 'Sri Lanka',
  },
  'country.Sudan': {
    id: 'country.Sudan',
    defaultMessage: 'Sudan',
  },
  'country.Suriname': {
    id: 'country.Suriname',
    defaultMessage: 'Suriname',
  },
  'country.Svalbard': {
    id: 'country.Svalbard',
    defaultMessage: 'Svalbard',
  },
  'country.Swaziland': {
    id: 'country.Swaziland',
    defaultMessage: 'Swaziland',
  },
  'country.Sweden': {
    id: 'country.Sweden',
    defaultMessage: 'Sweden',
  },
  'country.Switzerland': {
    id: 'country.Switzerland',
    defaultMessage: 'Switzerland',
  },
  'country.Syria': {
    id: 'country.Syria',
    defaultMessage: 'Syria',
  },
  'country.Taiwan': {
    id: 'country.Taiwan',
    defaultMessage: 'Taiwan',
  },
  'country.Tajikistan': {
    id: 'country.Tajikistan',
    defaultMessage: 'Tajikistan',
  },
  'country.Tanzania': {
    id: 'country.Tanzania',
    defaultMessage: 'Tanzania',
  },
  'country.Thailand': {
    id: 'country.Thailand',
    defaultMessage: 'Thailand',
  },
  'country.Timor-Leste': {
    id: 'country.Timor-Leste',
    defaultMessage: 'Timor-Leste',
  },
  'country.Togo': {
    id: 'country.Togo',
    defaultMessage: 'Togo',
  },
  'country.Tokelau': {
    id: 'country.Tokelau',
    defaultMessage: 'Tokelau',
  },
  'country.Tonga': {
    id: 'country.Tonga',
    defaultMessage: 'Tonga',
  },
  'country.Trinidad and Tobago': {
    id: 'country.Trinidad and Tobago',
    defaultMessage: 'Trinidad and Tobago',
  },
  'country.Tunisia': {
    id: 'country.Tunisia',
    defaultMessage: 'Tunisia',
  },
  'country.Turkey': {
    id: 'country.Turkey',
    defaultMessage: 'Turkey',
  },
  'country.Turkmenistan': {
    id: 'country.Turkmenistan',
    defaultMessage: 'Turkmenistan',
  },
  'country.Turks and Caicos Islands': {
    id: 'country.Turks and Caicos Islands',
    defaultMessage: 'Turks and Caicos Islands',
  },
  'country.Tuvalu': {
    id: 'country.Tuvalu',
    defaultMessage: 'Tuvalu',
  },
  'country.Uganda': {
    id: 'country.Uganda',
    defaultMessage: 'Uganda',
  },
  'country.Ukraine': {
    id: 'country.Ukraine',
    defaultMessage: 'Ukraine',
  },
  'country.United Arab Emirates': {
    id: 'country.United Arab Emirates',
    defaultMessage: 'United Arab Emirates',
  },
  'country.United Kingdom': {
    id: 'country.United Kingdom',
    defaultMessage: 'United Kingdom',
  },
  'country.United States': {
    id: 'country.United States',
    defaultMessage: 'United States',
  },
  'country.Uruguay': {
    id: 'country.Uruguay',
    defaultMessage: 'Uruguay',
  },
  'country.Uzbekistan': {
    id: 'country.Uzbekistan',
    defaultMessage: 'Uzbekistan',
  },
  'country.Vanuatu': {
    id: 'country.Vanuatu',
    defaultMessage: 'Vanuatu',
  },
  'country.Venezuela': {
    id: 'country.Venezuela',
    defaultMessage: 'Venezuela',
  },
  'country.Vietnam': {
    id: 'country.Vietnam',
    defaultMessage: 'Vietnam',
  },
  'country.Virgin Islands, British': {
    id: 'country.Virgin Islands, British',
    defaultMessage: 'Virgin Islands, British',
  },
  'country.Virgin Islands, U.S.': {
    id: 'country.Virgin Islands, U.S.',
    defaultMessage: 'Virgin Islands, U.S.',
  },
  'country.Wake Island': {
    id: 'country.Wake Island',
    defaultMessage: 'Wake Island',
  },
  'country.Wallis and Futuna': {
    id: 'country.Wallis and Futuna',
    defaultMessage: 'Wallis and Futuna',
  },
  'country.Western Sahara': {
    id: 'country.Western Sahara',
    defaultMessage: 'Western Sahara',
  },
  'country.Yemen': {
    id: 'country.Yemen',
    defaultMessage: 'Yemen',
  },
  'country.Zambia': {
    id: 'country.Zambia',
    defaultMessage: 'Zambia',
  },
  'country.Zimbabwe': {
    id: 'country.Zimbabwe',
    defaultMessage: 'Zimbabwe',
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

const allCountries = _.map(messages, country => (
  {
    value: country.defaultMessage,
    label: country.defaultMessage,
    i18n: {},
  }
));

// Populate each country translation
// Native forEach alters the interated object
allCountries.forEach(country => {
  const thisCountry = country;
  _.each(supportedLanguages, (name, locale) => {
    thisCountry.i18n[locale] = {
      label: translations[locale][`country.${thisCountry.value}`],
    };
  });
});

Meteor.startup(() => {
  /* eslint-disable no-console */
  console.log('Re-populating country options database...');
  allCountries.forEach(country => {
    Countries.upsert({ value: country.value }, { $set: country });
  });
});
