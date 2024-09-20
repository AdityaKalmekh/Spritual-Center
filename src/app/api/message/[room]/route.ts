import { NextRequest, NextResponse } from "next/server.js";
import messageModel from "../../../../../model/messageModel.ts";

export async function GET(req:NextRequest,{ params }: any) {
  const { room } = params;
  try {
    const response = await messageModel.find({"Room":room});
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error);
  }
}
