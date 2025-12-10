import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/simple-icon/simple-icon.js";

export class CpbraNavItem extends DDDSuper(LitElement) {
    static get tag() {
        return "cpbra-nav-item";
    }

    static get properties() {
        return {
            label: { type: String },
            url: { type: String },
            icon: { type: String },
            active: { type: Boolean, reflect: true }
        };
    }

    constructor() {
        super();
        this.label = "Menu Item";
        this.url = "#";
        this.icon = "";
        this.active = false;
    }

    static get styles() {
        return [
            super.styles,
            css`
        :host {
          display: block;
          font-family: var(--ddd-font-navigation);
          transition: background-color 0.2s ease;
        }
        
        a {
          display: flex;
          align-items: center;
          gap: var(--ddd-spacing-2, 8px);
          padding: var(--ddd-spacing-3, 12px) var(--ddd-spacing-4, 16px);
          text-decoration: none;
          color: var(--ddd-theme-default-white, white);
          font-weight: 500;
          font-size: 1rem;
          line-height: var(--ddd-lh-120);
          text-transform: uppercase;
          transition: color 0.2s ease;
        }

        a:hover, :host([active]) a {
          color: var(--ddd-theme-default-yellow, #FFB81C);
          background-color: var(--ddd-theme-default-navy80, #1A2938);
        }

        simple-icon {
          --simple-icon-width: 18px;
          --simple-icon-height: 18px;
          transition: color 0.2s ease;
        }

        :host([active]) simple-icon {
          color: var(--ddd-theme-default-yellow, #FFB81C);
        }
      `
        ];
    }

    render() {
        return html`
      <a href="${this.url}">
        ${this.icon ? html`<simple-icon icon="${this.icon}"></simple-icon>` : ''}
        <span>${this.label}</span>
      </a>
    `;
    }
}

customElements.define(CpbraNavItem.tag, CpbraNavItem);