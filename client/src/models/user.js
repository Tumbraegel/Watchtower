// https://bezkoder.com/jwt-vue-vuex-authentication/#Define_User_model

export default class User {
    constructor(username, email, password) {
      this.username = username
      this.email = email
      this.password = password
    }
  }
  