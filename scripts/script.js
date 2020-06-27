const initialCards = [{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}];

let popup = document.querySelector('.popup'); // да
let profileName = document.querySelector('.profile__name');// да
let profileJob = document.querySelector('.profile__job');// да
let profileEditButton = document.querySelector('.profile__editbutton');// да
let ContainerEditProfile = popup.querySelector('.popup__container_profile'); // да
let formEditProfile = ContainerEditProfile.querySelector('.popup__form_profile');// да
let inputNameProfile = formEditProfile.querySelector('.popup__text_name'); // да
let inputJobProfile = formEditProfile.querySelector('.popup__text_job'); // да
let popupCloseEditProfile = ContainerEditProfile.querySelector('.popup__close_container-profile');// да
let cardsAddButton = document.querySelector('.profile__addbutton');// да
let ContainerAddCards = popup.querySelector('.popup__container_cards');// да
let formAddCards = ContainerAddCards.querySelector('.popup__form_cards');// да
let inputNameCard = formAddCards.querySelector('.popup__card_name'); // да
let InputLinkCard = formAddCards.querySelector('.popup__card_link'); // да
let popupCloseAddCards = ContainerAddCards.querySelector('.popup__close_container-cards');// да
let CardsContainer = document.querySelector('.foto-place__elements'); // да
let ContainerViewInages = popup.querySelector('.popup__container-view'); // да
let viewImages = popup.querySelector('.popup__view'); // да
let popupCloseViewImages = popup.querySelector('.popup__close_view');// да

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
    addCard(cardName, cardlink);
  }
}
initialLoadCards()

function openClosePopup() {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
    ContainerEditProfile.classList.remove('popup__container_opened');
    ContainerAddCards.classList.remove('popup__container_opened');
    ContainerViewInages.classList.remove('popup__container-view_opened');
    popup.classList.remove('popup__change-background');
  } else {
    popup.classList.add('popup_opened');
  }
}

function EditProfile() {
  openClosePopup();
  ContainerEditProfile.classList.add('popup__container_opened');
  inputNameProfile.value = profileName.textContent;
  inputJobProfile.value = profileJob.textContent;
}

function AddNewCards() {
  openClosePopup();
  ContainerAddCards.classList.add('popup__container_opened');
  inputNameCard .value = '';
  InputLinkCard .value = '';
}

function addCard(cardName, cardlink) {
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
    addCardToView(cardName, cardlink)
  });
  CardsContainer.prepend(cardElement);
}

function addCardToView(cardName, cardlink) {
  openClosePopup();
  ContainerViewInages.classList.add('popup__container-view_opened');
  popup.classList.add('popup__change-background');
  let image = viewImages.querySelector('.popup__image');
  let caption = viewImages.querySelector('.popup__caption');
  let alt = viewImages.querySelector('.popup__image');
  image.src = cardlink;
  caption.textContent = cardName;
  alt.alt = cardName;
  viewImages.append(image, alt, caption);
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
  addCard(cardName, cardlink);
  openClosePopup();
}

profileEditButton.addEventListener('click', EditProfile);
cardsAddButton.addEventListener('click', AddNewCards);
formEditProfile.addEventListener('submit', formSubmitHandler);
formAddCards.addEventListener('submit', formCardsSubmitHandler);
popupCloseEditProfile.addEventListener('click', openClosePopup);
popupCloseAddCards.addEventListener('click', openClosePopup);
popupCloseViewImages.addEventListener('click', openClosePopup);
