import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./cpbra-nav-item.js"; // Import the item we just made

/**
 * Main application menu bar that loads data from the /api/menu endpoint.
 * @element cpbra-menu-bar
 */
export class CpbraMenuBar extends DDDSuper(LitElement) {
  static get tag() {
    return "cpbra-menu-bar";
  }

  static get properties() {
    return {
      menuData: { type: Array },
      menuApi: { type: String, attribute: 'menu-api' },
      collapsed: { type: Boolean, reflect: true }
    };
  }

  constructor() {
    super();
    this.menuData = [];
    this.menuApi = "/api/menu";
    this.collapsed = true;
    this.fetchMenuData();
  }

  async fetchMenuData() {
    try {
      const response = await fetch(this.menuApi);
      if (!response.ok) {
        throw new Error(`Failed to fetch menu data from ${this.menuApi}`);
      }
      const data = await response.json();
      this.menuData = data.items || [];
    } catch (e) {
      console.error("Error loading menu data:", e);
      this.menuData = [
        { title: "Home", location: "/", icon: "home" },
        { title: "Schedule", location: "/schedule", icon: "event" },
        { title: "Teams", location: "/teams", icon: "social:group" },
        { title: "About Us", location: "/about", icon: "social:school" },
        { title: "Contact", location: "/contact", icon: "communication:email" }
      ];
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
          background-color: var(--ddd-theme-default-navy, #003B5C);
          box-shadow: var(--ddd-box-shadow-lg);
          font-family: var(--ddd-font-navigation);
        }

        .menu-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--ddd-spacing-4, 16px);
        }
        
        .menu-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--ddd-theme-default-yellow, #FFB81C);
          padding: var(--ddd-spacing-4);
        }

        .menu-toggle {
          display: none; /* Hidden on desktop */
          background: transparent;
          border: none;
          color: var(--ddd-theme-default-white);
          cursor: pointer;
          padding: var(--ddd-spacing-2, 8px);
        }

        .menu-list {
          display: flex; /* Default to row on desktop */
          list-style: none;
          margin: 0;
          padding: 0;
        }

        /* Mobile / Collapsed Menu Styles */
        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }
          
          .menu-list {
            display: none; 
            flex-direction: column;
            width: 100%;
            background-color: var(--ddd-theme-default-navy80);
            position: absolute;
            top: 100%; 
            left: 0;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
          }

          :host([collapsed="false"]) .menu-list {
            display: flex; 
          }
          
          :host {
            position: sticky;
            top: 0;
            z-index: 99; 
          }
          
          .menu-wrapper {
            position: relative; 
            padding: 0;
          }
        }
      `
    ];
  }

  render() {
    const renderNavItem = (item) => html`
      <li>
        <cpbra-nav-item 
          label="${item.title}" 
          url="${item.location}"
          icon="${item.icon}"
          ?active="${window.location.pathname.includes(item.location)}"
        ></cpbra-nav-item>
      </li>
    `;

    return html`
      <div class="menu-wrapper">
        <div class="menu-title">CPBRA</div>
        
        <button class="menu-toggle" @click="${this.toggleMenu}">
          <simple-icon icon="${this.collapsed ? 'menu' : 'close'}"></simple-icon>
        </button>

        <ul class="menu-list">
          ${this.menuData.map(renderNavItem)}
        </ul>
      </div>
    `;
  }
}

customElements.define(CpbraMenuBar.tag, CpbraMenuBar);