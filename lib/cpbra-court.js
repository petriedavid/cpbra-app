import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/simple-icon/simple-icon.js";
import "@haxtheweb/simple-icon/lib/simple-icons.js";

export class CpbraCourt extends DDDSuper(LitElement) {
  static get tag() {
    return "cpbra-court";
  }

  static get properties() {
    return {
      courtName: { type: String, attribute: "court-name" },
      status: { type: String }, // 'Live', 'Next Up', 'Game Over'
      timeRemaining: { type: Number },
      scoreHome: { type: Number },
      scoreAway: { type: Number },
      squadsWaiting: { type: Number, attribute: "squads-waiting" },
      gameDuration: { type: Number, attribute: "game-duration" }, // in minutes
      floorColor: { type: String, attribute: "floor-color" },
    };
  }

  constructor() {
    super();
    this.courtName = "Court 1";
    this.status = "Live";
    this.gameDuration = 10;
    this.timeRemaining = 600; // 10 minutes in seconds
    this.scoreHome = 12;
    this.scoreAway = 8;
    this.squadsWaiting = 2;
    this.floorColor = "#003B5C";

    // Internal intervals
    this._timerInterval = null;
    this._scoreInterval = null;
  }

  connectedCallback() {
    super.connectedCallback();
    // Start the simulation immediately
    this._startSimulation();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopSimulation();
  }

  _startSimulation() {
    this._stopSimulation(); // clear any existing

    // 1. Game Clock Countdown
    this._timerInterval = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
      } else {
        this._handleGameEnd();
      }
    }, 1000);

    // 2. Random Scoring Event (Simulates real gameplay)
    // Every 2-8 seconds, someone "scores"
    this._scoreInterval = setInterval(() => {
      if (this.status === "Live") {
        const isHome = Math.random() > 0.5;
        const points = Math.random() > 0.7 ? 2 : 1; // Mostly 1s, some 2s (pickup style)

        if (isHome) this.scoreHome += points;
        else this.scoreAway += points;

        this.requestUpdate();
      }
    }, Math.random() * 6000 + 2000);
  }

  _stopSimulation() {
    clearInterval(this._timerInterval);
    clearInterval(this._scoreInterval);
  }

  _handleGameEnd() {
    this.status = "Game Over";
    this._stopSimulation();

    // Restart new game after 3 seconds
    setTimeout(() => {
      this.status = "Live";
      this.scoreHome = 0;
      this.scoreAway = 0;
      this.timeRemaining = this.gameDuration * 60;
      this.squadsWaiting = Math.floor(Math.random() * 4); // Randomize waiting squads
      this._startSimulation();
    }, 4000);
  }

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
          position: relative;
          width: 100%;
          font-family: var(--ddd-font-navigation, sans-serif);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(0,0,0,0.5);
          background: #111;
          color: white;
          border: 1px solid rgba(255,255,255,0.1);
        }

        /* --- PARK HUD OVERLAY --- */
        .hud-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none; /* Let clicks pass through */
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 16px;
          box-sizing: border-box;
          background: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.8) 100%);
        }

        /* Top Scoreboard */
        .scoreboard {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          background: rgba(0, 59, 92, 0.85); /* DDD Navy */
          padding: 8px 24px;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(4px);
          align-self: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.5);
        }

        .score-box {
          text-align: center;
        }

        .score-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          opacity: 0.8;
          font-weight: bold;
        }

        .score-val {
          font-size: 1.8rem;
          font-weight: 900;
          line-height: 1;
          color: var(--ddd-theme-default-white);
        }

        .score-val.winning {
          color: var(--ddd-theme-default-yellow, #FFB81C);
          text-shadow: 0 0 10px rgba(255, 184, 28, 0.5);
        }

        .game-clock {
          font-family: "Courier New", monospace;
          font-size: 1.4rem;
          font-weight: bold;
          color: #fff;
          padding: 0 12px;
          border-left: 1px solid rgba(255,255,255,0.3);
          border-right: 1px solid rgba(255,255,255,0.3);
        }

        .status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .court-id {
          font-weight: 900;
          text-transform: uppercase;
          font-size: 1.2rem;
          letter-spacing: 1px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.8);
        }

        .queue-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 184, 28, 0.9); 
          color: #000;
          padding: 4px 12px;
          border-radius: 4px;
          font-weight: bold;
          font-size: 0.9rem;
          box-shadow: 0 0 15px rgba(255, 184, 28, 0.4);
        }

        .game-over-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.85);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          z-index: 10;
          backdrop-filter: blur(5px);
          animation: fadeIn 0.3s ease;
        }
        
        .game-over-text {
          font-size: 3rem;
          font-weight: 900;
          color: var(--ddd-theme-default-yellow);
          text-transform: uppercase;
          transform: rotate(-5deg);
        }

        .court-bg {
          width: 100%;
          height: auto;
          display: block;
          opacity: 0.6; 
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `
    ];
  }

  render() {
    return html`
      ${this.status === "Game Over" ? html`
        <div class="game-over-overlay">
          <div class="game-over-text">Game Over</div>
          <div style="color: white; margin-top: 10px;">Resetting Court...</div>
        </div>
      ` : ''}

      <div class="hud-overlay">
        
        <div class="scoreboard">
          <div class="score-box">
            <div class="score-label">Home</div>
            <div class="score-val ${this.scoreHome > this.scoreAway ? 'winning' : ''}">${this.scoreHome}</div>
          </div>
          
          <div class="game-clock">
            ${this.formatTime(this.timeRemaining)}
          </div>

          <div class="score-box">
            <div class="score-label">Away</div>
            <div class="score-val ${this.scoreAway > this.scoreHome ? 'winning' : ''}">${this.scoreAway}</div>
          </div>
        </div>

        <div class="status-bar">
          <div class="court-id">${this.courtName}</div>
          
          <div class="queue-badge">
            <simple-icon icon="social:group" style="--simple-icon-width:16px;"></simple-icon>
            <span>Got Next: ${this.squadsWaiting}</span>
          </div>
        </div>
      </div>

      <svg class="court-bg"
          viewBox="0 0 1000 600"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <rect x="0" y="0" width="1000" height="600" fill="${this.floorColor}" />
          <rect x="5" y="5" width="990" height="590" fill="none" stroke="white" stroke-width="2" />
          <line x1="500" y1="5" x2="500" y2="595" stroke="white" stroke-width="2" />
          <circle cx="500" cy="300" r="60" stroke="white" stroke-width="2" fill="none" />
          
          <rect x="5" y="220" width="190" height="160" fill="rgba(255,255,255,0.1)" stroke="white" stroke-width="2" />
          <path d="M 140,50 Q 300,300 140,550" fill="none" stroke="white" stroke-width="2" />
          
          <g transform="rotate(180 500 300)">
             <rect x="5" y="220" width="190" height="160" fill="rgba(255,255,255,0.1)" stroke="white" stroke-width="2" />
             <path d="M 140,50 Q 300,300 140,550" fill="none" stroke="white" stroke-width="2" />
          </g>
      </svg>
    `;
  }
}

customElements.define(CpbraCourt.tag, CpbraCourt);