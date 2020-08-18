import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor({ popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners(element) {
    super.setEventListeners();
    this._form = this._container.querySelector('.popup__form');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleDeleteCard(element)
      this._handleFormSubmit();
    });
  }

  // Функция удаления карточки
  _handleDeleteCard(element) {
    element.remove();
    element = null;
  }
}
