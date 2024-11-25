import mongoose, { ObjectId } from "mongoose";

export interface MessageDetail {
  _id: ObjectId;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string;
  approved: boolean;
  needsEdit: boolean;
  processed: boolean;
}

export interface RequestedEdit {
  _id: ObjectId;
  requestedEdit: string;
  messageId: mongoose.Types.ObjectId;
  status: string;
  createdAt: Date;
}
