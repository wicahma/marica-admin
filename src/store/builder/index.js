import { authBuilder } from "./auth";
import { tableBuilder } from "./table";

export const builderContext = (builder) => {
  tableBuilder(builder);
  authBuilder(builder);
};
