"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown, Globe, User } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { LanguageSetter } from "./language_setter";

export const Navbar = () => {
  const t = useTranslations("navbar");

  return (
    <motion.header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 bg-white/95 shadow-md backdrop-blur-sm`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.1 }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center">
            <Image src="/logo.png" alt="Lambda" height={40} width={160} />
          </Link>

          <nav className="hidden space-x-1 lg:flex">
            <NavItem href="/" label={t("navItems.home")} />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 `}
                >
                  {t("navItems.jobs.title")}{" "}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem>
                  <Link href="/jobs/all" className="flex w-full">
                    {t("navItems.jobs.items.allJobs")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/jobs/technology" className="flex w-full">
                    {t("navItems.jobs.items.technology")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/jobs/business" className="flex w-full">
                    {t("navItems.jobs.items.business")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/jobs/media" className="flex w-full">
                    {t("navItems.jobs.items.media")}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 `}
                >
                  {t("navItems.outsourcing.title")}{" "}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem>
                  <Link
                    href="/outsourcing/how-it-works"
                    className="flex w-full"
                  >
                    {t("navItems.outsourcing.items.howItWorks")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/outsourcing/for-companies"
                    className="flex w-full"
                  >
                    {t("navItems.outsourcing.items.forCompanies")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/outsourcing/for-talents" className="flex w-full">
                    {t("navItems.outsourcing.items.forTalents")}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100`}
                >
                  {t("navItems.whatIsLambda.title")}{" "}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem>
                  <Link href="/about" className="flex w-full">
                    {t("navItems.whatIsLambda.items.about")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/how-it-works" className="flex w-full">
                    {t("navItems.whatIsLambda.items.howItWorks")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/success-stories" className="flex w-full">
                    {t("navItems.whatIsLambda.items.successStories")}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSetter />

          <Button variant="ghost" size="icon" className={`hidden sm:flex`}>
            <User className="h-5 w-5" />
          </Button>

          <Button className="hidden bg-gray-900 hover:bg-gray-700 sm:flex">
            {t("navItems.signIn")}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={`lg:hidden`}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col">
                <div className="flex items-center justify-between pb-4">
                  <Link href="/" className="flex items-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2"
                    >
                      <path
                        d="M8 8L16 0L24 8V24L16 32L8 24V8Z"
                        fill="#7C3AED"
                      />
                      <path d="M16 8L24 16L16 24L8 16L16 8Z" fill="#9F7AEA" />
                    </svg>
                    <span className="text-xl font-bold">lambda</span>
                  </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>

                <div className="flex flex-col space-y-3 py-4">
                  <Link
                    href="/"
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100"
                  >
                    {t("navItems.home")}
                  </Link>
                  <MobileAccordion title={t("navItems.jobs.title")}>
                    <Link
                      href="/jobs/all"
                      className="block px-3 py-2 hover:bg-slate-100"
                    >
                      {t("navItems.jobs.items.allJobs")}
                    </Link>
                    <Link
                      href="/jobs/technology"
                      className="block px-3 py-2 hover:bg-slate-100"
                    >
                      {t("navItems.jobs.items.technology")}
                    </Link>
                    <Link
                      href="/jobs/business"
                      className="block px-3 py-2 hover:bg-slate-100"
                    >
                      {t("navItems.jobs.items.business")}
                    </Link>
                    <Link
                      href="/jobs/media"
                      className="block px-3 py-2 hover:bg-slate-100"
                    >
                      {t("navItems.jobs.items.media")}
                    </Link>
                  </MobileAccordion>
                  <MobileAccordion title={t("navItems.outsourcing.title")}>
                    <Link
                      href="/outsourcing/how-it-works"
                      className="block px-3 py-2 hover:bg-slate-100"
                    >
                      {t("navItems.outsourcing.items.howItWorks")}
                    </Link>
                    <Link
                      href="/outsourcing/for-companies"
                      className="block px-3 py-2 hover:bg-slate-100"
                    >
                      {t("navItems.outsourcing.items.forCompanies")}
                    </Link>
                    <Link
                      href="/outsourcing/for-talents"
                      className="block px-3 py-2 hover:bg-slate-100"
                    >
                      {t("navItems.outsourcing.items.forTalents")}
                    </Link>
                  </MobileAccordion>
                  <MobileAccordion title={t("navItems.whatIsLambda.title")}>
                    <Link
                      href="/about"
                      className="block px-3 py-2 hover:bg-slate-100"
                    >
                      {t("navItems.whatIsLambda.items.about")}
                    </Link>
                    <Link
                      href="/how-it-works"
                      className="block px-3 py-2 hover:bg-slate-100"
                    >
                      {t("navItems.whatIsLambda.items.howItWorks")}
                    </Link>
                    <Link
                      href="/success-stories"
                      className="block px-3 py-2 hover:bg-slate-100"
                    >
                      {t("navItems.whatIsLambda.items.successStories")}
                    </Link>
                  </MobileAccordion>
                </div>

                <div className="mt-auto space-y-4 pt-4">
                  <Button className="w-full bg-gray-600 hover:bg-gray-700">
                    {t("navItems.signIn")}
                  </Button>
                  <div className="flex justify-center">
                    <Button variant="ghost" size="sm">
                      <Globe className="mr-2 h-4 w-4" />
                      {t("navItems.language.en")}
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className={`rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100`}
    >
      {label}
    </Link>
  );
}

function MobileAccordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="ml-4 mt-1 space-y-1 border-l border-slate-200 pl-2">
          {children}
        </div>
      )}
    </div>
  );
}
