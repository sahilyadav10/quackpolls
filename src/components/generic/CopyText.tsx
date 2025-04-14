"use client";
import { MouseEvent, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdOutlineCopyAll } from "react-icons/md";

interface CopyTextProps {
  text: string;
  className?: string;
}

export default function CopyText({ text, className }: CopyTextProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    if (navigator?.clipboard?.writeText) {
      return navigator.clipboard.writeText(text);
    }
  };

  const handleCopy = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    try {
      await copyToClipboard(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div
      className={`flex items-center gap-2 justify-between ${className || ""}`}
    >
      <p className="text-sm font-medium text-neutral-500 max-w-[90%] truncate">
        {text}
      </p>
      <button
        data-copy="true"
        onClick={handleCopy}
        className="text-neutral-900 dark:text-neutral-50 hover:cursor-pointer rounded-lg transition-colors p-1"
      >
        {copied ? (
          <FaCheck size={16} className="text-primary" />
        ) : (
          <MdOutlineCopyAll size={16} />
        )}
      </button>
    </div>
  );
}
