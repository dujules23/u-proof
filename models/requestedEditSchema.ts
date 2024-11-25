import mongoose from "mongoose";
import { Schema, model, models, Model, ObjectId } from "mongoose";

export interface RequestedEditSchema {
  _id: ObjectId;
  requestedEdit: string;
  messageId: mongoose.Types.ObjectId;
  status: "pending" | "completed";
  createdAt: Date;
}

const RequestedEditSchema = new Schema<RequestedEditSchema>(
  {
    requestedEdit: { type: String, required: true },
    messageId: { type: Schema.Types.ObjectId, ref: "Message", required: true },
    status: {
      type: String,
      enum: ["pending", "completed"],
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const RequestedEdit =
  models?.RequestedEdit || model("RequestedEdit", RequestedEditSchema);

export default RequestedEdit as Model<RequestedEditSchema>;
