/**
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/simple-icon/simple-icon.js";
import "@haxtheweb/simple-icon/lib/simple-icons.js"; // For av:play, av:pause, etc.

export class CpbraCourt extends DDDSuper(LitElement) {
  static get tag() {
    return "cpbra-court";
  }

  static get properties() {
    return {
      /* Visual styling props */
      lineColor: { type: String, attribute: "line-color" },
      floorColor: { type: String, attribute: "floor-color" },
      keyColor: { type: String, attribute: "key-color" },

      /* Game State props */
      half: { type: Boolean, reflect: true },
      timerRunning: { type: Boolean, reflect: true },
      timeRemaining: { type: Number }, // in seconds
      gameDuration: { type: Number, attribute: "game-duration" }, // in minutes
      playerCount: { type: Number, attribute: "player-count" }
    };
  }

  constructor() {
    super();
    // Default Visuals (DDD Navy Theme)
    this.lineColor = "var(--ddd-theme-default-white, #ffffff)";
    this.floorColor = "var(--ddd-theme-default-navy, #003B5C)";
    this.keyColor = "rgba(255, 255, 255, 0.1)";

    // Default Logic
    this.half = false;
    this.timerRunning = false;
    this.gameDuration = 12; // Standard pickup game limit
    this.timeRemaining = this.gameDuration * 60;
    this.playerCount = 10; // Default 5v5
    this._timerInterval = null;
  }

  // Set initial time when gameDuration changes
  updated(changedProperties) {
    if (changedProperties.has('gameDuration') && changedProperties.get('gameDuration') !== undefined) {
      this.timeRemaining = this.gameDuration * 60;
    }
  }

  /* --- Lifecycle --- */

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopTimer();
  }

  /* --- Game Logic Methods --- */

  toggleTimer() {
    if (this.timerRunning) {
      this._stopTimer();
    } else {
      this._startTimer();
    }
  }

  _startTimer() {
    if (this.timeRemaining > 0) {
      this.timerRunning = true;
      this._timerInterval = setInterval(() => {
        if (this.timeRemaining > 0) {
          this.timeRemaining--;
        } else {
          this._stopTimer();
          // Game Over logic
        }
      }, 1000);
    }
  }

  _stopTimer() {
    this.timerRunning = false;
    clearInterval(this._timerInterval);
    this._timerInterval = null;
  }

  resetTimer() {
    this._stopTimer();
    this.timeRemaining = this.gameDuration * 60;
  }

  toggleCourtSize() {
    this.half = !this.half;
    // Suggest standard player counts based on court size
    if (this.half) {
      this.playerCount = 6; // Default 3v3
    } else {
      this.playerCount = 10; // Default 5v5
    }
  }

  adjustPlayers(amount) {
    const newVal = this.playerCount + amount;
    if (newVal >= 0) this.playerCount = newVal;
  }

  /* --- Formatting --- */

  formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          width: 100%;
          font-family: var(--ddd-font-primary, "Roboto", sans-serif);
          background-color: var(--ddd-theme-default-navy80, #1A2938);
          border-radius: var(--ddd-radius-md, 8px);
          overflow: hidden;
          box-shadow: var(--ddd-box-shadow-lg);
        }

        /* --- Scoreboard Header --- */
        .monitor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--ddd-spacing-4, 16px) var(--ddd-spacing-6, 24px);
          background-color: rgba(0,0,0,0.3);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .timer-display {
          font-family: "Courier New", monospace; /* Digital look */
          font-size: 2.5rem;
          font-weight: 900;
          color: var(--ddd-theme-default-white, white);
          letter-spacing: 2px;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
        }
        
        :host([timer-running]) .timer-display {
          color: var(--ddd-theme-default-yellow, #FFB81C);
          text-shadow: 0 0 15px rgba(255, 184, 28, 0.4);
        }

        .meta-info {
          display: flex;
          gap: var(--ddd-spacing-4);
          color: var(--ddd-theme-default-white);
          font-size: 0.9rem;
          font-weight: bold;
          text-transform: uppercase;
        }

        /* --- Court Area --- */
        .court-container {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: var(--cpbra-court-bg, transparent);
          padding: var(--ddd-spacing-4, 16px);
          box-sizing: border-box;
          transition: all 0.3s ease;
        }

        svg {
          width: 100%;
          height: auto;
          max-height: 60vh; 
          display: block;
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
        }

        /* Line Styling */
        .court-line {
          fill: none;
          stroke-width: 2;
          vector-effect: non-scaling-stroke;
          transition: stroke 0.3s ease;
        }

        .court-fill {
          transition: fill 0.3s ease;
        }

        /* --- Controls Footer --- */
        .controls-bar {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: var(--ddd-spacing-4, 16px);
          padding: var(--ddd-spacing-4, 16px);
          background-color: rgba(0,0,0,0.3);
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        button.control-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1px solid var(--ddd-theme-default-white);
          color: var(--ddd-theme-default-white);
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.2s ease;
          font-family: var(--ddd-font-navigation);
        }

        button.control-btn:hover {
          background: rgba(255,255,255,0.1);
        }

        button.control-btn.primary {
          background: var(--ddd-theme-default-white);
          color: var(--ddd-theme-default-navy);
          border-color: var(--ddd-theme-default-white);
        }
        
        button.control-btn.primary:hover {
           background: var(--ddd-theme-default-yellow);
           border-color: var(--ddd-theme-default-yellow);
        }

        .player-counter {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(0,0,0,0.4);
          padding: 4px 12px;
          border-radius: 4px;
          color: white;
        }
        
        .player-counter button {
          border: 1px solid var(--ddd-theme-default-white);
          background: transparent;
          color: var(--ddd-theme-default-white);
          padding: 2px 8px;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .player-counter button:hover {
          background: rgba(255,255,255,0.1);
        }

        /* Mobile specific adjustments */
        @media (max-width: 600px) {
          .monitor-header {
            flex-direction: column;
            gap: 10px;
          }
          .timer-display {
            font-size: 2rem;
          }
          .controls-bar {
            gap: 10px;
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <!-- HEADER: Timer & Meta Data -->
      <div class="monitor-header">
        <div class="timer-display">
          ${this.formatTime(this.timeRemaining)}
        </div>
        <div class="meta-info">
          <span>${this.half ? "Half Court" : "Full Court"}</span>
          <span>•</span>
          <span>${this.playerCount} Players</span>
        </div>
      </div>

      <!-- VISUAL: SVG Court -->
      <div class="court-container">
        <svg
          viewBox="${this.half ? "0 0 500 600" : "0 0 1000 600"}"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <!-- Floor Background -->
          <rect x="0" y="0" width="${this.half ? 500 : 1000}" height="600" fill="${this.floorColor}" />

          <!-- Main Outline -->
          <rect
            x="5"
            y="5"
            width="${this.half ? 495 : 990}"
            height="590"
            class="court-line"
            stroke="${this.lineColor}"
          />

          <!-- Center Court Logic -->
          ${!this.half
        ? html`
                <line x1="500" y1="5" x2="500" y2="595" class="court-line" stroke="${this.lineColor}" />
                <circle cx="500" cy="300" r="60" class="court-line" stroke="${this.lineColor}" />
                <circle cx="500" cy="300" r="20" class="court-fill" fill="${this.lineColor}" />
              `
        : html`
                <!-- Half Court Cutoff -->
                <path d="M 500,240 A 60 60 0 0 0 500,360" class="court-line" stroke="${this.lineColor}" fill="none" />
                <path d="M 500,280 A 20 20 0 0 0 500,320" class="court-fill" fill="${this.lineColor}" />
            `}

          <!-- LEFT SIDE (Paint Area) -->
          <g class="hoop-zone-left">
            <rect x="5" y="220" width="190" height="160" class="court-fill" fill="${this.keyColor}" stroke="none" />
            <rect x="5" y="220" width="190" height="160" class="court-line" stroke="${this.lineColor}" />
            <circle cx="195" cy="300" r="60" class="court-line" stroke="${this.lineColor}" />
            
            <!-- 3pt Line -->
            <line x1="5" y1="50" x2="140" y2="50" class="court-line" stroke="${this.lineColor}" />
            <line x1="5" y1="550" x2="140" y2="550" class="court-line" stroke="${this.lineColor}" />
            <path d="M 140,50 Q 300,300 140,550" class="court-line" stroke="${this.lineColor}" />
            
            <!-- Hoop -->
            <line x1="40" y1="270" x2="40" y2="330" class="court-line" stroke="${this.lineColor}" stroke-width="3" />
            <circle cx="55" cy="300" r="10" class="court-line" stroke="${this.lineColor}" />
          </g>

          <!-- RIGHT SIDE (Only render if full court) -->
          ${!this.half
        ? html`
                <g class="hoop-zone-right" transform="rotate(180 500 300)">
                  <rect x="5" y="220" width="190" height="160" class="court-fill" fill="${this.keyColor}" stroke="none" />
                  <rect x="5" y="220" width="190" height="160" class="court-line" stroke="${this.lineColor}" />
                  <circle cx="195" cy="300" r="60" class="court-line" stroke="${this.lineColor}" />
                  <line x1="5" y1="50" x2="140" y2="50" class="court-line" stroke="${this.lineColor}" />
                  <line x1="5" y1="550" x2="140" y2="550" class="court-line" stroke="${this.lineColor}" />
                  <path d="M 140,50 Q 300,300 140,550" class="court-line" stroke="${this.lineColor}" />
                  <line x1="40" y1="270" x2="40" y2="330" class="court-line" stroke="${this.lineColor}" stroke-width="3" />
                  <circle cx="55" cy="300" r="10" class="court-line" stroke="${this.lineColor}" />
                </g>
              `
        : ""}
        </svg>
      </div>

      <!-- FOOTER: Controls -->
      <div class="controls-bar">
        
        <!-- Timer Controls -->
        <button class="control-btn primary" @click="${this.toggleTimer}">
          <simple-icon icon="${this.timerRunning ? 'av:pause' : 'av:play-arrow'}"></simple-icon>
          ${this.timerRunning ? "Pause" : "Start"}
        </button>
        
        <button class="control-btn" @click="${this.resetTimer}">
          <simple-icon icon="av:replay"></simple-icon> Reset
        </button>

        <!-- Court Toggle -->
        <button class="control-btn" @click="${this.toggleCourtSize}">
          <simple-icon icon="image:crop-landscape"></simple-icon>
          ${this.half ? "Switch to Full" : "Switch to Half"}
        </button>

        <!-- Player Counter -->
        <div class="player-counter">
          <simple-icon icon="social:person"></simple-icon>
          <span style="margin-right:8px;">Players: <strong>${this.playerCount}</strong></span>
          <button @click="${() => this.adjustPlayers(-1)}">-</button>
          <button @click="${() => this.adjustPlayers(1)}">+</button>
        </div>

      </div>
    `;
  }
}

customElements.define(CpbraCourt.tag, CpbraCourt);