import { environment  } from "src/environments/environment";

export const BackendConstants = {
  END_POINT: environment.backend_endpoint,
  TILES_END_POINT: environment.tile_endpoint,
} as const;
 