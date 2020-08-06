import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._allInputs = Array.from(this._container.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    this._formValues = {};
    this._allInputs.forEach(input => {
      this._formValues[input.name] = input.value;
  });
  return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._container.querySelector('.popup__form');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }
}
