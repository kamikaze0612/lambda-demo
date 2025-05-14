import { getTranslations } from "next-intl/server";

import { Button } from "./ui/button";

export const Footer = async () => {
  const t = await getTranslations("footer");

  return (
    <section className="bg-gray-950 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              {t("title")}
            </h2>
            <p className="mb-8 text-slate-300">{t("description")}</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-gray-700 hover:bg-gray-700/90">
                {t("buttons.forJobSeekers")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-500 text-gray-900 hover:bg-gray-100 hover:text-gray-800"
              >
                {t("buttons.forEmployers")}
              </Button>
            </div>
            <p className="mt-6 text-sm text-slate-400">
              <span className="inline-flex items-center">
                <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                {t("usersOnline")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
