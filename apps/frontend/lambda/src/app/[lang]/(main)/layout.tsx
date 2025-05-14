import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";

import { Navbar } from "@/components/navbar";
import { routing } from "@/i18n/routing";
import "../../globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "mn" | "en" }>;
}) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });

  return {
    title: {
      template: `%s${t("layout.title")}`,
      default: t("layout.title"),
    },
    description: t("layout.description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const messages = await getMessages();

  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
