"use client";

const NOTE_COLORS = [
  { id: "gray", bg: "bg-muted", border: "border-border", dot: "bg-neutral-400" },
  { id: "red", bg: "bg-red-100 dark:bg-red-900/40", border: "border-red-300 dark:border-red-700", dot: "bg-red-400" },
  { id: "orange", bg: "bg-orange-100 dark:bg-orange-900/40", border: "border-orange-300 dark:border-orange-700", dot: "bg-orange-400" },
  { id: "yellow", bg: "bg-yellow-100 dark:bg-yellow-900/40", border: "border-yellow-300 dark:border-yellow-700", dot: "bg-yellow-400" },
  { id: "green", bg: "bg-green-100 dark:bg-green-900/40", border: "border-green-300 dark:border-green-700", dot: "bg-green-400" },
  { id: "blue", bg: "bg-blue-100 dark:bg-blue-900/40", border: "border-blue-300 dark:border-blue-700", dot: "bg-blue-400" },
  { id: "purple", bg: "bg-purple-100 dark:bg-purple-900/40", border: "border-purple-300 dark:border-purple-700", dot: "bg-purple-400" },
  { id: "pink", bg: "bg-pink-100 dark:bg-pink-900/40", border: "border-pink-300 dark:border-pink-700", dot: "bg-pink-400" },
];

export function getNoteColorClasses(colorId: string) {
  const color = NOTE_COLORS.find((c) => c.id === colorId) || NOTE_COLORS[0];
  return color;
}

interface NoteColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

export default function NoteColorPicker({
  value,
  onChange,
  className = "",
}: NoteColorPickerProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {NOTE_COLORS.map((color) => (
        <button
          key={color.id}
          onClick={() => onChange(color.id)}
          className={`w-6 h-6 rounded-full border-2 transition-all ${
            value === color.id
              ? "border-foreground scale-110"
              : "border-transparent hover:scale-105"
          }`}
          style={{ backgroundColor: color.id === "gray" ? "#e5e7eb" : undefined }}
        >
          <div className={`w-full h-full rounded-full ${color.dot}`} />
        </button>
      ))}
    </div>
  );
}
