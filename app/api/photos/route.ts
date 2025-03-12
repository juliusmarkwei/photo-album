import { NextRequest, NextResponse } from "next/server";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { s3Client } from "@/app/utils/s3Config";

export const GET = async (request: NextRequest) => {
    try {
        const command = new ListObjectsV2Command({
            Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
        });

        const { Contents } = await s3Client.send(command);
        const imageUrls =
            Contents?.map((obj) => ({
                key: obj.Key,
                name: obj.Key?.split("/")[2],
                category: obj.Key?.split("/")[1],
                url: `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.amazonaws.com/${obj.Key}`,
            })) || [];

        return NextResponse.json({
            success: true,
            images: imageUrls,
        });
    } catch (error) {
        console.error("Error fetching S3 objects:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to retrieve objects",
            },
            { status: 500 }
        );
    }
};
