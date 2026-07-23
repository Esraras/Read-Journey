
import styles from './AuthLayout.module.css';

export const AuthLayout = ({ children }) => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.authCard}>
        {/* Sol / Üst Form Alanı */}
        <div className={styles.formSection}>
          <div className={styles.logo}>
            <svg width="24" height="17" viewBox="0 0 24 17" fill="white">
              <use href="../../image/icons.svg#icon-logo" />
            </svg>
            <span>READ JOURNEY</span>
          </div>

          <h1 className={styles.title}>
            Expand your mind, reading <span className={styles.titleDimmed}>a book</span>
          </h1>

          {children}
        </div>

        {/* Sağ / Alt Görsel Alanı */}
        <div className={styles.previewSection}>
          <img 
            src="/iphone-mockup.png" 
            alt="App Preview" 
            className={styles.mockupImg} 
          />
        </div>
      </div>
    </div>
  );
};