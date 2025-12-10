import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./lib/cpbra-bigass-banner.js";
import "./lib/cpbra-nav-menu.js";
import "./lib/cpbra-court.js";
import "./lib/cpbra-schedule-list.js";
import "./lib/cpbra-content-band.js";
import "./lib/cpbra-scroll-btn.js";

export class CpbraApp extends DDDSuper(LitElement) {

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
    this.activeRoute = window.location.pathname;
    this.addEventListener("route-changed", this._handleRouteChange);
    window.addEventListener("popstate", this._handlePopState.bind(this));
  }

  _handleRouteChange(e) {
    this.activeRoute = e.detail.route;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  _handlePopState() {
    this.activeRoute = window.location.pathname;
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
      <cpbra-banner 
        logoimg="https://placehold.co/200x80/ffffff/000000?text=CPBRA+Logo"
        bgimg="https://placehold.co/1920x800/2A2E35/ffffff?text=Basketball+Court+Background"
        tagline="Where Anybody Can Get Next">
      </cpbra-banner>

      <cpbra-nav-menu active-route="${this.activeRoute}"></cpbra-nav-menu>

      <main>
        ${this.renderRoute()}
      </main>

      <cpbra-content-band variant="accent">
         <div style="text-align: center;">
            <h2>CPBRA League 2025</h2>
            <p>Copyright © 2025 Kinguva7229</p>
         </div>
      </cpbra-content-band>

      <cpbra-scroll-btn target="main"></cpbra-scroll-btn>
    `;
  }
}

globalThis.customElements.define(CpbraApp.tag, CpbraApp);