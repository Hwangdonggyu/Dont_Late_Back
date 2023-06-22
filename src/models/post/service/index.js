const database = require("../../../database");
const UserService = require("../../users/service");
const { PostDTO, PostsDTO } = require("../dto");

class PostService {
  userService;
  constructor() {
    this.userService = new UserService();
  }

  // searchValue : 안녕
  async getPosts({ skip, take }, searchValue) {
    const posts = await database.post.findMany({
      where: {
        title: {
          contains: searchValue ?? "",
        },
      },
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
      
    });

    const count = await database.post.count({
      where: {
        title: {
          contains: searchValue,
        },
      },
    });

    return { posts, count };
  }

  async getPost(id) {
    id = Number(id);
    const post = await database.post.findUnique({
      where: {
        id,
      },
      // include: {
      //   user: true,
      //   postLike: true,
      // },
    });

    if (!post) throw { status: 404, message: "게시글을 찾을 수 없습니다." };

    // return new PostDTO(post, user);
    return post;
  }

  async createPostLike(userId, postId) {
    userId = Number(userId);
    postId = Number(postId);
    const user = await this.userService.findUserById(userId);

    const post = await database.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) throw { status: 404, message: "게시글을 찾을 수 없습니다." };

    const isLiked = await database.postLike.findUnique({
      where: {
        user_id_post_id: {
          user_id: user.id,
          post_id: post.id,
        },
      },
    });

    if (isLiked) return;

    await database.postLike.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        post: {
          connect: {
            id: post.id,
          },
        },
      },
    });
  }

  async deletePostLike(userId, postId) {
    userId = Number(userId);
    postId = Number(postId);
    const user = await this.userService.findUserById(userId);

    const post = await database.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) throw { status: 404, message: "게시글을 찾을 수 없습니다." };

    const isLiked = await database.postLike.findUnique({
      where: {
        user_id_post_id: {
         user_id: user.id,
         post_id: post.id,
        },
      },
    });

    if (!isLiked) return;

    await database.postLike.delete({
      where: {
        user_id_post_id: {
          user_id: user.id,
          post_id: post.id,
        },
      },
    });
  }

  // isLike 는 좋아요 상태 - 목표
  async postLike(userId, postId, isLike) {
    userId = Number(userId);
    postId = Number(postId);
    const user = await this.userService.findUserById(userId);

    const post = await database.post.findUnique({
      where: {
        id: post_id,
      },
    });

    if (!post) throw { status: 404, message: "게시글을 찾을 수 없습니다." };

    const isLiked = await database.postLike.findUnique({
      where: {
        user_id_post_id: {
          id: user.id,
          id: post.id,
        },
      },
    });

    // 좋아요를 하는 경우
    if (isLike && !isLiked) {
      await database.postLike.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          post: {
            connect: {
              id: post.id,
            },
          },
        },
      });
    }
    // 좋아요를 지우는 경우
    else if (!isLike && isLiked) {
      await database.postLike.delete({
        where: {
          user_id_post_id: {
            id: user.id,
            post_id: post.id,
          },
        },
      });
    }
  }
}

module.exports = PostService;