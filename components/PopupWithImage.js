import { popup } from '../components/Popup.js';
import Popup from '../components/Popup.js';

const containerViewImages = document.querySelector('.popup__container-view');
const popupImage = containerViewImages.querySelector('.popup__image');
const popupCaption = containerViewImages.querySelector('.popup__caption');

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  openPopup(item) {
    super.openPopup();
    popup.classList.add('popup__change-background');
    popupImage.src = item.link;
    popupCaption.textContent = item.name;
    popupImage.alt = item.name;
  }
}
