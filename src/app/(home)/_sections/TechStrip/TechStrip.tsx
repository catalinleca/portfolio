import styles from "./TechStrip.module.css";

const items = [
  "React 19",
  "TypeScript",
  "React Native",
  "Next.js",
  "TanStack Query",
  "Material-UI",
  "GraphQL",
  "Node.js",
  "React Flow",
  "Google Maps API",
  "Edge Computing",
  "MDX",
];

export const TechStrip = () => {
  return (
    <div className={styles.strip}>
      <div className={styles.track} aria-hidden="true">
        {[...items, ...items].map((item, i) => (
          <span key={`${item}-${i}`} className={styles.item}>
            <span className={styles.dot} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
