import '../pages/index.css';
import {
  initialCards, validationConfig, profileConfig, containerSelector, containerProfile,
  containerUserCards, containerViewImages, profileEditButton, formEditProfile, inputNameProfile,
  inputJobProfile, cardsAddButton, formAddCards, containerAvatar, avatar, formNewAvatar,
  containerTrash, userName, userJob
} from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import Api from '../components/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: 'cede3324-4ffe-44e5-b1e3-3ccfef967867',
    'Content-Type': 'application/json'
  }
});

api.getUserInfo()
  .then((result) => {
    avatar.style.backgroundImage = `url(${result.avatar})`;// Загрузка информации о пользователе.
    userName.textContent = result.name;
    userJob.textContent = result.about;
  })
  .catch((err) => {
    console.log(err); // Выведем ошибку в консоль
  });

const userProfile = new UserInfo(profileConfig); // Создаём экземпляр отображения информации о пользователе.
const popupWithImage = new PopupWithImage(containerViewImages); // Создаём экземпляр "попапа" с изображением.
popupWithImage.setEventListeners();

// Функция открытия "попапа" с изображением
function handleCardClick(item) {
  popupWithImage.openPopup(item);
}

const popupWithSubmit = new PopupWithSubmit({  // Создаём экземпляр "попапа" удаления карточки.
    popupSelector: containerTrash, handleFormSubmit: _ => {
      popupWithSubmit.closePopup();
    }
});

// Функция открытия "попапа" удаления карточки
function handleTrashClick(element) {
  popupWithSubmit.openPopup();
  popupWithSubmit.setEventListeners(element);
}

// Функция создания и добавления карточек на страницу
const addCards = (items) => {
  const initialCardsList = new Section({
    data: items, renderer: (item) => {
      const card = new Card(item, '#photo-place__template', handleCardClick, handleTrashClick);
      const cardElement = card.generateCard();
      initialCardsList.addItem(cardElement);
    }
  }, containerSelector);
  initialCardsList.renderItems();
}

api.getInitialCards()
  .then((result) => {
    addCards(result); // Первоначальная загрузка карточек
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });


const popupEditProfile = new PopupWithForm({  // Создаём экземпляр "попапа" для формы "Редактирования профиля".
  popupSelector: containerProfile, handleFormSubmit: (formData) => {
    userProfile.setUserInfo(formData);
    popupEditProfile.closePopup();
  }
});
popupEditProfile.setEventListeners();

const popupAddCards = new PopupWithForm({  // Создаём экземпляр "попапа" для формы "Добавления Карточек".
  popupSelector: containerUserCards, handleFormSubmit: (formData) => {
    const newCard = [{ name: formData.card, link: formData.link }];
    addCards(newCard);
    popupAddCards.closePopup();
  }
});
popupAddCards.setEventListeners();

const popupNewAvatar = new PopupWithForm({  // Создаём экземпляр "попапа" для формы "Изменения Аватара".
  popupSelector: containerAvatar, handleFormSubmit: (formData) => {
    avatar.style.backgroundImage = `url(${formData.avatar})`;
    popupNewAvatar.closePopup();
  }
});
popupNewAvatar.setEventListeners();

const formEditProfileValidation = new FormValidator(validationConfig, formEditProfile);
formEditProfileValidation.enableValidation(); //Запуск валидации формы "Редактировать профиль"

const formAddNewCardsValidation = new FormValidator(validationConfig, formAddCards);
formAddNewCardsValidation.enableValidation(); //Запуск валидации формы "Добавление новых карточек"

const formNewAvatarValidation = new FormValidator(validationConfig, formNewAvatar);
formNewAvatarValidation.enableValidation(); //Запуск валидации формы "Изменения аватара"

profileEditButton.addEventListener('click', _ => {
  popupEditProfile.openPopup();
  profileEditButton.blur();
  const { name, job } = userProfile.getUserInfo();
  inputNameProfile.value = name;
  inputJobProfile.value = job;
  formEditProfileValidation.resetForm(); //Очитска формы "Редактировать профиль" от ошибок и переключение кнопки "сабмита"
});

cardsAddButton.addEventListener('click', _ => {
  popupAddCards.openPopup();
  cardsAddButton.blur();
  formAddNewCardsValidation.resetForm(); //Очитска формы "Добавление новых карточек" от ошибок и переключение кнопки "сабмита"
});

avatar.addEventListener('click', _ => {
  popupNewAvatar.openPopup();
  avatar.blur();
  formNewAvatarValidation.resetForm(); //Очитска формы "Изменение аватара" от ошибок и переключение кнопки "сабмита"
});

