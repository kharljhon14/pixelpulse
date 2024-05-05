const styles = new CSSStyleSheet();

styles.replaceSync(`
:host{
    display: flex;
    border-bottom: 1px solid #000;
    background-color: #FFF;
    position: fixed;
    width: 100vw;
    padding-left: 7rem;
    height: 4.5rem;
    align-items: center;
    justify-content: space-between;
}

h1{
    padding: 0;
    font-size: 1.2rem;
}

.header-cta{
    background-color: #f3c4cd;
    height: 100%;
    min-width: 13rem;
    border-left: 1px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;

    & ::slotted(*){
        margin-right: 1rem;
        z-index: 2;
      }
  
      & ::slotted(:last-child){
          margin-right: 0;
      }
}
`);

export class Header extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [styles];
      this.shadowRoot.innerHTML = `
        <h1>PixelPulse</h1>
        <div class="header-cta"><slot></slot></div>
      `;
    }
  }
}
