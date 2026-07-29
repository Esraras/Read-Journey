import { useEffect } from "react";
import style from "./ReadingModal.module.css";

const ReadingModal = ({ book, onClose, onStartReading }) => {
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!book) return null;

  return (
    <div className={style["modal-overlay"]} onClick={onClose}>
      <div className={style["modal-content"]} onClick={(e) => e.stopPropagation()}>
        <button
          className={style["modal-close-btn"]}
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className={style["modal-cover-wrapper"]}>
          <img
            src={book.imageUrl || book.cover}
            alt={book.title}
            className={style["modal-cover-img"]}
          />
        </div>

        <div className={style["modal-details"]}>
          <h2 className={style["modal-title"]}>{book.title}</h2>
          <p className={style["modal-author"]}>{book.author}</p>
          <p className={style["modal-pages"]}>{book.totalPages || book.pages} pages</p>
        </div>

        <button
          className={style["modal-action-btn"]}
          onClick={() => onStartReading({ bookId: book._id || book.id })}
        >
          Start reading
        </button>
      </div>
    </div>
  );
};

export default ReadingModal;
