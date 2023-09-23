export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscape = this._handleEscape;
  }
  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscape);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscape);
  }

  _handleEscape({ key }) {
    if (key === "Escape") {
      const openModal = document.querySelector(".modal_opened");
      closeModal(openModal);
      console.log("clicked");
    }
  }
  setEventListeners() {
    this._popupElement.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("modal") ||
        event.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
}
