# night_city.ts

# requirements

We assume you have the following utilities installed and configured:

- pulumi
- aws-vault
- aws-cli

Familiarise yourself with these tools before continuing.

```bash
# Authenticate with AWS
$ aws-vault exec some-aws-account
# Tell pulumi to use the KMS encryption key to encrypt the state
$ export KMS_KEY_ALIAS=pulumi-secrets-encryption-key
# Tell pulumi to use the state bucket you have created
$ export PULUMI_BACKEND_URL=s3://arno-pulumi-state-bucket-deleteme
```

# interesting reads, pulumi docs & gotcha's

[Pulumi Environment Variables](https://www.pulumi.com/docs/reference/cli/environment-variables/)

When using a custom backend, you have to persist the `StackSettings` as well. See https://github.com/pulumi/automation-api-examples/issues/4#issuecomment-754872367.

Pulumi generates stack settings files in the form of `Pulumi.yaml` and `Pulumi.dev.yaml`. These files seem redundant as they are regenerated each time.

Use the AWS KMS secrets provider instead of a passphrase. See https://github.com/pulumi/automation-api-examples/blob/main/nodejs/inlineSecretsProvider-ts/index.ts#L75.

Don't use direct imports for infrastructure resources, see https://github.com/pulumi/pulumi-aws/issues/772.

For example:

```typescript
// won't work
import { Bucket } from "@pulumi/aws/s3";

// will work
import * as aws from "@pulumi/aws";
const bucket = new aws.s3.Bucket();
```

Check out the [unit testing](https://www.pulumi.com/docs/guides/testing/unit/) docs since there are a few gotcha's.
