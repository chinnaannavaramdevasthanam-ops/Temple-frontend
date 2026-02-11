import { useEffect, useState } from "react";
import api from "../../services/api";
import "./AdminBookings.css"; // Ensure this file is created

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    try {
      const res = await api.get("/bookings/all");
      setBookings(res.data);
    } catch {
      alert("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner-border text-gold" role="status"></div>
        <p>Loading records...</p>
      </div>
    );
  }

  return (
    <div className="admin-page-wrapper">
      <div className="admin-header-row">
        <div>
          <h2 className="admin-page-title">All Seva Bookings</h2>
          <p className="admin-subtitle">Manage devotee reservations</p>
        </div>
        <button className="gold-btn-outline" onClick={loadBookings}>
          Refresh Data
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-state-admin">
          <p>No bookings found in the system.</p>
        </div>
      ) : (
        <div className="table-container shadow-sm">
          <table className="devotional-table">
            <thead>
              <tr>
                <th>Devotee Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Seva Name</th>
                <th>Seva Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td className="fw-bold text-primary-blue">
                    {b.user?.name || "N/A"}
                  </td>
                  <td>{b.user?.phone || "N/A"}</td>
                  <td>{b.user?.email || "N/A"}</td>
                  <td className="seva-name-cell">{b.seva?.name || "N/A"}</td>
                  <td>
                    {new Date(b.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        b.status === "CONFIRMED"
                          ? "status-success"
                          : b.status === "PENDING"
                          ? "status-warning"
                          : "status-secondary"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}