'use server'

import Users from "../../model/usersModel.ts";
import payment from "../../model/paymentModel.ts";
import dbConnect from "../../lib/dbconfig.ts";
import { redirect } from "next/navigation.js";
import Payment_interface from "../../interface/Payment.ts";
import { cookies } from "next/headers.js";
import jwt from "jsonwebtoken";
import { uploadImageToS3 } from "../../lib/awsS3.ts";
import { userAgent } from "next/server.js";

export async function handleSubmition(formData: FormData) {
    await dbConnect();
    const id = formData.get("_id");
    const profilePic : any = formData.get("ProfilePic");
    const devoteeId = formData.get("DevoteeId");
    const devoteeDt = {
        FirstName: formData.get("FirstName"),
        MidleName: formData.get("MidleName"),
        LastName: formData.get("LastName"),
        EmailID: formData.get("EmailID"),
        InitiationDate: formData.get("InitiationDate"),
        FlatNumber: formData.get("FlatNumber"),
        Area: formData.get("Area"),
        City: formData.get("City"),
        State: formData.get("State"),
        PinCode: formData.get("PinCode"),
        Otp: "000000",
        Role: "Devotee",
        Password: "password",
    }   
    if (id){
        if (profilePic.size > 0){
            const ProfilePic = await uploadImageToS3(formData.get("ProfilePic"),devoteeId);
            devoteeDt.ProfilePic = ProfilePic;
            const response = await Users.findOneAndUpdate({_id : id}, devoteeDt);
            if (response){
                redirect("/admin/userlist");
            }
        }
    }else{
        const user = new Users(devoteeDt);
        const DevotieeId = user.devoteeId();
        user.DevoteeId = DevotieeId;
        user.ProfilePic = await uploadImageToS3(formData.get("ProfilePic"),DevotieeId);
        const response = await user.save();
        if (response){
            redirect("/admin/userlist");
        }
    }
}

export async function paymentHandler(paymentData:FormData){
    const jwtToken = cookies().get("Token")?.value;
    const {DevoteeId} : any = jwt.decode(jwtToken?jwtToken:"");
    const paymentDt = {
        Year : paymentData.get("Year"),
        Month : paymentData.get("Month"),
        Amount : paymentData.get("Amount"),
        DevoteeId : DevoteeId
    }
    const response = await payment.create(paymentDt);
    if (response){
        redirect("/devotee/mypayments");
    }
}