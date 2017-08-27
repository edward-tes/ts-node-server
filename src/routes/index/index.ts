"use strict";

import * as express from "express";

export default class Index {
  public index(req: express.Request, res: express.Response, next: express.NextFunction) {
      //render page
      res.send("index page");
  }
}
