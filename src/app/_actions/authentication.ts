import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const displaySessionData = async () => {
    "use server";
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    console.log(session);
};