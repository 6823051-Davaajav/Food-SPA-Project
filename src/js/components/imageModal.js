
export function renderImageModal() {
  return `
    <div id="imageModal" class="modal">
      <div class="modal-background"></div>

      <div class="modal-content">
        <img
          id="modalImage"
          src=""
          alt="Хүнсний зураг"
        />
      </div>

      <button
        class="modal-close is-large"
        aria-label="Хаах"
        type="button"
      ></button>
    </div>
  `;
}

export function initImageModal() {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");

  if (!modal || !modalImage) return;

  function closeModal() {
    modal.classList.remove("is-active");
    modalImage.removeAttribute("src");
  }

  document.addEventListener("click", (event) => {
    const image = event.target.closest(".food-image");

    if (image) {
      modalImage.src = image.dataset.image;
      modal.classList.add("is-active");
    }

    if (
      event.target.closest(".modal-close") ||
      event.target.classList.contains("modal-background")
    ) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}
