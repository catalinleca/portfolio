import styles from "./Capabilities.module.css";

const capabilities = [
  {
    title: "Complex UI Systems",
    text: "Hunt editor, drag-and-drop, multi-step forms, real-time iframe preview, asset management",
  },
  {
    title: "Platform Quality",
    text: "217 tests, type-safe API boundary (OpenAPI \u2192 Zod), versioned content system, authorization model",
  },
  {
    title: "Delivery Impact",
    text: "Solo full-stack delivery, monorepo (5 apps + 3 packages), production infra (Fly.io, S3, CloudFront), AI integration",
  },
];

export function Capabilities() {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Capabilities</h2>
      <div className={styles.grid}>
        {capabilities.map((cap) => (
          <div key={cap.title} className={styles.column}>
            <h3 className={styles.columnTitle}>{cap.title}</h3>
            <p className={styles.columnText}>{cap.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
