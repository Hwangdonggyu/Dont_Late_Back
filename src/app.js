const express = require('express');
const Controllers = require("./models") // router가져오기 [auth,users]
const database = require("./database");
const jwtAuth= require("./middleware/jwtAuth");

(async () => {
    const app = express();
    await database.$connect();
  
    // 미들웨어
    app.use(express.json()); //next();
    app.use(express.urlencoded({ extended: true, limit: "700mb" })); //next();
    app.use(jwtAuth);
  
    Controllers.forEach((controller) => {
      app.use(controller.path, controller.router);
    });
  
    // req : 요청 -> Request
    // res : 응답 -> Response
    app.get("/", (req, res) => {
      res.send("Nodejs test");
    });
  
    app.use((err, req, res, next) => {
      res
        .status(err.status || 500)
        .json({ message: err.message || "서버에서 에러가 발생하였습니다." });
    });
  
    app.listen(3000, () => {
      console.log("서버가 시작되었습니다.");
    });
  })();
