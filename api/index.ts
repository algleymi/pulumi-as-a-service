import { validateEnvironmentVariables } from "../pulumi-configuration";
import * as useCases from "../use-cases/index";

import { createApi } from "./adapters/routes";

function start() {
  validateEnvironmentVariables();

  const server = createApi(useCases);
  server.listen(9000);
}

start();
