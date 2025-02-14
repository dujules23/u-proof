import mongoose from "mongoose";
import { Schema, model, models, Model, ObjectId } from "mongoose";

export interface UserSchema {
  _id: ObjectId;
  email: string;
  name: string;
  createdAt: Date;
}

const UserSchema = new Schema<UserSchema>(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = models?.User || model("User", UserSchema);

export default User as Model<UserSchema>;
