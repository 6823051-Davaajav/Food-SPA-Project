import {renderPageLayout} from '../layouts/pageLayout.js';
import {t} from '../i18n/i18n.js';
export function renderBooksPage(){document.getElementById('app').innerHTML=renderPageLayout({id:'books',title:t('books'),content:t('booksText')});}
