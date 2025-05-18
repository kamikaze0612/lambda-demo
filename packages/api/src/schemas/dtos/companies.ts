import { z } from "zod";

import {
  CompanyModel,
  CompanyTranslationModel,
  IndustryTranslationModel,
  PositionModel,
  SalaryCurrencyModel,
} from "@/models";

const stringToJSONSchema = z.string().transform((str, ctx) => {
  try {
    return JSON.parse(str);
  } catch (error) {
    ctx.addIssue({ code: "custom", message: "Invalid JSON format." });
    return z.NEVER;
  }
});

export const CompaniesResponseBody = CompanyModel.pick({
  id: true,
  email: true,
  phoneNumber: true,
  websiteUrl: true,
  isFeatured: true,
})
  .extend({
    translation: CompanyTranslationModel.pick({
      lang: true,
      name: true,
      description: true,
      address: true,
    }),
    positions: PositionModel.pick({
      id: true,
    })
      .extend({
        salary: SalaryCurrencyModel.pick({
          amount: true,
          currency: true,
        }),
      })
      .array(),
    industries: IndustryTranslationModel.pick({
      id: true,
      name: true,
    }).array(),
  })
  .array();
export type CompaniesResponseBody = z.infer<typeof CompaniesResponseBody>;

export const CompanyResponseBody = CompanyModel.pick({
  id: true,
  email: true,
  phoneNumber: true,
  websiteUrl: true,
}).extend({
  translation: CompanyTranslationModel.pick({
    lang: true,
    name: true,
    description: true,
    address: true,
  }),
  positions: PositionModel.pick({
    id: true,
  })
    .extend({
      salary: SalaryCurrencyModel.pick({
        amount: true,
        currency: true,
      }),
    })
    .array(),
  industries: IndustryTranslationModel.pick({
    id: true,
    name: true,
  }).array(),
});
export type CompanyResponseBody = z.infer<typeof CompanyResponseBody>;

export const CompaniesQuery = z
  .object({
    keyword: z.string(),
    industry: stringToJSONSchema.pipe(z.coerce.number().array()),
    minAvgSalary: z.coerce.number(),
    maxAvgSalary: z.coerce.number(),
    sort: z.enum(["positions", "averageSalary", "createdAt"]),
    order: z.enum(["asc", "desc"]),
  })
  .partial()
  .optional();
export type CompaniesQuery = z.infer<typeof CompaniesQuery>;
