
import { renderPageLayout } from "../layouts/pageLayout.js";
import { t } from "../i18n/i18n.js";
import { searchNutritions } from "../services/nutritionService.js";

export function renderSearchPage() {
  document.getElementById("app").innerHTML = renderPageLayout({
    id: "search",
    title: t("search"),
    content: `
      <input id="foodSearch" type="text"
        placeholder="Хүнсний нэрээр хайх..."
        style="padding:12px;width:100%;margin:15px 0;">

      <div id="searchResults">Мэдээлэл ачаалж байна...</div>
    `
  });

  const input = document.getElementById("foodSearch");
  const results = document.getElementById("searchResults");

  async function showResults() {
    try {
      const foods = await searchNutritions(input.value.trim());

      if (foods.length === 0) {
        results.textContent = "Илэрц олдсонгүй.";
        return;
      }

      const table = document.createElement("table");
      table.style.cssText = "width:100%;border-collapse:collapse;";

      const header = document.createElement("tr");
      ["Хүнс", "Илчлэг", "Уураг", "Өөх тос", "Нүүрс ус"].forEach(label => {
        const th = document.createElement("th");
        th.textContent = label;
        th.style.padding = "10px";
        header.appendChild(th);
      });
      table.appendChild(header);

      foods.forEach(food => {
        const row = document.createElement("tr");

        [
          food.name,
          food.energy,
          food.protein,
          food.fat,
          food.carbohydrate
        ].forEach(value => {
          const td = document.createElement("td");
          td.textContent = value;
          td.style.padding = "10px";
          td.style.borderBottom = "1px solid #ddd";
          row.appendChild(td);
        });

        table.appendChild(row);
      });

      results.replaceChildren(table);
    } catch (error) {
      results.textContent = "Мэдээлэл уншихад алдаа гарлаа.";
      console.error(error);
    }
  }

  input.addEventListener("input", showResults);
  showResults();
}
