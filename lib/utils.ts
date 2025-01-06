// import Message from "@/models/messageSchema";
import Message, { MessageModelSchema } from "@/models/messageSchema";
import { MessageDetail, RequestedEdit } from "@/utils/types";
import dbConnect from "./dbConnect";

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
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchRequestedEdit = async (): Promise<RequestedEdit[]> => {
  try {
    const res = await fetch("http://localhost:3000/api/requestedEdit");
    if (!res.ok) {
      throw new Error("Failed to fetch edit");
    }
    const data: RequestedEdit[] = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getData = async (
  perPage: number,
  page: number,
  query: string
): Promise<{ messagesFromDb: MessageModelSchema[]; itemCount: number }> => {
  try {
    await dbConnect(); // Connect to the database

    // Convert the search query to lowercase for case-insensitive matching
    const searchQuery = query.toLowerCase();

    // Search and pagination logic using MongoDB query
    const filterConditions = {
      $or: [
        { subject: { $regex: searchQuery, $options: "i" } },
        { name: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
        {
          createdAt: {
            $gte: !isNaN(new Date(query).getTime())
              ? new Date(query)
              : undefined,
            $lte: !isNaN(new Date(query).getTime())
              ? new Date(new Date(query).getTime() + 86400000)
              : undefined,
          },
        },
      ],
    };

    // Fetch messages with search and pagination
    const messagesFromDb = await Message.find(filterConditions)
      .skip(perPage * (page - 1)) // Pagination skip
      .limit(perPage) // Pagination limit
      .lean()
      .exec();

    // Count total items for pagination based on the same filter conditions
    const itemCount = await Message.countDocuments(filterConditions);

    return { messagesFromDb, itemCount }; // Return data and item count
  } catch (error) {
    throw new Error("Failed to fetch data. Please try again later.");
  }
};
