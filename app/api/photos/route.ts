/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { s3Client } from "@/app/utils/s3Config";

const BUCKETNAME = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
const AWSREGION = process.env.NEXT_PUBLIC_AWS_REGION;

export const GET = async (request: NextRequest) => {
    try {
        const command = new ListObjectsV2Command({
            Bucket: BUCKETNAME,
        });

        const { Contents } = await (await s3Client).send(command);
        const imageUrls =
            Contents?.map((obj) => {
                const key = obj.Key;
                const name = key?.split("/")[2].split("-")[1];
                const category = key?.split("/")[1];
                const url = `https://${BUCKETNAME}.s3.${AWSREGION}.amazonaws.com/${encodeURIComponent(
                    obj.Key!
                )}`;
                return { key, name, category, url };
            }) || [];

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
