import styles from "./Contact.module.css";

const links = [
  { label: "catalin@catalinleca.dev", href: "mailto:catalin@catalinleca.dev" },
  {
    label: "linkedin.com/in/catalinleca",
    href: "https://linkedin.com/in/catalinleca",
    external: true,
  },
  {
    label: "github.com/catalinleca",
    href: "https://github.com/catalinleca",
    external: true,
  },
];

export const Contact = () => {
  return (
    <section className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.left}>
          <h2 className={styles.heading}>
            Let&apos;s build
            <br />
            <em>something real.</em>
          </h2>
          <p className={styles.subtext}>
            Open to senior React or React Native roles.
            <br />
            Based in Romania, working globally.
          </p>
        </div>
        <div className={styles.right}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.link}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.label} <span className={styles.arrow}>→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
