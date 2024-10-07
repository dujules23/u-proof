import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MessageDetail } from "@/utils/types";

// interface Message {
//   id: string;
//   content: string;
//   user: {
//     id: string;
//     name: string;
//     email: string;
//   };
// }

const RequestEditPage = async ({ params }: { params: { _id: string } }) => {
  const [editSuggestion, setEditSuggestion] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/messages/${params._id}`
  );
  const data = await res.json();
  const message = data.message;

  const messageId = params._id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/request-edit`, {
      method: "POST",
      body: JSON.stringify({ messageId, editSuggestion }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setIsSuccess(true);
    }
  };

  if (!message) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Request Edit for Message {params._id}</h1>
      <p>
        <strong>
          Message from {message.name} ({message.email}):
        </strong>
      </p>
      <blockquote>{message.message}</blockquote>

      {!isSuccess ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={editSuggestion}
            onChange={(e) => setEditSuggestion(e.target.value)}
            placeholder="Suggest your edit here"
            required
          />
          <button type="submit">Submit Edit Request</button>
        </form>
      ) : (
        <p>Your edit request was successfully submitted!</p>
      )}
    </div>
  );
};

export default RequestEditPage;
