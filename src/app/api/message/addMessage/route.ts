import { NextRequest, NextResponse } from "next/server.js";
import messageModel from "../../../../../model/messageModel.ts";

export async function POST(req: NextRequest) {
  const messageData = await req.json();
  const userId = req.headers.get("userId");
  const data = {
    ...messageData,
    UserId: userId,
  };
  const response = await messageModel.create(data);
  if (response) {
    return NextResponse.json(response);
  }
}
