import { positions } from "database";
import { createSelectSchema } from "drizzle-zod";

export const PositionModel = createSelectSchema(positions);
