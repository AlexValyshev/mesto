import { popup } from '../utils/constants.js';
export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._container = popup.querySelector(this._popupSelector);
  }

  // Фунция открытия попапа.
  openPopup() {
    popup.classList.add('popup_opened');
    this._container.classList.add('popup__container_opened');
    document.addEventListener('keydown', evt => this._handleEscClose(evt)); // Устанавливаем слушатель на кнопку "Esc".
    popup.addEventListener('click', evt => this._closePopapInAreaOverlay(evt)); // Устанавливаем слушатель на зону "оверлей".
  }

  // Фунция закрытия попапа.
  closePopup() {
    popup.classList.remove('popup_opened');
    this._container.classList.remove('popup__container_opened');
    document.removeEventListener('keydown', evt => this._handleEscClose(evt)); // Удаляем слушатель с кнопки "Esc".
  }

  setEventListeners() {
    this._iconClosePopup = this._container.querySelector('.popup__close');
    this._iconClosePopup.addEventListener('click', _ => { // Устанавливаем слушатель на иконку "X" закрытия попапа.
      this.closePopup();
    });
  }

  // Фунция закрытия попапа при нажатии на кнопку "Esc".
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  // Фунция закрытия попапа при "клике" в зоне "оверлей".
  _closePopapInAreaOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      this.closePopup();
    }
  }
}









