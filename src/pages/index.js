import "../pages/index.css";
import {
  validationConfig,
  profileConfig,
  containerSelector,
  containerProfile,
  containerUserCards,
  containerViewImages,
  profileEditButton,
  formEditProfile,
  inputNameProfile,
  inputJobProfile,
  cardsAddButton,
  formAddCards,
  containerAvatar,
  avatar,
  formNewAvatar,
  containerTrash,
  userName,
  userJob,
  textDisabledClass,
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-14",
  headers: {
    authorization: "cede3324-4ffe-44e5-b1e3-3ccfef967867",
    "Content-Type": "application/json",
  },
});

const userProfile = new UserInfo(profileConfig); // Создаём экземпляр отображения информации о пользователе.
const popupWithImage = new PopupWithImage(containerViewImages); // Создаём экземпляр "попапа" с изображением.
popupWithImage.setEventListeners();

// Функция открытия "попапа" с изображением
function handleCardClick(item) {
  popupWithImage.openPopup(item);
}

// Функция открытия "попапа" удаления карточки
function handleTrashClick(itemId, handleDeleteCard, element) {
  const popupWithSubmit = new PopupWithSubmit({
    // Создаём экземпляр "попапа" удаления карточки.
    popupSelector: containerTrash,
    handleFormSubmit: (_) => {
      api
        .deleteCard(itemId) // Запрос на удаление карточки
        .then((result) => {
          console.log(result);
          handleDeleteCard(element);
        })
        .catch((err) => {
          console.log(err); // Выведем ошибку в консоль
        });
      popupWithSubmit.closePopup();
    },
  });
  popupWithSubmit.openPopup();
  popupWithSubmit.setEventListeners();
}

// Функция добавления колличества лайков
function handleAddLike(itemId, numberLikes) {
  api
    .addLikeCard(itemId) // Запрос на добавление лайка
    .then((result) => {
      numberLikes.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err); // Выведем ошибку в консоль
    });
}

// Функция уменьшения колличества лайков
function handleRemoveLike(itemId, numberLikes) {
  api
    .removeLikeCard(itemId) // Запрос на удаление лайка
    .then((result) => {
      numberLikes.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err); // Выведем ошибку в консоль
    });
}

// Функция создания и добавления карточек на страницу
const addCards = (items, userInfo) => {
  const initialCardsList = new Section(
    {
      data: items,
      renderer: (item) => {
        const card = new Card(
          item,
          userInfo,
          "#photo-place__template",
          handleCardClick,
          handleTrashClick,
          handleAddLike,
          handleRemoveLike
        );
        const cardElement = card.generateCard();
        initialCardsList.addItem(cardElement);
      },
    },
    containerSelector
  );
  initialCardsList.renderItems();
};

api
  .getInitialInfo()
  .then(([userInfo, initialCards]) => {
    avatar.style.backgroundImage = `url(${userInfo.avatar})`; // Загрузка информации о пользователе.
    userName.textContent = userInfo.name;
    userJob.textContent = userInfo.about;
    addCards(initialCards, userInfo); // Первоначальная загрузка карточек
  })
  .catch((err) => {
    console.log(err); // Выведем ошибку в консоль
  });

function savingData(form, load) {
  // Функция отображения "лоадера" сохранения данных
  if (load) {
    form.querySelector(".popup__button-save").classList.add(textDisabledClass);
    form
      .querySelector(".popup__button-saving")
      .classList.remove(textDisabledClass);
  } else {
    form
      .querySelector(".popup__button-save")
      .classList.remove(textDisabledClass);
    form
      .querySelector(".popup__button-saving")
      .classList.add(textDisabledClass);
  }
}

const popupEditProfile = new PopupWithForm({
  // Создаём экземпляр "попапа" для формы "Редактирования профиля".
  popupSelector: containerProfile,
  handleFormSubmit: (formData) => {
    savingData(formEditProfile, true);
    api
      .setUserInfo(formData) // Запрос на обновление данных профиля
      .then((result) => {
        userProfile.setUserInfo(result);
      })
      .catch((err) => {
        console.log(err); // Выведем ошибку в консоль
      });
    popupEditProfile.closePopup();
  },
});
popupEditProfile.setEventListeners();

const popupAddCards = new PopupWithForm({
  // Создаём экземпляр "попапа" для формы "Добавления новых Карточек".
  popupSelector: containerUserCards,
  handleFormSubmit: (formData) => {
    const newCard = [{ name: formData.card, link: formData.link }];
    savingData(formAddCards, true);
    api
      .addNewCard(newCard) // Загрузка новой карточки на сервер
      .then((result) => {
        addCards([result], result.owner);
      })
      .catch((err) => {
        console.log(err); // Выведем ошибку в консоль
      });
    popupAddCards.closePopup();
  },
});
popupAddCards.setEventListeners();

const popupNewAvatar = new PopupWithForm({
  // Создаём экземпляр "попапа" для формы "Изменения Аватара".
  popupSelector: containerAvatar,
  handleFormSubmit: (formData) => {
    savingData(formNewAvatar, true);
    api
      .setUserAvatar(formData) // Загрузка нового аватара на сервер
      .then((result) => {
        avatar.style.backgroundImage = `url(${result.avatar})`;
      })
      .catch((err) => {
        console.log(err); // Выведем ошибку в консоль
      });
    popupNewAvatar.closePopup();
  },
});
popupNewAvatar.setEventListeners();

const formEditProfileValidation = new FormValidator(
  validationConfig,
  formEditProfile
);
formEditProfileValidation.enableValidation(); //Запуск валидации формы "Редактировать профиль"

const formAddNewCardsValidation = new FormValidator(
  validationConfig,
  formAddCards
);
formAddNewCardsValidation.enableValidation(); //Запуск валидации формы "Добавление новых карточек"

const formNewAvatarValidation = new FormValidator(
  validationConfig,
  formNewAvatar
);
formNewAvatarValidation.enableValidation(); //Запуск валидации формы "Изменения аватара"

profileEditButton.addEventListener("click", (_) => {
  popupEditProfile.openPopup();
  savingData(formEditProfile, false);
  profileEditButton.blur();
  const { name, job } = userProfile.getUserInfo();
  inputNameProfile.value = name;
  inputJobProfile.value = job;
  formEditProfileValidation.resetForm(); //Очитска формы "Редактировать профиль" от ошибок и переключение кнопки "сабмита"
});

cardsAddButton.addEventListener("click", (_) => {
  popupAddCards.openPopup();
  savingData(formAddCards, false);
  cardsAddButton.blur();
  formAddNewCardsValidation.resetForm(); //Очитска формы "Добавление новых карточек" от ошибок и переключение кнопки "сабмита"
});

avatar.addEventListener("click", (_) => {
  popupNewAvatar.openPopup();
  savingData(formNewAvatar, false);
  avatar.blur();
  formNewAvatarValidation.resetForm(); //Очитска формы "Изменение аватара" от ошибок и переключение кнопки "сабмита"
});
