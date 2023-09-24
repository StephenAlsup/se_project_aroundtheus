import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

export const initialCards = [
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
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileCloseBtn = document.querySelector("#profile-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileTitleInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

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
const previewCloseBtn = document.querySelector("#preview-image-close");
const cardSelector = "#card-template";
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_error",
  errorClass: "modal__error_visible",
};
//addCardForm.setEventListeners();

function createCard(data) {
  const cardElement = new Card(data, "#card-template", handlePreviewImage);
  return cardElement.getView();
}

const renderCard = (cardData) => {
  const newCard = new Card(cardData, "#card-template", handlePreviewImage);
  cardSection.addItem(newCard.getView());
};

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);

cardSection.renderItems();

const addCardForm = new PopupWithForm(
  "#add-card-modal",
  handleCardAddFormSubmit
);
addCardForm.setEventListeners();

const userInfo = new UserInfo(profileTitle, profileSubtitle);

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, cardAddForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

function handleProfileEditSubmit(data) {
  userInfo.setUserInfo(data.name, data.description);
  profileForm.close();
 editFormValidator.toggleButtonState();
}

function handleCardAddFormSubmit() {
  const name = cardAddTitleInput.value;
  const link = cardAddLinkInput.value;
  renderCard({ name, link }, cardListEl);
  //addCardForm.close();
  //addCardForm.reset();
   addFormValidator.toggleButtonState();
}

function profileFormInfo() {
  const userInfoData = userInfo.getUserInfo();
  profileTitleInput.value = userInfoData.name;
  profileDescriptionInput.value = userInfoData.job;
}

function fillProfile() {
  profileFormInfo();
  profileForm.open();
}

profileEditBtn.addEventListener("click", fillProfile); 

const profileForm = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit,
  profileFormInfo(),
  editFormValidator.enableValidation(),
);

profileForm.setEventListeners();

addCardButton.addEventListener("click", () => {
  addFormValidator.enableValidation();
  addCardForm.open();
});

const popupWithImage = new PopupWithImage("#preview-image");
popupWithImage.setEventListeners();

function handlePreviewImage(name, link) {
  popupWithImage.open(name, link);
}
