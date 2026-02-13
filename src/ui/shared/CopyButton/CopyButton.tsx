"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { CopyIcon, CheckIcon } from "@/ui/icons";
import styles from "./CopyButton.module.css";

interface CopyButtonProps {
  text: string;
  className?: string;
  children: ReactNode;
}

export const CopyButton = ({ text, className, children }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1500);
  }, [text]);

  return (
    <button onClick={handleCopy} className={`${styles.copyBtn} ${className ?? ""}`}>
      {children}
      <span className={styles.iconWrap}>
        <CopyIcon className={`${styles.icon} ${copied ? styles.iconOut : styles.iconIn}`} />
        <CheckIcon className={`${styles.icon} ${styles.check} ${copied ? styles.iconIn : styles.iconOut}`} />
      </span>
      {copied && <span className={styles.toast}>Copied!</span>}
    </button>
  );
};
