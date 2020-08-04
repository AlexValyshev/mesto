export default class UserInfo {
  constructor(data) {
    this._nameSelecor = data.nameSelector;
    this._jobSelecor = data.jobSelector;
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

  setUserInfo({ name, job }) {
    this._profileName.textContent = name
    this._profileJob.textContent = job
  }
}
