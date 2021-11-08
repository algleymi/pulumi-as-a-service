import * as pulumi from "@pulumi/pulumi";
import { Output } from "@pulumi/pulumi";
import { storageStack } from "./storage";

function getResultFromPulumiUp(
  dependencies: Output<any>[]
): PromiseLike<string[]> {
  return new Promise((resolve) => {
    pulumi.all(dependencies).apply(resolve);
  });
}

it("bucket gets created with a name", async function () {
  const BUCKET_NAME = "some-bucket";
  const result = await storageStack(BUCKET_NAME);
  const [bucketName, acl] = await getResultFromPulumiUp([
    result.bucket.bucket,
    result.bucket.acl,
  ]);
  expect(bucketName).toEqual(BUCKET_NAME);
  expect(acl).toEqual("private");
});
