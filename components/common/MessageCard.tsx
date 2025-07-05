import { trimText } from "@/utils/helper";
import { MessageDetail } from "@/utils/types";
import Link from "next/link";
import { FC } from "react";
import dateformat from "dateformat";

interface Props {
  messageData: MessageDetail;
}

const MessageCard: FC<Props> = ({ messageData }): JSX.Element => {
  const { _id, name, subject, message, createdAt, approved } = messageData;

  return (
    <Link
      href={`/messages/${_id}`}
      className="rounded-lg shadow-md p-4 shadow-secondary-dark dark:shadow-grey-100 overflow-hidden bg-white dark:bg-gray-800 dark:bg-primary transition flex flex-col h-full space-y-3"
    >
      <div>
        <div className="flex justify-between font-semibold text-primary-dark dark:text-primary-light">
          <div>{name}</div>
          {dateformat(createdAt, "mm/dd/yy")}
        </div>
      </div>

      <div className="font-bold dark:text-primary-light text-primary-dark mt-2">
        Subject: {trimText(subject, 30)}
      </div>

      <div>
        <div className="dark:text-primary-light text-primary-dark">
          {trimText(message, 30)}
        </div>
      </div>

      <div className="mt-8 p-2 flex-1 flex flex-col">
        {approved ? (
          <span className="mt-4 px-6 py-2 bg-nav rounded cursor-pointer flex justify-center">
            Approved
          </span>
        ) : (
          <span className="mt-4 px-6 py-2 bg-red-600 rounded cursor-pointer flex justify-center">
            Awaiting Approval
          </span>
        )}
      </div>
    </Link>
  );
};

export default MessageCard;
