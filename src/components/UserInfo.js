export default class UserInfo {
    constructor(title, description) {
      this.title = title
      this.description = description
    }
  
    getUserInfo() {
        return {
            title: this.title.textContent,
            description: this.description.textContent,
            };
    }
  
    setUserInfo(title, description) {
      this.title.textContent = title;
      this.description.textContent = description;
    }
  }