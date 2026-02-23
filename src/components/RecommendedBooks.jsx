import { useState, useEffect } from "react";
import s from "./RecommendedBooks.module.css";

const TOTAL_PAGES = 5;

export default function RecommendedBooks() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);

      console.log("Fetching page:", page);

      await new Promise((resolve) => setTimeout(resolve, 600));

      const mock = Array.from({ length: 8 }).map((_, i) => ({
        id: `${page}-${i + 1}`,
        title: `Book ${i + 1} (Page ${page})`,
        author: `Author ${i + 1}`,
      }));

      setBooks(mock);
      setLoading(false);
    };

    fetchBooks();
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const handleNext = () => {
    if (page < TOTAL_PAGES) setPage((p) => p + 1);
  };

  return (
    <div className={s.wrap}>
      <div className={s.topRow}>
        <h2 className={s.title}>Recommended</h2>

        <div className={s.pagination}>
          <button
            className={s.pageBtn}
            onClick={handlePrev}
            disabled={page === 1 || loading}
          >
            ←
          </button>

          <span className={s.pageIndicator}>
            {page} / {TOTAL_PAGES}
          </span>

          <button
            className={s.pageBtn}
            onClick={handleNext}
            disabled={page === TOTAL_PAGES || loading}
          >
            →
          </button>
        </div>
      </div>

      {loading ? (
        <p style={{ marginTop: 20 }}>Loading...</p>
      ) : (
        <ul className={s.grid}>
          {books.map((b) => (
            <li key={b.id} className={s.card}>
              <div className={s.cover} />
              <div className={s.meta}>
                <p className={s.bookTitle}>{b.title}</p>
                <p className={s.bookAuthor}>{b.author}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
