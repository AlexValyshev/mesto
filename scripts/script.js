import { initialCards, validationConfig, profileConfig } from '../utils/constants.js';

import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import Section from '../components/Sectiom.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileEditButton = document.querySelector('.profile__editbutton');
const formEditProfile = document.querySelector('.popup__form_profile');
const inputNameProfile = formEditProfile.querySelector('.popup__input_name');
const inputJobProfile = formEditProfile.querySelector('.popup__input_job');
const cardsAddButton = document.querySelector('.profile__addbutton');
const formAddCards = document.querySelector('.popup__form_cards');
const inputNameCard = formAddCards.querySelector('.popup__input_card-name');
const InputLinkCard = formAddCards.querySelector('.popup__input_link');

const userProfile = new UserInfo(profileConfig); // Создаём экземпляр отображения информации о пользователе.
const popupEditProfile = new PopupWithForm('.popup__container_profile', formSubmitHandler); // Создаём экземпляр "попапа" для формы "Редактирования профиля".
const popupAddCards = new PopupWithForm('.popup__container_cards', formCardsSubmitHandler); // Создаём экземпляр "попапа" для формы "Добавления Карточек".
const popupWithImage = new PopupWithImage('.popup__container-view'); // Создаём экземпляр "попапа" с изображением.
// Функция открытия "попапа" с изображением
function handleCardClick(item) {
  popupWithImage.openPopup(item);
}

// Функция создания экземпляра карточки
const creatingCardInstance = (item) => {
  const card = new Card(item, '#photo-place__template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

// Функция добавления карточек
const addCards = (obj) => {
  const section = new Section(obj, '.photo-place__elements');
  section.loadCards();
};

// Объект для начальной загрузки карточек
let initialCardsObj = {
  items: initialCards,
  renderer: creatingCardInstance
};

addCards(initialCardsObj); // Первоначальная загрузка карточек




const formEditProfileValidation = new FormValidator(validationConfig, formEditProfile);
formEditProfileValidation.enableValidation(); //Запуск валидации формы "Редактировать профиль"

const formAddNewCardsValidation = new FormValidator(validationConfig, formAddCards);
formAddNewCardsValidation.enableValidation(); //Запуск валидации формы "Добавление новых карточек"

function editProfile() {
  popupEditProfile.openPopup();
  profileEditButton.blur();
  inputNameProfile.value = userProfile.getUserInfo().name;
  inputJobProfile.value = userProfile.getUserInfo().job;
  formEditProfileValidation.resetForm(); //Очитска формы "Редактировать профиль" от ошибок и переключение кнопки "сабмита"
}

function addNewCards() {
  popupAddCards.openPopup();
  cardsAddButton.blur();
  formAddNewCardsValidation.resetForm(); //Очитска формы "Добавление новых карточек" от ошибок и переключение кнопки "сабмита"
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputNameProfile.value;
  profileJob.textContent = inputJobProfile.value;
  popupEditProfile.closePopup();
}

function formCardsSubmitHandler(evt) {
  evt.preventDefault();
  const newCard = [{
    name: inputNameCard.value,
    link: InputLinkCard.value
  }];
  // Объект для загрузки карточек пользователя
  let userCardsObj = {
    items: newCard,
    renderer: creatingCardInstance
  };
  addCards(userCardsObj);
  popupAddCards.closePopup();
}

profileEditButton.addEventListener('click', editProfile);
cardsAddButton.addEventListener('click', addNewCards);
// formEditProfile.addEventListener('submit', formSubmitHandler);
// formAddCards.addEventListener('submit', formCardsSubmitHandler);

