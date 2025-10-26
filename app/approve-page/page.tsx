"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { handleApiError, ErrorType } from "@/utils/errorHandler";

const ApprovePage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const approved = searchParams.get("approved");
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<{
    message: string;
    type: ErrorType;
    action?: string;
  } | null>(null);

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
          cache: "no-store",
        });

        const data = await response.json();
        console.log("Approval Response:", data);
        if (!response.ok) {
          console.log("Error Response:", data);
          const errorState = handleApiError(data.error);
          setError(errorState);
          return;
        }

        setError(null);
      } catch (error: any) {
        const errorResponse = handleApiError(error);
        setError(errorResponse);
      } finally {
        setIsProcessing(false);
      }
    };

    approveMessage();
  }, [id, approved]);

  return (
    <div>
      {isProcessing ? (
        <p className="text-primary-dark dark:text-primary-light">
          Processing your request...
        </p>
      ) : error ? (
        <div
          className={`
        ${error.type === ErrorType.VALIDATION ? " text-yellow-500" : ""}
        ${error.type === ErrorType.SERVER ? " first-letter:text-red-500" : ""}
        ${error.type === ErrorType.NOT_FOUND ? " text-red-500" : ""}
        ${error.type === ErrorType.ALREADY_EXISTS ? " text-amber-500" : ""}
        `}
        >
          <p className="font-semibold">{error.message}</p>
          {error.action && <p className="text-sm mt-2">{error.action}</p>}
        </div>
      ) : (
        <p className="text-primary-dark dark:text-primary-light">
          Message has been processed successfully.
        </p>
      )}
    </div>
  );
};

export default ApprovePage;
