import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/simple-icon/simple-icon.js";
import "./cpbra-cta.js";

export class CpbraNavMenu extends DDDSuper(LitElement) {
  static get tag() {
    return "cpbra-nav-menu";
  }

  static get properties() {
    return {
      items: { type: Array },
      activeRoute: { type: String, attribute: "active-route" },
      collapsed: { type: Boolean, reflect: true }
    };
  }

  constructor() {
    super();
    this.items = [];
    this.activeRoute = "/";
    this.collapsed = true;
    this._fetchMenuData();
  }

  async _fetchMenuData() {
    try {
      const response = await fetch('/api/menu.json');
      if (response.ok) {
        const json = await response.json();
        this.items = json.items || json;
      } else {
        throw new Error('API Error');
      }
    } catch (e) {
      this.items = [
        { label: "Home", route: "/", icon: "home" },
        { label: "Schedule", route: "/schedule", icon: "event" },
        { label: "Gallery", route: "/gallery", icon: "image:collections" },
        { label: "Join", route: "/join", icon: "add" }
      ];
    }
  }


  _handleLinkClick(e, route) {
    e.preventDefault();

    const newRoute = route === '/' ? '/' : `/?page=${route.substring(1)}`;
    window.history.pushState({}, "", newRoute);

    const event = new CustomEvent("route-changed", {
      detail: { route: route },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);

    if (!this.collapsed) {
      this.collapsed = true;
    }
  }

  toggleMenu() {
    this.collapsed = !this.collapsed;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          width: 100%;
          background-color: var(--theme-bg-content-dark);
          border-bottom: 2px solid var(--theme-color-accent);
          
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: var(--ddd-box-shadow-md);
          transition: background-color 0.3s ease;
        }

        .menu-header {
            display: flex;
            justify-content: center; 
            align-items: center;
            padding: var(--ddd-spacing-3) var(--ddd-spacing-4);
            max-width: 1400px;
            margin: 0 auto;
            position: relative;
        }
        
        .menu-header > div {
            color: var(--theme-color-accent); 
        }

        .menu-toggle {
            display: none; 
            background: transparent;
            border: none;
            color: var(--theme-color-text-light); 
            cursor: pointer;
            padding: var(--ddd-spacing-2, 8px);
        }
        
        .nav-wrapper {
            display: flex; 
            justify-content: center;
            align-items: center;
            gap: var(--ddd-spacing-4);
            max-width: 1400px;
            margin: 0 auto;
            overflow-x: auto;
        }

        @media (max-width: 768px) {
            .menu-header {
                justify-content: space-between; 
            }
            .menu-toggle {
                display: block; 
                order: 1; 
            }
            .menu-header > div {
                margin-right: 0; 
            }
            
            .nav-wrapper {
                display: none; 
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background-color: var(--theme-bg-content-dark-secondary);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
                padding-bottom: var(--ddd-spacing-4);
                align-items: stretch; 
            }
            
            :host([collapsed="false"]) .nav-wrapper {
                display: flex; 
            }
            
            .nav-wrapper cpbra-cta {
                width: 90%;
                margin: 0 auto;
            }
        }
      
      `
    ];
  }

  render() {
    const cleanRoute = this.activeRoute.split('?')[0];

    return html`
        <div class="menu-header">
            <div style="color: var(--ddd-theme-default-white); font-weight: bold; margin-right: auto;">MENU</div> 
            
            <button class="menu-toggle" @click="${this.toggleMenu}">
                <simple-icon icon="${this.collapsed ? 'menu' : 'close'}"></simple-icon>
            </button>
            
            <nav class="nav-wrapper">
                ${this.items.map(item => html`
                <cpbra-cta 
                    @click="${(e) => this._handleLinkClick(e, item.route || item.location)}"
                    label="${item.label || item.title}" 
                    url="${item.route || item.location}" 
                    icon="${item.icon}"
                    size="md"
                    variant="${cleanRoute === (item.route || item.location) ? 'primary' : 'outline'}"
                ></cpbra-cta>
                `)}
            </nav>
        </div>
    `;
  }
}

customElements.define(CpbraNavMenu.tag, CpbraNavMenu);