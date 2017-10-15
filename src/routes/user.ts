"use strict";

import * as express from "express";
import { default as User, UserModel } from "../models/user";

const router = express.Router();

router.get("/", function(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const user = new User({ name: "H232ello" });
  user.save().then(e => {
    console.log(e);
  });
  User.find().then(e => {
    console.log(e);
  });
  res.render("index.jade", { title: "Hey", message: "Hello there!" });
});

export default router;
