
import { renderPageLayout } from "../layouts/pageLayout.js";
import { t } from "../i18n/i18n.js";
import { getNutritions } from "../services/nutritionService.js";

export async function renderCalculationPage() {
  const app = document.getElementById("app");

  app.innerHTML = renderPageLayout({
    id: "calculation",
    title: t("calculation"),
    content: `
      <label for="foodSelect">Хүнс сонгох:</label>
      <select id="foodSelect" style="width:100%;padding:12px;margin:10px 0;"></select>

      <label for="grams">Хэмжээ (грамм):</label>
      <input id="grams" type="number" min="1" value="100"
        style="width:100%;padding:12px;margin:10px 0;box-sizing:border-box;">

      <button id="calculateBtn"
        style="padding:12px 20px;background:#16834a;color:white;border:0;border-radius:8px;cursor:pointer;">
        Тооцоолох
      </button>

      <div id="calculationResult" style="margin-top:24px;"></div>
    `
  });

  const select = document.getElementById("foodSelect");
  const result = document.getElementById("calculationResult");

  try {
    const foods = await getNutritions();

    foods.forEach((food) => {
      const option = document.createElement("option");
      option.value = food.id;
      option.textContent = food.name;
      select.appendChild(option);
    });

    document.getElementById("calculateBtn").addEventListener("click", () => {
      const food = foods.find((item) => String(item.id) === select.value);
      const grams = Number(document.getElementById("grams").value);

      if (!food || !Number.isFinite(grams) || grams <= 0) {
        result.textContent = "Зөв хэмжээ оруулна уу.";
        return;
      }

      const factor = grams / 100;
      const calculate = (value) => (value * factor).toFixed(2);

      result.innerHTML = `
        <h3>${food.name} — ${grams} грамм</h3>
        <p>Илчлэг: ${calculate(food.energy)} ккал</p>
        <p>Уураг: ${calculate(food.protein)} г</p>
        <p>Өөх тос: ${calculate(food.fat)} г</p>
        <p>Нүүрс ус: ${calculate(food.carbohydrate)} г</p>
      `;
    });
  } catch (error) {
    result.textContent = "Хүнсний мэдээлэл уншихад алдаа гарлаа.";
  }
}
