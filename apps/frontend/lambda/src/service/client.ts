import { initClient } from "@ts-rest/core";
import { contract } from "api";

export const client = initClient(contract, {
  baseUrl: "http://localhost:3001",
  baseHeaders: {
    "x-lang": "en",
  },
});
