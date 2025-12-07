/*
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import "@haxtheweb/simple-icon/simple-icon.js";

export class CpbraCta extends LitElement {
  static get tag() {
    return "cpbra-cta";
  }

  static get properties() {
    return {
      label: { type: String },
      url: { type: String },
      variant: { type: String }, // primary, secondary, outline
      size: { type: String }, // sm, md, lg
      icon: { type: String },
      block: { type: Boolean, reflect: true }
    };
  }

  constructor() {
    super();
    this.label = "Click Me";
    this.url = "#";
    this.variant = "primary";
    this.size = "md";
    this.icon = "";
    this.block = false;
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      a {
        text-decoration: none;
      }

      button {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        border: none;
        cursor: pointer;
        font-weight: 600;
        font-family: var(--ddd-font-navigation, "Inter", sans-serif);
        border-radius: 0.375rem;
        transition: all 0.2s ease-in-out;
        color: var(--ddd-theme-default-white, #ffffff);
      }

      /* Hover Effects */
      button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(255, 255, 255, 0.25);
      }

      /* Sizes */
      button[size="sm"] {
        padding: 0.35rem 0.75rem;
        font-size: 0.9rem;
      }

      button[size="md"] {
        padding: 0.55rem 1.2rem;
        font-size: 1rem;
      }

      button[size="lg"] {
        padding: 0.8rem 1.6rem;
        font-size: 1.15rem;
      }

      /* Variants */
      
      /* Primary: Gold/Yellow for high contrast on dark backgrounds */
      button[variant="primary"] {
        background: var(--ddd-theme-default-yellow, #FFB81C);
        color: var(--ddd-theme-default-navy, #003B5C);
        box-shadow: 0 2px 8px rgba(255, 184, 28, 0.4);
      }

      button[variant="primary"]:hover {
        background: var(--ddd-theme-default-white, #FFFFFF);
        box-shadow: 0 6px 15px rgba(255, 184, 28, 0.6);
      }

      /* Secondary: Dark Navy background */
      button[variant="secondary"] {
        background: var(--ddd-theme-default-navy80, #1A2938);
        color: var(--ddd-theme-default-white, #ffffff);
        border: 1px solid var(--ddd-theme-default-navy80, #1A2938);
      }

      button[variant="secondary"]:hover {
        background: var(--ddd-theme-default-navy, #003B5C);
      }

      /* Outline: White border */
      button[variant="outline"] {
        background: transparent;
        color: var(--ddd-theme-default-white, #ffffff);
        border: 2px solid var(--ddd-theme-default-white, #ffffff);
      }

      button[variant="outline"]:hover {
        background: var(--ddd-theme-default-white, #ffffff);
        color: var(--ddd-theme-default-navy, #003B5C);
      }

      :host([block]) button {
        width: 100%;
        justify-content: center;
      }
    `;
  }

  render() {
    return html`
      <a href="${this.url}">
        <button
          variant="${this.variant}"
          size="${this.size}"
        >
          ${this.icon
        ? html`<simple-icon icon="${this.icon}"></simple-icon>`
        : ""}
          <slot>${this.label}</slot>
        </button>
      </a>
    `;
  }
}

customElements.define(CpbraCta.tag, CpbraCta);