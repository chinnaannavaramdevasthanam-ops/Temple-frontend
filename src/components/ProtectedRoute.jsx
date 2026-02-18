import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function ProtectedRoute({ children, admin = false }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    api.get("/auth/me")
      .then((res) => {
        if (admin && res.data.role !== "ADMIN") {
          setAuthorized(false);
        } else {
          setAuthorized(true);
        }
      })
      .catch(() => setAuthorized(false))
      .finally(() => setLoading(false));
  }, [admin]);

  if (loading) return null;

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
