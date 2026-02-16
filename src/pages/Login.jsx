import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("Please enter valid email and password.");
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", { email, password });

      // store only role
      sessionStorage.setItem("role", res.data.role);

      // redirect
      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message;

      if (status === 404)
        setError("User account not found.");
      else if (status === 401)
        setError("Incorrect password.");
      else
        setError(message || "Login failed. Please try again.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card shadow-lg">

        {/* HEADER */}
        <div className="text-center mb-4">
          <h2 className="devotional-title-small">Welcome Back</h2>
          <div className="divider-om">
            <span className="om-symbol-small">ॐ</span>
          </div>
          <p className="login-subtitle">Login to access Seva bookings</p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="devotional-alert">
            {error}
            {error.includes("not found") && (
              <div className="mt-2">
                <Link to="/register" className="alert-link">
                  New user? <strong>Register here</strong>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label className="input-label">Email Address</label>
            <input
              className="devotional-input"
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group mb-4">
            <label className="input-label">Password</label>
            <input
              className="devotional-input"
              type="password"
              value={password}
              placeholder="Enter your password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="gold-btn-solid w-100"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="text-center mt-4 login-footer">
          <p>Don't have an account?</p>
          <Link to="/register" className="register-link">
            Create New Account
          </Link>
        </div>

      </div>
    </div>
  );
}
