"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const ApprovePage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const approved = searchParams.get("approved");
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !approved) return;

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
          cache: "force-cache",
        });

        const data = await response.json();
        console.log("Approval Response:", data);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error: any) {
        console.error("Error processing message:", error);
        setError(error.message);
      } finally {
        setIsProcessing(false);
      }
    };

    approveMessage();
  }, [id, approved]);

  return (
    <div>
      {isProcessing ? (
        <p>Processing your request...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Message has been processed successfully.</p>
      )}
    </div>
  );
};

export default ApprovePage;
