import { NextRequest, NextResponse } from "next/server";
import { s3Client } from "@/app/utils/s3Config";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export const POST = async (request: NextRequest) => {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const name = formData.get("name") as string;
        const category = formData.get("category") as string;

        // convert file to buffer
        const buffer = await file.arrayBuffer();
        const fileBuffer = Buffer.from(buffer);

        const uploadParams = {
            Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
            Key: `uploads/${category || "Other"}/${name || file.name}`,
            Body: fileBuffer,
            ContentType: file.type,
        };

        await s3Client.send(new PutObjectCommand(uploadParams));

        return NextResponse.json(
            { message: "File uploaded successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Error uploading file" },
            { status: 500 }
        );
    }
};
