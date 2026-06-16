"use client";

import { Minus, Plus } from "lucide-react";

interface NumberStepperProps {
  value: number | null;
  onChange: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  unit?: string;
  className?: string;
}

export default function NumberStepper({
  value,
  onChange,
  min = 0,
  max = 99999,
  step = 1,
  placeholder = "0",
  unit,
  className = "",
}: NumberStepperProps) {
  function clamp(val: number) {
    if (val < min) return min;
    if (val > max) return max;
    return val;
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    if (raw === "") {
      onChange(null);
      return;
    }
    const parsed = parseInt(raw, 10);
    if (isNaN(parsed)) return;
    onChange(clamp(parsed));
  }

  function decrement() {
    onChange(clamp((value ?? 0) - step));
  }

  function increment() {
    onChange(clamp((value ?? 0) + step));
  }

  return (
    <div
      className={`inline-flex items-center gap-2 bg-muted rounded-full px-2 py-1 ${className}`}
    >
      <button
        type="button"
        onClick={decrement}
        disabled={(value ?? 0) <= min}
        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-background border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease"
      >
        <Minus size={14} />
      </button>
      <div className="flex items-center min-w-[3rem] justify-center">
        <input
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value ?? ""}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full bg-transparent text-center font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        {unit && (
          <span className="text-xs text-muted-foreground font-body ml-0.5">{unit}</span>
        )}
      </div>
      <button
        type="button"
        onClick={increment}
        disabled={value !== null && value >= max}
        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-background border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Increase"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
