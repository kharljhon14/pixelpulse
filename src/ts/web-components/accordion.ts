const styles = new CSSStyleSheet();

styles.replaceSync(`
    .container{
        border: 1px solid #000;
        border-radius: 1.6rem;
        padding: 1rem;
        cursor: pointer;
        background-color: transparent;

        & .title{
            font-size: 1.2rem;
            font-weight: 500;
            padding: 0;
            margin: 0;
        }
    }
`);

export class Accordion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [styles];
      this.shadowRoot.innerHTML = `
      <button class="container">
        <h1 class="title" part="title">${this.getAttribute('title')}</h1>
        <slot></slot>
      </button>
      `;
    }
  }
}
