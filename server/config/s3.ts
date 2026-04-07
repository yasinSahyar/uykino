import { S3Client } from "@aws-sdk/client-s3";

export function validateAWSCredentials(): void {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const bucketName = process.env.AWS_BUCKET_NAME;

  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      "AWS credentials not configured. Please set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables."
    );
  }

  if (!bucketName) {
    throw new Error(
      "AWS bucket name not configured. Please set AWS_BUCKET_NAME environment variable."
    );
  }
}

export function createS3Client(): S3Client {
  const region = process.env.AWS_REGION || "us-east-1";
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      "AWS S3 credentials are missing. Configure AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables."
    );
  }

  return new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

export const getS3Url = (bucket: string, key: string): string => {
  return `https://${bucket}.s3.${
    process.env.AWS_REGION || "us-east-1"
  }.amazonaws.com/${key}`;
};
