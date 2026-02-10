import styles from "./Clients.module.css";

const clients = [
  "Vodafone",
  "Financial Times",
  "EF Education First",
  "Trading 212",
  "Zafran",
];

export const Clients = () => {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Selected Clients</h2>
      <div className={styles.strip}>
        {clients.map((client) => (
          <span key={client} className={styles.logo}>
            {client}
          </span>
        ))}
      </div>
    </div>
  );
};
