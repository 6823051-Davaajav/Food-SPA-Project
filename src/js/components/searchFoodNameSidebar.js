
export function renderSearchFoodName() {
  return `
    <div class="search-food-name">
      <h3>🔍 Хүнсний нэрээр хайх</h3>

      <input
        type="text"
        id="foodSearch"
        placeholder="Хүнсний нэр оруулах..."
        class="search-input"
      />

      <button id="searchBtn" type="button">
        Хайх
      </button>
    </div>
  `;
}
