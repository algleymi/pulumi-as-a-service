import { LocalWorkspaceOptions } from "@pulumi/pulumi/automation";

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

function getSecretsProvider() {
  return process.env[KMS_KEY_ALIAS_ENVIRONMENT_PATH];
}

export function workspaceOptionsWith(stackName: string): LocalWorkspaceOptions {
  const secretsProvider = getSecretsProvider();

  return {
    secretsProvider,
    stackSettings: {
      [stackName]: {
        secretsProvider,
      },
    },
  };
}
