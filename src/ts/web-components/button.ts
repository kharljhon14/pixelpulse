const styles = new CSSStyleSheet();

styles.replaceSync(`
:host{
    display: inline-block;
    position: relative;
    min-width: 3rem;
}

:host(:hover) .container{
    transform: translate(.2rem, .2rem);
}

:host(:hover) .container-bottom{
  
}

.container{
    border: 1px solid #000;
    border-radius: 12px;
    padding: 1rem;
    cursor: pointer;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFF;
    transition: all .3s ease;
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 2;
}

.container-bottom{
    border: 1px solid #000;
    position: absolute;
    background-color: #000;
    height: 100%;
    width: 100%;
    left: .2rem;
    top: .2rem;
    padding: 0;
    border-radius: 12px;
    transition: all .3s ease;
}

span{
    font-size: 1rem;
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
        <span><slot></slot></span>
      </button>
      <div class="container-bottom"></div>
      `;

      const containerBottom = this.shadowRoot.querySelector('.container-bottom') as HTMLElement;
      const container = this.shadowRoot.querySelector('.container') as HTMLElement;

      container.style.backgroundColor = this.getAttribute('color') ?? '';
      containerBottom.style.backgroundColor = this.getAttribute('bottom-color') ?? '';
    }
  }
}
