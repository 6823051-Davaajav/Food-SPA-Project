
import { escapeHtml } from "../fn/format.js";
import { t, getCurrentLanguage } from "../i18n/i18n.js";

export function renderNutritionTable(food) {
  const language = getCurrentLanguage();
  const isEnglish = language === "en";

  const foodName = isEnglish
    ? (food.nameEn || food.name)
    : food.name;

  const foodGroup = isEnglish
    ? (food.groupEn || t(`foodGroups.${food.group}`))
    : food.group;

  const missing = isEnglish
    ? "No information available"
    : "Мэдээлэл байхгүй";

  const formatValue = (value, unit) =>
    value != null ? `${value} ${unit}` : missing;

  const rows = [
    [t("foodSearch.foodName"), foodName],
    [t("foodSearch.group"), foodGroup],
    [t("foodSearch.energy"), formatValue(food.energy, "kcal")],
    [t("foodSearch.protein"), formatValue(food.protein, "g")],
    [t("foodSearch.fat"), formatValue(food.fat, "g")],
    [
      t("foodSearch.carbohydrate"),
      formatValue(food.carbohydrate, "g")
    ]
  ];

  return `
    <table class="table is-fullwidth is-bordered">
      <tbody>
        ${rows.map(([label, value]) => `
          <tr>
            <th>${escapeHtml(label)}</th>
            <td>${escapeHtml(String(value ?? ""))}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

export function renderFoodImages(images = []) {
  const language = getCurrentLanguage();

  if (!images.length) {
    return language === "en"
      ? "<p>No images available.</p>"
      : "<p>Зураг байхгүй.</p>";
  }

  return `
    <div class="food-image-list">
      ${images.map(item => `
        <img
          src="${escapeHtml(item.image)}"
          alt="${escapeHtml(t("foodSearch.image"))}"
          class="food-image"
          data-image="${escapeHtml(item.image)}"
          style="width: 250px; cursor: pointer; border-radius: 8px;"
        />
      `).join("")}
    </div>
  `;
}
