
import { t } from "../i18n/i18n.js";

export function renderSearchFoodName() {
  return `
    <div class="search-food-name">
      <h3>🔍 ${t("foodSearch.title")}</h3>

      <input
        type="text"
        id="foodSearch"
        placeholder="${t("foodSearch.searchPlaceholder")}"
        class="search-input"
      />

      <button id="searchBtn" type="button">
        ${t("foodSearch.searchButton")}
      </button>
    </div>
  `;
}
