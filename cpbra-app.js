import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./lib/cpbra-bigass-banner.js";
import "./lib/cpbra-nav-menu.js";
import "./lib/cpbra-court.js";
import "./lib/cpbra-schedule-list.js";
import "./lib/cpbra-content-band.js";
import "./lib/cpbra-scroll-btn.js";
import "./lib/cpbra-signup.js";
import "./lib/cpbra-gallery.js";
import "./lib/cpbra-footer.js";

export class CpbraApp extends DDDSuper(LitElement) {

  static get tag() {
    return "cpbra-app";
  }

  static get properties() {
    return {
      activeRoute: { type: String },
      courtQueues: { type: Object }
    };
  }

  constructor() {
    super();
    this.activeRoute = this._getRouteFromUrl();

    this.courtQueues = {
      "Dreamville": 4,
      "The Cage": 1,
      "Rookie Run": 0
    };


    this.addEventListener("route-changed", this._handleRouteChange);
    this.addEventListener("player-signed-up", this._handleSignup);
    window.addEventListener("popstate", this._handlePopState.bind(this));
  }

  _getRouteFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    return page ? `/${page}` : window.location.pathname === '/' ? '/' : '/404';
  }

  _handleSignup(e) {
    const { court, players } = e.detail;
    if (this.courtQueues[court] !== undefined) {
      this.courtQueues = {
        ...this.courtQueues,
        [court]: this.courtQueues[court] + players
      };
    }
  }

  _handleRouteChange(e) {
    this.activeRoute = e.detail.route;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  _handlePopState() {
    this.activeRoute = this._getRouteFromUrl();
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        font-family: var(--ddd-font-navigation);
        min-height: 100vh;
        transition: background-color 0.3s ease;
        
        --theme-bg-page: var(--ddd-theme-default-white, #ffffff);
        --theme-bg-content-dark: var(--ddd-theme-default-navy, #003B5C);
        --theme-bg-content-dark-secondary: var(--ddd-theme-default-navy80, #1A2938);
        --theme-color-text-light: var(--ddd-theme-default-white);
        --theme-color-text-dark: var(--ddd-theme-default-navy);
        --theme-color-accent: var(--ddd-theme-default-yellow, #FFB81C);
        --theme-color-accent-text: var(--ddd-theme-default-navy);
        
        background-color: var(--theme-bg-page);
        color: var(--theme-color-text-dark);
      }
      
      @media (prefers-color-scheme: dark) {
        :host {
          --theme-bg-page: var(--ddd-theme-default-navy);
          --theme-bg-content-dark: var(--ddd-theme-default-navy80); 
          --theme-bg-content-dark-secondary: var(--ddd-theme-default-navy70);
          --theme-color-text-light: var(--ddd-theme-default-white);
          --theme-color-text-dark: var(--ddd-theme-default-white);
          --theme-color-accent: var(--ddd-theme-default-yellow, #FFB81C);
          --theme-color-accent-text: var(--ddd-theme-default-navy);
          
          background-color: var(--theme-bg-page);
          color: var(--theme-color-text-dark);
        }
      }

      cpbra-banner {
        margin-bottom: 0;
        display: block;
      }
      
      cpbra-nav-menu {
        margin-top: 0;
        position: sticky;
        top: 0;
        z-index: 100;
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
    // Route is the clean path (/schedule, /join) from _getRouteFromUrl
    const route = this.activeRoute;

    switch (route) {
      case "/schedule":
        return html`
          <cpbra-content-band variant="default">
            <cpbra-schedule-list></cpbra-schedule-list>
          </cpbra-content-band>
        `;

      case "/join":
        return html`
           <cpbra-signup></cpbra-signup>
        `;

      case "/gallery":
        return html`
          <cpbra-content-band variant="default">
             <cpbra-gallery></cpbra-gallery>
          </cpbra-content-band>
        `;

      case "/":
      case "/home":
        return html`
          <cpbra-content-band variant="light" id="features">
            <h2 style="text-align: center; font-size: 2rem; margin-bottom: 2rem;">Live Park Status</h2>
            <div class="court-display">
              <div class="court-container">
                <cpbra-court court-name="Dreamville" game-duration="21" floor-color="#003B5C" squads-waiting="${this.courtQueues['Dreamville']}"></cpbra-court>
              </div>
              <div class="court-container">
                <cpbra-court court-name="The Cage" game-duration="10" floor-color="#222" squads-waiting="${this.courtQueues['The Cage']}"></cpbra-court>
              </div>
              <div class="court-container">
                <cpbra-court court-name="Rookie Run" game-duration="5" floor-color="#556B2F" squads-waiting="${this.courtQueues['Rookie Run']}"></cpbra-court>
              </div>
            </div>
          </cpbra-content-band>
        `;

      case "/404":
      default:
        return html`
          <cpbra-content-band variant="light">
            <h2 style="text-align: center; color: var(--ddd-theme-default-error);">404 - Page Not Found</h2>
            <p style="text-align: center;">The page you requested does not exist. Try the menu above!</p>
          </cpbra-content-band>
        `;
    }
  }

  render() {
    return html`
      <cpbra-banner 
        logoimg="https://i.imgur.com/YlwsUtg.png"
        bgimg="https://i.imgur.com/hkVjs80.jpeg"
        tagline="Where Anybody Can Get Next">
      </cpbra-banner>

      <cpbra-nav-menu active-route="${this.activeRoute}"></cpbra-nav-menu>

      <main>${this.renderRoute()}</main>

      <cpbra-footer league-name="CPBRA League" year="2025"></cpbra-footer>
      <cpbra-scroll-btn target="main"></cpbra-scroll-btn>
    `;
  }
}
globalThis.customElements.define(CpbraApp.tag, CpbraApp);