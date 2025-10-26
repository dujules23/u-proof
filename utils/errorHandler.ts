import { NextResponse } from "next/server";

export type ErrorState = {
  message: string;
  type: ErrorType;
  action?: string;
  status: number;
} | null;

export enum ErrorType {
  VALIDATION = "VALIDATION",
  DATABASE = "DATABASE",
  EMAIL = "EMAIL",
  NETWORK = "NETWORK",
  AUTH = "AUTH",
  NOT_FOUND = "NOT_FOUND",
  ALREADY_EXISTS = "ALREADY_EXISTS",
  TRANSACTION = "TRANSACTION",
  SERVER = "SERVER",
}

// Define all possible API errors
export enum ApiErrorMessage {
  // Message processing errors
  MESSAGE_NOT_FOUND = "Message not found",
  ALREADY_PROCESSED = "Message has already been processed",
  INVALID_MESSAGE = "Invalid message data",
  MESSAGE_CREATE_FAILED = "Failed to create message",

  // Email errors
  EMAIL_SEND_FAILED = "Failed to send email",
  INVALID_EMAIL = "Invalid email address",
  PRIMARY_EMAIL_FAILED = "Failed to send primary email",
  FOLLOWUP_EMAIL_FAILED = "Failed to send follow-up email",

  // Location errors
  INVALID_LOCATION = "Invalid location provided",
  LOCATION_NOT_FOUND = "Location not found",

  // Database/Transaction errors
  TRANSACTION_FAILED = "Database transaction failed",
  DATABASE_CONNECTION_FAILED = "Failed to connect to database",
  DATABASE_QUERY_FAILED = "Database query failed",

  // Auth errors
  UNAUTHORIZED = "Unauthorized access",
  AUTH_FAILED = "Authentication failed",

  // Common errors
  NETWORK_ERROR = "Network connection error",
  SERVER_ERROR = "Internal server error",
  VALIDATION_ERROR = "Validation error",
}

interface ErrorDetails {
  message: string;
  type: ErrorType;
  status: number;
  action?: string;
}

export interface ApiErrorResponse {
  success: boolean;
  error: string;
  errorType?: ErrorType;
  action?: string;
}

export function handleApiError(error: any, status?: number): ErrorState {
  let errorDetails: ErrorDetails;

  // Handle predefined API error messages first
  const isApiErrorMessage = (msg: string): msg is ApiErrorMessage =>
    Object.values(ApiErrorMessage).includes(msg as ApiErrorMessage);

  if (error instanceof Error && isApiErrorMessage(error.message)) {
    errorDetails = handleStringError(error.message);
  } else if (typeof error === "string" && isApiErrorMessage(error)) {
    errorDetails = handleStringError(error);
  } else if (error instanceof Error) {
    errorDetails = categorizeError(error);
  } else {
    errorDetails = {
      message: ApiErrorMessage.SERVER_ERROR,
      type: ErrorType.DATABASE,
      status: 500,
    };
  }

  // Log error details
  console.error(`[${errorDetails.type}] ${errorDetails.message}`, error);

  // Return the error state
  return {
    message: errorDetails.message,
    type: errorDetails.type,
    action: errorDetails.action,
    status: errorDetails.status,
  };
}

export function createErrorResponse(errorState: ErrorState): NextResponse {
  if (!errorState) {
    return NextResponse.json(
      { success: false, error: "Unknown error" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: errorState.message,
      errorType: errorState.type,
      action: errorState.action,
    } as ApiErrorResponse,
    { status: errorState.status }
  );
}

function categorizeError(error: Error): ErrorDetails {
  // Email-related errors
  if (error.message.includes("email") || error.message.includes("send")) {
    if (error.message.includes("primary")) {
      return {
        message: ApiErrorMessage.PRIMARY_EMAIL_FAILED,
        type: ErrorType.EMAIL,
        status: 500,
        action: "Please try again or contact support if the issue persists",
      };
    }
    if (error.message.includes("follow-up")) {
      return {
        message: ApiErrorMessage.FOLLOWUP_EMAIL_FAILED,
        type: ErrorType.EMAIL,
        status: 500,
        action:
          "The primary email was sent, but the follow-up failed. Please check the system",
      };
    }
  }

  // Database/Transaction errors
  if (
    error.message.includes("transaction") ||
    error.message.includes("session")
  ) {
    return {
      message: ApiErrorMessage.TRANSACTION_FAILED,
      type: ErrorType.TRANSACTION,
      status: 500,
      action: "Please try your request again",
    };
  }

  // MongoDB specific errors
  if (
    error.message.includes("MongoError") ||
    error.message.includes("MongoDB")
  ) {
    return {
      message: ApiErrorMessage.DATABASE_CONNECTION_FAILED,
      type: ErrorType.DATABASE,
      status: 503,
      action: "Please try again later",
    };
  }

  // Validation errors
  if (
    error.message.includes("validation") ||
    error.message.includes("invalid")
  ) {
    return {
      message: ApiErrorMessage.VALIDATION_ERROR,
      type: ErrorType.VALIDATION,
      status: 400,
      action: "Please check your input and try again",
    };
  }

  // Default error
  return {
    message: ApiErrorMessage.SERVER_ERROR,
    type: ErrorType.DATABASE,
    status: 500,
    action: "Please try again later or contact support",
  };
}

function handleStringError(errorMessage: string): ErrorDetails {
  switch (errorMessage) {
    case ApiErrorMessage.INVALID_LOCATION:
      return {
        message: errorMessage,
        type: ErrorType.VALIDATION,
        status: 400,
        action: "Please select a valid location",
      };
    case ApiErrorMessage.ALREADY_PROCESSED:
      return {
        message: errorMessage,
        type: ErrorType.ALREADY_EXISTS,
        status: 409,
        action: "This message has already been processed by another reviewer",
      };
    case ApiErrorMessage.MESSAGE_NOT_FOUND:
      return {
        message: errorMessage,
        type: ErrorType.NOT_FOUND,
        status: 404,
        action: "Please check the message ID and try again",
      };
    default:
      return {
        message: ApiErrorMessage.SERVER_ERROR,
        type: ErrorType.DATABASE,
        status: 500,
        action: "Please try again later",
      };
  }
}

// Helper function to create a success response
export function createSuccessResponse<T>(data: T) {
  return NextResponse.json({
    success: true,
    data,
  });
}
