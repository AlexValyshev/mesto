import Popup from '../components/Popup.js';

export default class PopupWithTrash extends Popup {
  constructor({ popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners(card) {
    super.setEventListeners();
    this._form = this._container.querySelector('.popup__form');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleDeleteCard(card)
      this._handleFormSubmit();
    });
  }

  // Функция удаления карточки
  _handleDeleteCard(card) {
    card.remove();
    card = null;
  }
}
