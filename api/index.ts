import { validateEnvironmentVariables } from "@night_city.ts/core/pulumi-configuration";
import * as useCases from "@night_city.ts/core/use-cases";

import { createApi } from "./adapters/routes";

function start() {
  validateEnvironmentVariables();

  const server = createApi(useCases);
  server.listen(9000);
}

start();
