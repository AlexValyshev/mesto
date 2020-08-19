export default class Api {
  constructor(options) {
    // тело конструктора
  }

  getUserInfo() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-14/users/me', {
      headers: {
        authorization: 'cede3324-4ffe-44e5-b1e3-3ccfef967867'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-14/cards', {
      headers: {
        authorization: 'cede3324-4ffe-44e5-b1e3-3ccfef967867'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getInitialInfo() {
    this._promises = [this.getUserInfo(), this.getInitialCards()];
    return Promise.all(this._promises);
  }

  setUserInfo() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-14/cards', {
      method: 'PATCH',
      headers: {
        authorization: 'cede3324-4ffe-44e5-b1e3-3ccfef967867',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Aleksander Valyshev',
        about: 'Student Yandex Practice'
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  addNewCard([{ name, link }]) {
    console.log(name);
    console.log(link);
    return fetch('https://mesto.nomoreparties.co/v1/cohort-14/cards', {
      method: 'POST',
      headers: {
        authorization: 'cede3324-4ffe-44e5-b1e3-3ccfef967867',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  // другие методы работы с API
}


