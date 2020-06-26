let popup = document.querySelector('.popup'); // да
let popupClose = popup.querySelector('.popup__close');// да
let popupCloseViewImages = popup.querySelector('.popup__close_view');// да
let profileEditButton = document.querySelector('.profile__editbutton');// да
let profileAddButton = document.querySelector('.profile__addbutton');// да
let profileName = document.querySelector('.profile__name');// да
let profileJob = document.querySelector('.profile__job');// да
let formElement = popup.querySelector('.popup__form');// да
let nameInput = formElement.querySelector('.popup__text_name'); // да
let jobInput = formElement.querySelector('.popup__text_job'); // да
let formImageElement = popup.querySelector('.popup__form-image');// да
let inputImageName = formImageElement.querySelector('.popup__text_name'); // да
let InputImageLink = formImageElement.querySelector('.popup__text_job'); // да
let imagesContainer = document.querySelector('.foto-place__elements'); // да
let popupContainer = popup.querySelector('.popup__container'); // да
let popupContainerView = popup.querySelector('.popup__container-view'); // да
let viewImages = popupContainerView.querySelector('.popup__view'); // да

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

const initialCardsName = initialCards.map(function (item) {
  return item.name;
});
const initialCardsImage = initialCards.map(function (image) {
  return image.link;
});

initialLoadCards()
function initialLoadCards() {
  for (let i = initialCardsName.length-1; i >= 0; i--) {
    let imageName = initialCardsName[i];
    console.log(imageName);
    let imagelink = initialCardsImage[i];
    // console.log(imageLink);
    addCardToPage(imageName, imagelink);
  }
}

function openClosePopup() {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
    formElement.classList.remove('popup__form_opened');
    formImageElement.classList.remove('popup__form-image_opened');
    popupContainer.classList.remove('popup__container_close');
    popupContainerView.classList.remove('popup__container-view_opened');
    popup.classList.remove('popup__change-background');
  } else {
    popup.classList.add('popup_opened');
  }
}

function editProfile() {
  openClosePopup();
  formElement.classList.add('popup__form_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function addNewCards() {
  openClosePopup();
  formImageElement.classList.add('popup__form-image_opened');
  inputImageName.value = '';
  InputImageLink.value = '';
}

function addCardToPage(imageName, imagelink) {
  const cardTemplate = document.querySelector('#foto-place__template').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.foto-place__image').src = imagelink;
  cardElement.querySelector('.foto-place__title').textContent = imageName;
  cardElement.querySelector('.foto-place__image').alt = imageName;


  cardElement.querySelector('.foto-place__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('foto-place__like_active');
  });
  cardElement.querySelector('.foto-place__trash').addEventListener('click', function (evt) {
    const card = evt.target.closest('.foto-place__element');
    card.remove();
  });
  cardElement.querySelector('.foto-place__image').addEventListener('click', function (evt) {
    openClosePopup();
    popupContainer.classList.add('popup__container_close');
    popupContainerView.classList.add('popup__container-view_opened');
    popup.classList.add('popup__change-background');
    const imageCard = viewImages.querySelector('.popup__image');
    const nameCard = viewImages.querySelector('.popup__caption');
    const altCard = viewImages.querySelector('.popup__image');
    imageCard.src = imagelink;
    nameCard.textContent = imageName;
    altCard.alt = imageName;
    viewImages.append(imageCard, altCard, nameCard);
  });
  imagesContainer.prepend(cardElement);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  openClosePopup();
}

function formImageSubmitHandler(evt) {
  evt.preventDefault();
  imageName = inputImageName.value;
  imagelink = InputImageLink.value;
  addCardToPage(imageName, imagelink);
  openClosePopup();
}


popupClose.addEventListener('click', openClosePopup);
popupCloseViewImages.addEventListener('click', openClosePopup);
profileEditButton.addEventListener('click', editProfile);
profileAddButton.addEventListener('click', addNewCards);
formElement.addEventListener('submit', formSubmitHandler);
formImageElement.addEventListener('submit', formImageSubmitHandler);
