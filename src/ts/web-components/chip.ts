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
    height: 2rem;
    width: 4rem;
    z-index: 2;
}

.container-bottom{
    border: 1px solid #000;
    position: absolute;
    background-color: #000;
    height: 2rem;
    width: 4rem;
    left: .2rem;
    top: .2rem;
    padding: 0;
    border-radius: 20rem;
    z-index: -1;
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
      <div class="container"><slot></slot></div>
      <div class="container-bottom"></slot>`;

      const containerBottom = this.shadowRoot.querySelector('.container-bottom') as HTMLElement;
      const container = this.shadowRoot.querySelector('.container') as HTMLElement;

      container.style.backgroundColor = this.getAttribute('color') ?? '';

      container.style.height = this.getAttribute('height') + 'rem' ?? '';
      containerBottom.style.height = this.getAttribute('height') + 'rem' ?? '';

      container.style.width = this.getAttribute('width') + 'rem' ?? '';
      containerBottom.style.width = this.getAttribute('width') + 'rem' ?? '';
    }
  }
}
