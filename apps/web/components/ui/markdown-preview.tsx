"use client";

import { useMemo } from "react";

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

interface Block {
  type: "h1" | "h2" | "bullet" | "numbered" | "todo" | "image" | "paragraph";
  content: string;
  checked?: boolean;
  alt?: string;
  src?: string;
}

function parseMarkdown(text: string): Block[] {
  const lines = text.split("\n");
  const blocks: Block[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === "") continue;

    if (trimmed.startsWith("# ") && !trimmed.startsWith("## ")) {
      blocks.push({ type: "h1", content: trimmed.slice(2) });
    } else if (trimmed.startsWith("## ")) {
      blocks.push({ type: "h2", content: trimmed.slice(3) });
    } else if (trimmed.startsWith("- [ ] ")) {
      blocks.push({ type: "todo", content: trimmed.slice(6), checked: false });
    } else if (trimmed.startsWith("- [x] ") || trimmed.startsWith("- [X] ")) {
      blocks.push({ type: "todo", content: trimmed.slice(6), checked: true });
    } else if (trimmed.startsWith("- ")) {
      blocks.push({ type: "bullet", content: trimmed.slice(2) });
    } else if (/^\d+\.\s/.test(trimmed)) {
      blocks.push({ type: "numbered", content: trimmed.replace(/^\d+\.\s/, "") });
    } else if (trimmed.startsWith("![")) {
      const match = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (match) {
        blocks.push({ type: "image", content: "", alt: match[1], src: match[2] });
      } else {
        blocks.push({ type: "paragraph", content: trimmed });
      }
    } else {
      blocks.push({ type: "paragraph", content: trimmed });
    }
  }

  return blocks;
}

export default function MarkdownPreview({ content, className = "" }: MarkdownPreviewProps) {
  const blocks = useMemo(() => parseMarkdown(content), [content]);

  if (!content.trim()) {
    return (
      <p className="text-sm text-muted-foreground font-body italic">
        No content
      </p>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h1":
            return (
              <h1 key={i} className="font-heading text-2xl font-semibold tracking-tight">
                {block.content}
              </h1>
            );
          case "h2":
            return (
              <h2 key={i} className="font-heading text-xl font-semibold tracking-tight">
                {block.content}
              </h2>
            );
          case "bullet":
            return (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
                <span className="font-body text-sm text-foreground">{block.content}</span>
              </div>
            );
          case "numbered":
            return (
              <div key={i} className="flex items-start gap-2">
                <span className="font-body text-sm text-muted-foreground shrink-0">
                  {i + 1}.
                </span>
                <span className="font-body text-sm text-foreground">{block.content}</span>
              </div>
            );
          case "todo":
            return (
              <div key={i} className="flex items-start gap-2">
                <div
                  className={`mt-0.5 w-4 h-4 rounded border shrink-0 flex items-center justify-center ${
                    block.checked
                      ? "bg-foreground border-foreground"
                      : "border-border"
                  }`}
                >
                  {block.checked && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className={`font-body text-sm ${block.checked ? "text-muted-foreground line-through" : "text-foreground"}`}>
                  {block.content}
                </span>
              </div>
            );
          case "image":
            return (
              <div key={i} className="my-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={block.src}
                  alt={block.alt}
                  className="w-full rounded-xl border border-border object-cover max-h-64"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            );
          default:
            return (
              <p key={i} className="font-body text-sm text-foreground leading-relaxed">
                {block.content}
              </p>
            );
        }
      })}
    </div>
  );
}
