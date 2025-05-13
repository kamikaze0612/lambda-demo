import { z } from "zod";

import { c } from "@/contract";
import {
  CompaniesResponseBody,
  CompanyResponseBody,
  CompaniesQuery,
} from "@/schemas/dtos";

export const companyContract = c.router({
  getCompanies: {
    method: "GET",
    path: "/companies",
    query: CompaniesQuery,
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
