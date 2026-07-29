import { useEffect } from 'react';
import styles from './BookAddedModal.module.css';

export const BookAddedModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          ✕
        </button>
        
        <div className={styles.icon}>👍</div>
        
        <h3 className={styles.title}>Good job</h3>
        
        <p className={styles.description}>
          Your book is now in <strong>the library!</strong> The joy knows no bounds and now you can start your training
        </p>
      </div>
    </div>
  );
};