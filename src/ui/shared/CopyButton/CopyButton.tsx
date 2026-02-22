"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { CopyIcon, CheckIcon } from "@/ui/icons";
import styles from "./CopyButton.module.css";

interface CopyButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children"> {
  text: string;
  className?: string;
  children: ReactNode;
}

export const CopyButton = ({
  text,
  className,
  children,
  onClick,
  ...rest
}: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.warn("Clipboard write failed:", error);
    }
  }, [text]);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      void handleCopy();
      onClick?.(event);
    },
    [handleCopy, onClick]
  );

  return (
    <button
      type="button"
      className={`${styles.copyBtn} ${className ?? ""}`}
      {...rest}
      onClick={handleClick}
    >
      {children}
      <span className={styles.iconWrap}>
        <CopyIcon className={`${styles.icon} ${copied ? styles.iconOut : styles.iconIn}`} />
        <CheckIcon className={`${styles.icon} ${styles.check} ${copied ? styles.iconIn : styles.iconOut}`} />
      </span>
      {copied && <span className={styles.toast}>Copied!</span>}
    </button>
  );
};
