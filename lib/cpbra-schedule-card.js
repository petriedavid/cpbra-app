import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/simple-icon/simple-icon.js";

export class CpbraScheduleCard extends DDDSuper(LitElement) {
    static get tag() {
        return "cpbra-schedule-card";
    }

    static get properties() {
        return {
            opponent: { type: String },
            date: { type: String },
            time: { type: String },
            location: { type: String },
            status: { type: String }
        };
    }

    constructor() {
        super();
        this.opponent = "Opposing Team Name";
        this.date = "Mon, Oct 27";
        this.time = "7:00 PM";
        this.location = "Westgate Fieldhouse";
        this.status = "Upcoming";
    }

    getStatusColor() {
        switch (this.status.toLowerCase()) {
            case 'completed':
                return 'var(--ddd-theme-default-accentLight, #5D9981)';
            case 'canceled':
                return 'var(--ddd-theme-default-error, #D7263D)';
            case 'live':
                return 'var(--ddd-theme-default-yellow, #FFB81C)';
            case 'upcoming':
            default:
                return 'var(--ddd-theme-default-linkLight, #89C7B8)';
        }
    }

    static get styles() {
        return [
            super.styles,
            css`
        :host {
          display: block;
          background-color: var(--ddd-theme-default-navy80, #1A2938);
          border-radius: var(--ddd-radius-md, 8px);
          box-shadow: var(--ddd-box-shadow-lg);
          padding: var(--ddd-spacing-6, 24px);
          font-family: var(--ddd-font-primary);
          color: var(--ddd-theme-default-white, white);
          transition: transform 0.2s ease;
        }

        :host(:hover) {
          transform: translateY(-4px);
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.4);
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--ddd-spacing-4, 16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: var(--ddd-spacing-4);
        }

        .opponent {
          font-size: var(--ddd-font-size-xl, 1.5rem);
          font-weight: var(--ddd-font-weight-bold, 700);
          color: var(--ddd-theme-default-white);
        }

        .status {
          font-weight: var(--ddd-font-weight-bold, 700);
          padding: var(--ddd-spacing-1, 4px) var(--ddd-spacing-3, 12px);
          border-radius: var(--ddd-radius-sm, 4px);
          font-size: var(--ddd-font-size-xs, 0.75rem);
          text-transform: uppercase;
        }

        .details {
          display: flex;
          flex-direction: column;
          gap: var(--ddd-spacing-3, 12px);
          font-size: var(--ddd-font-size-sm, 0.9rem);
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: var(--ddd-spacing-2, 8px);
        }

        simple-icon {
          color: var(--ddd-theme-default-yellow, #FFB81C);
          --simple-icon-width: 18px;
          --simple-icon-height: 18px;
        }
      `
        ];
    }

    render() {
        return html`
      <div class="card-wrapper">
        <div class="header">
          <div class="opponent">${this.opponent}</div>
          <div 
            class="status" 
            style="background-color: ${this.getStatusColor()}; color: var(--ddd-theme-default-navy);"
          >
            ${this.status}
          </div>
        </div>

        <div class="details">
          <div class="detail-item">
            <simple-icon icon="schedule"></simple-icon>
            <span>${this.date} at ${this.time}</span>
          </div>
          <div class="detail-item">
            <simple-icon icon="maps:place"></simple-icon>
            <span>${this.location}</span>
          </div>
        </div>
      </div>
    `;
    }
}

customElements.define(CpbraScheduleCard.tag, CpbraScheduleCard);