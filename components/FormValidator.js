class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formEl = formEl;
  
  }

  _showInputError(formEl, inputEl, { _inputErrorClass, _errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(_inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(_errorClass);
}
_hideInputError(formEl, inputEl, { _inputErrorClass, _errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(_inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(_errorClass);
}

_checkInputValid(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    return _showInputError(formEl, inputEl, options);
  }
  _hideInputError(formEl, inputEl, options);
}

_hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

enableValidation() {
  this._formEl.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  this._setEventListeners();
}

_toggleButtonState() {
  if (_hasInvalidInput(inputEls)) {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
    return;
  }

  this._submitButton.classList.remove(this._inactiveButtonClass);
  this._submitButton.disabled = false;
}

_setEventListeners(formEl, settings) {
  const { _inputSelector, _submitButtonSelector } = settings;
  const inputEls = [..._formEl.querySelectorAll(_inputSelector)];
  const submitButton = _formEl.querySelector(_submitButtonSelector);
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      _checkInputValid(formEl, inputEl, settings);
      _toggleButtonState(inputEls, submitButton, settings);
    });
  });
}
}

export default FormValidator;
