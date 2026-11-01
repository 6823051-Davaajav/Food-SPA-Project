
import { escapeHtml } from "../fn/format.js";

export function renderNutritionTable(food) {
  const rows = [
    ["Хүнсний нэр", food.name],
    ["Англи нэр", food.nameEn],
    ["Хүнсний бүлэг", food.group],
    ["Илчлэг", food.energy != null ? `${food.energy} ккал` : "Мэдээлэл байхгүй"],
    ["Уураг", food.protein != null ? `${food.protein} г` : "Мэдээлэл байхгүй"],
    ["Өөх тос", food.fat != null ? `${food.fat} г` : "Мэдээлэл байхгүй"],
    ["Нүүрс ус", food.carbohydrate != null ? `${food.carbohydrate} г` : "Мэдээлэл байхгүй"]
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
  if (!images.length) {
    return "<p>Зураг байхгүй.</p>";
  }

  return `
    <div class="food-image-list">
      ${images.map(item => `
        <img
          src="${escapeHtml(item.image)}"
          alt="Хүнсний зураг"
          class="food-image"
          data-image="${escapeHtml(item.image)}"
          style="width: 250px; cursor: pointer; border-radius: 8px;"
        />
      `).join("")}
    </div>
  `;
}
