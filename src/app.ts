"use strict";

import * as debug from "debug";
import * as dotenv from "dotenv";
import * as http from "http";
import * as log4js from "log4js";
import Server from "./server";
import * as utils from "./shared/utils";

dotenv.config({ path: ".env.test" });

const logger = log4js.getLogger();

const port = utils.normalizePort(process.env.PORT || 8080);
const app = Server.bootstrap().app;
const server = http.createServer(app);

logger.level = process.env.PORT || "info";

server.listen(port);

server.on("error", onError);
server.on("listening", () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  logger.info("Listening on " + bind);
});

server.on("listening", () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  logger.info("Listening on " + bind);
});

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      logger.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}
