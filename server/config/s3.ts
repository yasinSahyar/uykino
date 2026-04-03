import { S3Client } from "@aws-sdk/client-s3";

export function createS3Client(): S3Client {
  const region = process.env.AWS_REGION || "us-east-1";

  return new S3Client({
    region,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  });
}

export const getS3Url = (bucket: string, key: string): string => {
  return `https://${bucket}.s3.${
    process.env.AWS_REGION || "us-east-1"
  }.amazonaws.com/${key}`;
};
