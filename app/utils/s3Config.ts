import { S3Client } from "@aws-sdk/client-s3";

async function createS3Client() {
    try {
        return new S3Client({
            region: process.env.NEXT_PUBLIC_AWS_REGION,
            credentials: {
                accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
            },
        });
    } catch (error) {
        console.error("Error initializing S3 client:", error);
        throw error;
    }
}

export const s3Client = createS3Client();
