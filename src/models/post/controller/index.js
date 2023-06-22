const express = require("express");
const app = express();
const Router = express.Router();
const PostService = require("../service");

const pagination = require("../../../middleware/pagination")

class PostController {
    router;
    path = "/post";
    postService;
  
    constructor() {
      this.router = Router;
      this.postService = new PostService();
      this.init();
    }
  
    init() {
      this.router.get("/:id", this.getPost.bind(this));
      this.router.get("/", pagination, this.getPosts.bind(this));
  
      this.router.post("/like/:id", this.createLike.bind(this));
      this.router.delete("/like/:id", this.deleteLike.bind(this));
  
      this.router.post("/like-combined:id", this.postLike.bind(this));

    }
    async getPost(req, res, next) {
      try {
        const { id } = req.params;
  
        const post = await this.postService.getPost(id);
  
        res.status(200).json({ post });
      } catch (err) {
        next(err);
      }
    }
  
    async getPosts(req, res, next) {
      try {
        const searchValue = req.query.searchValue;
        const { posts, count } = await this.postService.getPosts(
          {
            skip: req.skip,
            take: req.take,
          },
          searchValue
        );
  
        res.status(200).json({ posts, count });
      } catch (err) {
        next(err);
      }
    }
  
    async createLike(req, res, next) {
      try {
        if (!req.user) throw { status: 401, message: "로그인을 진행해주세요." };
        const { id } = req.params;
  
        await this.postService.createPostLike(req.user.id, id);
  
        res.status(204).json({});
      } catch (err) {
        next(err);
      }
    }
  
    async deleteLike(req, res, next) {
      try {
        if (!req.user) throw { status: 401, message: "로그인을 진행해주세요." };
        const { id } = req.params;
  
        await this.postService.deletePostLike(req.user.id, id);
  
        res.status(204).json({});
      } catch (err) {
        next(err);
      }
    }
  
    async postLike(req, res, next) {
      try {
        if (!req.user) throw { status: 401, message: "로그인을 진행해주세요." };
        const { id } = req.params;
        const { isLike } = req.body;
  
        await this.postService.postLike(req.user.id, id, isLike);
  
        res.status(204).json({});
      } catch (err) {
        next(err);
      }
    }
  }
  
  const postController = new PostController();
  module.exports = postController;