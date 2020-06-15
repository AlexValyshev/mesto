let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__close');
let popupEditButton = document.querySelector('.profile__editbutton');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__text_name');
let jobInput = formElement.querySelector('.popup__text_job');

function OpenClosePopup() {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  OpenClosePopup()
}

popupEditButton.addEventListener('click', OpenClosePopup);
popupClose.addEventListener('click', OpenClosePopup);
formElement.addEventListener('submit', formSubmitHandler);
