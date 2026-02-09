import { useEffect, useState } from "react";
import api from "../../services/api";

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
    return <p>Loading bookings...</p>;
  }

  return (
    <div>
      <h4 className="mb-3">All Seva Bookings</h4>

      {bookings.length === 0 ? (
        <p className="text-muted">No bookings yet</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>User</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Seva</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map(b => (
                <tr key={b.id}>
                  <td>{b.user.name}</td>
                  <td>{b.user.phone}</td>
                  <td>{b.user.email}</td>
                  <td>{b.seva.name}</td>
                  <td>{new Date(b.date).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        b.status === "CONFIRMED"
                          ? "bg-success"
                          : b.status === "PENDING"
                          ? "bg-warning"
                          : "bg-secondary"
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
