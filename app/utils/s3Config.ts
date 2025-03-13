import { S3Client } from "@aws-sdk/client-s3";
import { getSecret } from "./secretManager";

async function createS3Client() {
    try {
        const secret: { [key: string]: string } = JSON.parse(
            (await getSecret()) as string
        );

        return new S3Client({
            region: "us-east-1",
            credentials: {
                accessKeyId: secret["NEXT_PUBLIC_AWS_ACCESS_KEY_ID"]!,
                secretAccessKey: secret["NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY"],
            },
        });
    } catch (error) {
        console.error("Error initializing S3 client:", error);
        throw error;
    }
}

export const s3Client = createS3Client();
