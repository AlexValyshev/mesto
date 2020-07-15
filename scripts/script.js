const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const profileEditButton = document.querySelector('.profile__editbutton');
const containerEditProfile = popup.querySelector('.popup__container_profile');
const formEditProfile = containerEditProfile.querySelector('.popup__form_profile');
const inputNameProfile = formEditProfile.querySelector('.popup__input_name');
const inputJobProfile = formEditProfile.querySelector('.popup__input_job');
const popupCloseEditProfile = containerEditProfile.querySelector('.popup__close_container-profile');
const editProfileSubmitButton = formEditProfile.querySelector('.popup__button_save-profile');

const cardsAddButton = document.querySelector('.profile__addbutton');
const containerAddCards = popup.querySelector('.popup__container_cards');
const formAddCards = containerAddCards.querySelector('.popup__form_cards');
const inputNameCard = formAddCards.querySelector('.popup__input_card-name');
const InputLinkCard = formAddCards.querySelector('.popup__input_link');
const popupCloseAddCards = containerAddCards.querySelector('.popup__close_container-cards');
const addCardsSubmitButton = formAddCards.querySelector('.popup__button_save-card');

const cardsContainer = document.querySelector('.photo-place__elements');
const containerViewImages = popup.querySelector('.popup__container-view');
const viewImages = popup.querySelector('.popup__view');
const popupCloseViewImages = popup.querySelector('.popup__close_view');
const containerPopup = popup.querySelectorAll('.popup__container');
const cardTemplate = document.querySelector('#photo-place__template').content;

initialCards.forEach(function (card) {
  let cardOrder = true;
  renderCard(card, cardOrder);
});

// Фунция закрытия попапа при нажатии на кнопку "Esc".
function closePopupButtonEsc(evt) {
  if (evt.key === 'Escape') {
    findOpenContainer();
  }
}

// Функция поиска открытого контейнера (всего их три).
const findOpenContainer = () => {
  containerPopup.forEach(element => {
    if (element.classList.contains('popup__container_opened')) {
      closePopup(element);
    }
  });
}

// Фунция закрытия попапа при "клике" в зоне "оверлей".
const closePopapInAreaOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    findOpenContainer();
  }
}

function openPopup(element) {
  popup.classList.add('popup_opened');
  element.classList.add('popup__container_opened');
  document.addEventListener('keydown', closePopupButtonEsc); // Устанавливаем слушатель на кнопку "Esc", при открытии попапа.
}

function closePopup(element) {
  popup.classList.remove('popup__change-background');
  document.removeEventListener('keydown', closePopupButtonEsc); // Удаляем слушатель с кнопки "Esc", при закрытии попапа.
  popup.classList.remove('popup_opened');
  element.classList.remove('popup__container_opened');
}

function editProfile() {
  openPopup(containerEditProfile);
  profileEditButton.blur();
  inputNameProfile.value = profileName.textContent;
  inputJobProfile.value = profileJob.textContent;
  clearingFormFromError(formEditProfile, validationConfig);
}

function addNewCards() {
  openPopup(containerAddCards);
  cardsAddButton.blur();
  inputNameCard.value = '';
  InputLinkCard.value = '';
  clearingFormFromError(formAddCards, validationConfig);
}

function addCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.photo-place__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector('.photo-place__title').textContent = card.name;
  addEventListenersForCard(card, cardElement, cardImage);
  return cardElement;
}

// Функция переключения лайка для карточки
function handleLikeIcon(evt) {
  evt.target.classList.toggle('photo-place__like_active');
}

// Функция удаления карточки
function handleDeleteCard(evt) {
  const element = evt.target.closest('.photo-place__element');
  element.remove();
}

// Функция добавления слушателей для карточки
function addEventListenersForCard(card, cardElement, cardImage) {
  cardElement.querySelector('.photo-place__like').addEventListener('click', handleLikeIcon);
  cardElement.querySelector('.photo-place__trash').addEventListener('click',handleDeleteCard);
  cardImage.addEventListener('click', () => {
    cardView(card);
  });
}

// Функция добавления карточки в разметку
function renderCard(card, cardOrder) {
  cardOrder ? cardsContainer.append(addCard(card)) : cardsContainer.prepend(addCard(card));
}

function cardView(card) {
  openPopup(containerViewImages);
  popup.classList.add('popup__change-background');
  const image = viewImages.querySelector('.popup__image');
  const caption = viewImages.querySelector('.popup__caption');
  image.src = card.link;
  caption.textContent = card.name;
  image.alt = card.name;
  viewImages.append(image, caption);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputNameProfile.value;
  profileJob.textContent = inputJobProfile.value;
  findOpenContainer();
}

function formCardsSubmitHandler(evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = inputNameCard.value;
  newCard.link = InputLinkCard.value;
  let cardOrder = false;
  renderCard(newCard, cardOrder);
  findOpenContainer();
}

profileEditButton.addEventListener('click', editProfile);
cardsAddButton.addEventListener('click', addNewCards);
formEditProfile.addEventListener('submit', formSubmitHandler);
formAddCards.addEventListener('submit', formCardsSubmitHandler);
popupCloseEditProfile.addEventListener('click', findOpenContainer);
popupCloseAddCards.addEventListener('click', findOpenContainer);
popupCloseViewImages.addEventListener('click', findOpenContainer);
popup.addEventListener('click', closePopapInAreaOverlay); // Устанавливаем слушатель на зону "оверлей".
