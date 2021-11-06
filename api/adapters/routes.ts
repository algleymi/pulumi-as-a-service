import express from "express";

export function createApi({ createStorage, deleteStorage }: any) {
  const server = express();

  server.post("/storage", async function (_, res) {
    await createStorage("arno-delete-me");
    res.sendStatus(200);
  });

  server.delete("/storage", async function (_, res) {
    await deleteStorage("arno-delete-me");
    res.sendStatus(200);
  });

  return server;
}
