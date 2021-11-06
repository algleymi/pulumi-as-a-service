import {
  getPulumiConfiguration,
  validateEnvironmentVariables,
} from "../pulumi-configuration";
import * as useCases from "../use-cases/index";

import { createApi } from "./adapters/routes";

function start() {
  validateEnvironmentVariables();

  const pulumiConfiguration = getPulumiConfiguration();
  const server = createApi(useCases, pulumiConfiguration);
  server.listen(9000);
}

start();
