import { Button } from './web-components/button';
import { Header } from './web-components/header';
import Sidebar from './web-components/sidebar';

if (!customElements.get('sidebar-component')) customElements.define('sidebar-component', Sidebar);
if (!customElements.get('button-component')) customElements.define('button-component', Button);
if (!customElements.get('header-component')) customElements.define('header-component', Header);
