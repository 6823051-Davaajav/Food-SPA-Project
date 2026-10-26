
import { renderPageLayout } from "../layouts/pageLayout.js";
import { t } from "../i18n/i18n.js";

export function renderContactPage() {
  const en = t("contact") === "Contact";

  const content = `
    <p>${en
      ? "Send us your feedback or questions."
      : "Санал хүсэлтээ бидэнд илгээнэ үү."}</p>

    <form id="contactForm"
      style="display:grid;gap:15px;margin-top:20px;">

      <label>
        ${en ? "Your name:" : "Таны нэр:"}
        <input type="text" id="contactName" required
          style="width:100%;padding:12px;box-sizing:border-box;">
      </label>

      <label>
        ${en ? "Email address:" : "Имэйл хаяг:"}
        <input type="email" id="contactEmail" required
          style="width:100%;padding:12px;box-sizing:border-box;">
      </label>

      <label>
        ${en ? "Message:" : "Санал хүсэлт:"}
        <textarea id="contactMessage" required rows="5"
          style="width:100%;padding:12px;box-sizing:border-box;"></textarea>
      </label>

      <button type="submit"
        style="background:#16834a;color:white;border:0;
        padding:12px;border-radius:8px;cursor:pointer;">
        ${en ? "Send Message" : "Илгээх"}
      </button>
    </form>

    <p id="contactResult" role="status"></p>
  `;

  document.getElementById("app").innerHTML =
    renderPageLayout({
      id: "contact",
      title: t("contact"),
      content
    });

  document.getElementById("contactForm")
    .addEventListener("submit", function(event) {
      event.preventDefault();

      const name = document
        .getElementById("contactName")
        .value.trim();

      document.getElementById("contactResult").textContent =
        en
          ? `Thank you, ${name}! Your message has been validated in this form.`
          : `Баярлалаа, ${name}! Таны санал хүсэлтийг форм дээр шалгалаа.`;

      this.reset();
    });
}
