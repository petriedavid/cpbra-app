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

  static get properties() {
    return {
      activeRoute: { type: String }
    };
  }

  constructor() {
    super();
    
    
  }

  // Lit reactive properties
  static get properties() {
    return {
    
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        font-family: var(--ddd-font-navigation);
        background-color: var(--ddd-theme-default-slateMaxLight);
        min-height: 100vh;
      }
      
      .court-display {
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
        justify-content: center;
        width: 100%;
      }

      .court-container {
        flex: 1 1 300px;
        min-width: 300px;
        max-width: 450px;
        margin-bottom: 24px;
      }
    `];
  }

  renderRoute() {
    const route = this.activeRoute === "/" ? "/" : this.activeRoute.replace(/\/$/, "");

    switch (route) {
      case "/schedule":
        return html`
          <cpbra-content-band variant="default">
            <cpbra-schedule-list></cpbra-schedule-list>
          </cpbra-content-band>
        `;

      case "/roster":
      case "/join":
        return html`
          <cpbra-content-band variant="light">
            <div style="text-align: center; padding: 40px;">
              <h2>Coming Soon</h2>
              <p>This section is currently under development.</p>
            </div>
          </cpbra-content-band>
        `;

      case "/":
      case "/home":
      default:
        return html`
          <cpbra-content-band variant="light" id="features">
            <h2 style="text-align: center; font-size: 2rem; margin-bottom: 2rem;">Live Park Status</h2>
            
            <div class="court-display">
              
              <div class="court-container">
                <cpbra-court 
                  court-name="Dreamville" 
                  game-duration="21" 
                  floor-color="#003B5C" 
                  squads-waiting="4">
                </cpbra-court>
              </div>

              <div class="court-container">
                <cpbra-court 
                  court-name="The Cage" 
                  game-duration="10" 
                  floor-color="#222" 
                  squads-waiting="1">
                </cpbra-court>
              </div>

              <div class="court-container">
                <cpbra-court 
                  court-name="Rookie Run" 
                  game-duration="5" 
                  floor-color="#556B2F" 
                  squads-waiting="0">
                </cpbra-court>
              </div>

            </div>
          </cpbra-content-band>
        `;
    }
  }

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

      <cpbra-scroll-btn target="main"></cpbra-scroll-btn>
    `;
  }
}

globalThis.customElements.define(CpbraApp.tag, CpbraApp);