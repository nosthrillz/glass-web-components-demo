var imported = document.createElement("script");
imported.src = "./glass-button.js";
document.head.appendChild(imported);

const templateGlassCard = document.createElement("template");
templateGlassCard.innerHTML = `
  <style>
    * {
        font-family: inherit;
    }
    .glassCard {
        width: 100%;
        margin: 3px;
        padding: 10px;
        color: rgba( 0, 0, 0, 0.8);
        background: rgba( 255, 255, 255, 0.25 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 4px );
        -webkit-backdrop-filter: blur( 4px );
        border-radius: 10px;
        border: 1px solid rgba( 255, 255, 255, 0.18 );
        display: grid;
        grid-template-columns: 150px 1fr;
        grid-template-rows: repeat(3, 1fr);
        grid-template-areas:
            "avatar name"
            "avatar emailFields"
            "avatar callFields";
        gap: 10px;
        align-items: center;
    }
    .glassCard >img {
        grid-area: avatar;
        width: 100%;
        border-radius: 5px;
    }
    .glassCard >h3 {
        grid-area: name;
        margin: 0;
    }
    .glassCard >div {
        display: grid;
        justify-content: space-between;
        justify-items: flex-end;
        align-items: center;
        grid-template-columns: 2fr 1fr;
        gap: 5px;
    }
    .emailFields {
        grid-area: emailFields;
    }
    .callFields {
        grid-area: callFields;
    }
    .glassCard >div >p {
        margin: 0;
        width: 100%;
        text-align: left;
    }
  </style>
  <div class="glassCard">
    <img />
    <h3></h3>
    <div class="emailFields">
        <p><slot name="email"/></p>
        <glass-button id="emailBtn">E-mail</glass-button>
    </div>
    <div class="callFields">
        <p><slot name="phone"/></p>
        <glass-button id="callBtn">Call</glass-button>
    </div>
  </div>
`;

class GlassCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(templateGlassCard.content.cloneNode(true));
    this.shadowRoot.querySelector("h3").innerText = this.getAttribute("name");
    this.shadowRoot.querySelector("img").src = this.getAttribute("image");
  }

  emailHandler() {
    window.open(`mailto:${this.querySelector("div").innerText}`);
  }
  callHandler() {
    window.open(`tel:${this.querySelector("div").innerText}`);
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector("#emailBtn")
      .addEventListener("click", () => this.emailHandler());
    this.shadowRoot
      .querySelector("#callBtn")
      .addEventListener("click", () => this.callHandler());
  }

  disconnectedCallback() {
    this.shadowRoot
      .querySelector("#emailBtn")
      .removeEventListener("click", () => this.emailHandler());
    this.shadowRoot
      .querySelector("#callBtn")
      .removeEventListener("click", () => this.callHandler());
  }
}

window.customElements.define("glass-card", GlassCard);
