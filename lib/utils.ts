import Message from "@/models/messageSchema";
import dbConnect from "./dbConnect";

export const readMessagesFromDb = async (
  limit: number,
  pageNo: number,
  skip?: number
) => {
  if (!limit || limit > 10)
    throw Error("Please use limit under 10 and a valid page number");
  const finalSkip = skip || limit * pageNo;
  await dbConnect();
  // finds posts, sorts by createdAt descending, skip increases as we increase page number, Limit to only fetch limited posts.
  const messages = await Message.find()
    .sort({ createdAt: "desc" })
    .select("-content")
    .skip(finalSkip)
    .limit(limit);

  return messages;
};
