import { openModal, closeModal, handleEscape } from "../utils/utils.js";

const cardImageModal = document.querySelector("#preview-image");
const cardPreviewImage = document.querySelector(".modal__image");
const cardPreviewTitle = document.querySelector(".modal__preview-title");


class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
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
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handlePreviewPicture() {
    cardPreviewImage.src = this._link;
    cardPreviewImage.alt = this._name;
    cardPreviewTitle.textContent = this._name;
    openModal(cardImageModal);
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards")
      .cloneNode(true);

      this._likeButton = this._cardElement.querySelector(".card__like-button");

      this._deleteButton = this._cardElement.querySelector(".card__delete-button");
  
      this._cardImage = this._cardElement.querySelector(".card__image");
  
      this._cardTitle = this._cardElement.querySelector(".card__title");
  

    this._cardElement.querySelector(".card__title").innerText = this._name;
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}

export default Card;
