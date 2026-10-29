import { IFetchGetParams, IFetchMutateParams } from "@/types/api/api.types";
import { getLocaleTs } from "@/utils/getLocaleTs";
import { deleteCookie } from "cookies-next";

const API_URL = process.env.API;

export const fetchMutate = async ({
    body,
    url,
    tag,
    method,
    token,
    contentType = "application/json",
    clientLocale,
}: IFetchMutateParams) => {
    const locale = clientLocale ? clientLocale : await getLocaleTs();
    return await fetch(`${API_URL}${url}`, {
        method: method,
        next: { tags: [tag] },
        cache: "no-cache",
        body: JSON.stringify(body),
        headers: token
            ? {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": contentType,
                  Accept: "application/json",
                  "Accept-Language": locale,
              }
            : {
                  "Content-Type": contentType,
                  Accept: "application/json",
                  "Accept-Language": locale,
              },
    })
        .then((response) => {
            if (response.status == 429) {
                // toast.error("Слишком много запросов");
                console.error("Too many requests");
                return;
            }

            return response.json();
        })
        .catch((err) => {
            throw err;
        });
};

// A network failure (DNS "EAI_AGAIN", a dropped connection) is retried a couple of times:
// while pages are prerendered at build the server sends many requests to the API at once
// and its resolver can answer "try again", which used to fail the whole build.
const fetchWithRetry = async (input: string, init: RequestInit, tries = 3): Promise<Response> => {
    for (let attempt = 1; ; attempt++) {
        try {
            return await fetch(input, init);
        } catch (err) {
            if (attempt >= tries) throw err;
            await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
        }
    }
};

export const fetchGET = async ({ url, tag, token, clientLocale, revalidate }: IFetchGetParams) => {
    const locale = clientLocale ? clientLocale : await getLocaleTs();

    return await fetchWithRetry(`${API_URL}${url}`, {
        ...(revalidate ? { next: { tags: [tag], revalidate } } : { next: { tags: [tag] }, cache: "no-cache" }),
        headers: token
            ? {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  "Accept-Language": locale,
              }
            : {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  "Accept-Language": locale,
              },
    })
        .then((response) => {
            if (response.status == 429) {
                // toast.error("Слишком много запросов");
                console.error("Too many requests");
                return;
            } else if (response.status == 401) {
                deleteCookie("token");
                if (window && window.location) window.location.reload();
                return;
            }
            return response.json();
        })
        .catch((err) => {
            throw err;
        });
};
