/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { signOut, useSession } from "@/lib/auth-client";

/**
 * NavigationBar component renders a navigation bar with links to different dashboard pages.
 * It displays the user's name and email if the session is available.
 * Provides a logout button which, when clicked, signs the user out and redirects to the login page.
 * Displays a loading indicator when the session data is being fetched.
 */

export default function NavigationBar() {
    const router = useRouter();

    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = useSession()

    const handleLogout = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login"); // redirect to login page
                },
            },
        });
    };
    
    return (
        <>
            {isPending ?
                <>Loading...</> :
                <nav className="flex gap-4 w-full bg-slate-400 p-4">
                    <Link href="/dashboard">Overview</Link>
                    <Link href="/dashboard/messages">Messages</Link>
                    <span>{session?.user?.name}</span>
                    <span>{session?.user?.email}</span>
                    <form onSubmit={handleLogout}>
                        <Button type="submit">Log out</Button>
                    </form>
                </nav>}
        </>
    )
}