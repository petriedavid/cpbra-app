/**
 * Copyright 2025 kinguva7229
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class CpbraBigAssBanner extends DDDSuper(I18NMixin(LitElement)) {
    static get tag() {
    return "cpbra-banner";
  }

  static properties = {
  logoimg: { type: String },
  tagline: { type: String },
  bgimg: { type: String }
};


    constructor() {
    super();
    this.logoimg = "";
    this.tagline = "CPBRA";
    this.bgimg = "";
    }
    render() {
    return html`
    <div class="bigass-banner" style="background-image: url('${this.bgimg}')">
      <div class="side-block">
        <img src="${this.logoimg}" alt="CPBRA Logo" class="logo" />
        <h1 class="tagline">${this.tagline}</h1>
      </div>
    </div>
  `;    
    }
    


static get styles() {
  return [
    super.styles,
    css`
      :host {
        display: block;
        font-family: var(--ddd-font-primary, "Roboto", sans-serif);
      }

   
     
      .bigass-banner {
        position: relative;
        width: 100%;
        height: 65vh;
        min-height: 380px;

        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        display: flex;
        align-items: stretch;
        justify-content: flex-end;

        overflow: hidden;
      }

      
      .bigass-banner::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        background: linear-gradient(
          to right,
          rgba(0, 0, 0, 0.55) 0%,
          rgba(0, 0, 0, 0.35) 40%,
          rgba(0, 0, 0, 0.0) 100%
        );

        pointer-events: none;
        z-index: 1;
      }

      
      .side-block {
        position: relative;
        z-index: 2;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        background: rgba(0, 0, 0, 0.82);

        
        padding: var(--ddd-spacing-10, 40px);
        padding-top: var(--ddd-spacing-12);

        max-width: 420px;
        width: 100%;
        gap: var(--ddd-spacing-6, 24px);

        border-left: 1px solid var(--ddd-theme-default-navy80);
        box-shadow: 0 0 35px rgba(0, 0, 0, 0.45);
      }

      
      .logo {
        display: block;
        max-width: 80%;
        height: auto;
        filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.6));
      }

     
      .tagline {
        margin: 0;
        font-weight: var(--ddd-font-weight-black, 900);

        
        font-size: 1.6rem;

        line-height: var(--ddd-lh-120, 1.2);
        letter-spacing: var(--ddd-ls-32-lg, 0.48px);
        color: var(--ddd-theme-default-white);
        text-transform: uppercase;
      }

      @media (max-width: 768px) {
        .bigass-banner {
          height: 55vh;
          min-height: 300px;
          justify-content: center;
        }

        .side-block {
          padding: var(--ddd-spacing-7, 28px);
          padding-top: var(--ddd-spacing-10);

          max-width: none;
          width: 100%;
          text-align: center;
          align-items: center;

          border-left: none;
          border-top: 1px solid var(--ddd-theme-default-navy80);
        }

        .logo {
          max-width: 55%;
        }

        .tagline {
          font-size: 1.1rem;
        }
      }
    `,
  ];
}






}
customElements.define(CpbraBigAssBanner.tag, CpbraBigAssBanner);
// http://localhost:8000/test-banner.html