import * as aws from "@pulumi/aws";

export function createBucket(name: string): aws.s3.Bucket {
  return new aws.s3.Bucket(name, {
    bucket: name,
  });
}
