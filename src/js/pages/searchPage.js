
import { getNutritions } from "../services/nutritionService.js";
import { getImages, getFoodImages } from "../services/imageService.js";

import { renderSidebarPageLayout } from "../layouts/sidebarPageLayout.js";

import { renderSearchFoodName } from "../components/searchFoodNameSidebar.js";
import { renderSearchSettings } from "../components/searchSettingsSidebar.js";
import { renderFoodGroupList } from "../components/searchFoodGroupListSidebar.js";

import {
  renderImageModal,
  initImageModal
} from "../components/imageModal.js";

export async function renderSearchPage() {
  const app = document.getElementById("app");

  if (!app) return;

  app.textContent = "Хүнсний мэдээлэл уншиж байна...";

  try {
    // 1. Хүнсний мэдээлэл унших
    const foods = await getNutritions();

    // 2. Зургийн мэдээлэл унших
    let images = [];

    try {
      images = await getImages();
    } catch (error) {
      console.warn("Зургийн мэдээлэл уншихад алдаа:", error);
    }

    // 3. Хүнсний бүлгүүд
    const foodGroups = [
      ...new Set(foods.map(food => food.group))
    ].filter(Boolean);

    // 4. Sidebar
    const sidebarContent = `
      ${renderSearchFoodName()}
      ${renderSearchSettings()}
      ${renderFoodGroupList(foodGroups)}
      <p>Нийт хүнс: ${foods.length}</p>
    `;

    // 5. Үндсэн агуулга
    const mainContent = `
      <h2>Хүнсний найрлагын мэдээлэл</h2>
      <div id="foodResults"></div>
      <div id="foodDetails" class="mt-5"></div>
      ${renderImageModal()}
    `;

    app.innerHTML = renderSidebarPageLayout({
      sidebarContent,
      mainContent,
      pageTitle: "Хүнсний мэдээллийн сан",
      pageId: "searchPage"
    });

    // 6. Зургийн modal идэвхжүүлэх
    initImageModal();

    const searchInput = document.getElementById("foodSearch");
    const searchButton = document.getElementById("searchBtn");
    const results = document.getElementById("foodResults");
    const details = document.getElementById("foodDetails");

    let selectedFood = null;

    // 7. Зүүн талын цэс нээх, хаах
    document.querySelectorAll(".app-toggle-sublist")
      .forEach(toggle => {
        toggle.addEventListener("click", event => {
          event.preventDefault();

          const sublist = toggle.nextElementSibling;

          if (sublist) {
            sublist.classList.toggle("is-hidden");
          }
        });
      });

    // 8. Дэлгэрэнгүй мэдээлэл
    function showFoodDetails(food) {
      selectedFood = food;
      details.replaceChildren();

      const title = document.createElement("h3");
      title.className = "title is-4";
      title.textContent =
        `${food.name} - Дэлгэрэнгүй мэдээлэл`;

      const description = document.createElement("p");
      description.textContent = "100 грамм хүнсний найрлага";

      const table = document.createElement("table");
      table.className = "table is-fullwidth is-bordered";

      const information = [
        ["Хүнсний нэр", food.name],
        ["Англи нэр", food.nameEn],
        ["Хүнсний бүлэг", food.group]
      ];

      // Сонгосон найрлагын мэдээлэл
      const selected = Array.from(
        document.querySelectorAll(
          'input[name="nutrition"]:checked'
        )
      ).map(input => input.value);

      const formatValue = (value, unit = "") => {
        if (value == null || value === "") {
          return "Мэдээлэл оруулаагүй";
        }

        return `${value}${unit}`;
      };

      // Үндсэн найрлага
      if (selected.includes("proximates")) {
        information.push(
          ["Илчлэг", formatValue(food.energy, " ккал")],
          ["Уураг", formatValue(food.protein, " г")],
          ["Өөх тос", formatValue(food.fat, " г")],
          ["Нүүрс ус", formatValue(food.carbohydrate, " г")]
        );
      }

      // Нэмэлт мэдээлэл
      const optionalGroups = [
        ["minerals", "Эрдэс бодис", food.minerals],
        ["vitamins", "Амин дэм", food.vitamins],
        [
          "collection_information",
          "Цуглуулсан мэдээлэл",
          food.collection_information
        ],
        [
          "edible_inedible_part",
          "Идэх боломжтой хэсэг",
          food.edible_inedible_part
        ],
        [
          "pretreatment_conditions",
          "Урьдчилсан боловсруулалт",
          food.pretreatment_conditions
        ],
        ["description", "Тайлбар", food.description]
      ];

      optionalGroups.forEach(([key, label, value]) => {
        if (!selected.includes(key)) return;

        const displayValue =
          value == null || value === ""
            ? "Мэдээлэл оруулаагүй"
            : typeof value === "object"
              ? JSON.stringify(value)
              : String(value);

        information.push([label, displayValue]);
      });

      // Хүснэгт байгуулах
      information.forEach(([label, value]) => {
        const row = document.createElement("tr");

        const th = document.createElement("th");
        th.textContent = label;

        const td = document.createElement("td");
        td.textContent = value ?? "";

        row.append(th, td);
        table.appendChild(row);
      });

      details.append(title, description, table);

      // 9. Хүнсний зураг
      if (selected.includes("images")) {
        const imageTitle = document.createElement("h4");
        imageTitle.className = "title is-5 mt-4";
        imageTitle.textContent = "Хүнсний зураг";

        details.appendChild(imageTitle);

        const foodImages = getFoodImages(images, food.id);

        if (foodImages.length === 0) {
          const message = document.createElement("p");
          message.textContent = "Зураг оруулаагүй.";
          details.appendChild(message);
        } else {
          const imageList = document.createElement("div");
          imageList.className = "food-image-list";

          foodImages.forEach(item => {
            const image = document.createElement("img");

            image.src = item.image;
            image.alt = food.name;
            image.className = "food-image";
            image.dataset.image = item.image;

            image.style.width = "250px";
            image.style.maxWidth = "100%";
            image.style.height = "auto";
            image.style.cursor = "pointer";
            image.style.borderRadius = "8px";
            image.style.margin = "10px 10px 10px 0";

            image.onerror = () => {
              image.replaceWith(
                document.createTextNode(
                  "Зураг ачаалж чадсангүй."
                )
              );
            };

            imageList.appendChild(image);
          });

          details.appendChild(imageList);
        }
      }
    }

    // 10. Хүнсний нэр болон бүлгээр хайх
    function displayFoods(keyword = "") {
      const searchText = keyword.trim().toLowerCase();

      const selectedGroups = Array.from(
        document.querySelectorAll(
          'input[name="foodgroup"]:checked'
        )
      ).map(input => input.value);

      const filtered = foods.filter(food => {
        const matchesName =
          (food.name ?? "")
            .toLowerCase()
            .includes(searchText) ||
          (food.nameEn ?? "")
            .toLowerCase()
            .includes(searchText);

        const matchesGroup =
          selectedGroups.length === 0 ||
          selectedGroups.includes(food.group);

        return matchesName && matchesGroup;
      });

      results.replaceChildren();
      details.replaceChildren();
      selectedFood = null;

      if (filtered.length === 0) {
        results.textContent = "Илэрц олдсонгүй.";
        return;
      }

      // Хүснэгт
      const table = document.createElement("table");
      table.className =
        "table is-fullwidth is-striped is-hoverable app-tbl";

      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");

      ["№", "Хүнсний нэр", "Код"].forEach(label => {
        const th = document.createElement("th");
        th.textContent = label;
        headerRow.appendChild(th);
      });

      thead.appendChild(headerRow);

      const tbody = document.createElement("tbody");

      filtered.forEach((food, index) => {
        const row = document.createElement("tr");

        const numberCell = document.createElement("td");
        numberCell.textContent = index + 1;

        const nameCell = document.createElement("td");

        const nameButton = document.createElement("button");
        nameButton.type = "button";
        nameButton.className = "button is-text";
        nameButton.textContent = food.name;

        nameButton.addEventListener("click", () => {
          showFoodDetails(food);
        });

        nameCell.appendChild(nameButton);

        const codeCell = document.createElement("td");
        codeCell.textContent = food.id;

        row.append(numberCell, nameCell, codeCell);
        tbody.appendChild(row);
      });

      table.append(thead, tbody);
      results.appendChild(table);
    }

    // 11. Нэрээр хайх
    searchInput?.addEventListener("input", () => {
      displayFoods(searchInput.value);
    });

    searchButton?.addEventListener("click", () => {
      displayFoods(searchInput?.value ?? "");
    });

    // 12. Бүлгээр шүүх
    document.querySelectorAll(
      'input[name="foodgroup"]'
    ).forEach(checkbox => {
      checkbox.addEventListener("change", () => {
        displayFoods(searchInput?.value ?? "");
      });
    });

    // 13. Checkbox өөрчлөгдөхөд шинэчлэх
    document.querySelectorAll(
      'input[name="nutrition"]'
    ).forEach(checkbox => {
      checkbox.addEventListener("change", () => {
        if (selectedFood) {
          showFoodDetails(selectedFood);
        }
      });
    });

    // 14. Эхний хүснэгтийг харуулах
    displayFoods();

  } catch (error) {
    console.error(error);
    app.textContent =
      "Хүнсний мэдээлэл уншихад алдаа гарлаа.";
  }
}
