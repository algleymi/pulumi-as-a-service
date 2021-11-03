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
# Tell pulumi to use the state bucket you have created
$ pulumi login s3://some-state-bucket
```

# interesting reads, pulumi docs & gotcha's

- [Pulumi Environment Variables](https://www.pulumi.com/docs/reference/cli/environment-variables/)
- When using a custom backend, you have to persist the `StackSettings` as well. See https://github.com/pulumi/automation-api-examples/issues/4#issuecomment-754872367.
- Pulumi generates stack settings files in the form of `Pulumi.yaml` and `Pulumi.dev.yaml`. These files seem redundant as they are regenerated each time.
- Use the AWS KMS secrets provider instead of a passphrase. See https://github.com/pulumi/automation-api-examples/blob/main/nodejs/inlineSecretsProvider-ts/index.ts#L75.
- [Unit testing](https://www.pulumi.com/docs/guides/testing/unit/)
