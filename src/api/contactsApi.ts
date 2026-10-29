import toast from "react-hot-toast";

import { ISendFeedbackParams } from "@/types/api/contacts.types";

import { fetchMutate } from "./fetch";

export const sendFeedback = async ({ body, clientLocale }: ISendFeedbackParams) => {
    return await fetchMutate({
        url: "feedback",
        body,
        method: "POST",
        tag: "Feedback",
        clientLocale,
    }).then((data: { message: string }) => {
        toast.success(data.message);
    });
};

// The same feedback endpoint, for a guest's order: the caller needs to know whether the
// request went through (a 422 also comes back with a "message"), so nothing is shown here.
export const sendOrderRequest = async ({ body, clientLocale }: ISendFeedbackParams) => {
    return await fetchMutate({
        url: "feedback",
        body,
        method: "POST",
        tag: "Feedback",
        clientLocale,
    }).then((data: { message?: string; errors?: Record<string, string[]> } | undefined) => ({
        ok: !!data && !data.errors,
        message: data?.message || "",
    }));
};
