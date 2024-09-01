export interface MessageDetail {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string;
  approved: boolean;
}
