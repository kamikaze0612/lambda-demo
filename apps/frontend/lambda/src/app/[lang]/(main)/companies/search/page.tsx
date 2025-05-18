import { ChevronRight, Briefcase } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { client } from "@/service/client";

const CompaniesSearchPage: React.Page<
  {},
  {
    keyword: string;
    industry: string;
    sort: string;
    order: string;
  }
> = async ({ searchParams }) => {
  const { industry, keyword, sort, order } = await searchParams;
  const t = await getTranslations("companies");

  const response = await client.companies.getCompanies({
    query: {
      keyword: keyword || undefined,
      industry: industry
        ? JSON.stringify(industry.split(",").map(Number))
        : undefined,
      sort: sort as "positions" | "averageSalary" | "createdAt" | undefined,
      order: order as "asc" | "desc" | undefined,
    },
  });

  if (response.status !== 200) {
    return <div>Error</div>;
  }

  const companies = response.body;

  return (
    <div className="grid grid-cols-1 gap-4">
      {companies.length > 0 ? (
        companies.map((company) => (
          <Card
            key={company.id}
            className="relative overflow-hidden border-none bg-white shadow-sm transition-all duration-300 hover:shadow-md"
          >
            {company.isFeatured && (
              <div className="absolute -right-12 top-4 z-10 rotate-45 bg-gradient-to-r from-amber-500 to-orange-500 px-12 py-1 text-xs font-medium text-white">
                {t("companiesList.company.featured")}
              </div>
            )}
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="relative h-14 w-14 overflow-hidden rounded-md bg-slate-700 p-1">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-lg font-bold text-gray-700">
                    {company.translation.name.charAt(0)}
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">
                  {company.translation.name}
                </CardTitle>
                <CardDescription className="flex items-center">
                  <Briefcase className="mr-1 h-3 w-3" />
                  <span className="font-medium text-gray-600">
                    {t("companiesList.company.openPositions", {
                      num: company.positions.length,
                    })}
                  </span>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-wrap gap-2">
                {company.industries.map((industry) => (
                  <Badge
                    key={industry.id}
                    variant="secondary"
                    className="bg-slate-100 text-slate-700"
                  >
                    {industry.name}
                  </Badge>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-2 text-sm text-muted-foreground">
                <span>{company.translation.description}</span>
                <span>•</span>
                <span>{company.translation.address}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="ghost"
                className="w-full justify-between group-hover:bg-gray-50 group-hover:text-gray-700"
              >
                {t("companiesList.company.detailButton")}
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="mt-12 text-center">
          <h3 className="text-xl font-medium">No companies found</h3>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
          <Button variant="outline" className="mt-4">
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};
export default CompaniesSearchPage;
