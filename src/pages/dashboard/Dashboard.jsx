import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRecommendedBooks } from "../../redux/books/operations";
import BookModal from "../../components/bookModal/BookModal";
import {
  selectRecommendedBooks,
  selectBooksIsLoading,
  selectTotalPages
} from "../../redux/books/selectors";
import styles from "./Dashboard.module.css";
import { Navigation } from "../../components/navigation/Navigation";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [titleFilter, setTitleFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);

  const books = useSelector(selectRecommendedBooks);
  const isLoading = useSelector(selectBooksIsLoading);
  const totalPages = useSelector(selectTotalPages);
  //const currentPage = useSelector(selectCurrentPage);

  useEffect(() => {
    dispatch(
      fetchRecommendedBooks({
        page,
        limit: 10,
        title: titleFilter || undefined,
        author: authorFilter || undefined,
      }),
    );
  }, [dispatch, page]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    dispatch(
      fetchRecommendedBooks({
        page: 1,
        limit: 10,
        title: titleFilter || undefined,
        author: authorFilter || undefined,
      }),
    );
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handleOpenModal = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.dashboardLayout}>
        <Navigation />
        <div className={styles.mainContentWrapper}>
          <aside className={styles.sidebar}>
            {/* Filter Form Card */}
            <div className={styles.filterCard}>
              <p className={styles.filterTitle}>Filters:</p>
              <form className={styles.form} onSubmit={handleFilterSubmit}>
                <div className={styles.inputGroup}>
                  <span className={styles.inputLabel}>Book title:</span>
                  <input
                    type="text"
                    placeholder="Enter text"
                    className={styles.input}
                    value={titleFilter}
                    onChange={(e) => setTitleFilter(e.target.value)}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <span className={styles.inputLabel}>The author:</span>
                  <input
                    type="text"
                    placeholder="Enter text"
                    className={styles.input}
                    value={authorFilter}
                    onChange={(e) => setAuthorFilter(e.target.value)}
                  />
                </div>
                <button type="submit" className={styles.applyBtn}>
                  To apply
                </button>
              </form>
            </div>

            {/* Workout / Guide Card */}
            <div className={styles.workoutCard}>
              <h2 className={styles.workoutTitle}>Start your workout</h2>
              <div className={styles.stepsList}>
                <div className={styles.stepItem}>
                  <span className={styles.stepNumber}>1</span>
                  <p className={styles.stepText}>
                    <strong>Create a personal library:</strong> add the books
                    you intend to read to it.
                  </p>
                </div>
                <div className={styles.stepItem}>
                  <span className={styles.stepNumber}>2</span>
                  <p className={styles.stepText}>
                    <strong>Create your first workout:</strong> define a goal,
                    choose a period, start training.
                  </p>
                </div>
              </div>
              <div
                className={styles.myLibraryLink}
                onClick={() => navigate("/library")}
              >
                <span>My library</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>

            {/* Quote Card (Desktop Only) */}
            <div className={styles.quoteCard}>
              <span style={{ fontSize: "24px" }}>📚</span>
              <p className={styles.quoteText}>
                "Books are <span>windows</span> to the world, and reading is a
                journey into the unknown."
              </p>
            </div>
          </aside>

          <main className={styles.content}>
            <div className={styles.contentHeader}>
              <h2 className={styles.sectionTitle}>Recommended</h2>
              <div className={styles.paginationBtns}>
                <button
                  className={styles.pageBtn}
                  onClick={handlePrevPage}
                  disabled={page <= 1 || isLoading}
                >
                  &lt;
                </button>
                <button
                  className={styles.pageBtn}
                  onClick={handleNextPage}
                  disabled={page >= totalPages || isLoading}
                >
                  &gt;
                </button>
              </div>
            </div>

            {isLoading ? (
              <p
                style={{
                  color: "#686868",
                  textAlign: "center",
                  padding: "40px 0",
                }}
              >
                Loading books...
              </p>
            ) : books.length > 0 ? (
              <div className={styles.booksGrid}>
                {books.map((book) => (
                  <div
                    key={book._id || book.id}
                    className={styles.bookCard}
                    onClick={() => handleOpenModal(book)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={book.imageUrl || book.cover}
                      alt={book.title}
                      className={styles.bookCover}
                    />
                    <h4 className={styles.bookName}>{book.title}</h4>
                    <p className={styles.bookAuthor}>{book.author}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p
                style={{
                  color: "#686868",
                  textAlign: "center",
                  padding: "40px 0",
                }}
              >
                No books found.
              </p>
            )}
            {selectedBook && (
              <BookModal
                book={selectedBook}
                onClose={handleCloseModal}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
