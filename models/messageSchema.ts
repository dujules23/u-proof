import { Schema, model, models, Model, ObjectId } from "mongoose";

export interface MessageModelSchema {
  _id: ObjectId;
  name: string;
  email: string;
  subject: string;
  message: string;
  location: string;
  ministry: string;
  approved: boolean;
  processed: boolean;
  needsEdit: boolean;
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
    subject: {
      type: String,
      required: true,
      unique: false,
    },
    message: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    ministry: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    processed: {
      type: Boolean,
      default: false,
    },
    needsEdit: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Prevents duplicate entries from going to MongoDB
const Message = models?.Message || model("Message", MessageSchema);

export default Message as Model<MessageModelSchema>;
