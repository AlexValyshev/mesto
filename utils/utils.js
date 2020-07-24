import { popup, containerPopup }  from '../scripts/script.js';

// Фунция закрытия попапа при нажатии на кнопку "Esc".
export function closePopupButtonEsc(evt) {
  if (evt.key === 'Escape') {
    findOpenContainer();
  }
}

// Функция поиска открытого контейнера (всего их три).
export function findOpenContainer() {
  containerPopup.forEach(element => {
    if (element.classList.contains('popup__container_opened')) {
      closePopup(element);
    }
  });
}

// Фунция закрытия попапа при "клике" в зоне "оверлей".
export const closePopapInAreaOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    findOpenContainer();
  }
}

// Фунция открытия попапа.
export function openPopup(element) {
  popup.classList.add('popup_opened');
  element.classList.add('popup__container_opened');
  document.addEventListener('keydown', closePopupButtonEsc); // Устанавливаем слушатель на кнопку "Esc", при открытии попапа.
}

// Фунция закрытия попапа.
export function closePopup(element) {
  popup.classList.remove('popup__change-background');
  document.removeEventListener('keydown', closePopupButtonEsc); // Удаляем слушатель с кнопки "Esc", при закрытии попапа.
  popup.classList.remove('popup_opened');
  element.classList.remove('popup__container_opened');
}
