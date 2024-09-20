import { NextResponse } from "next/server";
import payment from "../../../../../model/paymentModel"

export async function GET(){
    const dt = new Date();
    const month = dt.getMonth() + 1;
    const response = await payment.aggregate([
        {
            $lookup:
            {
                from: "users",
                let: {
                    did: "$DevoteeId",
                    month: "$Month",
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $ne: ["$$month", month],
                                    },
                                    {
                                        $eq: ["$$did", "$DevoteeId"],
                                    },
                                ],
                            },
                        },
                    },
                ],
                as: "dt",
            },
        },
    ])
    if (response){
        return NextResponse.json(response);
    }
}