import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/simple-icon/simple-icon.js";

export class CpbraGallery extends DDDSuper(LitElement) {
  static get tag() {
    return "cpbra-gallery";
  }

  static properties = {
    media: { type: Array },
    currentIndex: { type: Number },
    loading: { type: Boolean },
    likes: { type: Object },
    copied: { type: String },
  };

  constructor() {
    super();
    this.media = [];
    this.currentIndex = 0;
    this.loading = false;
    this.likes = {};
    this.copied = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadLikes();
    this.getMedia(3);
  }

  loadLikes() {
    const stored = localStorage.getItem("cpbraGalleryLikes");
    if (stored) {
      try {
        this.likes = JSON.parse(stored);
      } catch {
        console.warn("Failed to parse stored likes.");
      }
    }
  }

  saveLikes() {
    localStorage.setItem("cpbraGalleryLikes", JSON.stringify(this.likes));
  }

  async getMedia(count = 3, direction = "right") {
    this.loading = true;
    try {
      const resp = await fetch("/api/media.json");
      if (!resp.ok) throw new Error(`Fetch failed: ${resp.status}`);
      const data = await resp.json();

      const mediaList = data.items || [];

      const newMedia = mediaList.map((m) => ({
        image: m.url || m.src,
        title: m.title || "Gallery Image",
        description: m.description || ""
      }));

      if (this.media.length === 0) {
        this.media = newMedia;
      } else {
        if (direction === "left") {
          this.media = [...newMedia, ...this.media];
          this.currentIndex += newMedia.length;
        } else {
          this.media = [...this.media, ...newMedia];
        }
      }

    } catch (e) {
      console.error("Error fetching media:", e);
    } finally {
      this.loading = false;
    }
  }

  next() {
    if (this.currentIndex + 4 >= this.media.length) this.getMedia(3, "right");
    if (this.currentIndex < this.media.length - 1) {
      this.currentIndex++;
    }
  }

  prev() {
    if (this.currentIndex <= 0) {
      this.getMedia(3, "left");
    } else {
      this.currentIndex--;
    }
  }

  toggleLike(title, value) {
    const updatedLikes = {
      ...this.likes,
      [title]: this.likes[title] === value ? null : value,
    };
    this.likes = updatedLikes;
    this.saveLikes();
  }

  async copyLink(link, title) {
    try {
      await navigator.clipboard.writeText(link);
      this.copied = title;
      setTimeout(() => (this.copied = ""), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  render() {
    const visible = this.media.slice(this.currentIndex, this.currentIndex + 3);

    return html`
      <div class="wrapper">
        <h2 style="color: var(--ddd-theme-default-yellow);">League Highlights</h2>
        
        <div class="carousel">
          <button class="arrow" @click=${this.prev} ?disabled=${this.loading}>
            <simple-icon icon="chevron-left"></simple-icon>
          </button>
          
          <div class="slides">
            ${visible.map(
      (m) => html`
                <div class="card">
                  <div class="image-container">
                    <img
                        src=${m.image}
                        alt=${m.title}
                        loading="lazy"
                        @click=${() => window.open(m.image, "_blank")}
                    />
                  </div>
                  
                  <div class="card-content">
                    <p class="title">${m.title}</p>
                    <p class="desc">${m.description}</p>
                    
                    <div class="buttons">
                      <button
                        class="action-btn like ${this.likes[m.title] === "like" ? "active" : ""}"
                        @click=${() => this.toggleLike(m.title, "like")}
                        title="Like"
                      >
                        <simple-icon icon="favorite"></simple-icon>
                      </button>
                      
                      <button
                        class="action-btn share"
                        @click=${() => this.copyLink(m.image, m.title)}
                        title="Copy Link"
                      >
                        <simple-icon icon="link"></simple-icon>
                      </button>
                    </div>
                    
                    ${this.copied === m.title
          ? html`<p class="copied">Link Copied!</p>`
          : ""}
                  </div>
                </div>
              `
    )}
            ${visible.length === 0 && !this.loading ? html`<p>No images found.</p>` : ''}
          </div>

          <button class="arrow" @click=${this.next} ?disabled=${this.loading}>
            <simple-icon icon="chevron-right"></simple-icon>
          </button>
        </div>
        
        ${this.loading ? html`<p class="loading">Loading highlights...</p>` : ""}
      </div>
    `;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          font-family: var(--ddd-font-primary);
        }
        .wrapper {
          padding: var(--ddd-spacing-6);
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }
        .carousel {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--ddd-spacing-4);
        }
        .arrow {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid var(--ddd-theme-default-white);
          border-radius: 50%;
          cursor: pointer;
          color: var(--ddd-theme-default-white);
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .arrow:hover:not(:disabled) {
          background: var(--ddd-theme-default-yellow);
          color: var(--ddd-theme-default-navy);
          transform: scale(1.1);
        }
        .arrow:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        
        .slides {
          display: flex;
          gap: var(--ddd-spacing-6);
          overflow: hidden;
          width: 100%;
          justify-content: center;
          min-height: 400px; 
        }

        .card {
          flex: 0 0 300px; 
          background-color: var(--ddd-theme-default-navy80);
          border: 1px solid var(--ddd-theme-default-navy);
          border-radius: var(--ddd-radius-md);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        
        .card:hover {
          transform: translateY(-8px);
          box-shadow: var(--ddd-box-shadow-lg);
          border-color: var(--ddd-theme-default-yellow);
        }

        .image-container {
            height: 200px;
            overflow: hidden;
            background: #000;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          cursor: pointer;
        }
        
        .card:hover img {
            transform: scale(1.1);
        }

        .card-content {
            padding: var(--ddd-spacing-4);
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }

        .title {
          font-weight: 900;
          color: var(--ddd-theme-default-yellow);
          font-size: 1.1rem;
          margin: 0 0 var(--ddd-spacing-2);
          text-transform: uppercase;
        }
        
        .desc {
            font-size: 0.9rem;
            color: var(--ddd-theme-default-white);
            opacity: 0.8;
            margin-bottom: var(--ddd-spacing-4);
            flex-grow: 1;
        }

        .buttons {
          display: flex;
          justify-content: center;
          gap: var(--ddd-spacing-4);
          margin-top: auto;
        }

        .action-btn {
          background: transparent;
          border: 1px solid var(--ddd-theme-default-white);
          color: var(--ddd-theme-default-white);
          border-radius: 4px;
          padding: 8px 16px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          background: rgba(255,255,255,0.1);
        }

        .action-btn.like.active {
          background: var(--ddd-theme-default-error, #D7263D);
          border-color: var(--ddd-theme-default-error, #D7263D);
        }
        
        .action-btn.share:hover {
            background: var(--ddd-theme-default-yellow);
            color: var(--ddd-theme-default-navy);
            border-color: var(--ddd-theme-default-yellow);
        }

        .copied {
          color: var(--ddd-theme-default-accentLight, #5D9981);
          font-size: 0.85rem;
          font-weight: bold;
          margin-top: var(--ddd-spacing-2);
          animation: fadeOut 1.5s ease-in-out forwards;
        }

        @keyframes fadeOut {
          0% { opacity: 1; }
          70% { opacity: 1; }
          100% { opacity: 0; }
        }

        .loading {
          color: var(--ddd-theme-default-white);
          font-style: italic;
          margin-top: var(--ddd-spacing-4);
        }

        @media (max-width: 900px) {
          .card {
            flex: 0 0 100%; 
          }
          .slides {
              flex-direction: column;
              align-items: center;
          }
          .card {
              display: none;
          }
          .card:first-child {
              display: flex;
          }
        }
      `
    ];
  }
}

customElements.define(CpbraGallery.tag, CpbraGallery);