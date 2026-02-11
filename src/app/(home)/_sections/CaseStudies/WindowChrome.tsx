import styles from "./WindowChrome.module.css";

interface WindowChromeProps {
  title?: string;
  children: React.ReactNode;
}

export function WindowChrome({ title, children }: WindowChromeProps) {
  return (
    <div className={styles.chrome}>
      <div className={styles.titleBar}>
        <div className={styles.dots}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        {title && <span className={styles.title}>{title}</span>}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
