"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Image,
  Text,
  CheckSquare,
} from "lucide-react";

interface NotionEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

interface SlashCommand {
  id: string;
  label: string;
  icon: React.ElementType;
  prefix: string;
  description: string;
}

const COMMANDS: SlashCommand[] = [
  {
    id: "heading1",
    label: "Heading 1",
    icon: Heading1,
    prefix: "# ",
    description: "Large section heading",
  },
  {
    id: "heading2",
    label: "Heading 2",
    icon: Heading2,
    prefix: "## ",
    description: "Medium section heading",
  },
  {
    id: "bullet",
    label: "Bullet list",
    icon: List,
    prefix: "- ",
    description: "Create a bullet list",
  },
  {
    id: "numbered",
    label: "Numbered list",
    icon: ListOrdered,
    prefix: "1. ",
    description: "Create a numbered list",
  },
  {
    id: "todo",
    label: "To-do",
    icon: CheckSquare,
    prefix: "- [ ] ",
    description: "Create a to-do checkbox",
  },
  {
    id: "image",
    label: "Image",
    icon: Image,
    prefix: "![image](",
    description: "Insert image from URL",
  },
  {
    id: "text",
    label: "Text",
    icon: Text,
    prefix: "",
    description: "Plain text block",
  },
];

export default function NotionEditor({
  value,
  onChange,
  placeholder = "Type something...",
  rows = 8,
  className = "",
}: NotionEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const [filter, setFilter] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = COMMANDS.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(filter.toLowerCase()) ||
      cmd.description.toLowerCase().includes(filter.toLowerCase())
  );

  const getCursorLineStart = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return 0;
    const cursor = textarea.selectionStart;
    const text = textarea.value;
    let lineStart = cursor;
    while (lineStart > 0 && text[lineStart - 1] !== "\n") {
      lineStart--;
    }
    return lineStart;
  }, []);

  const getLineBeforeCursor = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return "";
    const cursor = textarea.selectionStart;
    const text = textarea.value;
    let lineStart = cursor;
    while (lineStart > 0 && text[lineStart - 1] !== "\n") {
      lineStart--;
    }
    return text.slice(lineStart, cursor);
  }, []);

  const handleKeyUp = useCallback(() => {
    const lineBeforeCursor = getLineBeforeCursor();
    const slashMatch = lineBeforeCursor.match(/^\/(.*)$/);
    if (slashMatch) {
      const textarea = textareaRef.current;
      if (textarea) {
        const cursor = textarea.selectionStart;
        const textBeforeCursor = textarea.value.slice(0, cursor);
        const lines = textBeforeCursor.split("\n");
        const lineCount = lines.length;
        const lineHeight = 24;
        const top = Math.min(lineCount * lineHeight + 8, textarea.offsetHeight - 40);
        setMenuPos({ top, left: 0 });
      }
      setFilter(slashMatch[1]);
      setShowMenu(true);
      setSelectedIndex(0);
    } else {
      setShowMenu(false);
      setFilter("");
    }
  }, [getLineBeforeCursor]);

  const applyCommand = useCallback(
    (cmd: SlashCommand) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const cursor = textarea.selectionStart;
      const lineStart = getCursorLineStart();
      const beforeLine = value.slice(0, lineStart);
      const afterLine = value.slice(cursor);
      const newValue = beforeLine + cmd.prefix + afterLine;

      onChange(newValue);
      setShowMenu(false);
      setFilter("");

      // Move cursor after prefix
      setTimeout(() => {
        const newCursor = lineStart + cmd.prefix.length;
        textarea.setSelectionRange(newCursor, newCursor);
        textarea.focus();
      }, 0);
    },
    [value, onChange, getCursorLineStart]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showMenu) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filteredCommands[selectedIndex];
        if (cmd) applyCommand(cmd);
      } else if (e.key === "Escape") {
        setShowMenu(false);
      }
    },
    [showMenu, filteredCommands, selectedIndex, applyCommand]
  );

  // Auto-resize
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [value]);

  // Click outside to close menu
  useEffect(() => {
    if (!showMenu) return;

    function handlePointerDown(e: PointerEvent) {
      const target = e.target as Node;
      const textarea = textareaRef.current;
      const menu = menuRef.current;
      if (
        textarea &&
        menu &&
        !textarea.contains(target) &&
        !menu.contains(target)
      ) {
        setShowMenu(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [showMenu]);

  return (
    <div className={`relative ${className}`}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none resize-none leading-relaxed"
      />

      {showMenu && filteredCommands.length > 0 && (
        <div
          ref={menuRef}
          className="absolute z-20 w-56 bg-card border border-border rounded-xl shadow-lg py-1 overflow-y-auto max-h-80 pb-1"
          style={{ top: menuPos.top, left: menuPos.left }}
        >
          <div className="px-3 py-2 text-[10px] text-muted-foreground font-body uppercase tracking-wider">
            Basic blocks
          </div>
          {filteredCommands.map((cmd, i) => {
            const Icon = cmd.icon;
            return (
              <button
                key={cmd.id}
                onClick={() => applyCommand(cmd)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors ${
                  i === selectedIndex ? "bg-muted" : "hover:bg-muted/50"
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-foreground" />
                </div>
                <div>
                  <div className="font-body text-sm text-foreground">{cmd.label}</div>
                  <div className="font-body text-xs text-muted-foreground">{cmd.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Tooltip hint */}
      <div className="flex items-center gap-1.5 mt-1 text-[10px] text-muted-foreground font-body">
        <span className="px-1.5 py-0.5 bg-muted rounded text-[10px]">/</span>
        <span>Type for commands</span>
      </div>
    </div>
  );
}
