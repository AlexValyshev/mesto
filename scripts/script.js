import {
  initialCards, validationConfig, profileConfig, containerSelector, containerProfile,
  containerUserCards, containerViewImages, profileEditButton, formEditProfile, inputNameProfile,
  inputJobProfile, cardsAddButton, formAddCards
} from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import Section from '../components/Sectiom.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

const userProfile = new UserInfo(profileConfig); // Создаём экземпляр отображения информации о пользователе.
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

// Функция открытия "попапа" с изображением
function handleCardClick(item) {
  const popupWithImage = new PopupWithImage(containerViewImages); // Создаём экземпляр "попапа" с изображением.
  popupWithImage.openPopup(item);
  popupWithImage.setEventListeners();
}

// Функция создания и добавления карточек на страницу
const addCards = (items) => {
  const initialCardsList = new Section({
    data: items, renderer: (item) => {
      const card = new Card(item, '#photo-place__template', handleCardClick);
      const cardElement = card.generateCard();
      initialCardsList.addItem(cardElement);
    }
  }, containerSelector);
  initialCardsList.renderItems();
}
addCards(initialCards); // Первоначальная загрузка карточек

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

profileEditButton.addEventListener('click', editProfile);
cardsAddButton.addEventListener('click', addNewCards);

