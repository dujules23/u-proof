import mongoose from "mongoose";
import { Schema, model, models, Model, ObjectId } from "mongoose";

export interface NotificationsSchema {
  _id: ObjectId;
  message: string;
  messageId: mongoose.Types.ObjectId;
  status: "approved" | "not_approved" | "viewed";
  createdAt: Date;
}

const NotificationsSchema = new Schema<NotificationsSchema>(
  {
    message: { type: String, required: true },
    messageId: { type: Schema.Types.ObjectId, ref: "Message", required: true },
    status: {
      type: String,
      enum: ["approved", "not_approved", "viewed"],
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Notifications =
  models?.Notifications || model("Notifications", NotificationsSchema);

export default Notifications as Model<NotificationsSchema>;
