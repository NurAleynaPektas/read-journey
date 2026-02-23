import { useEffect, useState } from "react";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getRecommendedBooks } from "../api/books";
import s from "./RecommendedBooks.module.css";

export default function RecommendedBooks() {
  const [page, setPage] = useState(1);
  const limit = 8;

  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let alive = true;

    async function run() {
      setLoading(true);
      try {
        const data = await getRecommendedBooks({ page, limit });

        if (!alive) return;
console.log("RECOMMEND RESPONSE:", data);
console.log("FIRST BOOK:", data?.results?.[0]);
        setBooks(Array.isArray(data?.results) ? data.results : []);
        setTotalPages(Number(data?.totalPages) || 1);
      } catch (err) {
        if (!alive) return;
        iziToast.error({
          title: "Error",
          message:
            err?.response?.data?.message ||
            err?.message ||
            "Failed to load recommended books",
          position: "topRight",
        });
      } finally {
        if (alive) setLoading(false);
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, [page]);

  const prevDisabled = page === 1 || loading;
  const nextDisabled = page === totalPages || loading;

  return (
    <div className={s.wrap}>
      <div className={s.topRow}>
        <h2 className={s.title}>Recommended</h2>

        <div className={s.pagination}>
          <button
            className={s.pageBtn}
            onClick={() => setPage((p) => p - 1)}
            disabled={prevDisabled}
          >
            ←
          </button>

          <span className={s.pageIndicator}>
            {page} / {totalPages}
          </span>

          <button
            className={s.pageBtn}
            onClick={() => setPage((p) => p + 1)}
            disabled={nextDisabled}
          >
            →
          </button>
        </div>
      </div>

      {loading ? (
        <p className={s.loading}>Loading...</p>
      ) : (
        <ul className={s.grid}>
          {books.map((b) => (
            <li key={b._id} className={s.card}>
              <button type="button" className={s.cardBtn}>
                <img
                  className={s.coverImg}
                  src={b.imageUrl}
                  alt={b.title}
                  loading="lazy"
                />
                <div className={s.meta}>
                  <p className={s.bookTitle}>{b.title}</p>
                  <p className={s.bookAuthor}>{b.author}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
