"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const ApprovePage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const approved = searchParams.get("approved");

  useEffect(() => {
    if (id && approved) {
      console.log("Extracted ID:", id);
      console.log("Extracted Approved Status:", approved);
      const approveMessage = async () => {
        try {
          const response = await fetch("/api/approve", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
              approved: approved === "true",
            }),
          });

          const data = await response.json();
          console.log("Approval Response:", data);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          console.error("Error processing message:", error);
        }
      };

      approveMessage();
    }
  }, [id, approved]);

  return <div>Processing your request...</div>;
};

export default ApprovePage;
