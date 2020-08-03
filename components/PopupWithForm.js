// import { popup } from '../components/Popup.js';
import Popup from '../components/Popup.js';


export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
  }

  closePopup() {
    super.closePopup();
    this._allInputs = Array.from(this._container.querySelectorAll('.popup__input'));
    this._allInputs.map((input) => {
      return input.value = '';
    });
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form = this._container.querySelector('.popup__form');
    this._form.addEventListener('submit', this._formSubmit);
  }

  _getInputValues() {

  }
}
