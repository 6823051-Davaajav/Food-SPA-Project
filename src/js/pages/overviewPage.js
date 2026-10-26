
import { renderPageLayout } from "../layouts/pageLayout.js";
import { t, getLanguage } from "../i18n/i18n.js";

export function renderOverviewPage() {
  const en = getLanguage() === "en";

  const content = en ? `
    <h2>About the system</h2>
    <p>Mongolian Food Composition is a web application
    that provides information about food nutrients.</p>

    <h2>Main features</h2>
    <ul>
      <li>Search for food composition data</li>
      <li>Calculate calories based on food weight</li>
      <li>Explore nutrition reference materials</li>
      <li>Send feedback using the contact form</li>
    </ul>

    <h2>Example foods</h2>
    <p>Milk, beef and white rice.</p>

    <h2>How to use</h2>
    <p>Open Search to find foods, or use Calculator
    to calculate nutritional values by weight.</p>
  ` : `
    <h2>Системийн танилцуулга</h2>
    <p>Монгол хүнсний найрлага нь хүнсний бүтээгдэхүүний
    илчлэг болон шим тэжээлийн мэдээллийг харах,
    хайх, тооцоолох зориулалттай веб систем юм.</p>

    <h2>Үндсэн боломжууд</h2>
    <ul>
      <li>Хүнсний бүтээгдэхүүний мэдээлэл хайх</li>
      <li>Хэмжээгээр илчлэг, шим тэжээл тооцоолох</li>
      <li>Хоол тэжээлийн ном, материал үзэх</li>
      <li>Санал хүсэлт илгээх форм ашиглах</li>
    </ul>

    <h2>Хүнсний мэдээллийн жишээ</h2>
    <div style="display:grid;gap:12px;margin-top:15px;">
      <div style="padding:15px;border:1px solid #ddd;border-radius:10px;">
        <b>🥛 Сүү</b> — 100 граммд 61 ккал
      </div>
      <div style="padding:15px;border:1px solid #ddd;border-radius:10px;">
        <b>🥩 Үхрийн мах</b> — 100 граммд 250 ккал
      </div>
      <div style="padding:15px;border:1px solid #ddd;border-radius:10px;">
        <b>🍚 Цагаан будаа</b> — 100 граммд 130 ккал
      </div>
    </div>

    <h2>Ашиглах заавар</h2>
    <p><b>Хайлт:</b> Хүнсний нэр бичиж мэдээллийг харна.</p>
    <p><b>Тооцоолуур:</b> Хүнс сонгож, граммын хэмжээг
    оруулаад илчлэгийг тооцоолно.</p>
  `;

  document.getElementById("app").innerHTML =
    renderPageLayout({
      id: "overview",
      title: t("overview"),
      content
    });
}
