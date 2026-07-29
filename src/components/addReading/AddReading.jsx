import styles from "../../pages/reading/Reading.module.css";

export const AddReading = ({ page, setPage, isReading, onSubmit }) => {
  return (
    <div className={styles.formCard}>
      <h3 className={styles.cardTitle}>
        {isReading ? "Stop page:" : "Start page:"}
      </h3>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Page number:</label>
          <input
            type="number"
            placeholder="0"
            value={page}
            onChange={(e) => setPage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.actionBtn}>
          {isReading ? "To stop" : "To start"}
        </button>
      </form>
    </div>
  );
};