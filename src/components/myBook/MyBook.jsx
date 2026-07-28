import React from "react";
import styles from "./Reading.module.css";

export const MyBook = ({ book, isReading }) => {
  return (
    <div className={styles.myBookContainer}>
      <div className={styles.coverWrapper}>
        <img
          src={book.imageUrl || book.cover || "https://placehold.co/220x320/262626/FFFFFF?text=No+Cover"}
          alt={book.title}
        />
      </div>
      <h3 className={styles.bookTitle}>{book.title}</h3>
      <p className={styles.bookAuthor}>{book.author}</p>
      
      <div className={styles.statusBadge}>
        <span className={isReading ? styles.readingDot : styles.stoppedDot}></span>
      </div>
    </div>
  );
};