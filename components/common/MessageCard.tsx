import { MessageDetail } from "@/utils/types";
import Link from "next/link";
import { FC } from "react";

interface Props {
  message: MessageDetail;
  busy?: boolean;
  controls?: boolean;
  onDeleteClick?(): void;
}

const MessageCard: FC<Props> = ({
  message,
  controls = false,
  busy,
  onDeleteClick,
}): JSX.Element => {
  return (
    <div>
      {/* Message */}
      <Link href={"/"}>
        <div></div>
      </Link>

      {/* Message Info */}

      <Link href={"/"}></Link>
    </div>
  );
};

export default MessageCard;
