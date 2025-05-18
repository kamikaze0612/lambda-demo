import { getMessages, getTranslations } from "next-intl/server";

import { FiltersSidebar } from "./_components/filters_sidebar";
import { NextIntlClientProvider } from "next-intl";

const CompaniesSearchLayout: React.Layout<{
  children: React.ReactNode;
}> = async ({ children }) => {
  const t = await getTranslations("companies");

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="grid grid-cols-[320px_1fr] w-full h-[calc(100vh-64px)] mt-16 bg-slate-50">
        <FiltersSidebar />

        <div className="flex flex-col gap-4 p-8 h- overflow-y-auto">
          <h2 className="text-2xl font-bold">{t("companiesList.title")}</h2>
          {children}
        </div>
      </div>
    </NextIntlClientProvider>
  );
};
export default CompaniesSearchLayout;
