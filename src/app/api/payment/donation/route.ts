import { NextResponse } from "next/server";
import payment from "../../../../../model/paymentModel"

export async function GET(){
    const response = await payment.aggregate([
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
        return NextResponse.json(response)
    }
}