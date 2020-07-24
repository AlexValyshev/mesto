import { popup }  from '../scripts/script.js';
import { findOpenContainer, openPopup } from '../utils/utils.js';

const containerViewImages = document.querySelector('.popup__container-view');
const popupImage = containerViewImages.querySelector('.popup__image');
const popupCaption = containerViewImages.querySelector('.popup__caption');
const popupCloseViewImages = containerViewImages.querySelector('.popup__close_view');

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
		this._link = data.link;
    this._cardSelector = cardSelector;
	}

  // Шаблон разметки карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.photo-place__element')
      .cloneNode(true);
    return cardElement;
  }

  // Функция подготовки карточки к публикации
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.photo-place__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.photo-place__title').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  // Функция установки слушателей для карточки
  _setEventListeners() {
    this._element.querySelector('.photo-place__like').addEventListener('click', () => {
      this._handleLikeIcon();
    });
    this._element.querySelector('.photo-place__trash').addEventListener('click', () => {
      this._handleDeleteCard();
    });
    this._cardImage.addEventListener('click', () => {
    this._viewCardImage();
    });
    popupCloseViewImages.addEventListener('click', findOpenContainer);
  }

  // Функция переключения "лайка" для карточки
  _handleLikeIcon() {
    this._element.querySelector('.photo-place__like').classList.toggle('photo-place__like_active');
  }

  // Функция удаления карточки
  _handleDeleteCard() {
    this._element.remove();
  }

  // Функция просмотра изображения карточки, в модальном окне
  _viewCardImage() {
    openPopup(containerViewImages);
    popup.classList.add('popup__change-background');
    popupImage.src = this._link;
    popupCaption.textContent = this._name;
    popupImage.alt = this._name;
  }
}



