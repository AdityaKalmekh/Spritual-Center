'use server'

import { NextRequest, NextResponse } from "next/server";
import Users from "../../../../model/usersModel.ts";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../lib/dbconfig.ts";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    await dbConnect();
    const userDt = await req.json();
    
    try {
        let response;
        if (userDt.role === "Admin"){
            response = await Users.findOne({ FirstName : userDt.username, Password : userDt.password});
        }else{
            response = await Users.findOne({ DevoteeId : userDt.username, Password : userDt.password});
        }
        const tokenData = {
            role: response.Role,
            DevoteeId : response.DevoteeId
        };
        console.log(tokenData);
        const encodeToken = jwt.sign(tokenData, `${process.env.JWT_SECRET_KEY}`);
        cookies().set("Token", `${encodeToken}`)
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ "statuscode": 500, "message": "Internal server error" });
    }
}