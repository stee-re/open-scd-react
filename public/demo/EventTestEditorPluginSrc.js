export default class WcButton extends HTMLElement {
  title = "";
  _shadowRoot;
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "closed" });

    this._shadowRoot.innerHTML = `
        <style>
            button *{
                color: white;
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
            }
        </style>
        <button><slot></slot></button>
    `;
  }

  static get observedAttributes() {
    return ["title"];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "title") {
      this.title = newValue;
    }
  }

  connectedCallback() {
    const button = this._shadowRoot?.querySelector("button");
    if (button) {
      button.addEventListener("click", this.handleClick.bind(this));
    }
  }

  handleClick() {
    const event = new CustomEvent("oscd-open", {
      detail: { message: this.title + " was clicked!" },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}
