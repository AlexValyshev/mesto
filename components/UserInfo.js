
export default class UserInfo {
  constructor(data) {
    this._nameSelecor = data.nameSelector;
    this._jobSelecor = data.jobSelector;
  }

  getUserInfo() {
    const profileName = document.querySelector(this._nameSelecor);
    const profileJob = document.querySelector(this._jobSelecor);
    let userInfo = {
      name: profileName.textContent,
      job: profileJob.textContent
    };
    return userInfo;
  }

  setUserInfo() {

  }
}
