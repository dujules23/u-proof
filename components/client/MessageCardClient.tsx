"use client";

import { FC, use, useState } from "react";
import { MessageDetail } from "@/utils/types";
import MessageCard from "../common/MessageCard";

interface Props {
  messageData: MessageDetail;
  controls?: boolean;
  onDeleteClick?(message: MessageDetail): void;
  handleApproved?(): void;
}

const MessageCardClient: FC<Props> = ({
  messageData,
  controls = false,
  onDeleteClick,
}) => {
  const [busy, setBusy] = useState(false);
  const [approved, setApproved] = useState(false);

  const handleDeleteClick = () => {
    if (onDeleteClick) {
      setBusy(true);
      onDeleteClick(messageData);
      setBusy(false);
    }
  };

  const handleApproved = () => {
    setApproved(!approved);
  };

  return (
    <div>
      <MessageCard
        messageData={messageData}
        controls={controls}
        busy={busy}
        handleApproved={handleApproved}
        approved={approved}
      />
      {controls && (
        <button
          onClick={handleDeleteClick}
          className="hover:underline dark:text-primary-light text-primary-dark"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default MessageCardClient;
