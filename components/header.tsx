import { cn } from "@/lib/utils";
import { Josefin_Sans } from "next/font/google";

interface HeaderProps {
  label: string;
}

const font = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["600"],
});

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center">
      <h1 className={cn("text-3xl font-semibold", font.className)}>Auth</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
