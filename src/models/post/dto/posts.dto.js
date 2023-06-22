const UsersDTO = require("../../users/dto/users.dto");

class PostsDTO {
  title;
  info;
  user;

  constructor(props) {
    this.title = props.title;
    this.info = props.info;
    this.user = new UsersDTO(props.user);
  }
}

module.exports = PostsDTO;