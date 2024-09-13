//   // function that turns text to an image
//   // const textToImage = (message: string) => {
//   //   const canvas = document.createElement("canvas");
//   //   const ctx = canvas.getContext("2d");
//   //   ctx.font = "20px Arial";
//   //   ctx?.fillText(message, 10, 50);
//   //   const dataUrl = canvas.toDataURL();
//   //   return dataUrl;
//   // };

// components/MessageCard.tsx

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

  console.log(_id);

  return (
    <div className="rounded shadow-md border p-4 shadow-secondary-dark dark:shadow-grey-100 overflow-hidden bg-primary dark:bg-primary transition flex flex-col h-full">
      <Link href={`/messages/${_id}`}>
        <div className="dark:text-primary-light text-primary-dark">
          {trimText(message, 30)}
        </div>
      </Link>

      <div className="font-bold dark:text-primary-light text-primary-dark mt-2">
        {trimText(subject, 30)}
      </div>

      <div className="mt-8 p-2 flex-1 flex flex-col">
        <Link href={"/"}>
          <div className="flex justify-between font-semibold text-primary-dark dark:text-primary-light">
            <div>{name}</div>
            {dateformat(createdAt, "mm/dd/yy")}
          </div>
        </Link>

        {approved ? (
          <ActionButton title="Approved" variant="primary" onClick={() => {}} />
        ) : (
          <ActionButton
            variant="danger"
            onClick={() => {}}
            title="Awaiting Approval"
          />
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
    </div>
  );
};

export default MessageCard;
