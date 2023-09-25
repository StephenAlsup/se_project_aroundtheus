import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._cardImage = this._popupElement.querySelector(".modal__image");
    this._cardTitle = this._popupElement.querySelector(".modal__preview-title");
  }

  open(name, link) {
    this._cardImage.src = link;
    this._cardImage.alt = name;
    this._cardTitle.textContent = name;
    super.open();
  }
}
