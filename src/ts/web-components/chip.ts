const styles = new CSSStyleSheet();

styles.replaceSync(`
:host{
    display: inline-block;
    position: relative;
}

.container{
    border: 1px solid #000;
    border-radius: 20rem;
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
    border-radius: 20rem;
    transition: all .3s ease;
}

`);

export class Chip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [styles];
      this.shadowRoot.innerHTML = `
      <div part="container" class="container"><slot></slot></div>
      <div part="container-bottom" class="container-bottom"></slot>`;

      const container = this.shadowRoot.querySelector('.container') as HTMLElement;

      container.style.backgroundColor = this.getAttribute('color') ?? '';
    }
  }
}
