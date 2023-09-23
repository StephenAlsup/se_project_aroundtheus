import PopUp from "./Popup.js";

export default class PopUpWithImage extends PopUp {
  constructor(popUpSelector) {
    super(popUpSelector);
    this._image = this._popupElement.querySelector(".modal__image");
    this._caption = this._popupElement.querySelector(".modal__preview-title"); 
  }
  
setEventListeners(){
  super.setEventListeners();
}
  open(data) {
    super.open();
    if (data) {
      this._image.src = data.link; 
      this._image.alt = data.name;  
      this._caption.textContent = data.name; 
    }
  }
  close() {
    super.close();
  }
}