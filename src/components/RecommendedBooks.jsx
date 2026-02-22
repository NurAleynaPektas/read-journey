import s from "./RecommendedBooks.module.css";

const MOCK = Array.from({ length: 8 }).map((_, i) => ({
  id: String(i + 1),
  title: `Book title ${i + 1}`,
  author: `Author ${i + 1}`,
}));

export default function RecommendedBooks() {
  return (
    <div className={s.wrap}>
      <div className={s.topRow}>
        <h2 className={s.title}>Recommended</h2>

        <div className={s.pagination}>
          <button className={s.pageBtn} disabled>
            ←
          </button>
          <button className={s.pageBtn}>→</button>
        </div>
      </div>

      <ul className={s.grid}>
        {MOCK.map((b) => (
          <li key={b.id} className={s.card}>
            <div className={s.cover} />
            <div className={s.meta}>
              <p className={s.bookTitle}>{b.title}</p>
              <p className={s.bookAuthor}>{b.author}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
