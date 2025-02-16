import { createAuthClient } from "better-auth/react";
export const { signIn, signUp, useSession, signOut } = createAuthClient({
    baseURL: "https://better-auth-demo.netlify.app/",
});