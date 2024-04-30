const styles = new CSSStyleSheet();

styles.replaceSync(`
  .toggle-btn{
      height: 1.6rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      background-color: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      & .toggle-line{
          width: 2rem;
          height: 2px;
          background-color: #000;
          transition: all .4s ease;
      }

      & .toggle-line:nth-child(2){
        transition-delay: .4s;
        transform-origin: right;
      }
  }

  .toggle-btn[open]{
    & .toggle-line:nth-child(1){
      transform: rotateZ(45deg) translateX(.5rem) translateY(.5rem);
      transition-delay: .4s;
    }

    & .toggle-line:nth-child(2){

      transition-delay: 0s;
      transform: scale(0);
    }

    & .toggle-line:nth-child(3){
      transform: rotateZ(-45deg) translateX(.5rem) translateY(-.5rem);
      transition-delay: .4s;
    }
  }
`);

export default class SideBar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [styles];
      this.shadowRoot.innerHTML = `
        <button class="toggle-btn">
          <div class="toggle-line"></div>
          <div class="toggle-line"></div>
          <div class="toggle-line"></div>
        </button>
      `;

      const button = this.shadowRoot.querySelector('.toggle-btn');

      button?.addEventListener('click', () => {
        button.toggleAttribute('open');
      });
    }
  }
}
