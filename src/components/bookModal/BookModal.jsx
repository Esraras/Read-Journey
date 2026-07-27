import { useEffect } from "react";
import styles from "./BookModal.module.css";
import { useDispatch } from "react-redux";
import { addBookFromRecommended } from "../../redux/books/operations";

export default function BookModal({ book, onClose }) {
  const dispatch = useDispatch();
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

  const handleAddClick = () => {
    const bookData = {
      title: book.title,
      author: book.author,
      totalPages: Number(book.totalPages || book.pages),
    };

    dispatch(addBookFromRecommended(bookData));
    onClose();
  };

  return (
    <div className={styles.backdrop} onClick={handleAddClick}>
      <div className={styles.modal}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div className={styles.imageWrapper}>
          <img
            src={book.imageUrl || book.cover}
            alt={book.title}
            className={styles.bookCover}
          />
        </div>

        <div className={styles.info}>
          <h3 className={styles.title}>{book.title}</h3>
          <p className={styles.author}>{book.author}</p>
          <p className={styles.pages}>{book.totalPages || book.pages} pages</p>
        </div>

        <button
          className={styles.addBtn}
          onClick={() => {
            handleAddClick(book._id || book.id);
            onClose();
          }}
        >
          Add to library
        </button>
      </div>
    </div>
  );
}
