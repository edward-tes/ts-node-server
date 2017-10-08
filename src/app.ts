"use strict"

import * as express from "express"
import IndexRoute from "./routes/index"
import Hello from "./routes/hello"

export class Server {
  public app: express.Application

  public static bootstrap(): Server {
    return new Server()
  }

  constructor() {
    this.app = new express()
    this.set()
    this.routes()
  }

  private routes() {
    let router: express.Router
    router = express.Router()

    var index: IndexRoute = new IndexRoute()
    var hello: Hello = new Hello()

    router.get("/", index.index)
    router.get("/hello", hello.index)

    this.app.use(router)
  }

  public set() {
    this.app.set("views", "./views")

    this.app.set("view engine", "jade")

    console.log(this.app.get("view engine"))
  }
}
