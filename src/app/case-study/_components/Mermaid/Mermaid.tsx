"use client";

import { useState, useEffect, useId } from "react";
import { theme } from "@/data/theme";
import styles from "./Mermaid.module.css";

interface MermaidProps {
  chart: string;
  caption?: string;
}

let initPromise: Promise<typeof import("mermaid").default> | null = null;

const getMermaid = () => {
  if (!initPromise) {
    initPromise = import("mermaid").then((mod) => {
      mod.default.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          primaryColor: theme.accent,
          primaryTextColor: theme.textBright,
          primaryBorderColor: theme.text,
          lineColor: theme.text,
          secondaryColor: theme.bgSurface,
          tertiaryColor: theme.bgRaised,
          background: theme.bg,
          mainBkg: theme.bgSurface,
          nodeBorder: theme.text,
          clusterBkg: theme.bgRaised,
          clusterBorder: theme.textMuted,
          titleColor: theme.textBright,
          edgeLabelBackground: theme.bgSurface,
        },
        fontFamily: theme.fontMono,
      });
      return mod.default;
    });
  }
  return initPromise;
};

const stripSvgDimensions = (svgString: string): string => {
  const doc = new DOMParser().parseFromString(svgString, "image/svg+xml");
  const svg = doc.documentElement;
  svg.removeAttribute("width");
  svg.removeAttribute("height");
  svg.removeAttribute("style");
  return svg.outerHTML;
};

export const Mermaid = ({ chart, caption }: MermaidProps) => {
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const id = useId().replace(/:/g, "m");

  useEffect(() => {
    let cancelled = false;
    setError(null);
    setSvg(null);

    (async () => {
      try {
        const mermaid = await getMermaid();
        const result = await mermaid.render(`mermaid-${id}`, chart);
        if (!cancelled) {
          setSvg(stripSvgDimensions(result.svg));
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to render diagram",
          );
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
      {svg ? (
        <div
          className={styles.container}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className={styles.container}>
          <span className={styles.loading}>Loading diagram…</span>
        </div>
      )}
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
};
