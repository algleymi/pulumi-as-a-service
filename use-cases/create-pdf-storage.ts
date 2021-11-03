import * as aws from "@pulumi/aws";

export function createPdfStorage(applicationName: string) {
    return new aws.s3.Bucket(applicationName, {
        bucket: applicationName
    });
}