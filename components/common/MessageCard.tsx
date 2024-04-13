import { MessageDetail } from "@/utils/types";
import { FC } from "react";

interface Props {
  message: MessageDetail;
  busy?: boolean;
  controls?: boolean;
  onDeleteClick?(): void;
}

const MessageCard: FC<Props> = (props): JSX.Element => {
  return <div>MessageCard</div>;
};

export default MessageCard;
