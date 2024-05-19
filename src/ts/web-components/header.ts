const styles = new CSSStyleSheet();

styles.replaceSync(`
:host{
    display: flex;
    border-bottom: 1px solid #000;
    background-color: #FFF;
    position: fixed;
    left: 0;
    right: 0;
    margin-left: 4.5rem;
    padding-left: 2rem;
    height: 4.5rem;
    align-items: center;
    justify-content: space-between;
    z-index: 5;
}

a {
  text-decoration: none;
  color: #000;
  transition: all .4s ease;

  & h1{
    padding: 0;
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: .2rem;
  } 
}

a:hover {
  transform: translateX(.2rem);
}

.header-cta{
    background-color: #f3c4cd;
    height: 100%;
    min-width: 14rem;
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

@media(max-width: 1220px){
  :host{
    margin-left: 0rem;
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
        <a href="/"><h1>PixelPulse</h1></a>
        <div class="header-cta"><slot></slot></div>
      `;
    }
  }
}
