import { ObjectId } from "mongoose";

export interface MessageDetail {
  _id: ObjectId;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string;
  approved: boolean;
}
