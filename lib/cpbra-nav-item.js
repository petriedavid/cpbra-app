import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./cpbra-cta.js";

export class CpbraNavMenu extends DDDSuper(LitElement) {
  static get tag() {
    return "cpbra-nav-menu";
  }

  static get properties() {
    return {
      items: { type: Array },
      activeRoute: { type: String, attribute: "active-route" }
    };
  }

  constructor() {
    super();
    this.items = [];
    this.activeRoute = "/";
    this._fetchMenuData();
  }

  async _fetchMenuData() {
    try {
      const response = await fetch('/api/menu');
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
        { label: "Join", route: "/join", icon: "add" }
      ];
    }
  }

  _handleLinkClick(e, route) {
    e.preventDefault();
    window.history.pushState({}, "", route);
    const event = new CustomEvent("route-changed", {
      detail: { route: route },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          width: 100%;
          background-color: var(--ddd-theme-default-navy80);
          border-bottom: 2px solid var(--ddd-theme-default-navy);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: var(--ddd-box-shadow-md);
        }

        .nav-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: var(--ddd-spacing-4);
          padding: var(--ddd-spacing-3) var(--ddd-spacing-4);
          max-width: 1400px;
          margin: 0 auto;
          overflow-x: auto;
        }

        @media (max-width: 600px) {
          .nav-wrapper {
            justify-content: flex-start;
          }
        }
      `
    ];
  }

  render() {
    return html`
      <nav class="nav-wrapper">
        ${this.items.map(item => html`
          <cpbra-cta 
            @click="${(e) => this._handleLinkClick(e, item.route || item.location)}"
            label="${item.label || item.title}" 
            url="${item.route || item.location}" 
            icon="${item.icon}"
            size="md"
            variant="${this.activeRoute === (item.route || item.location) ? 'primary' : 'outline'}"
          ></cpbra-cta>
        `)}
      </nav>
    `;
  }
}

customElements.define(CpbraNavMenu.tag, CpbraNavMenu);