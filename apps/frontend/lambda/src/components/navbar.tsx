"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ChevronDown, Globe, User } from "lucide-react";

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

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  return (
    <motion.header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 shadow-md backdrop-blur-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M8 8L16 0L24 8V24L16 32L8 24V8Z"
                  fill={isScrolled ? "#7C3AED" : "#FFFFFF"}
                />
                <path
                  d="M16 8L24 16L16 24L8 16L16 8Z"
                  fill={isScrolled ? "#9F7AEA" : "#E9D5FF"}
                />
              </svg>
            </motion.div>
            <span
              className={`text-xl font-bold ${isScrolled ? "text-slate-900" : "text-white"}`}
            >
              lambda
            </span>
          </Link>

          <nav className="hidden space-x-1 lg:flex">
            <NavItem href="/" label="Home" isScrolled={isScrolled} />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    isScrolled
                      ? "text-slate-700 hover:bg-slate-100"
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  Jobs <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem>
                  <Link href="/jobs/all" className="flex w-full">
                    All Jobs
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/jobs/technology" className="flex w-full">
                    Technology
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/jobs/business" className="flex w-full">
                    Business
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/jobs/media" className="flex w-full">
                    Media
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    isScrolled
                      ? "text-slate-700 hover:bg-slate-100"
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  Outsourcing <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem>
                  <Link
                    href="/outsourcing/how-it-works"
                    className="flex w-full"
                  >
                    How It Works
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/outsourcing/for-companies"
                    className="flex w-full"
                  >
                    For Companies
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/outsourcing/for-talents" className="flex w-full">
                    For Talents
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    isScrolled
                      ? "text-slate-700 hover:bg-slate-100"
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  What is Lambda? <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem>
                  <Link href="/about" className="flex w-full">
                    About Us
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/how-it-works" className="flex w-full">
                    How It Works
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/success-stories" className="flex w-full">
                    Success Stories
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={isScrolled ? "" : "text-white"}
              >
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Монгол</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className={`hidden sm:flex ${isScrolled ? "" : "text-white"}`}
          >
            <User className="h-5 w-5" />
          </Button>

          <Button className="hidden bg-gray-600 hover:bg-gray-700 sm:flex">
            Sign In
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`lg:hidden ${isScrolled ? "" : "text-white"}`}
              >
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
                    Home
                  </Link>
                  <MobileAccordion title="Jobs">
                    <Link
                      href="/jobs/all"
                      className="block px-3 py-2 hover:bg-slate-100"
                    >
                      All Jobs
                    </Link>
                    <Link
                      href="/jobs/technology"
                      className="block px-3 py-2 hover:bg-slate-100"
                    >
                      Technology
                    </Link>
                    <Link
                      href="/jobs/business"
                      className="block px-3 py-2 hover:bg-slate-100"
                    >
                      Business
                    </Link>
                    <Link
                      href="/jobs/media"
                      className="block px-3 py-2 hover:bg-slate-100"
                    >
                      Media
                    </Link>
                  </MobileAccordion>
                  <MobileAccordion title="Outsourcing">
                    <Link
                      href="/outsourcing/how-it-works"
                      className="block px-3 py-2 hover:bg-slate-100"
                    >
                      How It Works
                    </Link>
                    <Link
                      href="/outsourcing/for-companies"
                      className="block px-3 py-2 hover:bg-slate-100"
                    >
                      For Companies
                    </Link>
                    <Link
                      href="/outsourcing/for-talents"
                      className="block px-3 py-2 hover:bg-slate-100"
                    >
                      For Talents
                    </Link>
                  </MobileAccordion>
                  <MobileAccordion title="What is Lambda?">
                    <Link
                      href="/about"
                      className="block px-3 py-2 hover:bg-slate-100"
                    >
                      About Us
                    </Link>
                    <Link
                      href="/how-it-works"
                      className="block px-3 py-2 hover:bg-slate-100"
                    >
                      How It Works
                    </Link>
                    <Link
                      href="/success-stories"
                      className="block px-3 py-2 hover:bg-slate-100"
                    >
                      Success Stories
                    </Link>
                  </MobileAccordion>
                </div>

                <div className="mt-auto space-y-4 pt-4">
                  <Button className="w-full bg-gray-600 hover:bg-gray-700">
                    Sign In
                  </Button>
                  <div className="flex justify-center">
                    <Button variant="ghost" size="sm">
                      <Globe className="mr-2 h-4 w-4" />
                      English
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
}

function NavItem({
  href,
  label,
  isScrolled,
}: {
  href: string;
  label: string;
  isScrolled: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-md px-3 py-2 text-sm font-medium ${
        isScrolled
          ? "text-slate-700 hover:bg-slate-100"
          : "text-white/90 hover:bg-white/10"
      }`}
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
