import {renderPageLayout} from '../layouts/pageLayout.js';
import {t} from '../i18n/i18n.js';
export function renderSearchPage(){document.getElementById('app').innerHTML=renderPageLayout({id:'search',title:t('search'),content:t('searchText')});}
