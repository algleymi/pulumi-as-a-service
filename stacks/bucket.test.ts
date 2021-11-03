import * as pulumi from "@pulumi/pulumi";
import { Output, OutputInstance } from "@pulumi/pulumi";
import { createBucket } from "./bucket";

function getResultFromPulumiUp(
  dependencies: [Output<string>]
): Promise<string[]> {
  return new Promise((resolve) => {
    pulumi.all(dependencies).apply(resolve);
  });
}

test("bucket gets created with a name", async function () {
  const BUCKET_NAME = "some-bucket";
  const bucket = createBucket(BUCKET_NAME);
  const [bucketName] = await getResultFromPulumiUp([bucket.bucket]);
  expect(bucketName).toEqual(BUCKET_NAME);
});
