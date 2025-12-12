import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./cpbra-schedule-card.js";

export class CpbraScheduleList extends DDDSuper(LitElement) {
  static get tag() {
    return "cpbra-schedule-list";
  }

  static get properties() {
    return {
      schedule_data: { type: Array },
      schedule_api: { type: String, attribute: 'schedule-api' },
      loading: { type: Boolean, reflect: true }
    };
  }

  constructor() {
    super();
    this.schedule_data = [];
    this.schedule_api = "/api/schedule.json";
    this.loading = true;
    this.fetch_schedule_data();
  }

  async fetch_schedule_data() {
    this.loading = true;
    try {
      const response = await fetch(this.schedule_api);
      if (!response.ok) {
        throw new Error(`failed_to_fetch_schedule_data_from_${this.schedule_api}`);
      }
      const data = await response.json();
      this.schedule_data = data;
    } catch (e) {
      console.error("error_loading_schedule_data:", e);
      this.schedule_data = [];
    } finally {
      this.loading = false;
    }
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          padding: var(--ddd-spacing-8, 32px) 0;
          background-color: var(--ddd-theme-default-navy, #003B5C);
          font-family: var(--ddd-font-primary);
        }

        .list_header {
          text-align: center;
          color: var(--ddd-theme-default-white, white);
          margin-bottom: var(--ddd-spacing-10, 40px);
        }

        .list_header h2 {
          font-size: var(--ddd-font-size-2xl, 2rem);
          font-weight: var(--ddd-font-weight-black, 900);
          color: var(--ddd-theme-default-yellow, #FFB81C);
          margin: 0 0 var(--ddd-spacing-2);
        }

        .list_header p {
          font-size: var(--ddd-font-size-md);
          color: var(--ddd-theme-default-white);
          opacity: 0.8;
          max-width: 600px;
          margin: 0 auto;
        }

        .cards_container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
          gap: var(--ddd-spacing-6, 24px);
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--ddd-spacing-4, 16px);
        }

        @media (max-width: 768px) {
          .cards_container {
            grid-template-columns: 1fr;
          }
        }
        
        .loading_indicator {
          text-align: center;
          padding: var(--ddd-spacing-10);
          color: var(--ddd-theme-default-white);
          font-size: var(--ddd-font-size-lg);
        }
      `
    ];
  }

  render() {
    if (this.loading) {
      return html`<div class="loading_indicator">Loading schedule...</div>`;
    }

    return html`
      <div class="list_header">
        <h2>Upcoming Games</h2>
        <p>The latest schedule and status updates for all CPBRA association events.</p>
      </div>
      <div class="cards_container">
        ${this.schedule_data.length > 0
        ? this.schedule_data.map(
          (item) => html`
                <cpbra-schedule-card
                  opponent="${item.opponent}"
                  date="${item.date}"
                  time="${item.time}"
                  location="${item.location}"
                  status="${item.status}"
                ></cpbra-schedule-card>
              `
        )
        : html`<div class="loading_indicator">No games currently scheduled.</div>`
      }
      </div>
    `;
  }
}

customElements.define(CpbraScheduleList.tag, CpbraScheduleList);