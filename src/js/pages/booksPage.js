
import { renderPageLayout } from "../layouts/pageLayout.js";
import { t } from "../i18n/i18n.js";

export function renderBooksPage() {
  const isEnglish = t("books") === "Books";

  const books = [
    {
      name: {
        mn: "Монгол орны хүнсний бүтээгдэхүүний найрлага",
        en: "Food Composition of Mongolia"
      },
      author: {
        mn: "Хүнсний найрлагын судалгааны материал",
        en: "Food Composition Research Material"
      },
      year: "2020",
      description: {
        mn: "Хүнсний илчлэг, уураг, өөх тос, нүүрс усны мэдээлэл.",
        en: "Information about food energy, protein, fat, and carbohydrates."
      }
    },
    {
      name: {
        mn: "Хоол тэжээлийн үндэс",
        en: "Fundamentals of Nutrition"
      },
      author: {
        mn: "Сургалтын материал",
        en: "Educational Material"
      },
      year: "2021",
      description: {
        mn: "Зөв хооллолт болон шим тэжээлийн үндсэн ойлголтууд.",
        en: "Basic concepts of healthy eating and nutrition."
      }
    },
    {
      name: {
        mn: "Эрүүл хооллолтын зөвлөмж",
        en: "Healthy Eating Guidelines"
      },
      author: {
        mn: "Мэдээллийн материал",
        en: "Informational Material"
      },
      year: "2022",
      description: {
        mn: "Өдөр тутмын хоол хүнсээ зөв сонгох зөвлөмж.",
        en: "Recommendations for making healthy daily food choices."
      }
    }
  ];

  const language = isEnglish ? "en" : "mn";

  const labels = isEnglish
    ? {
        intro: "Sample list of books and materials about food and nutrition",
        source: "Source",
        year: "Year"
      }
    : {
        intro: "Хүнс, хоол тэжээлийн чиглэлийн жишиг номын жагсаалт",
        source: "Эх сурвалж",
        year: "Он"
      };

  const content = `
    <p>${labels.intro}</p>

    <div style="display:grid;gap:15px;margin-top:20px;">
      ${books.map(book => `
        <div style="
          padding:18px;
          border:1px solid #ddd;
          border-radius:10px;
        ">
          <h3>${book.name[language]}</h3>

          <p>
            <b>${labels.source}:</b>
            ${book.author[language]}
          </p>

          <p>
            <b>${labels.year}:</b>
            ${book.year}
          </p>

          <p>${book.description[language]}</p>
        </div>
      `).join("")}
    </div>
  `;

  document.getElementById("app").innerHTML =
    renderPageLayout({
      id: "books",
      title: t("books"),
      content
    });
}
