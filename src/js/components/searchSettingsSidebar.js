
import { escapeHtml } from "../fn/format.js";
import { t } from "../i18n/i18n.js";

export const nutritionGroups = [
  {
    groupName: "Nutritions",
    translationKey: "nutritions",
    items: [
      { value: "proximates", checked: true },
      { value: "minerals", checked: true },
      { value: "vitamins", checked: true },
    ],
  },
  {
    groupName: "Sample informations",
    translationKey: "sampleInformations",
    items: [
      { value: "collection_information", checked: false },
      { value: "edible_inedible_part", checked: false },
      { value: "pretreatment_conditions", checked: false },
      { value: "description", checked: false },
      { value: "images", checked: false },
    ],
  },
];

function renderNutritionGroup(group) {
  const groupLabel = t(
    `searchSettings.${group.translationKey}`
  );

  return `
    <li>
      <a class="app-toggle-sublist" href="#" role="button">
        <span>${escapeHtml(groupLabel)}</span>
      </a>

      <ul class="app-sublist is-hidden">
        ${group.items.map((item) => `
          <li>
            <label class="app-sublist-item">
              <input
                type="checkbox"
                name="nutrition"
                value="${escapeHtml(item.value)}"
                ${item.checked ? "checked" : ""}
              />
              <span>
                ${escapeHtml(t(`searchSettings.${item.value}`))}
              </span>
            </label>
          </li>
        `).join("")}
      </ul>
    </li>
  `;
}

export function renderSearchSettings() {
  return `
    <p class="menu-label app-menu-label">
      ⚙️ ${escapeHtml(t("foodSearch.settings"))}
    </p>

    <ul class="menu-list">
      ${nutritionGroups.map(renderNutritionGroup).join("")}
    </ul>
  `;
}
