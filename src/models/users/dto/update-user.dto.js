const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

class UpdateUserDTO {
  name;
  phoneNumber;
  email;
  password;

  constructor(user) {
    this.name = user.name ?? undefined;
    this.phoneNumber = user.phoneNumber ?? undefined;
    this.email = user.email ?? undefined;
    this.password = user.password ?? undefined;
  }

  async updatePassword() {
    this.password = await bcrypt.hash(password, process.env.PASSWORD_SALT);
  }
}

module.exports = UpdateUserDTO;