
import { renderPageLayout } from "../layouts/pageLayout.js";
import { t } from "../i18n/i18n.js";
import { getNutritions } from "../services/nutritionService.js";

export async function renderCalculationPage() {
  const app = document.getElementById("app");

  const isEnglish = t("calculation") === "Calculator";

  const labels = isEnglish
    ? {
        food: "Select food:",
        grams: "Amount (grams):",
        button: "Calculate",
        invalid: "Please enter a valid amount.",
        error: "Error loading food data.",
        loading: "Loading food data...",
        gramUnit: "grams",
        energy: "Energy",
        protein: "Protein",
        fat: "Fat",
        carbs: "Carbohydrates",
        kcal: "kcal",
        g: "g"
      }
    : {
        food: "Хүнс сонгох:",
        grams: "Хэмжээ (грамм):",
        button: "Тооцоолох",
        invalid: "Зөв хэмжээ оруулна уу.",
        error: "Хүнсний мэдээлэл уншихад алдаа гарлаа.",
        loading: "Хүнсний мэдээлэл ачаалж байна...",
        gramUnit: "грамм",
        energy: "Илчлэг",
        protein: "Уураг",
        fat: "Өөх тос",
        carbs: "Нүүрс ус",
        kcal: "ккал",
        g: "г"
      };

  app.innerHTML = renderPageLayout({
    id: "calculation",
    title: t("calculation"),
    content: `
      <label for="foodSelect">${labels.food}</label>

      <select
        id="foodSelect"
        style="width:100%;padding:12px;margin:10px 0;"
      ></select>

      <label for="grams">${labels.grams}</label>

      <input
        id="grams"
        type="number"
        min="1"
        value="100"
        style="width:100%;padding:12px;margin:10px 0;box-sizing:border-box;"
      >

      <button
        id="calculateBtn"
        style="padding:12px 20px;background:#16834a;color:white;border:0;border-radius:8px;cursor:pointer;"
      >
        ${labels.button}
      </button>

      <div id="calculationResult" style="margin-top:24px;"></div>
    `
  });

  const select = document.getElementById("foodSelect");
  const result = document.getElementById("calculationResult");
  const button = document.getElementById("calculateBtn");

  result.textContent = labels.loading;
  button.disabled = true;

  try {
    const foods = await getNutritions();

    // Хэрэглэгч өөр хуудас руу шилжсэн бол зогсооно.
    if (!select.isConnected) return;

    foods.forEach(food => {
      const option = document.createElement("option");
      option.value = food.id;
      option.textContent = food.name;
      select.appendChild(option);
    });

    result.textContent = "";
    button.disabled = false;

    button.addEventListener("click", () => {
      const food = foods.find(
        item => String(item.id) === select.value
      );

      const grams = Number(
        document.getElementById("grams").value
      );

      if (!food || !Number.isFinite(grams) || grams <= 0) {
        result.textContent = labels.invalid;
        return;
      }

      const factor = grams / 100;

      const calculate = value =>
        (Number(value) * factor).toFixed(2);

      result.replaceChildren();

      const heading = document.createElement("h3");
      heading.textContent =
        `${food.name} — ${grams} ${labels.gramUnit}`;

      result.appendChild(heading);

      const nutrients = [
        [labels.energy, calculate(food.energy), labels.kcal],
        [labels.protein, calculate(food.protein), labels.g],
        [labels.fat, calculate(food.fat), labels.g],
        [labels.carbs, calculate(food.carbohydrate), labels.g]
      ];

      nutrients.forEach(([name, value, unit]) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = `${name}: ${value} ${unit}`;
        result.appendChild(paragraph);
      });
    });
  } catch (error) {
    if (result.isConnected) {
      result.textContent = labels.error;
    }
    console.error(error);
  }
}
