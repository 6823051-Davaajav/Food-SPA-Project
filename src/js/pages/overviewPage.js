import { renderPageLayout } from "../layouts/pageLayout.js";
import { t } from "../i18n/i18n.js";

export function renderOverviewPage() {
  const en = t("overview") === "Overview";

  const content = en
    ? `
      <p>Welcome to the Mongolian Food Composition website.</p>
      <p>
        This website provides information about food energy,
        protein, fat, and carbohydrates.
      </p>
      <p>You can search for foods and calculate their nutritional values.</p>
    `
    : `
      <p>Монгол хүнсний найрлагын мэдээллийн санд тавтай морилно уу.</p>
      <p>
        Энэхүү веб сайт нь хүнсний бүтээгдэхүүний илчлэг,
        уураг, өөх тос, нүүрс усны мэдээллийг харуулна.
      </p>
      <p>
        Та хүнсний бүтээгдэхүүн хайж, сонгосон хэмжээний
        шим тэжээлийн үзүүлэлтийг тооцоолох боломжтой.
      </p>
    `;

  document.getElementById("app").innerHTML = renderPageLayout({
    id: "overview",
    title: t("overview"),
    content: content
  });
}
