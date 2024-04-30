import SideBar from './web-components/sidebar';

if (!customElements.get('sidebar-component')) customElements.define('sidebar-component', SideBar);
