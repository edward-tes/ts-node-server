"use strict"
import * as express from "express"
import IndexRoute from "./routes/index"
import Hello from "./routes/hello"

export class Server {
  public app: express.Application;

  public static bootstrap():Server {
    return new Server()
  }

  constructor() {
    this.app = new express()

    this.routes();
  }
  private routes() {
    //get router
    let router: express.Router;
    router = express.Router();

    //create routes
    var index: IndexRoute = new IndexRoute();
    var hello: Hello = new Hello();

    //home page
    router.get("/", index.index);
    router.get("/hello", hello.index);

    //use router middleware
    this.app.use(router);
  }

  public set() {

  }
}
