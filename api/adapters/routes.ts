import express from "express";
import { PulumiConfiguration } from "../../pulumi-configuration";

export function createApi(
  { createStorage, deleteStorage }: any,
  configuration: PulumiConfiguration
) {
  const server = express();

  server.post("/storage", async function (_, res) {
    await createStorage("arno-delete-me", configuration.secretsProvider);
    res.sendStatus(200);
  });

  server.delete("/storage", async function (_, res) {
    await deleteStorage("arno-delete-me", configuration.secretsProvider);
    res.sendStatus(200);
  });

  return server;
}
