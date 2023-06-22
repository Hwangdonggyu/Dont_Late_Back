class CreateUserDTO {
    name;
    phoneNumber;
    email;
    password;
  
    constructor(user) {
      this.name = user.name;
      this.phoneNumber = user.phoneNumber;
      this.email = user.email;
      this.password = user.password;
    }
  }

  module.exports = CreateUserDTO;