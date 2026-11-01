
import { initRouter } from "./router.js";
import { routes } from "./routes.js";
import { renderNavbar } from "./components/navbar.js";
import { toggleLanguage } from "./i18n/i18n.js";

function updateNavbar() {
  const navbar = document.getElementById("navbar");

  if (!navbar) return;

  navbar.innerHTML = renderNavbar();

  const langButton = document.getElementById("langToggle");

  if (langButton) {
    langButton.addEventListener("click", (event) => {
      event.preventDefault();
      toggleLanguage();
      updateNavbar();

      const currentPage =
        routes[location.hash] || routes["#/overview"];

      currentPage();
    });
  }
}

window.addEventListener("hashchange", updateNavbar);

updateNavbar();
initRouter(routes);
