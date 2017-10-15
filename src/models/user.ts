import * as mongoose from "mongoose";

export type UserModel = mongoose.Document & {
  name: String
};

const userSchema = new mongoose.Schema({
  name: String,
});

const User = mongoose.model("User", userSchema, "User");
export default User;
