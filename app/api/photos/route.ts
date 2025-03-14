/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { s3Client } from "@/app/utils/s3Config";
import { getSecret } from "@/app/utils/secretManager";

export const GET = async (request: NextRequest) => {
	try {
		const secret: { [key: string]: string } = JSON.parse(
			(await getSecret()) as string
		);

		const command = new ListObjectsV2Command({
			Bucket: secret["NEXT_PUBLIC_AWS_BUCKET_NAME"],
		});

		const { Contents } = await (await s3Client).send(command);
		const imageUrls =
			Contents?.map((obj) => ({
				key: obj.Key,
				name: obj.Key?.split("/")[2].split("-")[1],
				category: obj.Key?.split("/")[1],
				url: `https://${
					secret["NEXT_PUBLIC_AWS_BUCKET_NAME"]
				}.s3.us-east-1.amazonaws.com/${encodeURIComponent(obj.Key!)}`,
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
