const styles = new CSSStyleSheet();

styles.replaceSync(`
:host{
    position: relative;
}

:host(:hover) .container{
    transform: translate(.3rem, .3rem);
}

.container{
    border: 1px solid #000;
    border-radius: 12px;
    padding: 1rem;
    cursor: pointer;
    text-align: center;
    background-color: #FFF;
    transition: all .4s ease;
}

.container-bottom{
    border: 1px solid #000;
    position: absolute;
    background-color: #000;
    width: 97%;
    height: 97%;
    left: .3rem;
    top: .3rem;
    padding: 0;
    border-radius: 12px;
    z-index: -2;
}
`);

export class Button extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [styles];
      this.shadowRoot.innerHTML = `
      <button class="container">
        <span>TEST</span>
      </button>
      <div class="container-bottom"></div>
      `;

      const containerBottom = this.shadowRoot.querySelector('.container-bottom') as HTMLElement;

      containerBottom.style.backgroundColor = this.getAttribute('bottom-color') ?? '';
    }
  }
}
