import { LocalWorkspaceOptions } from "@pulumi/pulumi/automation";

const KMS_KEY_ALIAS_ENVIRONMENT_PATH = "KMS_KEY_ALIAS";
const PULUMI_BACKEND_URL_ENVIRONMENT_PATH = "PULUMI_BACKEND_URL";
const AWS_REGION = "AWS_REGION";

function hasValidKmsKeyAlias(keyAlias: string) {
  return keyAlias.startsWith("awskms://alias/");
}

export function validateEnvironmentVariables() {
  const keyAlias = process.env[KMS_KEY_ALIAS_ENVIRONMENT_PATH];
  const pulumiBackendUrl = process.env[PULUMI_BACKEND_URL_ENVIRONMENT_PATH];
  const region = process.env[AWS_REGION];

  if (!keyAlias) {
    throw new Error(`${KMS_KEY_ALIAS_ENVIRONMENT_PATH} is not defined.`);
  }

  if (!pulumiBackendUrl) {
    throw new Error(`${PULUMI_BACKEND_URL_ENVIRONMENT_PATH} is not defined.`);
  }

  if (!region) {
    throw new Error(`${AWS_REGION} is not defined.`);
  }

  if (!hasValidKmsKeyAlias(keyAlias)) {
    throw new Error(
      `${KMS_KEY_ALIAS_ENVIRONMENT_PATH} does not contain a valid value.`
    );
  }
}

function getSecretsProvider() {
  return process.env[KMS_KEY_ALIAS_ENVIRONMENT_PATH];
}

export function getRegion() {
  return process.env[AWS_REGION];
}

export function workspaceOptionsWith(
  stackName: string
): LocalWorkspaceOptions {
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
