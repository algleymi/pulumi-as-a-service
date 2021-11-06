import { Environment } from "@pulumi/aws/appconfig";
import { validateEnvironmentVariables } from "./pulumi-configuration";

describe("pulumi-configuration", () => {
  it("throws an error when the pulumi configuration is invalid", () => {
    expect(() => validateEnvironmentVariables()).toThrow();
  });

  it("does not throw an error when the pulumi configuration is valid", () => {
    const OLD_ENV = process.env;
    const NEW_ENV = {
      ...OLD_ENV,
      PULUMI_BACKEND_URL: "some-backend-url",
      KMS_KEY_ALIAS: "some-kms-key-alias",
    };

    process.env = NEW_ENV;

    expect(() => validateEnvironmentVariables()).not.toThrow();

    process.env = OLD_ENV;
  });
});
