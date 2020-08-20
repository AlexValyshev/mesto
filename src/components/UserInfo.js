export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelecor = nameSelector;
    this._jobSelecor = jobSelector;
    this._profileName = document.querySelector(this._nameSelecor);
    this._profileJob = document.querySelector(this._jobSelecor);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._profileName.textContent,
      job: this._profileJob.textContent
    };
    return this._userInfo;
  }

  setUserInfo({ name, about }) {
    this._profileName.textContent = name;
    this._profileJob.textContent = about;
  }
}
