import { z } from "zod";

import { c } from "@/contract";
import {
  CompaniesResponseBody,
  CompanyResponseBody,
} from "@/schemas/dtos/companies";

export const companyContract = c.router({
  getCompanies: {
    method: "GET",
    path: "/companies",
    responses: {
      200: CompaniesResponseBody,
    },
    description: "Get all companies",
  },
  getCompany: {
    method: "GET",
    path: "/companies/:id",
    pathParams: z.object({
      id: z.coerce.number(),
    }),
    responses: {
      200: CompanyResponseBody,
    },
  },
});
