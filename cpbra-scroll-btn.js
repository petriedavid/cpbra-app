/**
 * Copyright 2025 kinguva7229
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class CpbraScrollBtn extends DDDSuper(LitElement) {
  static get tag() {
    return "cpbra-scroll-btn";
  }

  static properties = {
    target: { type: String }, 
  };

  constructor() {
    super();
    this.target = "";
  }

  scrollAction() {
    let next;
    if (this.target) {
      next = document.querySelector(this.target);
    } else {
      window.scrollTo({
        top: window.scrollY + window.innerHeight,
        behavior: "smooth"
      });
      return;
    }

    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
    }
  }

  render() {
    return html`
      <button class="scroll-btn" @click="${this.scrollAction}">
        <span class="arrow">↓</span>
      </button>
    `;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          position: fixed;
          left: 50%;
          bottom: var(--ddd-spacing-12, 48px);
          transform: translateX(-50%);
          z-index: 10000;
          pointer-events: auto;
        }

        .scroll-btn {
          background: rgba(0, 0, 0, 0.85);
          border: 2px solid var(--ddd-theme-default-white);
          color: var(--ddd-theme-default-white);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 0 22px rgba(0, 0, 0, 0.45);
          animation: pulse 2.2s infinite ease-in-out;
        }

        .scroll-btn:hover {
          transform: translate(-50%, -6px);
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 0 35px rgba(255, 255, 255, 0.35);
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.08);
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.20);
          }
          100% {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.08);
          }
        }

        .arrow {
          display: block;
          line-height: 1;
          margin-top: -2px;
        }

        /* Mobile scaling */
        @media (max-width: 600px) {
          .scroll-btn {
            width: 48px;
            height: 48px;
            font-size: 1.4rem;
          }
        }
      `,
    ];
  }
}

customElements.define(CpbraScrollBtn.tag, CpbraScrollBtn);
