import { Button } from './web-components/button';
import { Chip } from './web-components/chip';
import { Header } from './web-components/header';
import Sidebar from './web-components/sidebar';

if (!customElements.get('button-component')) customElements.define('button-component', Button);
if (!customElements.get('chip-component')) customElements.define('chip-component', Chip);
if (!customElements.get('sidebar-component')) customElements.define('sidebar-component', Sidebar);
if (!customElements.get('header-component')) customElements.define('header-component', Header);
