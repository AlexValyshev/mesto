export default class Card {
  constructor(item, userInfo, cardSelector, handleCardClick, handleTrashClick, handleAddLike, handleRemoveLike) {
    this._item = item;
    this._name = item.name;
    this._link = item.link;
    this._likesLength = item.likes.length;
    this._likes = item.likes;
    this._itemId = item._id;
    this._itemOwnerId = item.owner._id;
    this._userId = userInfo._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
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
    this._numberLikes = this._element.querySelector('.photo-place__number-likes');
    this._numberLikes.textContent = this._likesLength;
    if (this._itemOwnerId === this._userId) {
      this._element.querySelector('.photo-place__trash').classList.add('photo-place__trash_visible');
    };
    this._like = this._element.querySelector('.photo-place__like');
    if (this._likesId()) {
      this._like.classList.add('photo-place__like_active');
    }
    this._setEventListeners();
    return this._element;
  }

  _likesId() {
    return this._likes.some((like) => {
      return like._id === this._userId;
    });
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
    if (!this._like.classList.contains('photo-place__like_active')) {
      this._like.classList.add('photo-place__like_active');
      this._numberLikes.textContent = this._likesLength + 1;
      this._handleAddLike(this._itemId);
    } else {
      this._like.classList.remove('photo-place__like_active');
      this._numberLikes.textContent = this._numberLikes.textContent - 1;
      this._handleRemoveLike(this._itemId);
    }
  }

  // Функция удаления карточки
  _handleDeleteCard(element) {
    element.remove();
    element = null;
  }
}



