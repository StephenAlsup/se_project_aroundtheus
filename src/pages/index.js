import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, selectors } from "../utils/constants.js";
import { settings } from "../utils/constants.js";

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileTitleInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");

const cardAddForm = addCardModal.querySelector(".modal__form");

function createCard(data) {
  const cardElement = new Card(data, "#card-template", handlePreviewImage);
  return cardElement.getView();
}
function fillProfileForm() {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
}

const userInfo = new UserInfo(profileTitle, profileSubtitle);

function handleProfileEditSubmit(formData) {
  userInfo.setUserInfo(formData.name, formData.description);
  profileForm.close();
  editFormValidator.enableValidation();
}

const handleEditClick = () => {
  fillProfileForm();
  profileForm.open();
  editFormValidator.toggleButtonState();
};
profileEditBtn.addEventListener("click", handleEditClick);

const renderCard = (cardData) => {
  const newCard = createCard(cardData);
  cardSection.addItem(newCard);
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

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, cardAddForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

function handleCardAddFormSubmit({ title, url }) {
  const cardData = {
    name: title,
    link: url,
  };
  renderCard(cardData);

  addFormValidator.enableValidation();
}

const profileForm = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

profileForm.setEventListeners();

addCardButton.addEventListener("click", () => {
  addCardForm.open();
  addFormValidator.toggleButtonState();
});

const popupWithImage = new PopupWithImage("#preview-image");
popupWithImage.setEventListeners();

function handlePreviewImage(name, link) {
  popupWithImage.open(name, link);
}
