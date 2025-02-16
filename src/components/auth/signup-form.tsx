"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/lib/auth-client";
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { SignUpFormData, signUpFormSchema } from "@/types";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignUpForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const form = useForm<SignUpFormData>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });


    async function onSubmit(values: SignUpFormData) {
        const { name, email, password } = values;
        const { data, error } = await signUp.email({
            email,
            password,
            name,
            callbackURL: "/auth"
        }, {
            onRequest: (request) => {
                // console.log(request);
                setLoading(true);
            },
            onSuccess: (response) => {
                // console.log(response);
                alert("Sign up successful");
                setLoading(false);
                router.push("/auth");
            }, onError: (error) => {
                setLoading(false);
                alert(error.error.message);
            },
        })
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full name</FormLabel>
                            <FormControl>
                                <Input type="text" id="name" placeholder="Full name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" id="password" placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={loading}>{loading ? "Loading..." : "Submit"}</Button>
            </form>
        </Form>
    )
}
