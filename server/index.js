const express = require("express");
const app = express();
const port = 8080;
const db = require("./models");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const commentRouter = require("./routes/Comments");
app.use("/comments", commentRouter);
const userRouter = require("./routes/Users");
app.use("/auth", userRouter);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("listen to port 8080");
  });
});
