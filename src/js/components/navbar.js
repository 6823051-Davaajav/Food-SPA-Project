
import { t, toggleLanguage } from "../i18n/i18n.js";

export function renderNavbar() {
  return `
    <header class="top app-navbar">
      <div class="navwrap app-navbar-menu">
        <a class="brand app-navbar-brand" href="#/overview">
          🥬 Монгол хүнсний найрлага
        </a>

        <nav class="app-navbar-menu" aria-label="Үндсэн цэс">
          <a class="app-navbar-link" href="#/overview">${t("nav.overview")}</a>
          <a class="app-navbar-link" href="#/search">${t("nav.search")}</a>
          <a class="app-navbar-link" href="#/calculation">${t("nav.calculation")}</a>
          <a class="app-navbar-link" href="#/books">${t("nav.books")}</a>
          <a class="app-navbar-link" href="#/contact">${t("nav.contact")}</a>
        </nav>

        <button
          id="langToggle"
          class="app-btn-primary"
          type="button"
        >
          🌐 ${t("nav.language")}
        </button>
      </div>
    </header>
  `;
}

export function initNavbar() {
  const languageToggle =
    document.getElementById("langToggle");

  languageToggle?.addEventListener("click", () => {
    toggleLanguage();
    window.location.reload();
  });
}

export function mountNavbar(root) {
  if (!root) return;

  root.innerHTML = renderNavbar();
  initNavbar();
}
