"use client";

import { useRef, useState, useEffect, useId } from "react";
import styles from "./Mermaid.module.css";

interface MermaidProps {
  chart: string;
  caption?: string;
}

export function Mermaid({ chart, caption }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const id = useId().replace(/:/g, "m");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: {
            primaryColor: "#cc7832",
            primaryTextColor: "#eae8e4",
            primaryBorderColor: "#2a2a2f",
            lineColor: "#6b6966",
            secondaryColor: "#1a1a1e",
            tertiaryColor: "#151518",
            background: "#0e0e11",
            mainBkg: "#1a1a1e",
            nodeBorder: "#2a2a2f",
            clusterBkg: "#151518",
            clusterBorder: "#2a2a2f",
            titleColor: "#eae8e4",
            edgeLabelBackground: "#151518",
          },
          fontFamily:
            "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace",
        });

        const { svg } = await mermaid.render(`mermaid-${id}`, chart);

        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to render diagram");
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (error) {
    return (
      <div className={styles.error}>
        <p>Diagram error: {error}</p>
      </div>
    );
  }

  return (
    <figure className={styles.figure}>
      <div className={styles.container} ref={containerRef}>
        {loading && <span className={styles.loading}>Loading diagram...</span>}
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
