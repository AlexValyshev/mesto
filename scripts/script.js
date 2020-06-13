console.log('Hello!');
let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__image');
let popupEditButton = document.querySelector('.profile__editbutton');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__text_margin_name');
let jobInput = formElement.querySelector('.popup__text_margin_job');

function OpenClosePopup() {
  popup.classList.toggle('popup__opened');
  // console.log(popup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
popupEditButton.addEventListener('click', OpenClosePopup);
popupClose.addEventListener('click', OpenClosePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  // console.log(nameInput.value);
  // console.log(jobInput.value);
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  OpenClosePopup()
}
formElement.addEventListener('submit', formSubmitHandler);
