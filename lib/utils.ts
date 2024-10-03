// import Message from "@/models/messageSchema";
import Message, { MessageModelSchema } from "@/models/messageSchema";
import { MessageDetail } from "@/utils/types";
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

// Function that fetches messages using query search
// export const fetchMessagesWithQuery = async (
//   query: string
// ): Promise<MessageDetail[]> => {
//   if (!query) {
//     return await fetchAllMessages();
//   }
//   try {
//     const res = await fetch(
//       `http://localhost:3000/api/messages?query=${query}/`
//     );
//     if (!res.ok) {
//       throw new Error("failed to fetch");
//     }

//     const data: MessageDetail[] = await res.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

// Define the return type for the API call
// interface FetchMessagesResponse {
//   messagesFromDb: MessageDetail[];
//   itemCount: number;
// }

// export const fetchMessagesWithQuery = async (
//   query: string,
//   page: number
// ): Promise<FetchMessagesResponse> => {
//   const perPage = 8; // Set the number of messages per page
//   try {
//     const response = await fetch(
//       `/api/messages?query=${query}&page=${page}&perPage=${perPage}`
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch messages");
//     }

//     const data: FetchMessagesResponse = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching messages:", error);
//     throw error;
//   }
// };
