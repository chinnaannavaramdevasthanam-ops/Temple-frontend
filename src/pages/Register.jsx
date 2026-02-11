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

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); 
    setError("");
    setSuccess("");

    if (!name || !phone || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
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
        
        {/* --- HEADER --- */}
        <div className="text-center mb-4">
          <h2 className="devotional-title-small">Create Account</h2>
          <div className="divider-om">
            <span className="om-symbol-small">ॐ</span>
          </div>
          <p className="register-subtitle">Join our spiritual community</p>
        </div>

        {/* --- ALERTS --- */}
        {error && (
          <div className="devotional-alert error">
            {error}
          </div>
        )}

        {success && (
          <div className="devotional-alert success">
            {success}
          </div>
        )}

        {/* --- FORM --- */}
        <form onSubmit={handleRegister}>
          <div className="form-group mb-3">
            <label className="input-label">Full Name</label>
            <input
              className="devotional-input"
              placeholder="e.g. Siva Kumar"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label className="input-label">Phone Number</label>
            <input
              className="devotional-input"
              placeholder="e.g. 98765 43210"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>

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
            <div className="col-md-6 form-group mb-3">
              <label className="input-label">Password</label>
              <input
                className="devotional-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
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

          <button type="submit" className="gold-btn-solid w-100">
            Register
          </button>
        </form>

        {/* --- FOOTER LINKS --- */}
        <div className="text-center mt-4 register-footer">
          <Link to="/login" className="login-link">
            Already have an account? <strong>Login here</strong>
          </Link>
        </div>

      </div>
    </div>
  );
}