#!/usr/bin/env node

import yargs from "yargs";
import * as useCases from "@night_city.ts/core/use-cases";

yargs
  .scriptName("night_city")
  .usage("$0 <cmd> [args]")
  .command("hello", "Logs hello world.", function () {
    console.info("hello world");
  })
  .command("storage", "Creates the storage stack", async function () {
    await useCases.deleteStorage("arno-deleteme");
  })
  .help().argv;
