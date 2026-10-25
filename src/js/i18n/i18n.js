import {translations} from './translations.js';
export const getCurrentLanguage=()=>localStorage.getItem('food-spa-language')||'mn';
export const t=(key)=>translations[getCurrentLanguage()]?.[key]||key;
export function toggleLanguage(){localStorage.setItem('food-spa-language',getCurrentLanguage()==='mn'?'en':'mn');}
