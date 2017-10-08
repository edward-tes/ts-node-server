"use strict";

import * as express from "express";

export default class Hello {
  index(req, res, next) {
      //render page
      res.send("hello wepage");
  }
}
