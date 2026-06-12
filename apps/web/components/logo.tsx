import Link from "next/link";
import { Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  showText?: boolean;
}

export default function Logo({
  size = "md",
  href = "/",
  className,
  showText = true,
}: LogoProps) {
  const sizes = {
    sm: {
      icon: 12,
      iconBox: "w-6 h-6 rounded-md",
      text: "text-sm",
    },
    md: {
      icon: 16,
      iconBox: "w-8 h-8 rounded-lg",
      text: "text-lg",
    },
    lg: {
      icon: 18,
      iconBox: "w-9 h-9 sm:w-10 sm:h-10 rounded-xl",
      text: "text-lg sm:text-xl",
    },
  };

  const s = sizes[size];

  const content = (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "bg-foreground flex items-center justify-center shrink-0",
          s.iconBox
        )}
      >
        <Droplets size={s.icon} className="text-background" />
      </div>
      {showText && (
        <span className={cn("font-heading font-semibold tracking-tight", s.text)}>
          Meridian
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
