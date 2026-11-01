// Hash өөрчлөгдөхөд тохирох хуудсыг зурна.
export function initRouter(routes){const render=()=>{const hash=location.hash||'#/overview';(routes[hash]||routes['#/404'])();};window.addEventListener('hashchange',render);render();}
