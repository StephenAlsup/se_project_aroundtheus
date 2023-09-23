import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this.popupForm = this._popupElement.querySelector(".modal__form");
    this._popupSubmitBtn = this._popupForm.querySelector(".modal__button");
    this._popupInputs = this._popupForm.querySelector(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {
    const popInputValues = {};
    this._popupInputs.forEach((input) => {
      popInputValues[input.name] = input.value;
    });
    return popInputValues;
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    const inputValue = this._getInputValues();
    this._handleFormSubmit(inputValue);
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleSubmit.bind(this));
  }

  setInputValues(data) {
    this._popupInputs.forEach((input) => {
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
