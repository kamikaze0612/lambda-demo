"use client";

import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, usePathname } from "@/i18n/navigation";

import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";

export const LanguageSetter: React.FC = () => {
  const t = useTranslations("navbar");

  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`text-slate-700 hover:bg-slate-100`}
        >
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link
            href={{
              pathname,
              query: Object.fromEntries(searchParams.entries()),
            }}
            locale="en"
          >
            {t("navItems.language.en")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={{
              pathname,
              query: Object.fromEntries(searchParams.entries()),
            }}
            locale="mn"
          >
            {t("navItems.language.mn")}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
