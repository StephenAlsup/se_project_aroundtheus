import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        
        super({ popupSelector });
        this._popupForm = this._popupElement.querySelector('.modal__form');
        this._popupCloseForm = this._popupElement.querySelector('.modal__close');
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popupElement.querySelectorAll('.modal__input');

    }

    _getInputValues(){
        
        const inputValues = {};
        
        this._inputList.forEach((input) => (inputValues[input.name] = input.value));
        return inputValues;

    }

    setEventListeners() {
       this._popupForm.addEventListener('submit', (evt) => {
        this._handleFormSubmit(this._getInputValues());
       }); 
       this._popupCloseForm.addEventListener('click', () => {
        this.close();
       })
        super.setEventListeners();      
    } 

    close() {
        this._popupForm.reset();
        super.close();
    }

}