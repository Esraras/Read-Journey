import { useState, useEffect } from "react";
import styles from "./Library.module.css";
import { Navigation } from "../navigation/Navigation";
import styleContainer from "../../pages/dashboard/Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReadingModal from "../readingModal/ReadingModal";
import { BookAddedModal } from "../bookAddedModal/BookAddedModal";
import toast from "react-hot-toast";

import {
  addBook,
  fetchRecommendedBooks,
  fetchOwnBooks,
  deleteBook,
  startReading,
} from "../../redux/books/operations";
import {
  selectRecommendedBooks,
  selectOwnBooks,
} from "../../redux/books/selectors";

export const Library = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [filter, setFilter] = useState("all");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const recommendedBooks = useSelector(selectRecommendedBooks) || [];
  const userBooks = useSelector(selectOwnBooks) || [];

  useEffect(() => {
    dispatch(fetchRecommendedBooks());
    dispatch(fetchOwnBooks());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !pages) return;

    try {
      await dispatch(
        addBook({
          title,
          author,
          totalPages: Number(pages),
        }),
      ).unwrap();

      setTitle("");
      setAuthor("");
      setPages("");
      navigate("/library");
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Kitap eklenirken hata oluştu:", error);
    }
  };

  const filteredBooks = userBooks.filter((book) => {
    if (filter === "unread") return book.status === "unread";
    if (filter === "in-progress") return book.status === "in-progress";
    if (filter === "done") return book.status === "done";
    return true;
  });

  const handleStartReading = async ({ bookId, page = 1 }) => {
    if (
      selectedBook?.status === "in-progress" ||
      selectedBook?.status === "active"
    ) {
      toast.error("You have already started reading this book");
      setSelectedBook(null);
      navigate(`/reading/${bookId}`);
      return;
    }

    try {
      await dispatch(startReading({ id: bookId, page })).unwrap();
      setSelectedBook(null);
      navigate(`/reading/${bookId}`);
    } catch (error) {
      console.error("Start reading error:", error);

      toast.error("You have already started reading this book");
      setSelectedBook(null);
      navigate(`/reading/${bookId}`);
    }
  };
  const handleDeleteBook = (e, bookId) => {
    e.stopPropagation();
    dispatch(deleteBook(bookId));
  };

  return (
    <div className={styleContainer.pageContainer}>
      <div className={styleContainer.dashboardLayout}>
        <Navigation />
        <div className={styles.ContentWrapper}>
          <div className={styles.container}>
            <aside className={styles.sidebar}>
              <div className={styles.formCard}>
                <h3 className={styles.cardTitle}>Create your library:</h3>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.inputGroup}>
                    <label>Book title:</label>
                    <input
                      type="text"
                      placeholder="Enter text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>The author:</label>
                    <input
                      type="text"
                      placeholder="Enter text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Number of pages:</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={pages}
                      onChange={(e) => setPages(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className={styles.addBtn}>
                    Add book
                  </button>
                </form>
              </div>

              <div className={styles.recommendedCard}>
                <h3 className={styles.recommendedTitle}>Recommended books</h3>
                <div className={styles.recommendedGrid}>
                  {recommendedBooks.slice(0, 3).map((book) => (
                    <div
                      key={book._id || book.id}
                      className={styles.recBookCard}
                      onClick={() => setSelectedBook(book)}
                      style={{ cursor: "pointer" }}
                    >
                      <img src={book.imageUrl} alt={book.title} />
                      <h4>{book.title}</h4>
                      <p>{book.author}</p>
                    </div>
                  ))}
                </div>
                <div className={styles.recFooter} onClick={() => navigate("/")}>
                  <span>Home</span>
                  <span className={styles.arrowIcon}>→</span>
                </div>
              </div>
            </aside>

            <main className={styles.mainContent}>
              <div className={styles.header}>
                <h2>My library</h2>

                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">All books</option>
                  <option value="unread">Unread</option>
                  <option value="in-progress">In progress</option>
                  <option value="done">Done</option>
                </select>
              </div>

              {filteredBooks.length > 0 ? (
                <div className={styles.booksGrid}>
                  {filteredBooks.map((book) => (
                    <div
                      key={book._id || book.id}
                      className={styles.userBookCard}
                      onClick={() => setSelectedBook(book)}
                    >
                      <img
                        src={
                          book.imageUrl ||
                          book.coverUrl ||
                          book.cover ||
                          "https://placehold.co/150x220/262626/FFFFFF?text=No+Cover"
                        }
                        alt={book.title}
                        className={styles.bookCover}
                      />
                      <div className={styles.info}>
                        <div className={styles.bookInfo}>
                          <h4 className={styles.bookName}>{book.title}</h4>
                          <p className={styles.bookAuthor}>{book.author}</p>
                        </div>
                        <button
                          onClick={(e) =>
                            handleDeleteBook(e, book._id || book.id)
                          }
                          className={styles.closeModalBtn}
                        >
                          <svg>
                            <use href="../../../image/icons.svg#icon-block"></use>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  {selectedBook && (
                    <ReadingModal
                      book={selectedBook}
                      onClose={() => setSelectedBook(null)}
                      onStartReading={handleStartReading}
                    />
                  )}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <div className={styles.iconCircle}>📚</div>
                  <p>
                    To start training, add <span>some of your books</span> or
                    from the recommended ones
                  </p>
                </div>
              )}
            </main>
            <BookAddedModal
              isOpen={isSuccessModalOpen}
              onClose={() => setIsSuccessModalOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
