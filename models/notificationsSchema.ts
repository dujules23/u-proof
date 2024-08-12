import { Schema, model, models, Model, ObjectId } from "mongoose";

export interface NotificationsSchema {
  message: string;
  status: "approved" | "not_approved" | "viewed";
  // userId: string;
  createdAt: Date;
}

const NotificationsSchema = new Schema<NotificationsSchema>(
  {
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["approved", "not_approved", "viewed"],
      required: true,
    },
    // userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Notifications =
  models?.Notifications || model("Notifications", NotificationsSchema);

export default Notifications as Model<NotificationsSchema>;
