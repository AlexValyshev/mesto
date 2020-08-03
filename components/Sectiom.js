import { initialCards } from '../utils/constants.js';
export default class Section {
  constructor(obj, containerSelector) {
    this._items = obj.items;
    this._renderer = obj.renderer;
    this._containerSelector = containerSelector;
    this._cardContainer = document.querySelector(this._containerSelector);
  }

  // Функция создания и отрисовки карточек
  loadCards() {
    this._items.forEach((item) => {
      this._element = this._renderer(item);
      this._addItem();
    });
  }

  // Функция добавления элемента в разметку
  _addItem() {
    this._items === initialCards ? this._cardContainer.append(this._element) : this._cardContainer.prepend(this._element);
  }
}
