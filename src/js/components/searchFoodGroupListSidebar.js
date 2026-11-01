
import { escapeHtml } from "../fn/format.js";

export function renderFoodGroupList(foodGroups = []) {
  return `
    <p class="menu-label app-menu-label">
      🔍 Хүнсний бүлгээр хайх:
    </p>

    <ul class="menu-list">
      ${foodGroups.map(group => `
        <li>
          <label class="app-sublist-item">
            <input
              type="checkbox"
              name="foodgroup"
              value="${escapeHtml(group)}"
            />
            <span>${escapeHtml(group)}</span>
          </label>
        </li>
      `).join("")}
    </ul>
  `;
}
