import {
  Search,
  ChevronRight,
  Briefcase,
  Building,
  Users,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { client } from "@/service/client";
import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";
import { Footer } from "@/components/footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HomePage = async () => {
  const t = await getTranslations("companies");

  const response = await client.companies.getCompanies({
    query: undefined,
  });

  if (response.status !== 200) {
    return null;
  }

  const stats = [
    { label: t("stats.activeCompanies"), value: "500+", icon: Building },
    { label: t("stats.openPositions"), value: "1,200+", icon: Briefcase },
    { label: t("stats.hired"), value: "10,000+", icon: Users },
    { label: t("stats.successRate"), value: "94%", icon: TrendingUp },
  ];

  const data = response.body;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-950 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>

        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            {t("hero.title.regular")}{" "}
            <span className="text-slate-300">{t("hero.title.highlight")}</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-200">
            {t("hero.description")}
          </p>

          <div className="relative mx-auto max-w-2xl">
            <div className="flex overflow-hidden rounded-lg shadow-lg">
              <Input
                type="text"
                placeholder={t("hero.searchPlaceholder")}
                className="h-14 flex-1 border-0 bg-white/95 px-6 text-base shadow-none focus-visible:ring-0"
              />
              <Button className="h-14 rounded-l-none bg-gray-700 px-6 hover:bg-gray-700/90">
                <Search className="mr-0.5 h-5 w-5" />
                {t("hero.searchButton")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto -mt-10 px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <Card className="border-none bg-white/80 shadow-md backdrop-blur">
                <CardContent className="flex items-center p-6">
                  <div className="mr-4 rounded-full bg-gray-200 p-3 text-gray-800">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between ">
          <h2 className="text-2xl font-bold text-gray-600 tracking-tight">
            {t("companiesList.title.discover")}{" "}
            <span className="text-gray-900">
              {t("companiesList.title.highlight")}
            </span>
          </h2>

          <div className="flex gap-3 items-center">
            <Select>
              <SelectTrigger className="bg-white w-[200px]">
                <SelectValue
                  placeholder={t("companiesList.filter.placeholder")}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">
                  {t("companiesList.filter.items.1")}
                </SelectItem>
                <SelectItem value="2">
                  {t("companiesList.filter.items.2")}
                </SelectItem>
                <SelectItem value="3">
                  {t("companiesList.filter.items.3")}
                </SelectItem>
                <SelectItem value="4">
                  {t("companiesList.filter.items.4")}
                </SelectItem>
                <SelectItem value="5">
                  {t("companiesList.filter.items.5")}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="bg-white w-[200px]">
                <SelectValue
                  placeholder={t("companiesList.sort.positions.placeholder")}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">
                  {t("companiesList.sort.positions.items.1")}
                </SelectItem>
                <SelectItem value="2">
                  {t("companiesList.sort.positions.items.2")}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="bg-white w-[200px]">
                <SelectValue
                  placeholder={t(
                    "companiesList.sort.averageSalary.placeholder"
                  )}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">
                  {t("companiesList.sort.averageSalary.items.1")}
                </SelectItem>
                <SelectItem value="2">
                  {t("companiesList.sort.averageSalary.items.2")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((company) => (
            <div key={company.id} className="group">
              <Card className="relative h-full overflow-hidden border-none bg-white shadow-md transition-all duration-300 hover:shadow-lg">
                {company.isFeatured && (
                  <div className="absolute -right-12 top-4 z-10 rotate-45 bg-gradient-to-r from-amber-500 to-orange-500 px-12 py-1 text-xs font-medium text-white">
                    {t("companiesList.company.featured")}
                  </div>
                )}
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="relative h-14 w-14 overflow-hidden rounded-md bg-slate-700 p-1">
                    <div className="flex h-full w-full items-center justify-center">
                      {/* Placeholder for company logo */}
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
                      <span className="font-medium text-gray-500">
                        {t("companiesList.company.openPositions", {
                          num: company.positions.length,
                        })}
                      </span>
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="text-sm text-gray-500">
                    {company.translation.description}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-col gap-2 w-full">
                    <Button
                      variant="ghost"
                      className="w-full justify-between group-hover:bg-gray-50 group-hover:text-gray-600"
                    >
                      {t("companiesList.company.detailButton")}
                      <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                    <div className="flex flex-wrap gap-2 justify-end w-full">
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
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
