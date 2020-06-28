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
let containerViewInages = popup.querySelector('.popup__container-view');
const viewImages = popup.querySelector('.popup__view');
const popupCloseViewImages = popup.querySelector('.popup__close_view');

const initialCardsName = initialCards.map(function (item) {
  return item.name;
});
const initialCardsImage = initialCards.map(function (image) {
  return image.link;
});

function initialLoadCards() {
  for (let i = initialCardsName.length - 1; i >= 0; i--) {
    let cardName = initialCardsName[i];
    let cardlink = initialCardsImage[i];
    addCardToPage(cardName, cardlink);
  }
}
initialLoadCards()

function openClosePopup() {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
    containerEditProfile.classList.remove('popup__container_opened');
    containerAddCards.classList.remove('popup__container_opened');
    containerViewInages.classList.remove('popup__container-view_opened');
    popup.classList.remove('popup__change-background');
  } else {
    popup.classList.add('popup_opened');
  }
}

function EditProfile() {
  openClosePopup();
  containerEditProfile.classList.add('popup__container_opened');
  inputNameProfile.value = profileName.textContent;
  inputJobProfile.value = profileJob.textContent;
}

function AddNewCards() {
  openClosePopup();
  containerAddCards.classList.add('popup__container_opened');
  inputNameCard.value = '';
  InputLinkCard.value = '';
}

function addCardToPage(cardName, cardlink) {
  const cardTemplate = document.querySelector('#foto-place__template').content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.foto-place__image').src = cardlink;
  cardElement.querySelector('.foto-place__title').textContent = cardName;
  cardElement.querySelector('.foto-place__image').alt = cardName;
  cardElement.querySelector('.foto-place__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('foto-place__like_active');
  });
  cardElement.querySelector('.foto-place__trash').addEventListener('click', function (evt) {
    const card = evt.target.closest('.foto-place__element');
    card.remove();
  });
  cardElement.querySelector('.foto-place__image').addEventListener('click', function () {
    cardView(cardName, cardlink)
  });
  cardsContainer.prepend(cardElement);
}

function cardView(cardName, cardlink) {
  openClosePopup();
  containerViewInages.classList.add('popup__container-view_opened');
  popup.classList.add('popup__change-background');
  const image = viewImages.querySelector('.popup__image');
  const caption = viewImages.querySelector('.popup__caption');
  image.src = cardlink;
  caption.textContent = cardName;
  image.alt = cardName;
  viewImages.append(image, caption);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputNameProfile.value;
  profileJob.textContent = inputJobProfile.value;
  openClosePopup();
}

function formCardsSubmitHandler(evt) {
  evt.preventDefault();
  cardName = inputNameCard.value;
  cardlink = InputLinkCard.value;
  addCardToPage(cardName, cardlink);
  openClosePopup();
}

profileEditButton.addEventListener('click', EditProfile);
cardsAddButton.addEventListener('click', AddNewCards);
formEditProfile.addEventListener('submit', formSubmitHandler);
formAddCards.addEventListener('submit', formCardsSubmitHandler);
popupCloseEditProfile.addEventListener('click', openClosePopup);
popupCloseAddCards.addEventListener('click', openClosePopup);
popupCloseViewImages.addEventListener('click', openClosePopup);
