import type { FC, PropsWithChildren } from "react";

import type { MetadataRoute } from "next";

import Locale from "@/i18n/routing";

type PayloadActionState =
  | {
      message: string;
      success: false;
    }
  | {
      success: true;
    };

declare module "react" {
  export declare type FCC<P = {}> = FC<PropsWithChildren<P>>;
  export declare type Page<
    P = {},
    SP = { [key: string]: string | string[] | undefined },
  > = FC<RouterParams<P, SP>>;
  export declare type Layout<P = {}> = FCC<RouterParams<P>>;
  export declare type ServerActionOld<
    State = FormStateOld | undefined,
    Payload = FormData,
  > = (state: Awaited<State>, payload: Payload) => State | Promise<State>;
  export declare type ServerAction<
    State = FormState | undefined,
    Payload = FormData,
  > = (state: Awaited<State>, payload: Payload) => State | Promise<State>;
  export declare type ServerActionBound<
    BoundParams,
    State = FormState | undefined,
    Payload = FormData,
  > = (
    boundParams: BoundParams,
    state: Awaited<State>,
    payload: Payload
  ) => State | Promise<State>;
  export declare type PayloadServerAction<
    Payload,
    State = PayloadActionState | undefined,
  > = (payload: Payload) => State | Promise<State>;
  export declare type PayloadServerActionBound<
    BoundParams,
    Payload,
    State = PayloadActionState | undefined,
  > = (boundParams: BoundParams, payload: Payload) => State | Promise<State>;
  export declare type Sitemap<P = {}> = (
    props: P
  ) => Promise<MetadataRoute.Sitemap>;
}

declare type RouterParams<P, SP> = {
  params: Promise<
    P & {
      locale: Locale;
    }
  >;
  searchParams: Promise<SP>;
};
