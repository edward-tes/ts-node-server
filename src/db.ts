import * as log4js from "log4js";
import * as mongoose from "mongoose";

const logger = log4js.getLogger();

export const connectDB = () => {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI;

  mongoose.connect(mongoUri, {
    useMongoClient: true,
  });

  mongoose.connection.on("error", () => {
    logger.error(
      "MongoDB connection error. Please make sure MongoDB is running.",
    );
    process.exit();
  });
  mongoose.connection.once("open", () => {
    logger.info("Connect mongodb server");
  });
};
