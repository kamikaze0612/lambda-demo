"use client";

import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";

export const TopSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const t = useTranslations("companies");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/companies/search?keyword=${searchTerm}`);
  };

  return (
    <form
      className="flex overflow-hidden rounded-lg shadow-lg"
      onSubmit={handleSearch}
    >
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={t("hero.searchPlaceholder")}
        className="h-14 flex-1 border-0 bg-white/95 px-6 text-base shadow-none focus-visible:ring-0"
      />
      <Button
        className="h-14 rounded-l-none bg-gray-700 px-6 hover:bg-gray-700/90"
        type="submit"
      >
        <Search className="mr-0.5 h-5 w-5" />
        {t("hero.searchButton")}
      </Button>
    </form>
  );
};
