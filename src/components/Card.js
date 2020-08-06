export default class Card {
  constructor(item, cardSelector, handleCardClick) {
    this._item = item;
    this._name = item.name;
		this._link = item.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._element.querySelector('.photo-place__like').addEventListener('click', _ => {
      this._handleLikeIcon();
    });
    this._element.querySelector('.photo-place__trash').addEventListener('click', _ => {
      this._handleDeleteCard();
    });
    this._cardImage.addEventListener('click', _ => {
    this._handleCardClick(this._item);
    });
  }

  // Функция переключения "лайка" для карточки
  _handleLikeIcon() {
    this._element.querySelector('.photo-place__like').classList.toggle('photo-place__like_active');
  }

  // Функция удаления карточки
  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }
}



