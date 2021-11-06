import * as aws from "@pulumi/aws";
import { Bucket } from "@pulumi/aws/s3";
import { enums } from "@pulumi/aws/types";
import { PulumiConfiguration } from "../pulumi-configuration";
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

export function createStorage(
  applicationName: string,
  configuration: PulumiConfiguration
) {
  return createProgram(() => storageStack(applicationName), configuration);
}

export function deleteStorage(
  applicationName: string,
  configuration: PulumiConfiguration
) {
  return destroyProgram(() => storageStack(applicationName), configuration);
}
