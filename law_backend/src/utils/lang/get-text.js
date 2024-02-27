import en from './en.js';
import ur from './ur.js';

export default (lang, key) => {
  if (lang == 'ur') {
    return ur[key];
  } else {
    return en[key];
  }
};
