import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import { logOut } from "../../redux/auth/operations";

export const Navigation = () => {
      const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = useSelector((state) => state.auth.user) || { name: "" };
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "U");

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <svg width="24" height="17">
          <use href="../../../image/icons.svg#icon-logo"></use>
        </svg>
        <span>READ JOURNEY</span>
      </div>

      <nav className={styles.desktopNav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.activeNavLink}`
              : styles.navLink
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/library"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.activeNavLink}`
              : styles.navLink
          }
        >
          My library
        </NavLink>
      </nav>

      <div className={styles.userBlock}>
        <div className={styles.avatar}>{getInitial(user.name)}</div>
        <span className={styles.userName}>{user.name}</span>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Log out
        </button>
        <button
          className={styles.burgerBtn}
          onClick={() => setIsMenuOpen(true)}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div
          className={styles.mobileMenuOverlay}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={styles.mobileMenuContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <nav className={styles.mobileNav}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.activeNavLink}`
                    : styles.navLink
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/library"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.activeNavLink}`
                    : styles.navLink
                }
              >
                My library
              </NavLink>
            </nav>
            <button
              className={styles.logoutBtn}
              style={{ display: "block", width: "100%" }}
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
