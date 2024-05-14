const styles = new CSSStyleSheet();

styles.replaceSync(`
:host{
    display: inline-block;
    position: relative;
}

.card{
    border: 1px solid #000;
    border-radius: 1.6rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    background-color: #FFF;
    transition: all .3s ease;
    position: relative;
    z-index: 2;
}

.card-bottom{
    border: 1px solid #000;
    position: absolute;
    background-color: #000;
    height: 100%;
    width: 100%;
    left: .2rem;
    top: .2rem;
    border-radius: 1.6rem;
    transition: all .3s ease;
}

`);

export class Card extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [styles];
      this.shadowRoot.innerHTML = `
        <div part="content" name="content" class="card">
            <slot></slot>
        </div>
        <div class="card-bottom"></div>
      `;

      const card = this.shadowRoot.querySelector('.card') as HTMLElement;

      card.style.backgroundColor = this.getAttribute('color') ?? '';
    }
  }
}
