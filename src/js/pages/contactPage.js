import { renderPageLayout } from "../layouts/pageLayout.js";
import { t } from "../i18n/i18n.js";
export function renderContactPage() {
  document.getElementById("app").innerHTML = renderPageLayout({
    id: "contact",
    title: t("contact"),
    content: t("contactText"),
  });
}
