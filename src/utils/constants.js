export const validationConfig = ({
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

export const profileConfig = ({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
});

export const containerSelector = '.photo-place__elements'; // Контейнер для добавления карточек
export const containerProfile = '.popup__container_profile'; // Контейнер с формой изменения данных пользователя
export const containerUserCards = '.popup__container_cards'; // Контейнер с формой добавления новых карточек
export const containerViewImages = '.popup__container-view'; // Контейнер для просмотра изображения карточек
export const containerAvatar = '.popup__container_avatar'; // Контейнер с формой изменения аватара пользователя
export const containerTrash = '.popup__container_trash'; // Контейнер с формой удаления карточки
export const textDisabledClass = 'popup__button-text_disabled';
export const popup = document.querySelector('.popup');
export const popupImage = popup.querySelector('.popup__image');
export const popupCaption = popup.querySelector('.popup__caption');
export const profileEditButton = document.querySelector('.profile__editbutton');
export const formEditProfile = popup.querySelector('.popup__form_profile');
export const inputNameProfile = formEditProfile.querySelector('.popup__input_name');
export const inputJobProfile = formEditProfile.querySelector('.popup__input_job');
export const cardsAddButton = document.querySelector('.profile__addbutton');
export const formAddCards = popup.querySelector('.popup__form_cards');
export const avatar = document.querySelector('.profile__avatar');
export const userName = document.querySelector('.profile__name');
export const userJob = document.querySelector('.profile__job');
export const formNewAvatar = popup.querySelector('.popup__form_avatar');

