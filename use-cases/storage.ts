import * as aws from "@pulumi/aws";
import { Bucket } from "@pulumi/aws/s3";
import { enums } from "@pulumi/aws/types";
import { createProgram, destroyProgram } from "./program";

type StorageStackResult = {
  bucket: Bucket;
};

export async function storageStack(
  applicationName: string
): Promise<StorageStackResult> {
  const bucket = new aws.s3.Bucket(applicationName, {
    bucket: applicationName,
    acl: enums.s3.CannedAcl.Private,
  });

  return {
    bucket,
  };
}

export function createStorage(applicationName: string) {
  return createProgram(() => storageStack(applicationName));
}

export function deleteStorage(
  applicationName: string,
  secretsProvider: string
) {
  return destroyProgram(() => storageStack(applicationName));
}
