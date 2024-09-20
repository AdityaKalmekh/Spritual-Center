import userModel from "../model/usersModel.ts";
import dbConnect from "./dbconfig.ts";

export const getDevotees = async(devotees:any) => {
    const response = await userModel.find({"DevoteeId": { $in : devotees}},{"FirstName":1,"MidleName":1,"DevoteeId":1,"_id":0});
    if (response){
        return response;
    }
    console.log(response);
}