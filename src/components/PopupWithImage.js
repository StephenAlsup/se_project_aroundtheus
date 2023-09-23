import PopUp from "./Popup.js";

export default class PopUpWithImage extends PopUp {
  constructor(popUpSelector) {
    super(popUpSelector);
    this._cardImage = this._popupElement.querySelector("#preview-image");
    this._cardTitle = this._popupElement.querySelector(".modal__preview-title"); 
  }
  
setEventListeners(){
  super.setEventListeners();
}
  open(data) {
    super.open();
    if (data) {
      this._cardImage.src = data.link; 
      this._cardImage.alt = data.name;  
      this._cardTitle.textContent = data.name; 
    }
  }
  close() {
    super.close();
  }
}