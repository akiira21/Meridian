"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/auth-store";
import Navbar from "@/components/navbar";
import Logo from "@/components/logo";
import BentoGrid from "@/components/ui/bento-grid";
import {
  Droplets,
  Check,
  Bell,
  Calendar,
  Star,
  Target,
  Zap,
  BarChart3,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative px-6 pt-24 pb-28 md:pt-32 md:pb-36 overflow-hidden">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-muted/60 to-transparent rounded-full blur-3xl" />
          </div>
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted font-body text-xs text-muted-foreground mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Now in early access
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-medium tracking-tight max-w-4xl leading-[1.1]">
              Stay organized, hydrated, and focused
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-2xl">
              A calm space for your todos, reminders, events, and mindful
              moments. Everything you need, nothing you don&apos;t.
            </p>
            <div className="mt-10 flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-foreground text-background rounded-full font-body text-sm font-medium hover:opacity-80 transition-opacity"
                  >
                    Open dashboard
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/todos"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-muted text-foreground rounded-full font-body text-sm font-medium hover:bg-muted/80 transition-colors"
                  >
                    View todos
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/signup"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-foreground text-background rounded-full font-body text-sm font-medium hover:opacity-80 transition-opacity"
                  >
                    Get started
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-muted text-foreground rounded-full font-body text-sm font-medium hover:bg-muted/80 transition-colors"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 py-28 md:py-36 border-t border-border">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl mb-16 md:mb-20">
              <h2 className="font-heading text-3xl md:text-4xl font-medium tracking-tight">
                Everything in one place
              </h2>
              <p className="mt-4 text-muted-foreground font-body text-lg leading-relaxed">
                Six simple modules designed to help you stay on top of your day
                without the overwhelm.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={Droplets}
                title="Water Tracker"
                description="Track daily hydration with simple check-ins and gentle reminders."
              />
              <FeatureCard
                icon={Check}
                title="Todos"
                description="Organize tasks by priority. Done is better than perfect."
              />
              <FeatureCard
                icon={Bell}
                title="Reminders"
                description="Never miss what matters. Time-based and repeat alerts."
              />
              <FeatureCard
                icon={Calendar}
                title="Events"
                description="Plan your week with a clean calendar view that stays out of your way."
              />
              <FeatureCard
                icon={Star}
                title="Notes"
                description="Quick thoughts, saved instantly. Pin what matters most."
              />
              <FeatureCard
                icon={Zap}
                title="Food Scan"
                description="Snap a photo, identify food, and get calorie info instantly."
              />
            </div>
          </div>
        </section>

        {/* Logged-in user dashboard preview */}
        {isAuthenticated && (
          <section className="px-6 py-28 md:py-36 border-t border-border bg-muted/30">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-medium tracking-tight mb-5">
                Welcome back
              </h2>
              <p className="text-muted-foreground font-body text-lg mb-10">
                Continue where you left off. Your todos and stats are waiting.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-foreground text-background rounded-full font-body text-sm font-medium hover:opacity-80 transition-opacity"
                >
                  <Check size={16} />
                  Open dashboard
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Bento preview */}
        <section className="px-6 py-28 md:py-36 border-t border-border">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl mb-16 md:mb-20">
              <h2 className="font-heading text-3xl md:text-4xl font-medium tracking-tight">
                Designed for clarity
              </h2>
              <p className="mt-4 text-muted-foreground font-body text-lg leading-relaxed">
                A calm, minimal interface that respects your attention.
              </p>
            </div>
            <BentoGrid
              variant="2-2"
              items={[
                {
                  icon: Target,
                  title: "Daily Goals",
                  description: "Set and achieve your personal targets every single day.",
                },
                {
                  icon: BarChart3,
                  title: "Insights",
                  description: "See patterns in your productivity and wellness over time.",
                },
                {
                  icon: Zap,
                  title: "Focus",
                  description: "Deep work timer with ambient sounds to stay in the zone.",
                },
                {
                  icon: Star,
                  title: "Quick Notes",
                  description: "Capture ideas instantly without switching apps.",
                },
              ]}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-28 md:py-36 border-t border-border">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-medium tracking-tight">
              Ready to find your center?
            </h2>
            <p className="mt-5 text-muted-foreground font-body text-lg">
              Join thousands of people who use Meridian to stay calm and
              productive.
            </p>
            <div className="mt-10">
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-foreground text-background rounded-full font-body text-sm font-medium hover:opacity-80 transition-opacity"
                >
                  Open dashboard
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-foreground text-background rounded-full font-body text-sm font-medium hover:opacity-80 transition-opacity"
                >
                  Create free account
                  <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-20 md:py-28 border-t border-border bg-muted/30 min-h-[50vh] flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-20">
            <div className="lg:col-span-2">
              <Logo size="md" href="/" />
              <p className="mt-6 text-muted-foreground font-body max-w-sm leading-relaxed">
                A calm space for your todos, reminders, events, and mindful moments.
              </p>
              <div className="flex items-center gap-3 mt-8">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border hover:border-foreground/20 transition-colors"
                  aria-label="Twitter"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border hover:border-foreground/20 transition-colors"
                  aria-label="GitHub"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-heading text-sm font-medium tracking-tight mb-5">
                Product
              </h4>
              <ul className="space-y-4 font-body text-sm text-muted-foreground">
                <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
                <li><Link href="/todos" className="hover:text-foreground transition-colors">Todos</Link></li>
                <li><Link href="/water" className="hover:text-foreground transition-colors">Water</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-sm font-medium tracking-tight mb-5">
                Company
              </h4>
              <ul className="space-y-4 font-body text-sm text-muted-foreground">
                <li><Link href="/login" className="hover:text-foreground transition-colors">Sign in</Link></li>
                <li><Link href="/signup" className="hover:text-foreground transition-colors">Get started</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground font-body">
              © {new Date().getFullYear()} Meridian. Built with care.
            </p>
            <p className="text-xs text-muted-foreground font-body">
              Next.js · Tailwind CSS · Radix UI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="p-7 bg-card border border-border rounded-2xl hover:border-foreground/20 transition-colors">
      <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center mb-5">
        <Icon size={18} className="text-foreground" />
      </div>
      <h4 className="font-heading text-lg font-medium tracking-tight">
        {title}
      </h4>
      <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">
        {description}
      </p>
    </div>
  );
}
