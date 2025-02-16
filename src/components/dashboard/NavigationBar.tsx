"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { signOut } from "@/lib/auth-client";

export default function NavigationBar({ email }: { email: string | undefined }) {
    const router = useRouter();
    const handleLogout = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login"); // redirect to login page
                },
            },
        });

    };
    return (
        <nav className="flex gap-4 w-full bg-slate-400 p-4">
            <Link href="/dashboard">Overview</Link>
            <Link href="/dashboard/messages">Messages</Link>
            <span>{email}</span>
            <form onSubmit={handleLogout}>
                <Button type="submit">Log out</Button>
            </form>
        </nav>
    )
}