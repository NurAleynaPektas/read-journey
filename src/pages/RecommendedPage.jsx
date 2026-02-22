import Dashboard from "../components/Dashboard";
import RecommendedBooks from "../components/RecommendedBooks";
import s from "./RecommendedPage.module.css";

export default function RecommendedPage() {
  return (
    <div className={s.page}>
      <Dashboard variant="recommended">
        <RecommendedBooks />
      </Dashboard>
    </div>
  );
}
