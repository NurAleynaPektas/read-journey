import { useEffect } from "react";
import s from "./BookModal.module.css";

export default function BookModal({ book, onClose, onAdd }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!book) return null;

  return (
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <button className={s.closeBtn} onClick={onClose}>
          ✕
        </button>

        <img src={book.imageUrl} alt={book.title} className={s.cover} />

        <h3 className={s.title}>{book.title}</h3>
        <p className={s.author}>{book.author}</p>

        <button className={s.addBtn} onClick={() => onAdd(book._id)}>
          Add to library
        </button>
      </div>
    </div>
  );
}
