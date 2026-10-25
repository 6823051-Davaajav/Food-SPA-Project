import {renderPageLayout} from '../layouts/pageLayout.js';
import {t} from '../i18n/i18n.js';
export function renderCalculationPage(){document.getElementById('app').innerHTML=renderPageLayout({id:'calculation',title:t('calculation'),content:t('calculationText')});}
