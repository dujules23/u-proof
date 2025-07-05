import { MessageDetail } from "@/utils/types";
import dateformat from "dateformat";
import Link from "next/link";
import { FC } from "react";

interface Props {
  messageData: MessageDetail;
}

const MobileMessageCard: FC<Props> = ({ messageData }): JSX.Element => {
  const { _id, name, message, createdAt, approved } = messageData;
  return (
    <>
      <div className="flex justify-between items-start mb-2">
        <span className="font-semibold text-primary-dark dark:text-primary-light">
          {name}
        </span>
        <span className="text-xs text-gray-500">
          {dateformat(createdAt, "mm/dd/yyyy")}
        </span>
      </div>
      <p className="text-sm text-primary-dark dark:text-primary-light line-clamp-2 mb-2">
        {message}
      </p>
      <div className="flex justify-between items-center">
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            approved ? "bg-blue-100 text-nav" : "bg-red-100 text-red-800"
          }`}
        >
          {approved ? "Approved" : "Awaiting Approval"}
        </span>
        <Link
          href={`/messages/${_id}`}
          className="text-blue-600 hover:text-blue-800"
        >
          View
        </Link>
      </div>
    </>
  );
};

export default MobileMessageCard;
