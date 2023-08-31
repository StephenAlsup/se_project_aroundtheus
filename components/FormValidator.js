class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formEl = formEl;
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(errorClass);
  }

  _toggleButtonState() {
    if (hasInvalidInput(inputEls)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
      return;
    }
  
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }
  _checkInputValid(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(formEl, inputEl, settings);
    } else {
    this._hideInputError(formEl, inputEl, settings);
  }
}

  _hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  _setEventListeners() {
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this.toggleButtonState();
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
