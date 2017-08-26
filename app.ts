"use strict"
import * as express from "express"
import * as indexRoute from "./src/routes/index";

export class Server {
  public app: express.Application;

  public static bootstrap():Server {
    return new Server()

  }

  constructor() {
    console.log("contructor")
    this.app = new express()

    this.routes();
  }
  private routes() {
    //get router
    let router: express.Router;
    router = express.Router();

    //create routes
    var index: indexRoute.Index = new indexRoute.Index();

    //home page
    router.get("/", index.index);

    //use router middleware
    this.app.use(router);
  }

  public set() {

  }
}

