import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { clearAuth } from "../features/auth/authSlice";
import s from "./Header.module.css";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(clearAuth());
      navigate("/login");
    }
  };

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <div className={s.logo}>READ JOURNEY</div>

        {/* RIGHT SIDE */}
        <div className={s.right}>
          <div className={s.userCircle}>{user?.name?.charAt(0) || "U"}</div>

          <button className={s.logoutDesktop} onClick={handleLogout}>
            Log out
          </button>

          <button className={s.burger} onClick={() => setOpen((v) => !v)}>
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

          <button className={s.logoutMobile} onClick={handleLogout}>
            Log out
          </button>
        </nav>
      </div>
    </header>
  );
}
