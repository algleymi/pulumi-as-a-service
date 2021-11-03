import * as useCases from "../use-cases/index";

import { createApi } from "./adapters/routes";

const server = createApi(useCases);

server.listen(9000);
