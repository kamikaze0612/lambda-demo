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

const stats = [
  { label: "Active Companies", value: "500+", icon: Building },
  { label: "Open Positions", value: "1,200+", icon: Briefcase },
  { label: "Talents Hired", value: "10,000+", icon: Users },
  { label: "Success Rate", value: "94%", icon: TrendingUp },
];

const HomePage = async () => {
  const response = await client.companies.getCompanies({ query: undefined });

  if (response.status !== 200) {
    return null;
  }

  const data = response.body;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>

        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Find Your Perfect <span className="text-slate-300">Match</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-200">
            Connect with top companies and talents. Whether you&apos;re hiring
            or looking for your next opportunity, Lambda makes it simple.
          </p>

          <div className="relative mx-auto max-w-2xl">
            <div className="flex overflow-hidden rounded-lg shadow-lg">
              <Input
                type="text"
                placeholder="Search with cyrillic and latin characters... Example: Unitel, Юнител"
                className="h-14 flex-1 border-0 bg-white/95 px-6 text-base shadow-none focus-visible:ring-0"
              />
              <Button className="h-14 rounded-l-none bg-gray-700 px-6 hover:bg-gray-700/90">
                <Search className="mr-0.5 h-5 w-5" />
                Search
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
        <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h2 className="text-2xl font-bold text-gray-600 tracking-tight">
            Discover <span className="text-gray-900">Top Companies</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((company) => (
            <div key={company.id} className="group">
              <Card className="relative h-full overflow-hidden border-none bg-white shadow-md transition-all duration-300 hover:shadow-lg">
                {/* {company.featured && (
                  <div className="absolute -right-12 top-4 z-10 rotate-45 bg-gradient-to-r from-amber-500 to-orange-500 px-12 py-1 text-xs font-medium text-white">
                    Rising Star
                  </div>
                )} */}
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
                        {company.positions.length} open positions
                      </span>
                    </CardDescription>
                  </div>
                </CardHeader>
                {/* <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-2">
                    {company.industries.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-slate-100 text-slate-700"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent> */}
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
                      View Positions
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

        {data.length === 0 && (
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
      </section>

      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Ready to Find Your Perfect Match?
              </h2>
              <p className="mb-8 text-slate-300">
                Join over 10,000 professionals who found their dream job through
                Lambda
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" className="bg-gray-700 hover:bg-gray-700/90">
                  For Job Seekers
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-500 text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                >
                  For Employers
                </Button>
              </div>
              <p className="mt-6 text-sm text-slate-400">
                <span className="inline-flex items-center">
                  <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                  100 users online now
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
