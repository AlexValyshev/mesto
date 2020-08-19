export default class Card {
  constructor(item, userInfo, cardSelector, handleCardClick, handleTrashClick) {
    this._item = item;
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes.length;
    this._itemId = item._id;
    this._itemOwnerId = item.owner._id;
    this._userId = userInfo._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
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
    this._element.querySelector('.photo-place__number-likes').textContent = this._likes;
    if (this._itemOwnerId === this._userId) {
      this._element.querySelector('.photo-place__trash').classList.add('photo-place__trash_visible');
    };
    this._setEventListeners();
    return this._element;
  }

  // Функция установки слушателей для карточки
  _setEventListeners() {
    this._element.querySelector('.photo-place__like').addEventListener('click', _ => {
      this._handleLikeIcon();
    });
    this._element.querySelector('.photo-place__trash').addEventListener('click', _ => {
      this._handleTrashClick(this._itemId, this._handleDeleteCard, this._element);
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
  _handleDeleteCard(element) {
    element.remove();
    element = null;
  }
}



