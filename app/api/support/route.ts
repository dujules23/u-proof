import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import {
  ApiErrorMessage,
  createErrorResponse,
  createSuccessResponse,
  handleApiError,
} from "@/utils/errorHandler";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 3;
const ipStore = new Map<string, { count: number; firstRequestTime: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = ipStore.get(ip);

  if (!entry) {
    ipStore.set(ip, { count: 1, firstRequestTime: now });
    return false;
  }

  const elapsed = now - entry.firstRequestTime;

  if (elapsed < RATE_LIMIT_WINDOW) {
    // Within the window: increment count and check limit
    entry.count += 1;
    if (entry.count > RATE_LIMIT_MAX) {
      return true; // Rate limit exceeded
    }
    return false; // Still allowed
  } else {
    // Window has passed: reset count and timestamp
    ipStore.set(ip, { count: 1, firstRequestTime: now });
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";

    if (isRateLimited(ip)) {
      throw new Error(ApiErrorMessage.TOO_MANY_REQUESTS);
    }

    const formData = await req.formData();

    const task = formData.get("Task")?.toString();
    const name = formData.get("Name")?.toString();
    const email = formData.get("Email")?.toString();
    const priority = formData.get("Priority")?.toString();
    const tag = formData.get("Tag")?.toString();
    const description = formData.get("Description")?.toString();

    const createdDate = new Date().toISOString();

    if (!task || !name || !email || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await notion.pages.create({
      parent: { database_id: DATABASE_ID },
      properties: {
        Task: {
          title: [{ text: { content: task } }],
        },
        Name: {
          rich_text: [{ text: { content: name } }],
        },
        Email: {
          email,
        },
        Status: {
          status: { name: "Backlog" },
        },
        Priority: {
          select: { name: priority || "Medium" },
        },
        Tags: {
          multi_select: tag ? [{ name: tag }] : [],
        },
        Description: {
          rich_text: [{ text: { content: description } }],
        },
        "Created Date": {
          date: { start: createdDate },
        },
      },
    });

    return createSuccessResponse(formData);
    // return NextResponse.json(
    //   { message: "Support ticket created successfully" },
    //   { status: 200 }
    // );
  } catch (error: any) {
    const errorState = handleApiError(error);
    return createErrorResponse(errorState);
  }
}
