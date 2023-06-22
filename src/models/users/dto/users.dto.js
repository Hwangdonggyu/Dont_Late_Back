class UsersDTO {
    id;
    name;
    phoneNumber;
    email;
  
    constructor(user) {
      this.id = user.id;
      this.name = user.name;
      this.phoneNumber = user.phoneNumber;
      this.email = user.email;
    }
  }

module.exports = UsersDTO;