import { Meteor } from 'meteor/meteor';
import { Countries } from '../../api/countries/countries.js';

const AllCountries = [
  {
    value: 'Afghanistan',
    label: 'Afghanistan',
    i18n: {
      es: {
        label: 'Afganistán',
      },
    },
  },
  {
    value: 'Akrotiri',
    label: 'Akrotiri',
    i18n: {
      es: {
        label: 'Akrotiri',
      },
    },
  },
  {
    value: 'Albania',
    label: 'Albania',
    i18n: {
      es: {
        label: 'Albania',
      },
    },
  },
  {
    value: 'Algeria',
    label: 'Algeria',
    i18n: {
      es: {
        label: 'Algeria',
      },
    },
  },
  {
    value: 'American Samoa',
    label: 'American Samoa',
    i18n: {
      es: {
        label: 'Samoa Americana',
      },
    },
  },
  {
    value: 'Andorra',
    label: 'Andorra',
    i18n: {
      es: {
        label: 'Andorra',
      },
    },
  },
  {
    value: 'Angola',
    label: 'Angola',
    i18n: {
      es: {
        label: 'Angola',
      },
    },
  },
  {
    value: 'Anguilla',
    label: 'Anguilla',
    i18n: {
      es: {
        label: 'Anguila',
      },
    },
  },
  {
    value: 'Antarctica',
    label: 'Antarctica',
    i18n: {
      es: {
        label: 'Antártico',
      },
    },
  },
  {
    value: 'Antigua and Barbuda',
    label: 'Antigua and Barbuda',
    i18n: {
      es: {
        label: 'Antigua y Barbuda',
      },
    },
  },
  {
    value: 'Argentina',
    label: 'Argentina',
    i18n: {
      es: {
        label: 'Argentina',
      },
    },
  },
  {
    value: 'Armenia',
    label: 'Armenia',
    i18n: {
      es: {
        label: 'Armenia',
      },
    },
  },
  {
    value: 'Aruba',
    label: 'Aruba',
    i18n: {
      es: {
        label: 'Aruba',
      },
    },
  },
  {
    value: 'Ashmore and Cartier Islands',
    label: 'Ashmore and Cartier Islands',
    i18n: {
      es: {
        label: 'Ashmore and Cartier Islands',
      },
    },
  },
  {
    value: 'Australia',
    label: 'Australia',
    i18n: {
      es: {
        label: 'Australia',
      },
    },
  },
  {
    value: 'Austria',
    label: 'Austria',
    i18n: {
      es: {
        label: 'Austria',
      },
    },
  },
  {
    value: 'Azerbaijan',
    label: 'Azerbaijan',
    i18n: {
      es: {
        label: 'Azerbaiyán',
      },
    },
  },
  {
    value: 'Bahamas, The',
    label: 'Bahamas, The',
    i18n: {
      es: {
        label: 'Bahamas',
      },
    },
  },
  {
    value: 'Bahrain',
    label: 'Bahrain',
    i18n: {
      es: {
        label: 'Bahréin',
      },
    },
  },
  {
    value: 'Baker Island',
    label: 'Baker Island',
    i18n: {
      es: {
        label: 'Baker Island',
      },
    },
  },
  {
    value: 'Bangladesh',
    label: 'Bangladesh',
    i18n: {
      es: {
        label: 'Bangladesh',
      },
    },
  },
  {
    value: 'Barbados',
    label: 'Barbados',
    i18n: {
      es: {
        label: 'Barbados',
      },
    },
  },
  {
    value: 'Belarus',
    label: 'Belarus',
    i18n: {
      es: {
        label: 'Bielorrusia',
      },
    },
  },
  {
    value: 'Belgium',
    label: 'Belgium',
    i18n: {
      es: {
        label: 'Bélgica',
      },
    },
  },
  {
    value: 'Belize',
    label: 'Belize',
    i18n: {
      es: {
        label: 'Belice',
      },
    },
  },
  {
    value: 'Benin',
    label: 'Benin',
    i18n: {
      es: {
        label: 'Benín',
      },
    },
  },
  {
    value: 'Bermuda',
    label: 'Bermuda',
    i18n: {
      es: {
        label: 'Bermudas',
      },
    },
  },
  {
    value: 'Bhutan',
    label: 'Bhutan',
    i18n: {
      es: {
        label: 'Bután',
      },
    },
  },
  {
    value: 'Bolivia',
    label: 'Bolivia',
    i18n: {
      es: {
        label: 'Bolivia',
      },
    },
  },
  {
    value: 'Bosnia and Herzegovina',
    label: 'Bosnia and Herzegovina',
    i18n: {
      es: {
        label: 'Bosnia y Herzegovina',
      },
    },
  },
  {
    value: 'Botswana',
    label: 'Botswana',
    i18n: {
      es: {
        label: 'Botsuana',
      },
    },
  },
  {
    value: 'Bouvet Island',
    label: 'Bouvet Island',
    i18n: {
      es: {
        label: 'Bouvet Island',
      },
    },
  },
  {
    value: 'Brazil',
    label: 'Brazil',
    i18n: {
      es: {
        label: 'Brasil',
      },
    },
  },
  {
    value: 'British Indian Ocean Territory',
    label: 'British Indian Ocean Territory',
    i18n: {
      es: {
        label: 'Territorio Británico en el Océano Índico',
      },
    },
  },
  {
    value: 'Brunei',
    label: 'Brunei',
    i18n: {
      es: {
        label: 'Brunei',
      },
    },
  },
  {
    value: 'Bulgaria',
    label: 'Bulgaria',
    i18n: {
      es: {
        label: 'Bulgaria',
      },
    },
  },
  {
    value: 'Burkina Faso',
    label: 'Burkina Faso',
    i18n: {
      es: {
        label: 'Burkina Faso',
      },
    },
  },
  {
    value: 'Myanmar (Burma)',
    label: 'Myanmar (Burma)',
    i18n: {
      es: {
        label: 'Myanmar (Burma)',
      },
    },
  },
  {
    value: 'Burundi',
    label: 'Burundi',
    i18n: {
      es: {
        label: 'Burundi',
      },
    },
  },
  {
    value: 'Cabo Verde',
    label: 'Cabo Verde',
    i18n: {
      es: {
        label: 'Cabo Verde',
      },
    },
  },
  {
    value: 'Cambodia',
    label: 'Cambodia',
    i18n: {
      es: {
        label: 'Camboya',
      },
    },
  },
  {
    value: 'Cameroon',
    label: 'Cameroon',
    i18n: {
      es: {
        label: 'Camerún',
      },
    },
  },
  {
    value: 'Canada',
    label: 'Canada',
    i18n: {
      es: {
        label: 'Canadá',
      },
    },
  },
  {
    value: 'Cayman Islands',
    label: 'Cayman Islands',
    i18n: {
      es: {
        label: 'Islas Caimán',
      },
    },
  },
  {
    value: 'Central African Republic',
    label: 'Central African Republic',
    i18n: {
      es: {
        label: 'República Centroafricana',
      },
    },
  },
  {
    value: 'Chad',
    label: 'Chad',
    i18n: {
      es: {
        label: 'Chad',
      },
    },
  },
  {
    value: 'Chile',
    label: 'Chile',
    i18n: {
      es: {
        label: 'Chile',
      },
    },
  },
  {
    value: 'China',
    label: 'China',
    i18n: {
      es: {
        label: 'China',
      },
    },
  },
  {
    value: 'Christmas Island',
    label: 'Christmas Island',
    i18n: {
      es: {
        label: 'Isla de Navidad',
      },
    },
  },
  {
    value: 'Clipperton Island',
    label: 'Clipperton Island',
    i18n: {
      es: {
        label: 'Clipperton Island',
      },
    },
  },
  {
    value: 'Cocos (Keeling) Islands',
    label: 'Cocos (Keeling) Islands',
    i18n: {
      es: {
        label: 'Islas Cocos',
      },
    },
  },
  {
    value: 'Colombia',
    label: 'Colombia',
    i18n: {
      es: {
        label: 'Colombia',
      },
    },
  },
  {
    value: 'Comoros',
    label: 'Comoros',
    i18n: {
      es: {
        label: 'Comoras',
      },
    },
  },
  {
    value: 'Congo (Brazzaville)',
    label: 'Congo (Brazzaville)',
    i18n: {
      es: {
        label: 'Congo (Brazzaville)',
      },
    },
  },
  {
    value: 'Congo (Kinshasa)',
    label: 'Congo (Kinshasa)',
    i18n: {
      es: {
        label: 'Congo (Kinshasa)',
      },
    },
  },
  {
    value: 'Cook Islands',
    label: 'Cook Islands',
    i18n: {
      es: {
        label: 'Islas Cook',
      },
    },
  },
  {
    value: 'Coral Sea Islands',
    label: 'Coral Sea Islands',
    i18n: {
      es: {
        label: 'Coral Sea Islands',
      },
    },
  },
  {
    value: 'Costa Rica',
    label: 'Costa Rica',
    i18n: {
      es: {
        label: 'Costa Rica',
      },
    },
  },
  {
    value: 'Côte d\'Ivoire',
    label: 'Côte d\'Ivoire',
    i18n: {
      es: {
        label: 'Costa de Marfil',
      },
    },
  },
  {
    value: 'Croatia',
    label: 'Croatia',
    i18n: {
      es: {
        label: 'Croacia',
      },
    },
  },
  {
    value: 'Cuba',
    label: 'Cuba',
    i18n: {
      es: {
        label: 'Cuba',
      },
    },
  },
  {
    value: 'Curaçao',
    label: 'Curaçao',
    i18n: {
      es: {
        label: 'Curasao',
      },
    },
  },
  {
    value: 'Cyprus',
    label: 'Cyprus',
    i18n: {
      es: {
        label: 'Chipre',
      },
    },
  },
  {
    value: 'Czechia',
    label: 'Czechia',
    i18n: {
      es: {
        label: 'República Checa',
      },
    },
  },
  {
    value: 'Denmark',
    label: 'Denmark',
    i18n: {
      es: {
        label: 'Dinamarca',
      },
    },
  },
  {
    value: 'Dhekelia',
    label: 'Dhekelia',
    i18n: {
      es: {
        label: 'Dhekelia',
      },
    },
  },
  {
    value: 'Djibouti',
    label: 'Djibouti',
    i18n: {
      es: {
        label: 'Yibuti',
      },
    },
  },
  {
    value: 'Dominica',
    label: 'Dominica',
    i18n: {
      es: {
        label: 'Dominica',
      },
    },
  },
  {
    value: 'Dominican Republic',
    label: 'Dominican Republic',
    i18n: {
      es: {
        label: 'República Dominicana',
      },
    },
  },
  {
    value: 'Ecuador',
    label: 'Ecuador',
    i18n: {
      es: {
        label: 'Ecuador',
      },
    },
  },
  {
    value: 'Egypt',
    label: 'Egypt',
    i18n: {
      es: {
        label: 'Egipto',
      },
    },
  },
  {
    value: 'El Salvador',
    label: 'El Salvador',
    i18n: {
      es: {
        label: 'El Salvador',
      },
    },
  },
  {
    value: 'Equatorial Guinea',
    label: 'Equatorial Guinea',
    i18n: {
      es: {
        label: 'Guinea Ecuatorial',
      },
    },
  },
  {
    value: 'Eritrea',
    label: 'Eritrea',
    i18n: {
      es: {
        label: 'Eritrea',
      },
    },
  },
  {
    value: 'Estonia',
    label: 'Estonia',
    i18n: {
      es: {
        label: 'Estonia',
      },
    },
  },
  {
    value: 'Ethiopia',
    label: 'Ethiopia',
    i18n: {
      es: {
        label: 'Etiopía',
      },
    },
  },
  {
    value: 'Falkland Islands (Islas Malvinas)',
    label: 'Falkland Islands (Islas Malvinas)',
    i18n: {
      es: {
        label: 'Islas Malvinas',
      },
    },
  },
  {
    value: 'Faroe Islands',
    label: 'Faroe Islands',
    i18n: {
      es: {
        label: 'Islas Feroe',
      },
    },
  },
  {
    value: 'Fiji',
    label: 'Fiji',
    i18n: {
      es: {
        label: 'Fiyi',
      },
    },
  },
  {
    value: 'Finland',
    label: 'Finland',
    i18n: {
      es: {
        label: 'Finlandia',
      },
    },
  },
  {
    value: 'France',
    label: 'France',
    i18n: {
      es: {
        label: 'Francia',
      },
    },
  },
  {
    value: 'French Southern and Antarctic Lands',
    label: 'French Southern and Antarctic Lands',
    i18n: {
      es: {
        label: 'Territorios Australes Franceses',
      },
    },
  },
  {
    value: 'French Guiana',
    label: 'French Guiana',
    i18n: {
      es: {
        label: 'Guayana Francesa',
      },
    },
  },
  {
    value: 'French Polynesia',
    label: 'French Polynesia',
    i18n: {
      es: {
        label: 'Polinesia Francesa',
      },
    },
  },
  {
    value: 'Gabon',
    label: 'Gabon',
    i18n: {
      es: {
        label: 'Gabón',
      },
    },
  },
  {
    value: 'Gambia, The',
    label: 'Gambia, The',
    i18n: {
      es: {
        label: 'Gambia',
      },
    },
  },
  {
    value: 'Georgia',
    label: 'Georgia',
    i18n: {
      es: {
        label: 'Georgia',
      },
    },
  },
  {
    value: 'Germany',
    label: 'Germany',
    i18n: {
      es: {
        label: 'Alemania',
      },
    },
  },
  {
    value: 'Ghana',
    label: 'Ghana',
    i18n: {
      es: {
        label: 'Ghana',
      },
    },
  },
  {
    value: 'Gibraltar',
    label: 'Gibraltar',
    i18n: {
      es: {
        label: 'Gibraltar',
      },
    },
  },
  {
    value: 'Greece',
    label: 'Greece',
    i18n: {
      es: {
        label: 'Grecia',
      },
    },
  },
  {
    value: 'Greenland',
    label: 'Greenland',
    i18n: {
      es: {
        label: 'Groenlandia',
      },
    },
  },
  {
    value: 'Grenada',
    label: 'Grenada',
    i18n: {
      es: {
        label: 'Granada',
      },
    },
  },
  {
    value: 'Guadeloupe',
    label: 'Guadeloupe',
    i18n: {
      es: {
        label: 'Guadeloupe',
      },
    },
  },
  {
    value: 'Guam',
    label: 'Guam',
    i18n: {
      es: {
        label: 'Guam',
      },
    },
  },
  {
    value: 'Guatemala',
    label: 'Guatemala',
    i18n: {
      es: {
        label: 'Guatemala',
      },
    },
  },
  {
    value: 'Guernsey',
    label: 'Guernsey',
    i18n: {
      es: {
        label: 'Guernesey',
      },
    },
  },
  {
    value: 'Guinea',
    label: 'Guinea',
    i18n: {
      es: {
        label: 'Guinea',
      },
    },
  },
  {
    value: 'Guinea-Bissau',
    label: 'Guinea-Bissau',
    i18n: {
      es: {
        label: 'Guinea-Bissau',
      },
    },
  },
  {
    value: 'Guyana',
    label: 'Guyana',
    i18n: {
      es: {
        label: 'Guyana',
      },
    },
  },
  {
    value: 'Haiti',
    label: 'Haiti',
    i18n: {
      es: {
        label: 'Haití',
      },
    },
  },
  {
    value: 'Heard Island and McDonald Islands',
    label: 'Heard Island and McDonald Islands',
    i18n: {
      es: {
        label: 'Islas Heard y McDonald',
      },
    },
  },
  {
    value: 'Holy See',
    label: 'Holy See',
    i18n: {
      es: {
        label: 'Holy See',
      },
    },
  },
  {
    value: 'Honduras',
    label: 'Honduras',
    i18n: {
      es: {
        label: 'Honduras',
      },
    },
  },
  {
    value: 'Hong Kong',
    label: 'Hong Kong',
    i18n: {
      es: {
        label: 'Hong Kong',
      },
    },
  },
  {
    value: 'Howland Island',
    label: 'Howland Island',
    i18n: {
      es: {
        label: 'Howland Island',
      },
    },
  },
  {
    value: 'Hungary',
    label: 'Hungary',
    i18n: {
      es: {
        label: 'Hungría',
      },
    },
  },
  {
    value: 'Iceland',
    label: 'Iceland',
    i18n: {
      es: {
        label: 'Islandia',
      },
    },
  },
  {
    value: 'India',
    label: 'India',
    i18n: {
      es: {
        label: 'India',
      },
    },
  },
  {
    value: 'Indonesia',
    label: 'Indonesia',
    i18n: {
      es: {
        label: 'Indonesia',
      },
    },
  },
  {
    value: 'Iran',
    label: 'Iran',
    i18n: {
      es: {
        label: 'Irán',
      },
    },
  },
  {
    value: 'Iraq',
    label: 'Iraq',
    i18n: {
      es: {
        label: 'Iraq',
      },
    },
  },
  {
    value: 'Ireland',
    label: 'Ireland',
    i18n: {
      es: {
        label: 'Irlanda',
      },
    },
  },
  {
    value: 'Isle of Man',
    label: 'Isle of Man',
    i18n: {
      es: {
        label: 'Isla de Man',
      },
    },
  },
  {
    value: 'Israel',
    label: 'Israel',
    i18n: {
      es: {
        label: 'Israel',
      },
    },
  },
  {
    value: 'Italy',
    label: 'Italy',
    i18n: {
      es: {
        label: 'Italia',
      },
    },
  },
  {
    value: 'Jamaica',
    label: 'Jamaica',
    i18n: {
      es: {
        label: 'Jamaica',
      },
    },
  },
  {
    value: 'Jan Mayen',
    label: 'Jan Mayen',
    i18n: {
      es: {
        label: 'Jan Mayen',
      },
    },
  },
  {
    value: 'Japan',
    label: 'Japan',
    i18n: {
      es: {
        label: 'Japón',
      },
    },
  },
  {
    value: 'Jarvis Island',
    label: 'Jarvis Island',
    i18n: {
      es: {
        label: 'Jarvis Island',
      },
    },
  },
  {
    value: 'Jersey',
    label: 'Jersey',
    i18n: {
      es: {
        label: 'Isla de Jersey',
      },
    },
  },
  {
    value: 'Johnston Atoll',
    label: 'Johnston Atoll',
    i18n: {
      es: {
        label: 'Johnston Atoll',
      },
    },
  },
  {
    value: 'Jordan',
    label: 'Jordan',
    i18n: {
      es: {
        label: 'Jordania',
      },
    },
  },
  {
    value: 'Kazakhstan',
    label: 'Kazakhstan',
    i18n: {
      es: {
        label: 'Kazajistán',
      },
    },
  },
  {
    value: 'Kenya',
    label: 'Kenya',
    i18n: {
      es: {
        label: 'Kenia',
      },
    },
  },
  {
    value: 'Kingman Reef',
    label: 'Kingman Reef',
    i18n: {
      es: {
        label: 'Kingman Reef',
      },
    },
  },
  {
    value: 'Kiribati',
    label: 'Kiribati',
    i18n: {
      es: {
        label: 'Kiribati',
      },
    },
  },
  {
    value: 'North Korea',
    label: 'North Korea',
    i18n: {
      es: {
        label: 'Corea del Norte',
      },
    },
  },
  {
    value: 'South Korea',
    label: 'South Korea',
    i18n: {
      es: {
        label: 'Corea del Sur',
      },
    },
  },
  {
    value: 'Kosovo',
    label: 'Kosovo',
    i18n: {
      es: {
        label: 'Kosovo',
      },
    },
  },
  {
    value: 'Kuwait',
    label: 'Kuwait',
    i18n: {
      es: {
        label: 'Kuwait',
      },
    },
  },
  {
    value: 'Kyrgyzstan',
    label: 'Kyrgyzstan',
    i18n: {
      es: {
        label: 'Kirguistán',
      },
    },
  },
  {
    value: 'Laos',
    label: 'Laos',
    i18n: {
      es: {
        label: 'Laos',
      },
    },
  },
  {
    value: 'Latvia',
    label: 'Latvia',
    i18n: {
      es: {
        label: 'Letonia',
      },
    },
  },
  {
    value: 'Lebanon',
    label: 'Lebanon',
    i18n: {
      es: {
        label: 'Líbano',
      },
    },
  },
  {
    value: 'Lesotho',
    label: 'Lesotho',
    i18n: {
      es: {
        label: 'Lesotho',
      },
    },
  },
  {
    value: 'Liberia',
    label: 'Liberia',
    i18n: {
      es: {
        label: 'Liberia',
      },
    },
  },
  {
    value: 'Libya',
    label: 'Libya',
    i18n: {
      es: {
        label: 'Libia',
      },
    },
  },
  {
    value: 'Liechtenstein',
    label: 'Liechtenstein',
    i18n: {
      es: {
        label: 'Liechtenstein',
      },
    },
  },
  {
    value: 'Lithuania',
    label: 'Lithuania',
    i18n: {
      es: {
        label: 'Lituania',
      },
    },
  },
  {
    value: 'Luxembourg',
    label: 'Luxembourg',
    i18n: {
      es: {
        label: 'Luxemburgo',
      },
    },
  },
  {
    value: 'Macau',
    label: 'Macau',
    i18n: {
      es: {
        label: 'Macao',
      },
    },
  },
  {
    value: 'Macedonia',
    label: 'Macedonia',
    i18n: {
      es: {
        label: 'Macedonia (República de)',
      },
    },
  },
  {
    value: 'Madagascar',
    label: 'Madagascar',
    i18n: {
      es: {
        label: 'Madagascar',
      },
    },
  },
  {
    value: 'Malawi',
    label: 'Malawi',
    i18n: {
      es: {
        label: 'Malawi',
      },
    },
  },
  {
    value: 'Malaysia',
    label: 'Malaysia',
    i18n: {
      es: {
        label: 'Malasia',
      },
    },
  },
  {
    value: 'Maldives',
    label: 'Maldives',
    i18n: {
      es: {
        label: 'Maldivas',
      },
    },
  },
  {
    value: 'Mali',
    label: 'Mali',
    i18n: {
      es: {
        label: 'Malí',
      },
    },
  },
  {
    value: 'Malta',
    label: 'Malta',
    i18n: {
      es: {
        label: 'Malta',
      },
    },
  },
  {
    value: 'Marshall Islands',
    label: 'Marshall Islands',
    i18n: {
      es: {
        label: 'Islas Marshall',
      },
    },
  },
  {
    value: 'Martinique',
    label: 'Martinique',
    i18n: {
      es: {
        label: 'Martinica',
      },
    },
  },
  {
    value: 'Mauritania',
    label: 'Mauritania',
    i18n: {
      es: {
        label: 'Mauritania',
      },
    },
  },
  {
    value: 'Mauritius',
    label: 'Mauritius',
    i18n: {
      es: {
        label: 'Mauricio',
      },
    },
  },
  {
    value: 'Mayotte',
    label: 'Mayotte',
    i18n: {
      es: {
        label: 'Mayotte',
      },
    },
  },
  {
    value: 'Mexico',
    label: 'Mexico',
    i18n: {
      es: {
        label: 'México',
      },
    },
  },
  {
    value: 'Micronesia, Federated States of',
    label: 'Micronesia, Federated States of',
    i18n: {
      es: {
        label: 'Micronesia (Estados Federados de)',
      },
    },
  },
  {
    value: 'Midway Islands',
    label: 'Midway Islands',
    i18n: {
      es: {
        label: 'Midway Islands',
      },
    },
  },
  {
    value: 'Moldova',
    label: 'Moldova',
    i18n: {
      es: {
        label: 'Moldavia',
      },
    },
  },
  {
    value: 'Monaco',
    label: 'Monaco',
    i18n: {
      es: {
        label: 'Mónaco',
      },
    },
  },
  {
    value: 'Mongolia',
    label: 'Mongolia',
    i18n: {
      es: {
        label: 'Mongolia',
      },
    },
  },
  {
    value: 'Montenegro',
    label: 'Montenegro',
    i18n: {
      es: {
        label: 'Montenegro',
      },
    },
  },
  {
    value: 'Montserrat',
    label: 'Montserrat',
    i18n: {
      es: {
        label: 'Montserrat',
      },
    },
  },
  {
    value: 'Morocco',
    label: 'Morocco',
    i18n: {
      es: {
        label: 'Marruecos',
      },
    },
  },
  {
    value: 'Mozambique',
    label: 'Mozambique',
    i18n: {
      es: {
        label: 'Mozambique',
      },
    },
  },
  {
    value: 'Namibia',
    label: 'Namibia',
    i18n: {
      es: {
        label: 'Namibia',
      },
    },
  },
  {
    value: 'Nauru',
    label: 'Nauru',
    i18n: {
      es: {
        label: 'Nauru',
      },
    },
  },
  {
    value: 'Navassa Island',
    label: 'Navassa Island',
    i18n: {
      es: {
        label: 'Navassa Island',
      },
    },
  },
  {
    value: 'Nepal',
    label: 'Nepal',
    i18n: {
      es: {
        label: 'Nepal',
      },
    },
  },
  {
    value: 'Netherlands',
    label: 'Netherlands',
    i18n: {
      es: {
        label: 'Países Bajos (Holanda)',
      },
    },
  },
  {
    value: 'New Caledonia',
    label: 'New Caledonia',
    i18n: {
      es: {
        label: 'Nueva Caledonia',
      },
    },
  },
  {
    value: 'New Zealand',
    label: 'New Zealand',
    i18n: {
      es: {
        label: 'Nueva Zelanda',
      },
    },
  },
  {
    value: 'Nicaragua',
    label: 'Nicaragua',
    i18n: {
      es: {
        label: 'Nicaragua',
      },
    },
  },
  {
    value: 'Niger',
    label: 'Niger',
    i18n: {
      es: {
        label: 'Níger',
      },
    },
  },
  {
    value: 'Nigeria',
    label: 'Nigeria',
    i18n: {
      es: {
        label: 'Nigeria',
      },
    },
  },
  {
    value: 'Niue',
    label: 'Niue',
    i18n: {
      es: {
        label: 'Niue',
      },
    },
  },
  {
    value: 'Norfolk Island',
    label: 'Norfolk Island',
    i18n: {
      es: {
        label: 'Isla Norfolk',
      },
    },
  },
  {
    value: 'Northern Mariana Islands',
    label: 'Northern Mariana Islands',
    i18n: {
      es: {
        label: 'Islas Marianas del Norte',
      },
    },
  },
  {
    value: 'Norway',
    label: 'Norway',
    i18n: {
      es: {
        label: 'Noruega',
      },
    },
  },
  {
    value: 'Oman',
    label: 'Oman',
    i18n: {
      es: {
        label: 'Omán',
      },
    },
  },
  {
    value: 'Pakistan',
    label: 'Pakistan',
    i18n: {
      es: {
        label: 'Pakistán',
      },
    },
  },
  {
    value: 'Palau',
    label: 'Palau',
    i18n: {
      es: {
        label: 'Palau',
      },
    },
  },
  {
    value: 'Palestine',
    label: 'Palestine',
    i18n: {
      es: {
        label: 'Palestina',
      },
    },
  },
  {
    value: 'Palmyra Atoll',
    label: 'Palmyra Atoll',
    i18n: {
      es: {
        label: 'Palmyra Atoll',
      },
    },
  },
  {
    value: 'Panama',
    label: 'Panama',
    i18n: {
      es: {
        label: 'Panamá',
      },
    },
  },
  {
    value: 'Papua New Guinea',
    label: 'Papua New Guinea',
    i18n: {
      es: {
        label: 'Papúa Nueva Guinea',
      },
    },
  },
  {
    value: 'Paracel Islands',
    label: 'Paracel Islands',
    i18n: {
      es: {
        label: 'Paracel Islands',
      },
    },
  },
  {
    value: 'Paraguay',
    label: 'Paraguay',
    i18n: {
      es: {
        label: 'Paraguay',
      },
    },
  },
  {
    value: 'Peru',
    label: 'Peru',
    i18n: {
      es: {
        label: 'Perú',
      },
    },
  },
  {
    value: 'Philippines',
    label: 'Philippines',
    i18n: {
      es: {
        label: 'Filipinas',
      },
    },
  },
  {
    value: 'Pitcairn Islands',
    label: 'Pitcairn Islands',
    i18n: {
      es: {
        label: 'Islas Pitcairn',
      },
    },
  },
  {
    value: 'Poland',
    label: 'Poland',
    i18n: {
      es: {
        label: 'Polonia',
      },
    },
  },
  {
    value: 'Portugal',
    label: 'Portugal',
    i18n: {
      es: {
        label: 'Portugal',
      },
    },
  },
  {
    value: 'Puerto Rico',
    label: 'Puerto Rico',
    i18n: {
      es: {
        label: 'Puerto Rico',
      },
    },
  },
  {
    value: 'Qatar',
    label: 'Qatar',
    i18n: {
      es: {
        label: 'Qatar',
      },
    },
  },
  {
    value: 'Reunion',
    label: 'Reunion',
    i18n: {
      es: {
        label: 'Reunión',
      },
    },
  },
  {
    value: 'Romania',
    label: 'Romania',
    i18n: {
      es: {
        label: 'Rumania',
      },
    },
  },
  {
    value: 'Russia',
    label: 'Russia',
    i18n: {
      es: {
        label: 'Rusia',
      },
    },
  },
  {
    value: 'Rwanda',
    label: 'Rwanda',
    i18n: {
      es: {
        label: 'Ruanda',
      },
    },
  },
  {
    value: 'Saint Barthelemy',
    label: 'Saint Barthelemy',
    i18n: {
      es: {
        label: 'Saint Barthelemy',
      },
    },
  },
  {
    value: 'Saint Helena',
    label: 'Saint Helena',
    i18n: {
      es: {
        label: 'Santa Helena',
      },
    },
  },
  {
    value: 'Saint Kitts and Nevis',
    label: 'Saint Kitts and Nevis',
    i18n: {
      es: {
        label: 'San Cristóbal y Nieves',
      },
    },
  },
  {
    value: 'Saint Lucia',
    label: 'Saint Lucia',
    i18n: {
      es: {
        label: 'Santa Lucía',
      },
    },
  },
  {
    value: 'Saint Martin',
    label: 'Saint Martin',
    i18n: {
      es: {
        label: 'San Martín (Sint Maarten)',
      },
    },
  },
  {
    value: 'Saint Pierre and Miquelon',
    label: 'Saint Pierre and Miquelon',
    i18n: {
      es: {
        label: 'Saint Pierre and Miquelon',
      },
    },
  },
  {
    value: 'Saint Vincent and the Grenadines',
    label: 'Saint Vincent and the Grenadines',
    i18n: {
      es: {
        label: 'San Vicente y las Granadinass',
      },
    },
  },
  {
    value: 'Samoa',
    label: 'Samoa',
    i18n: {
      es: {
        label: 'Samoa',
      },
    },
  },
  {
    value: 'San Marino',
    label: 'San Marino',
    i18n: {
      es: {
        label: 'San Marino',
      },
    },
  },
  {
    value: 'Sao Tome and Principe',
    label: 'Sao Tome and Principe',
    i18n: {
      es: {
        label: 'Santo Tomé y Príncipe',
      },
    },
  },
  {
    value: 'Saudi Arabia',
    label: 'Saudi Arabia',
    i18n: {
      es: {
        label: 'Arabia Saudita',
      },
    },
  },
  {
    value: 'Senegal',
    label: 'Senegal',
    i18n: {
      es: {
        label: 'Senegal',
      },
    },
  },
  {
    value: 'Serbia',
    label: 'Serbia',
    i18n: {
      es: {
        label: 'Serbia',
      },
    },
  },
  {
    value: 'Seychelles',
    label: 'Seychelles',
    i18n: {
      es: {
        label: 'Seychelles',
      },
    },
  },
  {
    value: 'Sierra Leone',
    label: 'Sierra Leone',
    i18n: {
      es: {
        label: 'Sierra Leona',
      },
    },
  },
  {
    value: 'Singapore',
    label: 'Singapore',
    i18n: {
      es: {
        label: 'Singapur',
      },
    },
  },
  {
    value: 'Sint Maarten',
    label: 'Sint Maarten',
    i18n: {
      es: {
        label: 'Sint Maarten',
      },
    },
  },
  {
    value: 'Slovakia',
    label: 'Slovakia',
    i18n: {
      es: {
        label: 'Eslovaquia',
      },
    },
  },
  {
    value: 'Slovenia',
    label: 'Slovenia',
    i18n: {
      es: {
        label: 'Eslovenia',
      },
    },
  },
  {
    value: 'Solomon Islands',
    label: 'Solomon Islands',
    i18n: {
      es: {
        label: 'Islas Salomón',
      },
    },
  },
  {
    value: 'Somalia',
    label: 'Somalia',
    i18n: {
      es: {
        label: 'Somalia',
      },
    },
  },
  {
    value: 'South Africa',
    label: 'South Africa',
    i18n: {
      es: {
        label: 'Sudáfrica',
      },
    },
  },
  {
    value: 'South Georgia and the South Sandwich Islands',
    label: 'South Georgia and the South Sandwich Islands',
    i18n: {
      es: {
        label: 'Islas Georgias del Sur y Sandwich del Sur',
      },
    },
  },
  {
    value: 'South Sudan',
    label: 'South Sudan',
    i18n: {
      es: {
        label: 'Sudán del Sur',
      },
    },
  },
  {
    value: 'Spain',
    label: 'Spain',
    i18n: {
      es: {
        label: 'España',
      },
    },
  },
  {
    value: 'Spratly Islands',
    label: 'Spratly Islands',
    i18n: {
      es: {
        label: 'Spratly Islands',
      },
    },
  },
  {
    value: 'Sri Lanka',
    label: 'Sri Lanka',
    i18n: {
      es: {
        label: 'Sri Lanka',
      },
    },
  },
  {
    value: 'Sudan',
    label: 'Sudan',
    i18n: {
      es: {
        label: 'Sudán',
      },
    },
  },
  {
    value: 'Suriname',
    label: 'Suriname',
    i18n: {
      es: {
        label: 'Surinam',
      },
    },
  },
  {
    value: 'Svalbard',
    label: 'Svalbard',
    i18n: {
      es: {
        label: 'Islas Svalbard y Jan Mayen',
      },
    },
  },
  {
    value: 'Swaziland',
    label: 'Swaziland',
    i18n: {
      es: {
        label: 'Swazilandia',
      },
    },
  },
  {
    value: 'Sweden',
    label: 'Sweden',
    i18n: {
      es: {
        label: 'Suecia',
      },
    },
  },
  {
    value: 'Switzerland',
    label: 'Switzerland',
    i18n: {
      es: {
        label: 'Suiza',
      },
    },
  },
  {
    value: 'Syria',
    label: 'Syria',
    i18n: {
      es: {
        label: 'Siria',
      },
    },
  },
  {
    value: 'Taiwan',
    label: 'Taiwan',
    i18n: {
      es: {
        label: 'Taiwán',
      },
    },
  },
  {
    value: 'Tajikistan',
    label: 'Tajikistan',
    i18n: {
      es: {
        label: 'Tayikistán',
      },
    },
  },
  {
    value: 'Tanzania',
    label: 'Tanzania',
    i18n: {
      es: {
        label: 'Tanzania',
      },
    },
  },
  {
    value: 'Thailand',
    label: 'Thailand',
    i18n: {
      es: {
        label: 'Tailandia',
      },
    },
  },
  {
    value: 'Timor-Leste',
    label: 'Timor-Leste',
    i18n: {
      es: {
        label: 'Timor Oriental',
      },
    },
  },
  {
    value: 'Togo',
    label: 'Togo',
    i18n: {
      es: {
        label: 'Togo',
      },
    },
  },
  {
    value: 'Tokelau',
    label: 'Tokelau',
    i18n: {
      es: {
        label: 'Tokelau',
      },
    },
  },
  {
    value: 'Tonga',
    label: 'Tonga',
    i18n: {
      es: {
        label: 'Tonga',
      },
    },
  },
  {
    value: 'Trinidad and Tobago',
    label: 'Trinidad and Tobago',
    i18n: {
      es: {
        label: 'Trinidad y Tobago',
      },
    },
  },
  {
    value: 'Tunisia',
    label: 'Tunisia',
    i18n: {
      es: {
        label: 'Túnez',
      },
    },
  },
  {
    value: 'Turkey',
    label: 'Turkey',
    i18n: {
      es: {
        label: 'Turquía',
      },
    },
  },
  {
    value: 'Turkmenistan',
    label: 'Turkmenistan',
    i18n: {
      es: {
        label: 'Turkmenistán',
      },
    },
  },
  {
    value: 'Turks and Caicos Islands',
    label: 'Turks and Caicos Islands',
    i18n: {
      es: {
        label: 'Islas Turcas y Caicos',
      },
    },
  },
  {
    value: 'Tuvalu',
    label: 'Tuvalu',
    i18n: {
      es: {
        label: 'Tuvalu',
      },
    },
  },
  {
    value: 'Uganda',
    label: 'Uganda',
    i18n: {
      es: {
        label: 'Uganda',
      },
    },
  },
  {
    value: 'Ukraine',
    label: 'Ukraine',
    i18n: {
      es: {
        label: 'Ucrania',
      },
    },
  },
  {
    value: 'United Arab Emirates',
    label: 'United Arab Emirates',
    i18n: {
      es: {
        label: 'Emiratos Árabes Unidos',
      },
    },
  },
  {
    value: 'United Kingdom',
    label: 'United Kingdom',
    i18n: {
      es: {
        label: 'Reino Unido (RU)',
      },
    },
  },
  {
    value: 'United States',
    label: 'United States',
    i18n: {
      es: {
        label: 'Estados Unidos (EEUU)',
      },
    },
  },
  {
    value: 'Uruguay',
    label: 'Uruguay',
    i18n: {
      es: {
        label: 'Uruguay',
      },
    },
  },
  {
    value: 'Uzbekistan',
    label: 'Uzbekistan',
    i18n: {
      es: {
        label: 'Uzbekistán',
      },
    },
  },
  {
    value: 'Vanuatu',
    label: 'Vanuatu',
    i18n: {
      es: {
        label: 'Vanuatu',
      },
    },
  },
  {
    value: 'Venezuela',
    label: 'Venezuela',
    i18n: {
      es: {
        label: 'Venezuela',
      },
    },
  },
  {
    value: 'Vietnam',
    label: 'Vietnam',
    i18n: {
      es: {
        label: 'Vietnam',
      },
    },
  },
  {
    value: 'Virgin Islands, British',
    label: 'Virgin Islands, British',
    i18n: {
      es: {
        label: 'Islas Vírgenes Británicas',
      },
    },
  },
  {
    value: 'Virgin Islands, U.S.',
    label: 'Virgin Islands, U.S.',
    i18n: {
      es: {
        label: 'Islas Vírgenes de los Estados Unidos',
      },
    },
  },
  {
    value: 'Wake Island',
    label: 'Wake Island',
    i18n: {
      es: {
        label: 'Wake Island',
      },
    },
  },
  {
    value: 'Wallis and Futuna',
    label: 'Wallis and Futuna',
    i18n: {
      es: {
        label: 'Wallis y Futuna',
      },
    },
  },
  {
    value: 'Western Sahara',
    label: 'Western Sahara',
    i18n: {
      es: {
        label: 'Western Sahara',
      },
    },
  },
  {
    value: 'Yemen',
    label: 'Yemen',
    i18n: {
      es: {
        label: 'Yemen',
      },
    },
  },
  {
    value: 'Zambia',
    label: 'Zambia',
    i18n: {
      es: {
        label: 'Zambia',
      },
    },
  },
  {
    value: 'Zimbabwe',
    label: 'Zimbabwe',
    i18n: {
      es: {
        label: 'Zimbabue',
      },
    },
  },
];

Meteor.startup(() => {
  /* eslint-disable no-console */
  console.log('Re-populating country database...');
  AllCountries.forEach(country => {
    Countries.upsert({ value: country.value }, { $set: country });
  });
});
