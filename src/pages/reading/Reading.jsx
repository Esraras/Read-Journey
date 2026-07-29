import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { Navigation } from "../../components/navigation/Navigation";
import { AddReading } from "../../components/addReading/AddReading";
import { Details } from "../../components/details/Details";
import { MyBook } from "../../components/myBook/MyBook";
import { BookIsReadModal } from "../../components/bookIsReadModal/BookIsReadModal";

import { startReading, finishReading, deleteReading, fetchOwnBooks } from "../../redux/books/operations";
import { selectOwnBooks } from "../../redux/books/selectors";

import styleContainer from "../../pages/dashboard/Dashboard.module.css";
import styles from "./Reading.module.css";

export const Reading = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  
  const userBooks = useSelector(selectOwnBooks) || [];
  const book = userBooks.find((b) => (b._id || b.id) === bookId);

  const [page, setPage] = useState("");
  const [activeTab, setActiveTab] = useState("diary");
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);

  useEffect(() => {
    if (!userBooks.length) {
      dispatch(fetchOwnBooks());
    }
  }, [dispatch, userBooks.length]);

  if (!book) {
    return <div className={styles.loading}>Loading book data...</div>;
  }

  const isReading = book.status === "in-progress" && book.progress?.some((p) => p.status === "active");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const pageNum = Number(page);

    if (!pageNum || pageNum <= 0) {
      toast.error("Please enter a valid page number.");
      return;
    }

    if (pageNum > book.totalPages) {
      toast.error(`Page cannot exceed total pages (${book.totalPages}).`);
      return;
    }

    if (!isReading) {
      // TO START
      try {
        await dispatch(startReading({ id: book._id || book.id, page: pageNum })).unwrap();
        toast.success("Reading started!");
        setPage("");
      } catch (err) {
        toast.error(err || "Failed to start reading.");
      }
    } else {
      // TO STOP
      try {
        await dispatch(finishReading({ id: book._id || book.id, page: pageNum })).unwrap();
        toast.success("Reading stopped!");
        setPage("");

        // Kitap bitti mi kontrolü
        if (pageNum === book.totalPages) {
          setIsReadModalOpen(true);
        }
      } catch (err) {
        toast.error(err || "Failed to stop reading.");
      }
    }
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      await dispatch(deleteReading({ bookId: book._id || book.id, sessionId })).unwrap();
      toast.success("Session deleted.");
    } catch (err) {
      toast.error(err || "Failed to delete session.");
    }
  };

  return (
    <div className={styleContainer.pageContainer}>
      <div className={styleContainer.dashboardLayout}>
        <Navigation />
        <div className={styles.ContentWrapper}>
          <div className={styles.container}>
            {/* Sol Panel: Form + Details */}
            <aside className={styles.sidebar}>
              <AddReading
                page={page}
                setPage={setPage}
                isReading={isReading}
                onSubmit={handleFormSubmit}
              />
              <Details
                book={book}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onDeleteSession={handleDeleteSession}
              />
            </aside>

            {/* Sağ Panel: My Reading (Kitap Kartı ve Status) */}
            <main className={styles.mainContent}>
              <h2 className={styles.pageTitle}>My reading</h2>
              <MyBook book={book} isReading={isReading} />
            </main>
          </div>
        </div>
      </div>

      {/* Kitap Tamamlandı Pop-up Modal */}
      <BookIsReadModal
        isOpen={isReadModalOpen}
        onClose={() => setIsReadModalOpen(false)}
      />
    </div>
  );
};