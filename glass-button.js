const templateGlassButton = document.createElement("template");
templateGlassButton.innerHTML = `
  <style>
    * {
        font-family: sans-serif;
    }
    .glassBtn {
        all: unset;
        margin: 3px;
        padding: 7px 10px;
        color: rgba( 0, 0, 0, 0.8);
        background: rgba( 255, 255, 255, 0.25 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 4px );
        -webkit-backdrop-filter: blur( 4px );
        border-radius: 5px;
        border: 1px solid rgba( 255, 255, 255, 0.18 );
    }
    .glassBtn:hover {
        background: rgba( 255, 255, 255, 0.5 );
        cursor: pointer;
    }

    .dark {
        background: rgba( 0, 0, 0, 0.25 );
        box-shadow: 0 8px 32px 0 rgba( 224, 217, 120, 0.37 );
        border: 1px solid rgba( 0, 0, 0, 0.1 );
        color: rgba( 255, 255, 255, .8);
    }
    .dark:hover {
        background: rgba( 0, 0, 0, 0.5 );
    }

    .blue {
        background: rgba( 20, 0, 255, 0.25 );
        border: 1px solid rgba( 0, 0, 0, 0.1 );
    }
    .blue:hover {
        background: rgba( 20, 0, 255, 0.5 );
    }
  </style>
  <button class="glassBtn">
    <slot />
  </button>
`;

class GlassButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(templateGlassButton.content.cloneNode(true));
    if (this.getAttribute("theme") === "dark")
      this.shadowRoot.querySelector(".glassBtn").classList += " dark";
    if (this.getAttribute("theme") === "blue")
      this.shadowRoot.querySelector(".glassBtn").classList += " blue";
  }
}

window.customElements.define("glass-button", GlassButton);
