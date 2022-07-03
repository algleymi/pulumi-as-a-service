import { validateEnvironmentVariables } from "@algleymi/pulumiaas-core/pulumi-configuration";
import * as useCases from "@algleymi/pulumiaas-core/use-cases";

import { createApi } from "./adapters/routes";

function start() {
  validateEnvironmentVariables();

  const server = createApi(useCases);
  server.listen(9000);
}

start();
