"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const companySizes = [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];

export const FiltersSidebar = () => {
  const t = useTranslations("companies");

  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("keyword") || "";

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "createdAt");
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("order") || "asc"
  );
  const [selectedIndustries, setSelectedIndustries] = useState<number[]>(
    searchParams.get("industry")
      ? searchParams.get("industry")?.split(",").map(Number) || []
      : []
  );
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on client side
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/companies/search?keyword=${encodeURIComponent(searchTerm)}`);
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  const toggleIndustry = (industry: number) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/companies/search?keyword=${encodeURIComponent(searchTerm)}&sort=${sortBy}&order=${sortOrder}&industry=${selectedIndustries.join(
        ","
      )}&size=${selectedSizes.join(",")}&location=${selectedLocations.join(
        ","
      )}`
    );
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedSizes([]);
    setSelectedLocations([]);
    setSelectedIndustries([]);
    setSortBy("relevance");
    setSortOrder("asc");
    router.push("/companies/search");
  };

  return (
    <div className="overflow-y-auto">
      <SidebarProvider>
        <div className="container mx-auto px-0 md:px-4 flex-1">
          <div className="flex flex-col md:flex-row gap-6 h-full">
            <Sidebar
              collapsible={isMobile ? "offcanvas" : "none"}
              variant="floating"
              className="w-full"
            >
              <SidebarHeader className="p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    {t("filters.title")}
                  </h2>
                </div>
                <form
                  onSubmit={handleSearch}
                  className="mt-2 flex flex-col gap-2.5"
                >
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder={t("filters.search.placeholder")}
                      className="pl-9 h-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="h-10"
                    size="sm"
                    variant="outline"
                  >
                    {t("filters.search.button")}
                  </Button>
                </form>
              </SidebarHeader>

              <SidebarContent className="px-4">
                <form
                  onSubmit={handleApplyFilters}
                  className="mt-2 flex flex-col gap-2.5 flex-1 justify-between pb-4"
                >
                  <Accordion
                    type="multiple"
                    defaultValue={[
                      "sort",
                      "sorting_order",
                      "industry",
                      "size",
                      "location",
                    ]}
                  >
                    <AccordionItem value="sort">
                      <AccordionTrigger className="py-3 text-sm">
                        {t("filters.sort.field.title")}
                      </AccordionTrigger>
                      <AccordionContent>
                        <RadioGroup
                          value={sortBy}
                          onValueChange={setSortBy}
                          className="space-y-2"
                          defaultValue="createdAt"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="averageSalary"
                              id="averageSalary"
                            />
                            <Label htmlFor="averageSalary">
                              {t("filters.sort.field.items.1")}
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="positions" id="positions" />
                            <Label htmlFor="positions">
                              {t("filters.sort.field.items.2")}
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="createdAt" id="createdAt" />
                            <Label htmlFor="createdAt">
                              {t("filters.sort.field.items.3")}
                            </Label>
                          </div>
                        </RadioGroup>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="sorting_order">
                      <AccordionTrigger className="py-3 text-sm">
                        {t("filters.sort.order.title")}
                      </AccordionTrigger>
                      <AccordionContent>
                        <RadioGroup
                          value={sortOrder}
                          onValueChange={setSortOrder}
                          className="space-y-2"
                          defaultValue="asc"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="asc" id="asc" />
                            <Label htmlFor="asc">
                              {t("filters.sort.order.asc")}
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="desc" id="desc" />
                            <Label htmlFor="desc">
                              {t("filters.sort.order.desc")}
                            </Label>
                          </div>
                        </RadioGroup>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="industry">
                      <AccordionTrigger className="py-3 text-sm">
                        {t("filters.industry.title")}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="industry-1"
                              checked={selectedIndustries.includes(1)}
                              onCheckedChange={() => toggleIndustry(1)}
                            />
                            <Label htmlFor="industry-1">
                              {t("filters.industry.items.1")}
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="industry-2"
                              checked={selectedIndustries.includes(2)}
                              onCheckedChange={() => toggleIndustry(2)}
                            />
                            <Label htmlFor="industry-2">
                              {t("filters.industry.items.2")}
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="industry-3"
                              checked={selectedIndustries.includes(3)}
                              onCheckedChange={() => toggleIndustry(3)}
                            />
                            <Label htmlFor="industry-3">
                              {t("filters.industry.items.3")}
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="industry-4"
                              checked={selectedIndustries.includes(4)}
                              onCheckedChange={() => toggleIndustry(4)}
                            />
                            <Label htmlFor="industry-4">
                              {t("filters.industry.items.4")}
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="industry-5"
                              checked={selectedIndustries.includes(5)}
                              onCheckedChange={() => toggleIndustry(5)}
                            />
                            <Label htmlFor="industry-5">
                              {t("filters.industry.items.5")}
                            </Label>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="size">
                      <AccordionTrigger className="py-3 text-sm">
                        {t("filters.size.title")}
                        {selectedSizes.length > 0 && (
                          <Badge
                            variant="secondary"
                            className="ml-2 h-5 px-1.5 text-xs"
                          >
                            {selectedSizes.length}
                          </Badge>
                        )}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {companySizes.map((size) => (
                            <div
                              key={size.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`size-${size.id}`}
                                checked={selectedSizes.includes(size.id)}
                                onCheckedChange={() => toggleSize(size.id)}
                              />
                              <Label htmlFor={`size-${size.id}`}>
                                {t(`filters.size.items.${size.id}`)}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="location">
                      <AccordionTrigger className="py-3 text-sm">
                        {t("filters.location.title")}
                        {selectedLocations.length > 0 && (
                          <Badge
                            variant="secondary"
                            className="ml-2 h-5 px-1.5 text-xs"
                          >
                            {selectedLocations.length}
                          </Badge>
                        )}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`location-1`}
                              checked={selectedLocations.includes("1")}
                              onCheckedChange={() => toggleLocation("1")}
                            />
                            <Label htmlFor={`location-1`}>
                              {t("filters.location.items.1")}
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`location-2`}
                              checked={selectedLocations.includes("2")}
                              onCheckedChange={() => toggleLocation("2")}
                            />
                            <Label htmlFor={`location-2`}>
                              {t("filters.location.items.2")}
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`location-3`}
                              checked={selectedLocations.includes("3")}
                              onCheckedChange={() => toggleLocation("3")}
                            />
                            <Label htmlFor={`location-3`}>
                              {t("filters.location.items.3")}
                            </Label>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="flex flex-col gap-2 justify-end">
                    <Button type="submit" className="h-10">
                      {t("filters.controls.apply")}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="h-10"
                      onClick={handleClear}
                    >
                      {t("filters.controls.clear")}
                    </Button>
                  </div>
                </form>
              </SidebarContent>
            </Sidebar>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};
