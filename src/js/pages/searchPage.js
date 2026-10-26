
import { renderPageLayout } from "../layouts/pageLayout.js";
import { t } from "../i18n/i18n.js";
import { searchNutritions } from "../services/nutritionService.js";

export function renderSearchPage() {
  const isEnglish = t("search") === "Search";

  const labels = isEnglish
    ? {
        placeholder: "Search by food name...",
        loading: "Loading data...",
        noResults: "No results found.",
        error: "Error loading data.",
        headers: [
          "Food",
          "Energy (kcal)",
          "Protein (g)",
          "Fat (g)",
          "Carbohydrates (g)"
        ]
      }
    : {
        placeholder: "Хүнсний нэрээр хайх...",
        loading: "Мэдээлэл ачаалж байна...",
        noResults: "Илэрц олдсонгүй.",
        error: "Мэдээлэл уншихад алдаа гарлаа.",
        headers: [
          "Хүнс",
          "Илчлэг (ккал)",
          "Уураг (г)",
          "Өөх тос (г)",
          "Нүүрс ус (г)"
        ]
      };

  document.getElementById("app").innerHTML = renderPageLayout({
    id: "search",
    title: t("search"),
    content: `
      <input
        id="foodSearch"
        type="text"
        placeholder="${labels.placeholder}"
        style="padding:12px;width:100%;box-sizing:border-box;margin:15px 0;"
      >

      <div id="searchResults">${labels.loading}</div>
    `
  });

  const input = document.getElementById("foodSearch");
  const results = document.getElementById("searchResults");

  let requestId = 0;

  async function showResults() {
    const currentRequest = ++requestId;

    try {
      const foods = await searchNutritions(input.value.trim());

      if (currentRequest !== requestId) return;

      if (foods.length === 0) {
        results.textContent = labels.noResults;
        return;
      }

      const table = document.createElement("table");
      table.style.cssText = "width:100%;border-collapse:collapse;";

      const header = document.createElement("tr");

      labels.headers.forEach(label => {
        const th = document.createElement("th");
        th.textContent = label;
        th.style.padding = "10px";
        th.style.textAlign = "left";
        th.style.borderBottom = "2px solid #ddd";
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
          td.textContent = value ?? "";
          td.style.padding = "10px";
          td.style.borderBottom = "1px solid #ddd";
          row.appendChild(td);
        });

        table.appendChild(row);
      });

      results.replaceChildren(table);
    } catch (error) {
      if (currentRequest !== requestId) return;

      results.textContent = labels.error;
      console.error(error);
    }
  }

  input.addEventListener("input", showResults);
  showResults();
}
