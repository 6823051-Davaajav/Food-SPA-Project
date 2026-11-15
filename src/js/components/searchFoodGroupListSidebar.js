
import { escapeHtml } from "../fn/format.js";
import { t } from "../i18n/i18n.js";

export function renderFoodGroupList(foodGroups = []) {
  return `
    <p class="menu-label app-menu-label">
      🔍 ${escapeHtml(t("foodSearch.foodGroups"))}
    </p>

    <ul class="menu-list">
      ${foodGroups.map((group) => {
        const translatedGroup = t(`foodGroups.${group}`);

        return `
          <li>
            <label class="app-sublist-item">
              <input
                type="checkbox"
                name="foodgroup"
                value="${escapeHtml(group)}"
              />
              <span>${escapeHtml(translatedGroup)}</span>
            </label>
          </li>
        `;
      }).join("")}
    </ul>
  `;
}
