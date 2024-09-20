'use server'

import { NextRequest, NextResponse } from "next/server";
import { deleteImageFromS3 } from "../../../../../lib/awsS3.ts";
import dbConnect from "../../../../../lib/dbconfig.ts";
import Users from "../../../../../model/usersModel.ts";

export async function GET(req: NextRequest) {
    await dbConnect();
    console.log("Getting devotee Data");
    const userDt = await Users.find();
    return NextResponse.json(userDt);
}

export async function DELETE(req: NextRequest) {
    const {id} = await req.json();
    const {DevoteeId} = await Users.findOne({_id : id});
    const awsImgResponse = await deleteImageFromS3(DevoteeId);
    
    if (awsImgResponse == 204){
        try {
            const response = await Users.deleteOne({_id : id});
            return NextResponse.json(response);
        } catch (error) {
            return NextResponse.json({"message": "Internal server error","statuscode":"500"});
        } 
    }
}
