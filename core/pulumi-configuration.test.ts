import {
  validateEnvironmentVariables,
  workspaceOptionsWith,
} from "./pulumi-configuration";

describe("pulumi-configuration", () => {
  it("throws an error when the pulumi configuration is invalid", () => {
    const OLD_ENV = process.env;
    process.env = {};

    expect(() => validateEnvironmentVariables()).toThrow();

    process.env = OLD_ENV;
  });

  it("throws an error when the kms key alias is invalid", () => {
    const OLD_ENV = process.env;
    const NEW_ENV = {
      ...OLD_ENV,
      PULUMI_BACKEND_URL: "some-backend-url",
      KMS_KEY_ALIAS: "some-kms-key-alias",
    };
    process.env = NEW_ENV;

    expect(() => validateEnvironmentVariables()).toThrow();

    process.env = OLD_ENV;
  });

  it("does not throw an error when the pulumi configuration is valid", () => {
    const OLD_ENV = process.env;
    const NEW_ENV = {
      ...OLD_ENV,
      PULUMI_BACKEND_URL: "some-backend-url",
      KMS_KEY_ALIAS: "awskms://alias/some-kms-key-alias",
    };
    process.env = NEW_ENV;

    expect(() => validateEnvironmentVariables()).not.toThrow();

    process.env = OLD_ENV;
  });

  it("returns the stack configuration for a given stack", () => {
    const OLD_ENV = process.env;
    const NEW_ENV = {
      ...OLD_ENV,
      KMS_KEY_ALIAS: "some-kms-key-alias",
    };
    process.env = NEW_ENV;

    expect(workspaceOptionsWith("arnos-stack")).toMatchInlineSnapshot(`
      Object {
        "secretsProvider": "some-kms-key-alias",
        "stackSettings": Object {
          "arnos-stack": Object {
            "secretsProvider": "some-kms-key-alias",
          },
        },
      }
    `);

    process.env = OLD_ENV;
  });
});
