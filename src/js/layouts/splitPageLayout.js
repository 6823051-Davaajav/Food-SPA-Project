
export function splitPageLayout(leftContent, rightContent) {
  return `
    <div class="split-page-layout"
         style="display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 24px;
                padding: 24px;">

      <section class="left-content">
        ${leftContent}
      </section>

      <section class="right-content">
        ${rightContent}
      </section>

    </div>
  `;
}
