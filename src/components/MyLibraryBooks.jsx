import { useEffect, useMemo, useState } from "react";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getOwnBooks, removeBook } from "../api/library";
import s from "./MyLibraryBooks.module.css";

function normalizeOwnResponse(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}

export default function MyLibraryBooks() {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("all"); 

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await getOwnBooks();
      setBooks(normalizeOwnResponse(data));
    } catch (err) {
      iziToast.error({
        title: "Error",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load library",
        position: "topRight",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();

    const onUpdate = () => fetchBooks();
    window.addEventListener("rj:library-updated", onUpdate);
    return () => window.removeEventListener("rj:library-updated", onUpdate);
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return books;

    return books.filter((b) => {
      const status = (b?.status || b?.readingStatus || "").toLowerCase();

      if (filter === "unread")
        return status === "unread" || status === "not started" || status === "";
      if (filter === "reading")
        return status === "reading" || status === "in progress";
      if (filter === "done")
        return (
          status === "done" || status === "finished" || status === "completed"
        );
      return true;
    });
  }, [books, filter]);

  const handleRemove = async (id) => {
    try {
      await removeBook(id);
      iziToast.success({
        title: "Success",
        message: "Book removed",
        position: "topRight",
      });
      setBooks((prev) => prev.filter((b) => (b._id || b.id) !== id));
    } catch (err) {
      iziToast.error({
        title: "Error",
        message:
          err?.response?.data?.message || err?.message || "Remove failed",
        position: "topRight",
      });
    }
  };

  return (
    <div className={s.wrap}>
      <div className={s.topRow}>
        <h2 className={s.title}>My library</h2>

        <select
          className={s.select}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="unread">Unread</option>
          <option value="reading">In progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {loading ? (
        <p className={s.loading}>Loading...</p>
      ) : (
        <ul className={s.grid}>
          {filtered.map((b) => {
            const id = b._id || b.id;
            return (
              <li key={id} className={s.card}>
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

                <button
                  className={s.removeBtn}
                  type="button"
                  onClick={() => handleRemove(id)}
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {!loading && filtered.length === 0 && (
        <p className={s.empty}>No books yet.</p>
      )}
    </div>
  );
}
