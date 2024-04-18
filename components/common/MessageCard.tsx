import { trimText } from "@/utils/helper";
import { MessageDetail } from "@/utils/types";
import Link from "next/link";
import { FC } from "react";
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
  const { name, email, subject, message } = messageData;

  // const slug = slugify(subject.toLowerCase(), {
  //   strict: true,
  // });

  return (
    <div className="rounded shadow-md border p-4 shadow-secondary-dark overflow-hidden bg-primary dark:bg-primary transition flex flex-col h-full">
      {/* Message */}
      <Link href={"/"}>
        <div>{trimText(message, 30)}</div>
      </Link>

      {/* Message Info */}
      <div className="p-2 flex-1 flex flex-col">
        <Link href={"/"}>
          <div>{name}</div>

          <h1 className="font-semibold text-primary-dark dark:text-primary">
            {subject}
          </h1>
        </Link>

        {busy ? (
          <span className="animate-pulse">Removing</span>
        ) : (
          <>
            {/* <div className="hover:underline">
                  <Link href={"/admin/posts/update/" + slug}>Edit</Link>
                </div> */}

            <button onClick={onDeleteClick} className="hover:underline">
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageCard;
