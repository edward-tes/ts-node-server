"use strict";

import * as express from "express";
import { default as User, UserModel } from "../models/user";

const router = express.Router();

router.get("/", function(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  res.render("index", { title: "Hey", message: "Hello there!" });
});

export default router;
