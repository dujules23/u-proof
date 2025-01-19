"use client";

import { FC, ReactNode } from "react";
import TextArea from "./TextArea";
import ActionButton from "../buttons/ActionButton";
import router from "next/router";

interface Props {
  subject: string;
  name: string;
  createdAt: string | undefined;
  message: string;
  approved: boolean;
  editClick: boolean;
  newMessage: string;
  submitting: boolean;
  setEditClick: (editClick: boolean) => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  children: ReactNode;
}

const MessageContent: FC<Props> = ({
  subject,
  name,
  createdAt,
  message,
  approved,
  editClick,
  setEditClick,
  setIsModalOpen,
  children,
}): JSX.Element => {
  const approvedColor = approved ? "text-green-600" : "text-red-600";

  return (
    <>
      <div className="rounded shadow-md border p-4 shadow-secondary-dark dark:shadow-grey-100 overflow-hidden bg-primary dark:bg-primary transition flex flex-col h-auto max-w-xl sm:min-w-auto md:min-w-96">
        <h1 id="message-subject" className="text-2xl font-bold mb-2">
          {subject}
        </h1>
        <div className="text-sm text-gray-500 mb-4">
          <span id="message-name">By: {name}</span> |{" "}
          <span>
            {createdAt
              ? new Date(createdAt).toLocaleDateString()
              : "Unknown Date"}
          </span>
        </div>
        <p className="text-gray-700 mb-4">{message}</p>
        <div className="flex place-content-between space-x-8">
          <div className={`place-content-center ${approvedColor}`}>
            {approved ? "Approved" : "Pending Approval"}
          </div>

          <div className="flex space-x-2">
            {approved ? null : (
              <div>
                <ActionButton
                  onClick={() => setEditClick(!editClick)}
                  title={editClick ? "Close" : "Edit"}
                />
              </div>
            )}

            <div>
              <ActionButton
                onClick={() => router.push("/past-messages")}
                title="Back"
              />
            </div>
            <div>
              <ActionButton
                variant="danger"
                onClick={() => setIsModalOpen(true)}
                title="Delete"
              />
            </div>
          </div>
        </div>
        {children}
        {/* {editClick && (
        <div className="pt-5">
          <TextArea
            textAreaName="Message"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
          />
          <ActionButton
            disabled={!newMessage}
            busy={submitting}
            onClick={handleSubmit}
            title="Submit Edit"
          />
        </div>
      )} */}
      </div>
    </>
  );
};

export default MessageContent;
