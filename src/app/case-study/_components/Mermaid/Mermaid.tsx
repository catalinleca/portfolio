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
    initPromise = import("mermaid")
      .then((mod) => {
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
      })
      .catch((error) => {
        initPromise = null;
        throw error;
      });
  }
  return initPromise;
};

const stripSvgDimensions = (svgString: string): string =>
  svgString
    .replace(/<svg([^>]*?) width="[^"]*"/, "<svg$1")
    .replace(/<svg([^>]*?) height="[^"]*"/, "<svg$1")
    .replace(/<svg([^>]*?) style="[^"]*"/, "<svg$1");

interface RenderResult {
  chart: string;
  svg?: string;
  error?: string;
}

export const Mermaid = ({ chart, caption }: MermaidProps) => {
  const [result, setResult] = useState<RenderResult | null>(null);
  const id = useId().replace(/:/g, "m");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const mermaid = await getMermaid();
        const rendered = await mermaid.render(`mermaid-${id}`, chart);
        if (!cancelled) {
          setResult({ chart, svg: stripSvgDimensions(rendered.svg) });
        }
      } catch (err) {
        if (!cancelled) {
          setResult({
            chart,
            error: err instanceof Error ? err.message : "Failed to render diagram",
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  const isLoading = !result || result.chart !== chart;

  if (!isLoading && result.error) {
    return (
      <div className={styles.error}>
        <p>Diagram error: {result.error}</p>
      </div>
    );
  }

  return (
    <figure className={styles.figure}>
      {!isLoading && result.svg ? (
        <div
          className={styles.container}
          dangerouslySetInnerHTML={{ __html: result.svg }}
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
