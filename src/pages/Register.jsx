import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [strength, setStrength] = useState(null);

  const navigate = useNavigate();

  /* ================= PASSWORD STRENGTH CHECK ================= */
  const checkStrength = (pass) => {
    let score = 0;

    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/\d/.test(pass)) score++;
    if (/[@$!%*?&]/.test(pass)) score++;

    if (score <= 2) return { label: "Weak", color: "#e74c3c", width: "33%" };
    if (score === 3 || score === 4)
      return { label: "Medium", color: "#f39c12", width: "66%" };

    return { label: "Strong", color: "#27ae60", width: "100%" };
  };

  /* ================= REGISTER ================= */
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !phone || !email || !password || !confirmPassword) {
      return setError("All fields are required.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    if (strength?.label === "Weak") {
      return setError("Please choose a stronger password.");
    }

    try {
      await api.post("/auth/register", {
        name,
        phone,
        email,
        password,
        confirmPassword
      });

      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-card shadow-lg">

        {/* HEADER */}
        <div className="text-center mb-4">
          <h2 className="devotional-title-small">Create Account</h2>
          <div className="divider-om">
            <span className="om-symbol-small">ॐ</span>
          </div>
          <p className="register-subtitle">Join our spiritual community</p>
        </div>

        {/* ALERTS */}
        {error && <div className="devotional-alert error">{error}</div>}
        {success && <div className="devotional-alert success">{success}</div>}

        {/* FORM */}
        <form onSubmit={handleRegister}>

          {/* NAME */}
          <div className="form-group mb-3">
            <label className="input-label">Full Name</label>
            <input
              className="devotional-input"
              placeholder="e.g. Siva Kumar"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          {/* PHONE */}
          <div className="form-group mb-3">
            <label className="input-label">Phone Number</label>
            <input
              className="devotional-input"
              placeholder="e.g. 9876543210"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div className="form-group mb-3">
            <label className="input-label">Email Address</label>
            <input
              className="devotional-input"
              type="email"
              placeholder="e.g. devotee@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="row">

            {/* PASSWORD */}
            <div className="col-md-6 form-group mb-3">
              <label className="input-label">Password</label>
              <input
                className="devotional-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setStrength(checkStrength(e.target.value));
                }}
              />

              {/* STRENGTH BAR */}
              {password && strength && (
                <div style={{ marginTop: 8 }}>
                  <div
                    style={{
                      height: 6,
                      borderRadius: 5,
                      width: strength.width,
                      background: strength.color,
                      transition: "all 0.3s"
                    }}
                  />
                  <small style={{ color: strength.color }}>
                    {strength.label} password
                  </small>
                </div>
              )}

              <small className="text-muted">
                Must include uppercase, lowercase, number & symbol
              </small>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="col-md-6 form-group mb-4">
              <label className="input-label">Confirm Password</label>
              <input
                className="devotional-input"
                type="password"
                placeholder="Confirm"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {/* SUBMIT */}
          <button type="submit" className="gold-btn-solid w-100">
            Register
          </button>
        </form>

        {/* FOOTER */}
        <div className="text-center mt-4 register-footer">
          <Link to="/login" className="login-link">
            Already have an account? <strong>Login here</strong>
          </Link>
        </div>

      </div>
    </div>
  );
}
