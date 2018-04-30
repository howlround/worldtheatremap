import { remove as removeDiacritics } from 'diacritics';

export default (text) => {
  return removeDiacritics(text).toUpperCase().replace(/[^0-9A-Z]/g, '');
}
