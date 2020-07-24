import { initialCards, validationConfig } from '../utils/constants.js';
import { openPopup, closePopapInAreaOverlay, findOpenContainer  } from '../utils/utils.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

export const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const profileEditButton = document.querySelector('.profile__editbutton');
const containerEditProfile = popup.querySelector('.popup__container_profile');
const formEditProfile = containerEditProfile.querySelector('.popup__form_profile');
const inputNameProfile = formEditProfile.querySelector('.popup__input_name');
const inputJobProfile = formEditProfile.querySelector('.popup__input_job');
const popupCloseEditProfile = containerEditProfile.querySelector('.popup__close_container-profile');

const cardsAddButton = document.querySelector('.profile__addbutton');
const containerAddCards = popup.querySelector('.popup__container_cards');
const formAddCards = containerAddCards.querySelector('.popup__form_cards');
const inputNameCard = formAddCards.querySelector('.popup__input_card-name');
const InputLinkCard = formAddCards.querySelector('.popup__input_link');
const popupCloseAddCards = containerAddCards.querySelector('.popup__close_container-cards');

const cardsContainer = document.querySelector('.photo-place__elements');
export const containerPopup = popup.querySelectorAll('.popup__container');

// Функция создания экземпляра карточки
function creatingCardInstance(item) {
  const card = new Card(item, '#photo-place__template');
  const cardElement = card.generateCard();
  return cardElement;
}

// Функция первоначальной загрузки карточек
function loadCards(array) {
  array.forEach(function (item) {
    const element = creatingCardInstance(item);
    const cardOrder = (array === initialCards) ? true : false;
    renderCard(element, cardOrder);
  });
}

// Функция добавления карточки в разметку
function renderCard(element, cardOrder) {
  cardOrder ? cardsContainer.append(element) : cardsContainer.prepend(element);
}

loadCards(initialCards);

// Функция создания экземпляра класса, для проверяемой формы
function creatingFormInstance(validationConfig, form) {
  const formForValidation = new FormValidator(validationConfig, form);
  formForValidation.enableValidation();
}

function editProfile() {
  openPopup(containerEditProfile);
  profileEditButton.blur();
  inputNameProfile.value = profileName.textContent;
  inputJobProfile.value = profileJob.textContent;
  creatingFormInstance(validationConfig, formEditProfile); //Запуск валидации формы
}

function addNewCards() {
  openPopup(containerAddCards);
  cardsAddButton.blur();
  inputNameCard.value = '';
  InputLinkCard.value = '';
  creatingFormInstance(validationConfig, formAddCards); //Запуск валидации формы
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputNameProfile.value;
  profileJob.textContent = inputJobProfile.value;
  findOpenContainer();
}

function formCardsSubmitHandler(evt) {
  evt.preventDefault();
  const newCard = [
    {name: inputNameCard.value,
    link: InputLinkCard.value}
  ];
  loadCards(newCard);
  findOpenContainer();
}

profileEditButton.addEventListener('click', editProfile);
cardsAddButton.addEventListener('click', addNewCards);
formEditProfile.addEventListener('submit', formSubmitHandler);
formAddCards.addEventListener('submit', formCardsSubmitHandler);
popupCloseEditProfile.addEventListener('click', findOpenContainer);
popupCloseAddCards.addEventListener('click', findOpenContainer);
popup.addEventListener('click', closePopapInAreaOverlay); // Устанавливаем слушатель на зону "оверлей".
