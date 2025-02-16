"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/lib/auth-client";
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { SignInFormData, signInFormSchema } from "@/types";
import Link from "next/link";

export function LoginForm() {

    const form = useForm<SignInFormData>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: SignInFormData) {
        const { email, password } = values;
        const { data, error } = await signIn.email({
            email,
            password,
            callbackURL: "/dashboard",
            rememberMe: false,
        });
        if (error) {
            console.error(error);
            return;
        }
        console.log(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" id="email" placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center justify-between">
                                <FormLabel>Password</FormLabel>
                                <Link href={"/auth/forgot-password"} className="text-sm text-muted-foreground">
                                    Forgot password?
                                </Link>
                            </div>
                            <FormControl>
                                <Input type="password" id="password" placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
