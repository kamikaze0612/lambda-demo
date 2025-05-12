import { z } from "zod";

import { c } from "@/contract";

import { companyContract } from "./companies";

export const contract = c.router(
  {
    companies: companyContract,
  },
  {
    commonResponses: {
      400: z.object({
        statusCode: z.number().int(),
        message: z.string(),
      }),
    },
  }
);
