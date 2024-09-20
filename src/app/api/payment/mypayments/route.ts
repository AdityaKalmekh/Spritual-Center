import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbconfig";
import payment from "../../../../../model/paymentModel";

export async function GET(req: NextRequest,{params}:any){
    await dbConnect();
    const devoteeId = req.headers.get("devoteeId");
    const response = await payment.aggregate([
        {
            $match: {
                DevoteeId: devoteeId
            },
        },
        {
            $group: {
                _id: { year: "$Year", month: "$Month", devotieeId: "$DevoteeId" },
                totalDonation: {
                    $sum: "$Amount"
                }
            }
        }
    ])
    if (response) {
        return NextResponse.json(response);
    }
}