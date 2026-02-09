import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      const res = await api.post("/auth/login", { email, password });

      // Save token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // Redirect based on role
      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message;

      if (status === 404) {
        setError("User not found");
      } else if (status === 401) {
        setError("Incorrect password");
      } else {
        setError(message || "Login failed");
      }
    }
  };

  return (
    <div className="col-md-4 mx-auto mt-4">
      <h3 className="mb-3 text-center">Login</h3>

      {error && (
        <div className="alert alert-danger py-2">
          {error}
          {error === "User not found" && (
            <div className="mt-2">
              <Link to="/register" className="small">
                New user? Register here
              </Link>
            </div>
          )}
        </div>
      )}

      <input
        className="form-control mb-2"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        className="form-control mb-3"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button className="btn btn-danger w-100" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
