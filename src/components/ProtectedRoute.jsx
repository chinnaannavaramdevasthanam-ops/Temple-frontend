import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, admin = false }) {
  const token = sessionStorage.getItem("token");
const role = sessionStorage.getItem("role");


  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Admin-only route
  if (admin && role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}
