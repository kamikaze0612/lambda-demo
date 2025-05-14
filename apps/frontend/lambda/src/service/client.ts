import { ApiFetcherArgs, initClient, tsRestFetchApi } from "@ts-rest/core";
import { contract } from "api";

import { defaultLocale, locales } from "@/i18n/routing";

export const client = initClient(contract, {
  baseUrl: "http://localhost:3001",
  api: async (args) => {
    const interceptedArgs = await requestInterceptor(args);
    const response = await tsRestFetchApi(interceptedArgs);

    return response;
  },
});

const getLocale = async () => {
  if (typeof window !== "undefined") {
    const localeFromPathname = window.location.pathname.split("/")[1];
    const locale =
      localeFromPathname &&
      locales.includes(localeFromPathname as (typeof locales)[number])
        ? localeFromPathname
        : defaultLocale;
    return locale;
  } else {
    const getLocale = (await import("next-intl/server")).getLocale;
    const locale = await getLocale();
    return locale;
  }
};

type CustomRequestHandlerArgs = ApiFetcherArgs;
const requestInterceptor = async (_args: CustomRequestHandlerArgs) => {
  const args = _args;

  const locale = await getLocale();
  args.headers["x-lang"] = locale;

  return args;
};
