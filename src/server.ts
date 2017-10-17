import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import * as path from "path";
import * as fs from "fs";
import * as rfs from "rotating-file-stream";
import { connectDB } from "./db";
import userRoute from "./routes/user";
import homeRoute from "./routes/home";
import * as morgan from "morgan";

export default class Server {
  public app: express.Application;
  public logDirectory: string;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();
    connectDB();

    this.prepare();
    this.config();
    this.routes();
  }

  private config() {
    this.app.use(
      morgan("dev", {
        skip: function(req, res) {
          return res.statusCode < 400;
        },
      }),
    );

    this.app.use("/public", express.static(path.join(__dirname, "public")));

    this.app.use(this.configLogger());

    this.app.set("views", "./views");
    this.app.set("view engine", "pug");
  }

  private routes() {
    this.app.use("/", homeRoute);
    this.app.use("/user", userRoute);
  }

  private prepare() {
    this.logDirectory = path.join(__dirname, "logs");

    fs.existsSync(this.logDirectory) || fs.mkdirSync(this.logDirectory);
  }

  private configLogger() {
    const accessLogStream = rfs("access.log", {
      interval: "1d",
      path: this.logDirectory,
    });

    return morgan("common", { stream: accessLogStream });
  }
}
