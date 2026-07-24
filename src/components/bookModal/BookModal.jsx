import { useEffect } from "react";
import styles from "./BookModal.module.css";

export default function BookModal({ book, onClose, onAddToLibrary }) {
    
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Modal açıkken arka planın kaymasını engellemek için
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  if (!book) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className={styles.imageWrapper}>
          <img src={book.imageUrl || book.cover} alt={book.title} className={styles.bookCover} />
        </div>

        <div className={styles.info}>
          <h3 className={styles.title}>{book.title}</h3>
          <p className={styles.author}>{book.author}</p>
          <p className={styles.pages}>{book.totalPages || book.pages} pages</p>
        </div>

        <button
          className={styles.addBtn}
          onClick={() => {
            onAddToLibrary(book._id || book.id);
            onClose();
          }}
        >
          Add to library
        </button>
      </div>
    </div>
  );
}