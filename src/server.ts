import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import { connectDB } from "./db";
import userRoute from "./routes/user";
import * as morgan from "morgan";

export default class Server {
  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = new express();
    connectDB();
    this.config();
    this.routes();
  }

  private config() {
    this.app.use(morgan("combined"));
    this.app.set("views", "./views");
    this.app.set("view engine", "jade");
    this.app.use(express.static("public"));
  }

  private routes() {
    this.app.use("/user", userRoute);
  }
}
