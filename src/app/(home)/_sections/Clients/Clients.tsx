import styles from "./Clients.module.css";

const clients = [
  "Vodafone",
  "Financial Times",
  "EF Education First",
  "Trading 212",
  "Zafran",
];

const proofNumbers = [
  { number: "90%", label: "vuln reduction (FT)" },
  { number: "AWS", label: "Certified Architect" },
  { number: "217", label: "automated tests" },
  { number: "5", label: "apps shipped solo" },
];

export const Clients = () => {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Selected Clients</h2>
      <p className={styles.subtitle}>
        7+ years delivering production systems across fintech, media, edtech,
        and cybersecurity
      </p>
      <div className={styles.strip}>
        {clients.map((client) => (
          <span key={client} className={styles.logo}>
            {client}
          </span>
        ))}
      </div>
      <div className={styles.proofStrip}>
        {proofNumbers.map((item) => (
          <div key={item.label} className={styles.proofItem}>
            <span className={styles.proofNumber}>{item.number}</span>
            <span className={styles.proofLabel}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
