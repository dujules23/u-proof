// import Message from "@/models/messageSchema";
import { MessageDetail } from "@/utils/types";

// Function that fetches messages using query search
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
