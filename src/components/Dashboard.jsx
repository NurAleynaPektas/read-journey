import s from "./Dashboard.module.css";

export default function Dashboard({ variant = "recommended", children }) {
  return (
    <div className={s.grid}>
      <aside className={s.panel}>
        {variant === "recommended" ? (
          <>
            <h3 className={s.panelTitle}>Filters</h3>

            <form className={s.filters} onSubmit={(e) => e.preventDefault()}>
              <label className={s.label}>
                Title
                <input className={s.input} placeholder="Book title" />
              </label>

              <label className={s.label}>
                Author
                <input className={s.input} placeholder="Author" />
              </label>

              <button className={s.applyBtn} type="submit">
                To apply
              </button>
            </form>

            <div className={s.infoBox}>
              <p className={s.infoText}>
                Here you can find recommended books. Add them to your library
                and start reading.
              </p>
              <a className={s.link} href="/library">
                Go to My library
              </a>
            </div>

            <div className={s.quote}>
              <p className={s.quoteText}>
                “A reader lives a thousand lives before he dies.”
              </p>
              <p className={s.quoteAuthor}>— George R.R. Martin</p>
            </div>
          </>
        ) : (
          <div className={s.panelTitle}>Dashboard</div>
        )}
      </aside>

      <section className={s.content}>{children}</section>
    </div>
  );
}
