"use client";

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ActionButton from "@/components/buttons/ActionButton";
import { toast } from "sonner";
import { MessageDetail, RequestedEdit } from "@/utils/types";
import { Modal } from "@/components/common/Modal";
import TextArea from "@/components/common/TextArea";
import { deleteMessage } from "@/lib/utils";

const Message: FC<{ params: { _id: string; requestedEditId: string } }> = ({
  params,
}): JSX.Element => {
  const router = useRouter();

  const [messageData, setMessageData] = useState<MessageDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editClick, setEditClick] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [requestedEditData, setRequestedEditData] =
    useState<RequestedEdit | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(`/api/messages/${params._id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch message");
        }
        const data = await response.json();
        setMessageData(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [params._id]);

  useEffect(() => {
    const fetchEdit = async () => {
      try {
        const response = await fetch(`/api/requestEdit/${params._id}`);
        // If there is no requested edit, still show the message (not required unless actually requested) This works for now, may need to find a better solution.
        if (!response.ok) {
          setRequestedEditData(null);
        }
        const data = await response.json();
        setRequestedEditData(data.data);
        // console.log(requestedEditData?.requestedEdit);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEdit();
  }, [params._id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!messageData) return <div>No message found</div>;

  const {
    _id,
    name,
    subject,
    message,
    createdAt,
    approved,
    needsEdit,
    processed,
  } = messageData;

  // const {requestedEdit  } = requestedEditData

  const approvedColor = approved ? "text-green-600" : "text-red-600";

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      // Find a way to change approved and processed to true permanently.
      // messageData.approved = true;
      // messageData.processed = true;

      const messageUpdated = await fetch(`/api/messages/${_id}`, {
        method: "PATCH",
        body: JSON.stringify({
          newMessage,
          needsEdit,
          approved,
          processed,
        }),
        headers: { "Content-Type": "application/json" },
      });

      // handles error on the frontend
      if (messageUpdated.status !== 200) {
        toast.error("Message did not get updated.", {
          classNames: {
            toast: "bg-red-300",
          },
        });
        setSubmitting(false);
        throw new Error("Failed to send message, Not Found");
      }

      setNewMessage("");

      toast.success("Message has been updated!", {
        classNames: {
          toast: "bg-green-300",
        },
      });

      // sets approved and processed to true since this will be edited using the approved suggestion

      setSubmitting(false);
      setEditClick(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleDelete = async () => {
    await deleteMessage(
      _id.toString(),
      () => setIsModalOpen(false),
      (error) => console.error(error),
      setIsDeleting
    );
  };

  return (
    <div
      id="message-container"
      className="flex justify-center items-center min-w-screen m-12 space-x-6"
    >
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

        {editClick && (
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
        )}
      </div>

      {needsEdit && (
        <div className="rounded shadow-md border p-4 shadow-secondary-dark dark:shadow-grey-100 overflow-hidden bg-primary dark:bg-primary transition flex flex-col h-auto max-w-lg sm:min-w-auto md:min-w-96">
          <h1 className="text-2xl font-bold mb-2">Requested Edit</h1>
          <p id="requested-data" className="text-gray-700 mb-4">
            {requestedEditData?.requestedEdit}
          </p>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p className="text-black">
          Are you sure you want to delete this message? This action cannot be
          undone.
        </p>
        <div className="mt-4 flex justify-end space-x-2">
          <ActionButton
            busy={isDeleting}
            variant="danger"
            title="Delete"
            onClick={handleDelete}
          />
          <ActionButton
            variant="cancel"
            title="Cancel"
            onClick={() => setIsModalOpen(false)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Message;
