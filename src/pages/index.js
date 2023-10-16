import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, selectors } from "../utils/constants.js";
import { settings } from "../utils/constants.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  authToken: "0b288917-ab08-48b1-b87e-440bc0c9842c",
});

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileTitleInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const avatarButton = document.querySelector(".profile__avatar-button");
const avatarImage = document.querySelector(".profile__image");
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");

const cardAddForm = addCardModal.querySelector(".modal__form");

function createCard(cardData) {
  const newCard = new Card(
    cardData,
    cardSelector,
    () => {
      popupWithImage.open(cardData.name, cardData.link);
    },
    (card) => {
      deleteCardModal.open(cardData);
      deleteCardModal.setAction(() => {
        deleteCardModal.setButtonText(true, "Deleting...");
        api
          .deleteCard(card._id)
          .then(() => {
            console.log(card);
            card.deleteCard();
            deleteCardModal.close();
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            deleteCardModal.setButtonText(false);
          });
      });
    },
    (card) => {
      console.log(card._isLiked, card);
      if (card._isLiked) {
        api
          .removeCardLike(card.getId())
          .then(() => {
            card.setLikes(false);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        api
          .addCardLike(card.getId())
          .then(() => {
            card.setLikes(true);
          })
          .catch(console.error);
      }
    }
  );
  cardSection.addItem(newCard.getView());
}
function fillProfileForm() {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
}

const userInfo = new UserInfo(profileTitle, profileSubtitle, avatarImage);

function handleProfileEditSubmit(formData) {
  userInfo.setUserInfo(formData.name, formData.description);
  profileForm.close();
}

const avatarModalPopup = new PopupWithForm(
  "#edit-avatar-modal",
  (avatarInfo) => {
    avatarModalPopup.setButtonText(true);
    api
      .editUserPhoto(avatarInfo)
      .then((info) => {
        userInfo.setAvatar(info.avatar);
        avatarModalPopup.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        avatarModalPopup.setButtonText(false);
      });
  }
);

const avatarModalEl = avatarModal.querySelector(".modal__form");

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setAvatar(userData.avatar);
    console.log(cards);
    cardSection = new Section(
      {
        items: cards,
        renderer: createCard,
      },
      cardListSelector
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });


function handleEditClick() {
  fillProfileForm();
  profileForm.open();
  editFormValidator.toggleButtonState();
}
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

const addCardForm = new PopupWithForm("#add-card-modal", (cardData) => {
  addCardForm.setButtonText(true);
  return api
    .addCard(cardData)
    .then((res) => {
      console.log(res);
      createCard(res);
      addCardForm.close();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      addCardForm.setButtonText(false);
    });
});
addCardForm.setEventListeners();

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, cardAddForm);
const editAvatarValidator = new FormValidator(settings, avatarModalEl);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
editAvatarValidator.enableValidation();

function handleCardAddFormSubmit({ title, url }) {
  const cardData = {
    name: title,
    link: url,
  };
  renderCard(cardData);
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

//function handlePreviewImage(name, link) {
  //popupWithImage.open(name, link);
//}

const deleteCardModal = new PopupWithConfirmation("#delete-modal", (card) => {
  console.log("card", card);
});
deleteCardModal.setEventListeners();

avatarButton.addEventListener("click", () => {
  editAvatarValidator.toggleButtonState();
  avatarModalPopup.open();
});
