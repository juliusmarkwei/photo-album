import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secret_name = "photo-album/AWS-secret";

const client = new SecretsManagerClient({
    region: "us-east-1",
});

const getSecrets = async () => {
    try {
        const response = await client.send(
            new GetSecretValueCommand({
                SecretId: secret_name,
                VersionStage: "AWSCURRENT",
            })
        );

        return response.SecretString;
    } catch (error) {
        console.error("Error retrieving secret:", error);
        throw error;
    }
};

// Export a function instead of a promise to avoid race conditions
export const getSecret = async () => {
    const secret = await getSecrets();
    return secret;
};
