import { trimText } from "@/utils/helper";
import { MessageDetail } from "@/utils/types";
import Link from "next/link";
import { FC } from "react";
import dateformat from "dateformat";
import ActionButton from "../buttons/ActionButton";

interface Props {
  messageData: MessageDetail;
  controls?: boolean;
  busy?: boolean;
  handleApproved?(): void;
}

const MessageCard: FC<Props> = ({
  messageData,
  controls = false,
  busy = false,
  handleApproved = () => {},
}): JSX.Element => {
  const { _id, name, subject, message, createdAt, approved } = messageData;

  return (
    <Link
      href={`/messages/${_id}`}
      className="rounded shadow-md border p-4 shadow-secondary-dark dark:shadow-grey-100 overflow-hidden bg-primary dark:bg-primary transition flex flex-col h-full space-y-3"
    >
      <div>
        <div className="dark:text-primary-light text-primary-dark">
          {trimText(message, 30)}
        </div>
      </div>

      <div className="font-bold dark:text-primary-light text-primary-dark mt-2">
        {trimText(subject, 30)}
      </div>

      <div className="mt-8 p-2 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between font-semibold text-primary-dark dark:text-primary-light">
            <div>{name}</div>
            {dateformat(createdAt, "mm/dd/yy")}
          </div>
        </div>

        {approved ? (
          <span className="mt-4 px-6 py-2 bg-nav rounded cursor-pointer flex justify-center">
            Approved
          </span>
        ) : (
          <span className="mt-4 px-6 py-2 bg-red-600 rounded cursor-pointer flex justify-center">
            Awaiting Approval
          </span>
        )}

        {busy ? (
          <span className="animate-pulse">Removing</span>
        ) : (
          controls && (
            <div className="hover:underline dark:text-primary-light text-primary-dark">
              Delete
            </div>
          )
        )}
      </div>
    </Link>
  );
};

export default MessageCard;
