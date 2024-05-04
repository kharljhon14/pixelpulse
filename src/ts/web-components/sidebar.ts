const styles = new CSSStyleSheet();

styles.replaceSync(`
  :host{
    display: flex;
    flex-direction: column;
    position: fixed;
    max-width: 5rem;
    width: 5rem;
    height: 100vh;
    padding: 2rem 1.4rem;
    border-right: 1px solid #000;
    overflow: hidden;

  }

  .toggle-btn{
      height: 1.56rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      & .toggle-line{
          width: 100%;
          height: 2px;
          background-color: #000;
          transition: all .3s ease;
      }

      & .toggle-line:nth-child(2){
        transition-delay: .3s;
        transform-origin: right;
      }
  }

  .toggle-btn[open]{
    & .toggle-line:nth-child(1){
      transform: rotateZ(45deg) translateX(.5rem) translateY(.5rem);
      transition-delay: .3s;
      height: 3px;
      border-radius: 100%;
    }

    & .toggle-line:nth-child(2){
      transition-delay: 0s;
      transform: scale(0);
    }

    & .toggle-line:nth-child(3){
      transform: rotateZ(-45deg) translateX(.5rem) translateY(-.5rem);
      transition-delay: .3s;
      height: 3px;
      border-radius: 100%;
    }
  }

  .sidebar-menu[open]{
    width: 30rem;
    opacity: 1;
  }

  .sidebar-menu{
    position: fixed;
    left: 5rem;
    top: 5rem;
    overflow: hidden;
    width: 0rem;
    height: 100%;
    opacity: 0;
    background-color: #c9bffe;
    transition: width .5s ease, opacity .6s ease-in-out;
    border-right: 1px solid #000;
    & ul{
      list-style: none;
      padding: 2rem;
      margin: 0;
    }

      & li{
        font-size: 3.6rem;

        & a{
            text-decoration: none;
            color: #000;
            text-wrap: nowrap;
        }
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
        
        <div class="sidebar-links">
          <slot></slot>
        </div>

        <div class="sidebar-menu">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">About</a>
            </li>
            <li>
              <a href="/">Our Work</a>
            </li>
            <li>
              <a href="/">Contact</a>
            </li>
            <li>
              <a href="/">Blog</a>
            </li>
          </ul>
        </div>
      `;

      const button = this.shadowRoot.querySelector('.toggle-btn');
      const sidebarNav = this.shadowRoot.querySelector('.sidebar-menu');

      button?.addEventListener('click', () => {
        button.toggleAttribute('open');
        sidebarNav?.toggleAttribute('open');
      });
    }
  }
}
