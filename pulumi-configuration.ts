const KMS_KEY_ALIAS_ENVIRONMENT_PATH = "KMS_KEY_ALIAS";
const PULUMI_BACKEND_URL_ENVIRONMENT_PATH = "PULUMI_BACKEND_URL";

export function validateEnvironmentVariables() {
  const keyAlias = process.env[KMS_KEY_ALIAS_ENVIRONMENT_PATH];
  const pulumiBackendUrl = process.env[PULUMI_BACKEND_URL_ENVIRONMENT_PATH];

  if (!keyAlias || !pulumiBackendUrl) {
    const requiredEnvironmentVariables = [
      KMS_KEY_ALIAS_ENVIRONMENT_PATH,
      PULUMI_BACKEND_URL_ENVIRONMENT_PATH,
    ];

    const errorMessage = `The following environment variables are required: ${requiredEnvironmentVariables.join(
      ", "
    )}.`;

    throw new Error(errorMessage);
  }
}

export type PulumiConfiguration = {
  secretsProvider: string;
};

export function getPulumiConfiguration(): PulumiConfiguration {
  const kmsKeyAlias = process.env[KMS_KEY_ALIAS_ENVIRONMENT_PATH];

  return {
    secretsProvider: kmsKeyAlias,
  };
}
