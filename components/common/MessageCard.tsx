import { trimText } from "@/utils/helper";
import { MessageDetail } from "@/utils/types";
import Link from "next/link";
import { FC } from "react";
import dateformat from "dateformat";
import slugify from "slugify";

interface Props {
  messageData: MessageDetail;
  busy?: boolean;
  controls?: boolean;
  onDeleteClick?(): void;
}

const MessageCard: FC<Props> = ({
  messageData,
  controls = false,
  busy,
  onDeleteClick,
}): JSX.Element => {
  const { name, email, subject, message, createdAt } = messageData;

  // const slug = slugify(subject.toLowerCase(), {
  //   strict: true,
  // });

  return (
    <div className="rounded shadow-md border p-4 shadow-secondary-dark overflow-hidden bg-primary dark:bg-primary transition flex flex-col h-full">
      {/* Message */}
      <Link href={"/"}>
        <div className="dark:text-primary-light text-primary-dark">
          {trimText(message, 30)}
        </div>
      </Link>

      <div className="font-bold">{subject}</div>

      {/* Message Info */}
      <div className="mt-8 p-2 flex-1 flex flex-col">
        <Link href={"/"}>
          <div className="flex justify-between font-semibold text-primary-dark dark:text-primary-light">
            <div>{name}</div>
            {dateformat(createdAt, "mm/dd/yy")}
          </div>
        </Link>

        {busy ? (
          <span className="animate-pulse">Removing</span>
        ) : (
          <>
            {/* <div className="hover:underline">
                  <Link href={"/admin/posts/update/" + slug}>Edit</Link>
                </div> */}

            <button
              onClick={onDeleteClick}
              className="hover:underline dark:text-primary-light text-primary-dark"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageCard;
