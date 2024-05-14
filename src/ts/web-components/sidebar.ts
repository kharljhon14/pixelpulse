const styles = new CSSStyleSheet();

styles.replaceSync(`
  :host{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    position: fixed;
    max-width: 5rem;
    width: 4.5rem;
    height: 100vh;
    padding: 2rem 1.4rem;
    border-right: 1px solid #000;
    overflow: hidden;
    background-color: #FFF;
  }

  .toggle-btn{
      width: 2rem;
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
      height: 2px;
      border-radius: 100%;
    }

    & .toggle-line:nth-child(2){
      transition-delay: 0s;
      transform: scale(0);
    }

    & .toggle-line:nth-child(3){
      transform: rotateZ(-45deg) translateX(.5rem) translateY(-.5rem);
      transition-delay: .3s;
      height: 2px;
      border-radius: 100%;
    }
  }

  .sidebar-links{
    & ::slotted(*){
      margin-bottom: 1rem;
    }

    & ::slotted(:last-child){
        margin-bottom: 0;
    }
  }

  .sidebar-menu[open]{
    width: 30rem;
    opacity: 1;
    transition: width .6s ease, opacity .3s 0s ease;
    & ul{
      opacity: 1;
      left: 0rem;
    }
  }

  .sidebar-menu{
    position: fixed;
    left: 4.5rem;
    top: 4.5rem;
    overflow: hidden;
    width: 0rem;
    height: 100%;
    opacity: 0;
    border: none;
    background-color: #c9bffe;
    transition: width .6s ease, opacity .3s .6s ease;
    border-right: 1px solid #000;
    & ul{
      list-style: none;
      padding: 2rem;
      opacity: 0;
      margin: 0;
      left: -15rem;
      position: relative;
      transition: opacity .3s ease, left .8s ease-in-out;
    }

      & li{
        font-size: 3.6rem;
        width: fit-content;
        transition: all .5s ease;
        & a{
            text-decoration: none;
            color: #000;
            text-wrap: nowrap;
            position: relative;
            transition: all .5s ease;
        }
      }

      & li:hover{
        transform: translateX(1rem);
        
        & a{
          color: gray;
        }
      }
    }
  }
`);

export default class Sidebar extends HTMLElement {
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
