/**
 * Copyright 2025 kinguva7229
 * @license Apache-2.0, see LICENSE for full text.
 */

/**
 * `cpbra-app`
 * 
 * @demo index.html
 * @element cpbra-app
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

import "./cpbra-bigass-banner.js";
import "./cpbra-scroll-btn.js";


export class CpbraApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "cpbra-app";
  }

  constructor() {
    super();
    
    
  }

  // Lit reactive properties
  static get properties() {
    return {
    
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--cpbra-app-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <!-- HERO BANNER -->
      <cpbra-banner
        logoimg="/images/cpbra_logo.png"
        bgimg="/images/bg_img_ball_court.png"
        tagline="Community. Hoops. Everyone."
      ></cpbra-banner>

      <!-- FLOATING CENTER SCROLL BUTTON -->
      <cpbra-scroll-btn target="#next"></cpbra-scroll-btn>

      <!-- EMPTY SECTION JUST TO SCROLL TO -->
      <div id="next" class="spacer"></div>
    `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(CpbraApp.tag, CpbraApp);