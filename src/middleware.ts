import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";
import { IRedirect } from "./types/api/api.types";

function withRedirectsMiddleware(middleware: NextMiddleware) {
    return async (req: NextRequest, e: NextFetchEvent) => {
        const {
            nextUrl: { pathname },
            url,
        } = req;

        const redirect: { data: IRedirect } = await fetch(`${process.env.API}redirects/search`, {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                url: pathname,
            }),
        }).then((response) => {
            if (response.status == 404) {
                return null;
            } else if (response.status == 200) {
                return response.json();
            }
        });

        if (redirect) {
            if (pathname === redirect.data.from) {
                return NextResponse.redirect(new URL(redirect.data.to, url), {
                    status: 301,
                });
            }
        }

        return middleware(req, e);
    };
}

export default withRedirectsMiddleware(createMiddleware(routing));

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};
