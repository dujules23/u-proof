// import Message from "@/models/messageSchema";
import { MessageDetail } from "@/utils/types";
import dbConnect from "./dbConnect";
import { StringLiteral } from "typescript";

export const readMessagesFromDb = async (
  limit: number,
  pageNo: number,
  skip?: number
) => {
  if (!limit || limit > 10)
    throw Error("Please use limit under 10 and a valid page number");
  const finalSkip = skip || limit * pageNo;
  // await dbConnect();
  // finds posts, sorts by createdAt descending, skip increases as we increase page number, Limit to only fetch limited posts.
  // const messages = await Message.find()
  //   .sort({ createdAt: "desc" })
  //   .select("-content")
  //   .skip(finalSkip)
  //   .limit(limit);
  const messages = await fetch("http://localhost:3000/api/messages").then(
    (res) => res.json()
  );

  return messages;
};

export const fetchInitialMessages = async (): Promise<MessageDetail[]> => {
  try {
    const res = await fetch("http://localhost:3000/api/messages/");
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    const data: MessageDetail[] = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchMessagesWithQuery = async (
  query: string
): Promise<MessageDetail[]> => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/messages?query=${query}/`
    );
    if (!res.ok) {
      throw new Error("failed to fetch");
    }

    const data: MessageDetail[] = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
