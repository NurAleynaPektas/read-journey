import Dashboard from "../components/Dashboard";
import AddBook from "../components/AddBook";
import MyLibraryBooks from "../components/MyLibraryBooks";
import s from "./LibraryPage.module.css";

export default function LibraryPage() {
  return (
    <div className={s.page}>
      <Dashboard variant="library">
        <MyLibraryBooks />
      </Dashboard>
      <div className={s.mobileAddBook}>
        <AddBook />
      </div>
    </div>
  );
}
