import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/auth/operations";
import { fetchRecommendedBooks } from "../../redux/books/operations";
import BookModal from "../../components/bookModal/BookModal";
import {
  selectRecommendedBooks,
  selectBooksIsLoading,
  selectTotalPages,
  selectCurrentPage,
} from "../../redux/books/selectors";
import styles from "./Dashboard.module.css";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State & Selectors
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [titleFilter, setTitleFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);

  // Redux Selectors
  const user = useSelector((state) => state.auth.user) || { name: "" };
  const books = useSelector(selectRecommendedBooks);
  const isLoading = useSelector(selectBooksIsLoading);
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector(selectCurrentPage);

  // Sayfa yüklendiğinde veya sayfa/filtre değiştiğinde API'den önerilen kitapları çek
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

  // Filtre Formu Gönderildiğinde
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPage(1); // Filtre uygulandığında 1. sayfaya dön
    dispatch(
      fetchRecommendedBooks({
        page: 1,
        limit: 10,
        title: titleFilter || undefined,
        author: authorFilter || undefined,
      }),
    );
  };

  // Sayfalandırma Kontrolleri
  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const handleOpenModal = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const handleAddToLibrary = (bookId) => {
    // Redux dispatch / API çağrınız (örn: dispatch(addBookToLibrary(bookId)))
    console.log("Kütüphaneye eklenen kitap ID:", bookId);
  };

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "U");

  return (
    <div className={styles.pageContainer}>
      <div className={styles.dashboardLayout}>
        {/* TOP HEADER */}
        <header className={styles.header}>
          <div className={styles.logo}>
            <svg width="24" height="17">
              <use href="../../../image/icons.svg#icon-logo"></use>
            </svg>
            <span>READ JOURNEY</span>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.activeNavLink}`
                  : styles.navLink
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/library"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.activeNavLink}`
                  : styles.navLink
              }
            >
              My library
            </NavLink>
          </nav>

          {/* User & Logout Section */}
          <div className={styles.userBlock}>
            <div className={styles.avatar}>{getInitial(user.name)}</div>
            <span className={styles.userName}>{user.name}</span>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Log out
            </button>
            <button
              className={styles.burgerBtn}
              onClick={() => setIsMenuOpen(true)}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </header>

        {/* MAIN LAYOUT */}
        <div className={styles.mainContentWrapper}>
          {/* LEFT SIDEBAR CONTROLS */}
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

          {/* RIGHT RECOMMENDED BOOKS LIST */}
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

            {/* Loading / Books Grid */}
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
                onAddToLibrary={handleAddToLibrary}
              />
            )}
          </main>
        </div>
      </div>

      {/* MOBILE SLIDE-OUT MENU */}
      {isMenuOpen && (
        <div
          className={styles.mobileMenuOverlay}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={styles.mobileMenuContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <nav className={styles.mobileNav}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.activeNavLink}`
                    : styles.navLink
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/library"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.activeNavLink}`
                    : styles.navLink
                }
              >
                My library
              </NavLink>
            </nav>
            <button
              className={styles.logoutBtn}
              style={{ display: "block", width: "100%" }}
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
