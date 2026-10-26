
import { renderPageLayout } from "../layouts/pageLayout.js";
import { t } from "../i18n/i18n.js";

export function renderBooksPage() {
  const books = [
    {
      name: "Монгол орны хүнсний бүтээгдэхүүний найрлага",
      author: "Хүнсний найрлагын судалгааны материал",
      year: "2020",
      description: "Хүнсний илчлэг, уураг, өөх тос, нүүрс усны мэдээлэл."
    },
    {
      name: "Хоол тэжээлийн үндэс",
      author: "Сургалтын материал",
      year: "2021",
      description: "Зөв хооллолт болон шим тэжээлийн үндсэн ойлголтууд."
    },
    {
      name: "Эрүүл хооллолтын зөвлөмж",
      author: "Мэдээллийн материал",
      year: "2022",
      description: "Өдөр тутмын хоол хүнсээ зөв сонгох зөвлөмж."
    }
  ];

  const content = `
    <p>Хүнс, хоол тэжээлийн чиглэлийн жишиг номын жагсаалт</p>
    <div style="display:grid;gap:15px;margin-top:20px;">
      ${books.map(book => `
        <div style="padding:18px;border:1px solid #ddd;border-radius:10px;">
          <h3>${book.name}</h3>
          <p><b>Эх сурвалж:</b> ${book.author}</p>
          <p><b>Он:</b> ${book.year}</p>
          <p>${book.description}</p>
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
