const styles = new CSSStyleSheet();

styles.replaceSync(`
:host{
    display: inline-block;
    position: relative;
}

:host(:hover) .container{
    transform: translate(.15rem, .15rem);
}

:host(:hover) .container-bottom{
    opacity: 0;
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
    height: 2.8rem;
    width: 2.8rem;
}

.container-bottom{
    border: 1px solid #000;
    position: absolute;
    background-color: #000;
    height: 2.7rem;
    width: 2.7rem;
    left: .2rem;
    top: .2rem;
    padding: 0;
    border-radius: 12px;
    z-index: -2;
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

      containerBottom.style.backgroundColor = this.getAttribute('bottom-color') ?? '';
    }
  }
}
