import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, admin = false }) {
  const role = sessionStorage.getItem("role");

  // not logged in
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // admin route protection
  if (admin && role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}
