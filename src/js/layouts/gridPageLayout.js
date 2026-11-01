
export function gridPageLayout(items, renderItem) {
  return `
    <div class="grid-page-layout"
         style="display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 24px;
                padding: 24px;">

      ${items.map(item => renderItem(item)).join("")}

    </div>
  `;
}
