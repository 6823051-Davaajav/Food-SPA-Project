import {initRouter} from './router.js';
import {routes} from './routes.js';
import {renderNavbar} from './components/navbar.js';
import {toggleLanguage} from './i18n/i18n.js';
function updateNavbar(){document.getElementById('navbar').innerHTML=renderNavbar();document.getElementById('lang').addEventListener('click',()=>{toggleLanguage();updateNavbar();(routes[location.hash]||routes['#/overview'])();});}
window.addEventListener('hashchange',updateNavbar);
updateNavbar();initRouter(routes);
