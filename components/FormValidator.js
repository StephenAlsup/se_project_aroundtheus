class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formEl = formEl;
  }

  _showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}
_hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
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

 _enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
  });
}

_toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  if (_hasInvalidInput(inputEls)) {
    submitButton.classList.add(_inactiveButtonClass);
    submitButton.disabled = true;
    return;
  }

  submitButton.classList.remove(_inactiveButtonClass);
  submitButton.disabled = false;
}

_setEventListeners(formEl, settings) {
  const { inputSelector, submitButtonSelector } = settings;
  const inputEls = [..._formEl.querySelectorAll(inputSelector)];
  const submitButton = _formElformEl.querySelector(submitButtonSelector);
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      _checkInputValid(formEl, inputEl, settings);
      _toggleButtonState(inputEls, submitButton, settings);
    });
  });
}
}

export default FormValidator;
