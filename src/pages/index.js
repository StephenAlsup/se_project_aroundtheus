import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";



const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseBtn = profileEditModal.querySelector("#profile-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileTitleInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
//const cardTemplate =
  //document.querySelector("#card-template").content.firstElementChild;
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const cardCloseBtn = document.querySelector("#card-modal-close");
const cardAddForm = addCardModal.querySelector(".modal__form");
const cardAddLink = document.querySelector("#card-url-input");
const cardAddTitle = document.querySelector("#card-title-input");
const cardAddTitleInput = document.querySelector("#card-title-input");
const cardAddLinkInput = document.querySelector("#card-url-input");
const previewImageModal = document.querySelector("#preview-image");
const modalImage = document.querySelector(".modal__image");
const modalText = document.querySelector(".modal__preview-title");
const previewCloseBtn = previewImageModal.querySelector("#preview-image-close");

const settings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_error",
  errorClass: "modal__error_visible",
};

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

cardsSection.renderItems();

//initialCards.forEach((cardData) => {
  //const cardElement = createCard(cardData, "#card-template");
  //cardListEl.append(cardElement);
//});

const addCardForm = new PopupWithForm('#add-card-modal', (cardData) => {
  renderCard(cardData)
   addCardForm.close();
 });
 addCardForm.setEventListeners();

function createCard(cardData) {
    const cardElement = new Card(cardData, "#card-template", handlePreviewPicture);
    return cardElement.getView();
  }
  
  
  const editFormValidator = new FormValidator(settings, profileEditForm);
  const addFormValidator = new FormValidator(settings, cardAddForm);
  editFormValidator.enableValidation();
  addFormValidator.enableValidation();

  function renderCard(cardData) {
    const card = createCard(cardData, "#card-template");
    cardsListEl.prepend(card);
  }
  
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileDescriptionInput.value;
  profileForm.close();

  editFormValidator.toggleButtonState();
}

function handleCardAddFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
 }
 
 addCardForm.close();
 cardAddForm.reset();
 addFormValidator.toggleButtonState();


profileEditBtn.addEventListener("click", () => {
  const info = userData.getUserInfo();
  profileTitleInput.value = info.name;
  profileDescriptionInput.value = info.job;
  profileEditForm.open();
});

const profileForm = new PopupWithForm('#profile-edit-modal', (data) => {
  userData.setUserInfo(data.name, data.description);
  profileEditForm.close();
});
 profileForm.setEventListeners();

  addCardButton.addEventListener("click", () => {
  addFormValidator.enableValidation();
  addCardForm.open();cardData
});


function handlePreviewPicture(cardData) {
  popUpWithImage.open(cardData);
}
 

const popUpWithImage = new PopupWithImage("#preview-image");
popUpWithImage.setEventListeners();



 const userData = new UserInfo(
  ".profile__name",
  ".profile__description",
 );