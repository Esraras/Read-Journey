import { useEffect } from "react";
import './ReadingModal.module.css'; 

const ReadingModal = ({ book, onClose, onStartReading }) => {
  if (!book) return null;

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
  


  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="modal-cover-wrapper">
          <img src={book.imageUrl || book.cover} alt={book.title} className="modal-cover-img" />
        </div>

        <div className="modal-details">
          <h2 className="modal-title">{book.title}</h2>
          <p className="modal-author">{book.author}</p>
          <p className="modal-pages">{book.totalPages || book.pages} pages</p>
        </div>

        <button 
          className="modal-action-btn" 
          onClick={() => onStartReading(book.id)}
        >
          Start reading
        </button>
      </div>
    </div>
  );
};

export default ReadingModal;