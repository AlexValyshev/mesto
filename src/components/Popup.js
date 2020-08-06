import { popup } from '../utils/constants.js';
export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._container = popup.querySelector(this._popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Фунция открытия попапа.
  openPopup() {
    popup.classList.add('popup_opened');
    this._container.classList.add('popup__container_opened');
    document.addEventListener('keydown', this._handleEscClose); // Устанавливаем слушатель на кнопку "Esc".
  }

  // Фунция закрытия попапа.
  closePopup() {
    popup.classList.remove('popup_opened');
    this._container.classList.remove('popup__container_opened');
    document.removeEventListener('keydown', this._handleEscClose); // Удаляем слушатель с кнопки "Esc".
  }

  setEventListeners() {
    popup.addEventListener('click', evt => this._closePopapInAreaOverlay(evt)); // Устанавливаем слушатель на зону "оверлей".
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









