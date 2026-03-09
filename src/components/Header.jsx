import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signOut } from "../api/auth";
import { clearAuth } from "../features/auth/authSlice";
import s from "./Header.module.css";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem("rj_token");
      localStorage.removeItem("rj_refreshToken");

      dispatch(clearAuth());
      setOpen(false);
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <div className={s.logo}>READ JOURNEY</div>

        <div className={s.right}>
          <div className={s.userCircle}>
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <button
            type="button"
            className={s.logoutDesktop}
            onClick={handleLogout}
          >
            Log out
          </button>

          <button
            type="button"
            className={s.burger}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            ☰
          </button>
        </div>

        <nav className={`${s.nav} ${open ? s.open : ""}`}>
          <NavLink
            to="/recommended"
            className={({ isActive }) =>
              isActive ? `${s.link} ${s.active}` : s.link
            }
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/library"
            className={({ isActive }) =>
              isActive ? `${s.link} ${s.active}` : s.link
            }
            onClick={() => setOpen(false)}
          >
            My library
          </NavLink>

          <button
            type="button"
            className={s.logoutMobile}
            onClick={handleLogout}
          >
            Log out
          </button>
        </nav>
      </div>
    </header>
  );
}
