import { Button } from "@/components/ui/button"
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SignUpForm } from "@/components/auth/signup-form";

export default function page() {
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
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  <FaGithub />
                  Login with GitHub
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <SignUpForm />
              <div className="text-center text-sm">
                Do you already have an account?{" "}
                <Link href="/auth" className="underline underline-offset-4">Sign in</Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
