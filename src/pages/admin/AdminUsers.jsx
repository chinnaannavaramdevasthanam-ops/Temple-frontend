import { useEffect, useState } from "react";
import api from "../../services/api";
import "./AdminUsers.css"; 

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch {
      alert("Failed to load users list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner-border text-gold" role="status"></div>
        <p>Loading Devotee Directory...</p>
      </div>
    );
  }

  return (
    <div className="admin-page-wrapper">
      
      {/* --- HEADER --- */}
      <div className="admin-header-row mb-4">
        <div>
          <h2 className="admin-page-title">Registered Users</h2>
          <p className="admin-subtitle">Directory of all devotees and admins</p>
        </div>
        <div className="header-actions">
           <span className="count-badge">Total: {users.length}</span>
           <button className="gold-btn-outline" onClick={loadUsers}>
             Refresh List
           </button>
        </div>
      </div>

      {/* --- USERS TABLE --- */}
      {users.length === 0 ? (
        <div className="empty-state-admin">
          <p>No registered users found.</p>
        </div>
      ) : (
        <div className="table-container shadow-sm">
          <table className="devotional-table">
            <thead>
              <tr>
                <th>Devotee Name</th>
                <th>Phone Number</th>
                <th>Email Address</th>
                <th>Role</th>
                <th>Joined On</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="fw-bold text-primary-blue">{u.name}</td>
                  <td className="mono-text">{u.phone}</td>
                  <td>{u.email}</td>
                  <td>
                    <span
                      className={`role-badge ${
                        u.role === "ADMIN" ? "role-admin" : "role-user"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td>
                    {new Date(u.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
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