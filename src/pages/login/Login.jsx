import { useState } from "react";
import { AuthLayout } from "../../components/authLayout/AuthLayout";
import styles from "../../components/authLayout/AuthLayout.module.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../../redux/auth/operations";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(logIn(formData))
      .unwrap()
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("login error:", error);
      });
  };

  return (
    <AuthLayout>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <span className={styles.inputLabel}>Mail:</span>
          <input
            type="email"
            className={styles.input}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <span className={styles.inputLabel}>Password:</span>
          <input
            type={showPassword ? "text" : "password"}
            className={styles.input}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowPassword(!showPassword)}
          >
            <EyeIcon />
          </button>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submitBtn}>
            Log In
          </button>
          <Link to="/register" className={styles.switchLink}>
            Don't have an account?
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

const EyeIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);
