import { escapeHtml } from "../fn/format.js";

export const nutritionGroups = [
  {
    groupName: "Nutritions",
    items: [
      { value: "proximates", label: "Үндсэн найрлага", checked: true },
      { value: "minerals", label: "Эрдэс бодис", checked: true },
      { value: "vitamins", label: "Амин дэм", checked: true },
    ],
  },
  {
    groupName: "Sample informations",
    items: [
      { value: "collection_information", label: "Цуглуулсан мэдээлэл", checked: false },
      { value: "edible_inedible_part", label: "Идэх боломжтой хэсэг", checked: false },
      { value: "pretreatment_conditions", label: "Урьдчилсан боловсруулалт", checked: false },
      { value: "description", label: "Тайлбар", checked: false },
      { value: "images", label: "Зураг", checked: false },
    ],
  },
];

function renderNutritionGroup(group) {
  return `
    <li>
      <a class="app-toggle-sublist" href="#" role="button">
        <span>${escapeHtml(group.groupName)}</span>
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
              <span>${escapeHtml(item.label)}</span>
            </label>
          </li>
        `).join("")}
      </ul>
    </li>
  `;
}

export function renderSearchSettings() {
  return `
    <p class="menu-label app-menu-label">⚙️ Хайлтын тохиргоо</p>
    <ul class="menu-list">
      ${nutritionGroups.map(renderNutritionGroup).join("")}
    </ul>
  `;
}