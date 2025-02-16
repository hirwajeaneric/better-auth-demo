import { Button } from "@/components/ui/button"
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "@/components/auth/login-form"
import { signIn } from "@/lib/auth-client";

export default async function page() {
  const SignInWithGithub = async () => {
    await signIn.social({
      /**
       * The social provider id
       * @example "github", "google", "apple"
       */
      provider: "github",
      /**
       * a url to redirect after the user authenticates with the provider
       * @default "/"
       */
      callbackURL: "/dashboard",
      /**
       * a url to redirect if an error occurs during the sign in process
       */
      errorCallbackURL: "/auth",
      /**
       * a url to redirect if the user is newly registered
       */
      newUserCallbackURL: "/dashboard",
      /**
       * disable the automatic redirect to the provider. 
       * @default false
       */
      disableRedirect: true,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back to BetterAuth Demo</CardTitle>
          <CardDescription>
            Login with your GitHub Account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="grid gap-6">
              <form onSubmit={SignInWithGithub} className="flex flex-col gap-4">
                <Button type="submit" variant="outline" className="w-full">
                  <FaGithub />
                  Login with GitHub
                </Button>
              </form>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <LoginForm />
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/auth/sign-up" className="underline underline-offset-4">Sign up</Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
