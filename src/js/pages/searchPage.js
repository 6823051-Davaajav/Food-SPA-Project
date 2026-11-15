
import { getNutritions } from "../services/nutritionService.js";
import { getImages, getFoodImages } from "../services/imageService.js";

import { renderSidebarPageLayout } from "../layouts/sidebarPageLayout.js";

import { renderSearchFoodName } from "../components/searchFoodNameSidebar.js";
import { renderSearchSettings } from "../components/searchSettingsSidebar.js";
import { renderFoodGroupList } from "../components/searchFoodGroupListSidebar.js";

import { filterFoods } from "../fn/foodSearchEvents.js";
import { t, getCurrentLanguage } from "../i18n/i18n.js";
import { renderNutritionTable } from "../components/nutritionTables.js";

import {
  renderImageModal,
  initImageModal
} from "../components/imageModal.js";

export async function renderSearchPage() {
  const app = document.getElementById("app");
  if (!app) return;

  const isEnglish = getCurrentLanguage() === "en";

  const text = (mn, en) => isEnglish ? en : mn;

  const getFoodName = (food) =>
    isEnglish ? (food.nameEn || food.name) : food.name;

  const getFoodGroup = (food) =>
    isEnglish
      ? (food.groupEn || t(`foodGroups.${food.group}`))
      : food.group;

  app.textContent = text(
    "Хүнсний мэдээлэл уншиж байна...",
    "Loading food information..."
  );

  try {
    // 1. Хүнсний мэдээлэл авах
    const foods = await getNutritions();

    // 2. Зургийн мэдээлэл авах
    let images = [];

    try {
      images = await getImages();
    } catch (error) {
      console.warn("Image loading error:", error);
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
      <p>${t("foodSearch.totalFoods")}: ${foods.length}</p>
    `;

    // 5. Үндсэн хэсэг
    const mainContent = `
      <h2>${t("foodSearch.results")}</h2>
      <div id="foodResults"></div>
      <div id="foodDetails" class="mt-5"></div>
      ${renderImageModal()}
    `;

    app.innerHTML = renderSidebarPageLayout({
      sidebarContent,
      mainContent,
      pageTitle: t("foodSearch.title"),
      pageId: "searchPage"
    });

    // 6. Зургийн modal
    initImageModal();

    const searchInput = document.getElementById("foodSearch");
    const searchButton = document.getElementById("searchBtn");
    const results = document.getElementById("foodResults");
    const details = document.getElementById("foodDetails");

    let selectedFood = null;

    // 7. Sidebar цэс нээх, хаах
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

    // 8. Сонгосон checkbox-ууд
    function getSelectedNutritions() {
      return Array.from(
        document.querySelectorAll(
          'input[name="nutrition"]:checked'
        )
      ).map(input => input.value);
    }

    // 9. Дэлгэрэнгүй мэдээлэл
    function showFoodDetails(food) {
      selectedFood = food;
      details.replaceChildren();

      const selected = getSelectedNutritions();

      const title = document.createElement("h3");
      title.className = "title is-4";
      title.textContent =
        `${getFoodName(food)} - ${text(
          "Дэлгэрэнгүй мэдээлэл",
          "Detailed Information"
        )}`;

      const description = document.createElement("p");
      description.textContent = t("foodSearch.unit");

      details.append(title, description);

      // 10. Хоёр хэлтэй шим тэжээлийн хүснэгт
      const nutritionContainer = document.createElement("div");
      nutritionContainer.innerHTML = renderNutritionTable(food);

      const nutritionTable =
        nutritionContainer.querySelector("table");

      if (nutritionTable) {
        // Үндсэн найрлагыг сонгоогүй бол
        // илчлэг, уураг, өөх тос, нүүрс усыг нуух
        if (!selected.includes("proximates")) {
          const rows = nutritionTable.querySelectorAll("tr");

          rows.forEach((row, index) => {
            if (index >= 2) {
              row.remove();
            }
          });
        }
      }

      details.appendChild(nutritionContainer);

      // 11. Нэмэлт мэдээлэл
      const optionalGroups = [
        ["minerals", food.minerals],
        ["vitamins", food.vitamins],
        ["collection_information", food.collection_information],
        ["edible_inedible_part", food.edible_inedible_part],
        ["pretreatment_conditions", food.pretreatment_conditions],
        ["description", food.description]
      ];

      const selectedOptional = optionalGroups.filter(
        ([key]) => selected.includes(key)
      );

      if (selectedOptional.length > 0) {
        const extraTable = document.createElement("table");
        extraTable.className =
          "table is-fullwidth is-bordered mt-4";

        selectedOptional.forEach(([key, value]) => {
          const row = document.createElement("tr");

          const th = document.createElement("th");
          th.textContent = t(`searchSettings.${key}`);

          const td = document.createElement("td");

          if (value == null || value === "") {
            td.textContent = text(
              "Мэдээлэл оруулаагүй",
              "No information available"
            );
          } else if (typeof value === "object") {
            td.textContent = JSON.stringify(value, null, 2);
          } else {
            td.textContent = String(value);
          }

          row.append(th, td);
          extraTable.appendChild(row);
        });

        details.appendChild(extraTable);
      }

      // 12. Хүнсний зураг
      if (selected.includes("images")) {
        const imageTitle = document.createElement("h4");
        imageTitle.className = "title is-5 mt-4";
        imageTitle.textContent = t("foodSearch.image");

        details.appendChild(imageTitle);

        const foodImages = getFoodImages(images, food.id);

        if (foodImages.length === 0) {
          const message = document.createElement("p");
          message.textContent = text(
            "Зураг оруулаагүй.",
            "No images available."
          );

          details.appendChild(message);
        } else {
          const imageList = document.createElement("div");
          imageList.className = "food-image-list";

          foodImages.forEach(item => {
            const image = document.createElement("img");

            image.src = item.image;
            image.alt = getFoodName(food);
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
                  text(
                    "Зураг ачаалж чадсангүй.",
                    "Failed to load image."
                  )
                )
              );
            };

            imageList.appendChild(image);
          });

          details.appendChild(imageList);
        }
      }
    }

    // 13. Хүнсний нэр болон бүлгээр хайх
    function displayFoods(keyword = "") {
      const searchText = keyword.trim().toLowerCase();

      const selectedGroups = Array.from(
        document.querySelectorAll(
          'input[name="foodgroup"]:checked'
        )
      ).map(input => input.value);

      const filtered = filterFoods(
        foods,
        searchText,
        selectedGroups
      );

      results.replaceChildren();
      details.replaceChildren();
      selectedFood = null;

      if (filtered.length === 0) {
        results.textContent = t("foodSearch.noResults");
        return;
      }

      // 14. Үр дүнгийн хүснэгт
      const table = document.createElement("table");
      table.className =
        "table is-fullwidth is-striped is-hoverable app-tbl";

      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");

      [
        "№",
        t("foodSearch.foodName"),
        text("Код", "Code")
      ].forEach(label => {
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
        nameButton.textContent = getFoodName(food);

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

    // 15. Нэрээр хайх
    searchInput?.addEventListener("input", () => {
      displayFoods(searchInput.value);
    });

    searchButton?.addEventListener("click", () => {
      displayFoods(searchInput?.value ?? "");
    });

    // 16. Бүлгээр шүүх
    document.querySelectorAll(
      'input[name="foodgroup"]'
    ).forEach(checkbox => {
      checkbox.addEventListener("change", () => {
        displayFoods(searchInput?.value ?? "");
      });
    });

    // 17. Найрлагын checkbox өөрчлөгдөх
    document.querySelectorAll(
      'input[name="nutrition"]'
    ).forEach(checkbox => {
      checkbox.addEventListener("change", () => {
        if (selectedFood) {
          showFoodDetails(selectedFood);
        }
      });
    });

    // 18. Эхний хүснэгтийг харуулах
    displayFoods();

  } catch (error) {
    console.error(error);

    app.textContent = text(
      "Хүнсний мэдээлэл уншихад алдаа гарлаа.",
      "Failed to load food information."
    );
  }
}
