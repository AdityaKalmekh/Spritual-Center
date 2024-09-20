import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbconfig";
import Users from "../../../../../model/usersModel";

export async function GET(req: NextRequest){
    await dbConnect();     
    const devoteeId = req.headers.get("devoteeId");
    const response = await Users.findOne({"DevoteeId":devoteeId});
    return NextResponse.json(response);
}