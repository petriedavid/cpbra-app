import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class CpbraContentBand extends DDDSuper(LitElement) {
    static get tag() {
        return "cpbra-content-band";
    }

    static get properties() {
        return {
            variant: { type: String, reflect: true },
        };
    }

    constructor() {
        super();
        this.variant = "default";
    }

    static get styles() {
        return [
            super.styles,
            css`
        :host {
          display: block;
          width: 100%;
          padding: var(--ddd-spacing-12, 64px) var(--ddd-spacing-4, 16px);
          box-sizing: border-box;
        }

        :host([variant="default"]) {
          background-color: var(--ddd-theme-default-navy, #003B5C);
          color: var(--ddd-theme-default-white, #ffffff);
        }

        :host([variant="light"]) {
          background-color: var(--ddd-theme-default-white, #ffffff);
          color: var(--ddd-theme-default-navy, #003B5C);
        }

        :host([variant="accent"]) {
          background-color: var(--ddd-theme-default-yellow, #FFB81C);
          color: var(--ddd-theme-default-navy, #003B5C);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
      `
        ];
    }

    render() {
        return html`
      <div class="container">
        <slot></slot>
      </div>
    `;
    }
}

customElements.define(CpbraContentBand.tag, CpbraContentBand);