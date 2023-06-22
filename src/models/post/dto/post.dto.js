const UsersDTO = require("../../users/dto/users.dto");

class PostDTO {
  id;
  title;
  info;
  createdAt;
  likeCount;
  isLiked;

  constructor(props, user) {
    this.id = props.id;
    this.title = props.title;
    this.info = props.info;
    this.createdAt = props.createdAt;
    this.likeCount = props.postLike.length;
    this.isLiked = user
      ? !!props.postLike.find((like) => like.userId === user.id)
      : false;
  }
}

module.exports = PostDTO;