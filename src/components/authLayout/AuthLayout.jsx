import styles from "./AuthLayout.module.css";

export const AuthLayout = ({ children }) => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.authCard}>
        {/* Sol / Üst Form Alanı */}
        <div className={styles.formSection}>
          <div className={styles.logo}>
            <svg width="24" height="17">
              <use href="/image/icons.svg#icon-logo"></use>
            </svg>
            <span>READ JOURNEY</span>
          </div>

          <h1 className={styles.title}>
            Expand your mind, reading{" "}
            <span className={styles.titleDimmed}>a book</span>
          </h1>

          {children}
        </div>

        {/* Sağ / Alt Görsel Alanı */}
        <div className={styles.previewSection}>
          <img
            src="/image/iphone-mockup.png"
            alt="App Preview"
            className={styles.mockupImg}
          />
        </div>
      </div>
    </div>
  );
};
