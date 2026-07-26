import { useState } from "react";
import styles from "./Library.module.css";
import { Navigation } from "../navigation/Navigation";
import styleContainer from "../../pages/dashboard/Dashboard.module.css";

export default function MyLibrary({
  recommendedBooks = [],
  userBooks = [],
  onAddBook,
  onSelectBook,
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [filter, setFilter] = useState("all");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !pages) return;

    onAddBook({
      title,
      author,
      totalPages: Number(pages),
    });

    setTitle("");
    setAuthor("");
    setPages("");
  };

  const filteredBooks = userBooks.filter((book) => {
    if (filter === "unread") return book.status === "unread";
    if (filter === "in-progress") return book.status === "in-progress";
    if (filter === "done") return book.status === "done";
    return true;
  });

  return (
    <div className={styleContainer.pageContainer}>
      <div className={styleContainer.dashboardLayout}>
        <Navigation />
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
                    onClick={() => onSelectBook?.(book)}
                  >
                    <img src={book.imageUrl} alt={book.title} />
                    <h4>{book.title}</h4>
                    <p>{book.author}</p>
                  </div>
                ))}
              </div>
              <div className={styles.recFooter}>
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
                    onClick={() => onSelectBook?.(book)}
                  >
                    <img src={book.imageUrl} alt={book.title} />
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.iconCircle}>📚</div>
                <p>
                  To start training, add <span>some of your books</span> or from
                  the recommended ones
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
