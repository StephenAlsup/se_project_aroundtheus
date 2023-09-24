export default class UserInfo {
    constructor(name, job) {
      this.name = name;
      this.job = job;
    }
  
    getUserInfo() {
        return {
            job: this.job.textContent,
            name: this.name.textContent,
        };
    }
  
    setUserInfo(name, job) {
      this.name.textContent = name;
      this.job.textContent = job;
    }
  }