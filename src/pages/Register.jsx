import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!name || !phone || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/auth/register", {
        name,
        phone,
        email,
        password,
        confirmPassword
      });

      setSuccess("Registration successful. Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="col-md-4 mx-auto mt-4">
      <h3 className="mb-3 text-center">Register</h3>

      {error && (
        <div className="alert alert-danger py-2">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success py-2">
          {success}
        </div>
      )}

      <input
        className="form-control mb-2"
        placeholder="Full Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Phone Number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        className="form-control mb-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <input
        className="form-control mb-3"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
      />

      <button className="btn btn-danger w-100" onClick={handleRegister}>
        Register
      </button>

      <div className="text-center mt-3">
        <Link to="/login" className="small">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}
