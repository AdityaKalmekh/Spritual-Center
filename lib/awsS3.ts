import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs"

const s3 = new S3Client({
    region: "ap-southeast-2",
    credentials: {
        accessKeyId : `${process.env.AWS_ACCESS_ID}`,
        secretAccessKey : `${process.env.AWS_SECRET_ACCESS_ID}`
    }
});

export const uploadImageToS3 = async (fileData: any, devotieeProfile: string) => {
    const profile = await fileData.arrayBuffer()
    try {
        const response = await s3.send(
            new PutObjectCommand({
                Bucket: "spritual-center",
                Key: `Profile-${devotieeProfile}`,
                ContentType: "image/png",
                Body: profile
            })
        )
        if (response["$metadata"].httpStatusCode == 200) {
            return `https://spritual-center.s3.ap-southeast-2.amazonaws.com/Profile-${devotieeProfile}`
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        return error;
    }
};


export const deleteImageFromS3 = async (id:string) => {
    try{
        const response = await s3.send(
            new DeleteObjectCommand({
                Bucket : "spritual-center",
                Key : `Profile-${id}`
            })
        )
        return response['$metadata'].httpStatusCode
    }catch (error){
        console.error("Error while deleting image from s3",error);
        return error
    }    
}