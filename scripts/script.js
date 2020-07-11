let popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileEditButton = document.querySelector('.profile__editbutton');
let containerEditProfile = popup.querySelector('.popup__container_profile');
const formEditProfile = containerEditProfile.querySelector('.popup__form_profile');
const inputNameProfile = formEditProfile.querySelector('.popup__text_name');
const inputJobProfile = formEditProfile.querySelector('.popup__text_job');
const popupCloseEditProfile = containerEditProfile.querySelector('.popup__close_container-profile');
const cardsAddButton = document.querySelector('.profile__addbutton');
let containerAddCards = popup.querySelector('.popup__container_cards');
const formAddCards = containerAddCards.querySelector('.popup__form_cards');
const inputNameCard = formAddCards.querySelector('.popup__card_name');
const InputLinkCard = formAddCards.querySelector('.popup__card_link');
const popupCloseAddCards = containerAddCards.querySelector('.popup__close_container-cards');
const cardsContainer = document.querySelector('.foto-place__elements');
let containerViewImages = popup.querySelector('.popup__container-view');
const viewImages = popup.querySelector('.popup__view');
const popupCloseViewImages = popup.querySelector('.popup__close_view');
let containerPopup = popup.querySelectorAll('.popup__container');

initialCards.forEach(function (card) {
  let cardOrder = 'append';
  addCardToPage(card, cardOrder);
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
      openClosePopup(element);
    }
  });
}

function openClosePopup(element) {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_cursor');
    popup.classList.remove('popup__change-background');
    document.removeEventListener('keydown', closePopupButtonEsc); // Удаляем слушатель с кнопки "Esc", при закрытии попапа.
  }
  popup.classList.toggle('popup_opened');
  element.classList.toggle('popup__container_opened');
  document.addEventListener('keydown', closePopupButtonEsc); // Устанавливаем слушатель на кнопку "Esc", при открытии попапа.
}

function editProfile() {
  openClosePopup(containerEditProfile);
  profileEditButton.blur();
  inputNameProfile.value = profileName.textContent;
  inputJobProfile.value = profileJob.textContent;
}

function addNewCards() {
  openClosePopup(containerAddCards);
  cardsAddButton.blur();
  inputNameCard.value = '';
  InputLinkCard.value = '';
}

function addCardToPage(card, cardOrder) {
  const cardTemplate = document.querySelector('#foto-place__template').content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.foto-place__image').src = card.link;
  cardElement.querySelector('.foto-place__title').textContent = card.name;
  cardElement.querySelector('.foto-place__image').alt = card.name;
  cardElement.querySelector('.foto-place__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('foto-place__like_active');
  });
  cardElement.querySelector('.foto-place__trash').addEventListener('click', function (evt) {
    const card = evt.target.closest('.foto-place__element');
    card.remove();
  });
  cardElement.querySelector('.foto-place__image').addEventListener('click', () => {
    cardView(card);
  });
  cardOrder === 'append' ? cardsContainer.append(cardElement) : cardsContainer.prepend(cardElement);
}

function cardView(card) {
  openClosePopup(containerViewImages);
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
  let newCard = {};
  newCard.name = inputNameCard.value;
  newCard.link = InputLinkCard.value;
  let cardOrder = 'perpend';
  addCardToPage(newCard, cardOrder);
  findOpenContainer();
}

// Фунция закрытия попапа при "клике" в зоне "оверлей".
const closePopapInAreaOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    findOpenContainer();
  }
}

// Фунция поведения "cursor pointer" в зоне "оверлей" попапа.
const delCursorPointer = (evt) => {
  if (evt.target !== evt.currentTarget) {
    popup.classList.add('popup_cursor');
  } else {
    popup.classList.remove('popup_cursor');
  }
}

profileEditButton.addEventListener('click', editProfile);
cardsAddButton.addEventListener('click', addNewCards);
formEditProfile.addEventListener('submit', formSubmitHandler);
formAddCards.addEventListener('submit', formCardsSubmitHandler);
popupCloseEditProfile.addEventListener('click', findOpenContainer);
popupCloseAddCards.addEventListener('click', findOpenContainer);
popupCloseViewImages.addEventListener('click', findOpenContainer);
popup.addEventListener('click', closePopapInAreaOverlay); // Устанавливаем слушатель на зону "оверлей".
popup.addEventListener('mouseover', delCursorPointer); // Устанавливаем слушатель для мыши  в зоне "оверлей".
