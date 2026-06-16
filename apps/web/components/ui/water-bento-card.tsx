"use client";

import { Droplets } from "lucide-react";

interface WaterBentoCardProps {
  percentage: number;
  consumed_ml: number;
  goal_ml: number;
  remaining_ml?: number;
  className?: string;
}

export default function WaterBentoCard({
  percentage,
  consumed_ml,
  goal_ml,
  remaining_ml,
  className = "",
}: WaterBentoCardProps) {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  const isGoalReached = clampedPercentage >= 100;

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-card border border-border h-full ${className}`}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="water-dots"
              x="0"
              y="0"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#water-dots)" />
        </svg>
      </div>

      {/* Water fill */}
      <div
        className="absolute left-0 right-0 bottom-0 bg-blue-500/90 transition-[height] duration-1000 ease-out"
        style={{ height: `${clampedPercentage}%` }}
      >
        {/* Animated wave layers */}
        <div className="absolute -top-6 left-[-20%] right-[-20%] h-8">
          <svg
            className="absolute bottom-0 w-[140%] h-8 animate-wave-slow"
            viewBox="0 0 1440 48"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,24 C120,36 240,12 360,24 C480,36 600,12 720,24 C840,36 960,12 1080,24 C1200,36 1320,12 1440,24 L1440,48 L0,48 Z"
              fill="currentColor"
              className="text-blue-500/90"
            />
          </svg>
        </div>
        <div className="absolute -top-5 left-[-20%] right-[-20%] h-7">
          <svg
            className="absolute bottom-0 w-[140%] h-7 animate-wave-fast"
            viewBox="0 0 1440 48"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,28 C180,16 360,40 540,28 C720,16 900,40 1080,28 C1260,16 1350,36 1440,28 L1440,48 L0,48 Z"
              fill="currentColor"
              className="text-blue-400/60"
            />
          </svg>
        </div>

        {/* Inner shine */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-8">
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-xl bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center">
            <Droplets size={20} className="text-blue-500" />
          </div>
          {isGoalReached && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-background/80 backdrop-blur-sm border border-border rounded-full font-body text-xs font-medium text-foreground">
              Goal reached
            </span>
          )}
        </div>

        <div>
          <div className="font-heading text-5xl md:text-6xl font-medium tracking-tight">
            {clampedPercentage}%
          </div>
          <p className="mt-2 font-body text-sm text-muted-foreground">
            {consumed_ml} of {goal_ml} ml
          </p>
          {remaining_ml !== undefined && remaining_ml > 0 && (
            <p className="mt-1 font-body text-xs text-muted-foreground">
              {remaining_ml} ml to go
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
