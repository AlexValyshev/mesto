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

initialCards.forEach(function (item) {
  let cardName = item.name;
  let cardlink = item.link;
  let cardOrder = 2;
  addCardToPage(cardName, cardlink, cardOrder);
});

function openClosePopup() {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
    containerEditProfile.classList.remove('popup__container_opened');
    containerAddCards.classList.remove('popup__container_opened');
    containerViewImages.classList.remove('popup__container-view_opened');
    popup.classList.remove('popup__change-background');
  } else {
    popup.classList.add('popup_opened');
  }
}

function editProfile() {
  openClosePopup();
  containerEditProfile.classList.add('popup__container_opened');
  inputNameProfile.value = profileName.textContent;
  inputJobProfile.value = profileJob.textContent;
}

function addNewCards() {
  openClosePopup();
  containerAddCards.classList.add('popup__container_opened');
  inputNameCard.value = '';
  InputLinkCard.value = '';
}

function addCardToPage(cardName, cardlink, cardOrder) {
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
  cardOrder === 2 ? cardsContainer.append(cardElement) : cardsContainer.prepend(cardElement);
}

function cardView(cardName, cardlink) {
  openClosePopup();
  containerViewImages.classList.add('popup__container-view_opened');
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
  cardOrder = 1;
  addCardToPage(cardName, cardlink,cardOrder);
  openClosePopup();
}

profileEditButton.addEventListener('click', editProfile);
cardsAddButton.addEventListener('click', addNewCards);
formEditProfile.addEventListener('submit', formSubmitHandler);
formAddCards.addEventListener('submit', formCardsSubmitHandler);
popupCloseEditProfile.addEventListener('click', openClosePopup);
popupCloseAddCards.addEventListener('click', openClosePopup);
popupCloseViewImages.addEventListener('click', openClosePopup);
