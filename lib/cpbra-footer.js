import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/simple-icon/simple-icon.js";

export class CpbraFooter extends DDDSuper(LitElement) {
  static get tag() {
    return "cpbra-footer";
  }

  static get properties() {
    return {
      leagueName: { type: String, attribute: 'league-name' },
      year: { type: Number },
    };
  }

  constructor() {
    super();
    this.leagueName = "CPBRA";
    this.year = new Date().getFullYear();
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          background-color: var(--theme-bg-content-dark); 
          color: var(--theme-color-text-light);
          padding: var(--ddd-spacing-8) var(--ddd-spacing-4);
          font-family: var(--ddd-font-navigation);
          border-top: 4px solid var(--theme-color-accent); 
          transition: background-color 0.3s ease;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--ddd-spacing-6);
        }
        .copyright {
          font-size: var(--ddd-font-size-sm);
          opacity: 0.8;
        }
        .social-links {
          display: flex;
          gap: var(--ddd-spacing-4);
        }
        .social-link {
          color: var(--theme-color-text-light);
          opacity: 0.7;
          transition: opacity 0.2s ease, color 0.2s ease;
        }
        .social-link:hover {
          opacity: 1;
          color: var(--theme-color-accent);
        }
        simple-icon {
            --simple-icon-width: 24px;
            --simple-icon-height: 24px;
        }

        @media (max-width: 600px) {
            .container {
                flex-direction: column;
                text-align: center;
            }
        }
      `
    ];
  }

  render() {
    return html`
      <div class="container">
        <div class="copyright">
          &copy; ${this.year} ${this.leagueName}. All Rights Reserved.
        </div>
        <div class="social-links">
            <a href="#" class="social-link" title="Follow us on X/Twitter"><simple-icon icon="social:twitter"></simple-icon></a>
            <a href="#" class="social-link" title="Follow us on Instagram"><simple-icon icon="social:instagram"></simple-icon></a>
            <a href="#" class="social-link" title="Join our Discord"><simple-icon icon="hardware:headset-mic"></simple-icon></a>
        </div>
      </div>
    `;
  }
}

customElements.define(CpbraFooter.tag, CpbraFooter);