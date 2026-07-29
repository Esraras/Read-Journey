import { useEffect } from 'react';
import styles from './BookIsReadModal.module.css';

export const BookIsReadModal = ({ isOpen, onClose }) => {
 
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

 if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          ✕
        </button>
        <div className={styles.iconWrapper}>
          📚
        </div>
        <h3 className={styles.title}>The book is read</h3>
        <p className={styles.description}>
          It was an <span>exciting journey</span>, where each page revealed new horizons, and the characters became inseparable friends.
        </p>
      </div>
    </div>
  );
};

export default BookIsReadModal;