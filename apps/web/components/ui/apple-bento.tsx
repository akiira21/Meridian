import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface AppleBentoItem {
  icon?: LucideIcon;
  title: string;
  description?: string;
  image?: string;
  badge?: string;
  className?: string;
  size: "large" | "tall" | "small";
  variant?: "image" | "text" | "glass" | "custom";
  children?: React.ReactNode;
  href?: string;
}

interface AppleBentoProps {
  items: AppleBentoItem[];
}

export default function AppleBento({ items }: AppleBentoProps) {
  const large = items.filter((i) => i.size === "large");
  const tall = items.filter((i) => i.size === "tall");
  const small = items.filter((i) => i.size === "small");

  return (
    <div className="grid gap-4 md:grid-cols-2 max-w-3xl items-stretch">
      {/* Left column: Large cards */}
      <div className="flex flex-col gap-4 h-full">
        {large.map((item, i) => (
          <AppleBentoCard key={`l-${i}`} item={item} />
        ))}
      </div>

      {/* Right column: Tall + Small stacked */}
      <div className="flex flex-col gap-4 h-full">
        {tall.map((item, i) => (
          <AppleBentoCard key={`t-${i}`} item={item} />
        ))}
        {small.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {small.map((item, i) => (
              <AppleBentoCard key={`s-${i}`} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AppleBentoCard({ item }: { item: AppleBentoItem }) {
  const Icon = item.icon;

  if (item.variant === "custom" && item.children) {
    const className = `relative overflow-hidden rounded-3xl ${
      item.size === "large"
        ? "h-full min-h-80 md:min-h-96"
        : item.size === "tall"
        ? "h-48 md:h-56"
        : "h-44"
    } ${item.className || ""}`;

    if (item.href) {
      return (
        <Link href={item.href} className={`${className} block`}>
          {item.children}
        </Link>
      );
    }

    return <div className={className}>{item.children}</div>;
  }

  if (item.variant === "image" && item.image) {
    return (
      <div
        className={`relative overflow-hidden rounded-3xl bg-card border border-border group ${
          item.size === "large"
            ? "h-full min-h-80 md:min-h-96"
            : item.size === "tall"
            ? "h-48 md:h-56"
            : "h-44"
        } ${item.className || ""}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {item.badge && (
            <span className="inline-block mb-2 px-2.5 py-0.5 bg-background/20 backdrop-blur-md rounded-full font-body text-[10px] font-medium text-background uppercase tracking-wider">
              {item.badge}
            </span>
          )}
          <h3 className="font-heading text-xl md:text-2xl font-medium tracking-tight text-background">
            {item.title}
          </h3>
          {item.description && (
            <p className="mt-1 font-body text-sm text-background/80 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (item.variant === "glass") {
    const content = (
      <>
        {item.badge && (
          <span className="inline-block mb-3 px-2.5 py-0.5 bg-foreground/10 rounded-full font-body text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            {item.badge}
          </span>
        )}
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center mb-4">
            <Icon size={20} className="text-foreground" />
          </div>
        )}
        <h3 className="font-heading text-lg md:text-xl font-medium tracking-tight">
          {item.title}
        </h3>
        {item.description && (
          <p className="mt-2 font-body text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        )}
      </>
    );

    const className = `relative overflow-hidden rounded-3xl bg-muted/50 border border-border/50 backdrop-blur-sm p-6 ${
      item.size === "large"
        ? "h-full min-h-80 md:min-h-96"
        : item.size === "tall"
        ? "h-48 md:h-56"
        : "h-44"
    } ${item.className || ""}`;

    if (item.href) {
      return (
        <Link href={item.href} className={`${className} hover:border-foreground/30 transition-colors block`}>
          {content}
        </Link>
      );
    }

    return <div className={className}>{content}</div>;
  }

  // Default text variant
  const isSmall = item.size === "small";

  const textContent = (
    <>
      <div className="flex-1 min-h-0">
        {item.badge && (
          <span className="inline-block mb-3 px-2.5 py-0.5 bg-muted rounded-full font-body text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            {item.badge}
          </span>
        )}
        {Icon && (
          <div
            className={`rounded-2xl bg-foreground/5 flex items-center justify-center mb-4 ${
              isSmall ? "w-9 h-9" : "w-11 h-11"
            }`}
          >
            <Icon size={isSmall ? 18 : 22} className="text-foreground" />
          </div>
        )}
        <h3
          className={`font-heading font-medium tracking-tight ${
            isSmall ? "text-lg" : "text-xl md:text-2xl"
          }`}
        >
          {item.title}
        </h3>
      </div>
      {item.description && (
        <p className="mt-2 font-body text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {item.description}
        </p>
      )}
    </>
  );

  const textClassName = `relative overflow-hidden rounded-3xl bg-card border border-border p-5 hover:border-foreground/20 transition-colors group ${
    item.size === "large"
      ? "h-full min-h-80 md:min-h-96 flex flex-col justify-between"
      : item.size === "tall"
      ? "h-48 md:h-56 flex flex-col justify-between"
      : "h-44 flex flex-col justify-between"
  } ${item.className || ""}`;

  if (item.href) {
    return (
      <Link href={item.href} className={`${textClassName} block`}>
        {textContent}
      </Link>
    );
  }

  return <div className={textClassName}>{textContent}</div>;
}
