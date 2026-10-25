import {renderPageLayout} from '../layouts/pageLayout.js';
import {t} from '../i18n/i18n.js';
export function renderOverviewPage(){document.getElementById('app').innerHTML=renderPageLayout({id:'overview',title:t('overview'),content:t('welcome')});}
