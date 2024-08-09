// import Message from "@/models/messageSchema";
import { MessageDetail } from "@/utils/types";

// Function that fetches all messages
export const fetchAllMessages = async (): Promise<MessageDetail[]> => {
  try {
    const res = await fetch("http://localhost:3000/api/messages/", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    const data: MessageDetail[] = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Function that fetches messages using query search
export const fetchMessagesWithQuery = async (
  query: string
): Promise<MessageDetail[]> => {
  if (!query) {
    return await fetchAllMessages();
  }
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
