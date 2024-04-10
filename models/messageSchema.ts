import { Schema, model, models, Model, ObjectId } from "mongoose";

export interface MessageModelSchema {
  _id: ObjectId;
  name: string;
  email: string;
  message: string;
}

const MessageSchema = new Schema<MessageModelSchema>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: false,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevents duplicate entries from going to MongoDB
const Message = models?.Message || model("Message", MessageSchema);

export default Message as Model<MessageModelSchema>;
