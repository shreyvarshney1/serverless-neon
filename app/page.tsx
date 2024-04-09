import { Josefin_Sans } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const font = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["600"],
})

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-300 to-orange-700">
      <div className="space-y-6 text-center">
        <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md",font.className)}>
          Auth
        </h1>
        <div>
          <LoginButton>
            <Button variant="secondary" size="default" >
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
