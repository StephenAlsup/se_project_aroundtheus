//import { openModal, closeModal, handleEscape } from "../utils/utils.js";

//const cardImageModal = document.querySelector("#preview-image");
//const cardPreviewImage = document.querySelector(".modal__image");
//const cardPreviewTitle = document.querySelector(".modal__preview-title");


export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _setEventListeners() {
    this._cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardElement
    .querySelector(".card__image")
    .addEventListener("click", () => {
        this._handlePreviewPicture();
      });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._cardElement
    .querySelector(".card__like-button")
    .classList.toggle("card__like-button_active");
}

   getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    

      this._setEventListeners();

      this._cardImage.src = this._link;
  
      this._cardImage.alt = this._name;
  
      this._cardTitle.textContent = this._name;
  

    this._cardElement.querySelector(".card__description").innerText = this._name;
    return this._cardElement;
  }
}


