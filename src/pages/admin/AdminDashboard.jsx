import { useEffect, useState } from "react";
import api from "../../services/api";
import "./AdminDashboard.css"; 

export default function AdminDashboard() {
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalSevas: 0,
    totalDonationAmount: 0
  });
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const statsRes = await api.get("/admin/stats");
      const donationRes = await api.get("/donations/all");

      setStats(statsRes.data);
      setDonations(donationRes.data);
    } catch (err) {
      console.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const approveDonation = async (id) => {
    try {
      await api.patch(`/admin/donations/${id}`, {
        status: "SUCCESS" 
      });
      alert("✅ Donation approved successfully");
      loadDashboard(); 
    } catch {
      alert("❌ Approval failed. Please try again.");
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner-border text-gold" role="status"></div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-page-wrapper">
      
      {/* --- HEADER --- */}
      <div className="dashboard-header mb-4">
        <h2 className="admin-page-title">Temple Overview</h2>
        <p className="admin-subtitle">Key metrics and recent donation activities</p>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="stats-grid mb-5">
        <div className="stat-card">
          <div className="stat-label">Total Users</div>
          <div className="stat-value">{stats.totalUsers || 0}</div>
          <div className="stat-icon">👥</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Total Bookings</div>
          <div className="stat-value">{stats.totalBookings || 0}</div>
          <div className="stat-icon">📅</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Active Sevas</div>
          <div className="stat-value">{stats.totalSevas || 0}</div>
          <div className="stat-icon">🪔</div>
        </div>
        
        <div className="stat-card highlight-card">
          <div className="stat-label">Total Donations</div>
          <div className="stat-value">₹ {stats.totalDonationAmount || 0}</div>
          <div className="stat-icon">💰</div>
        </div>
      </div>

      {/* --- DONATIONS TABLE --- */}
      <div className="section-header-row mb-3">
        <h3 className="section-title">Donation Approvals</h3>
        <button className="gold-btn-outline btn-sm" onClick={loadDashboard}>
          Refresh List
        </button>
      </div>

      {donations.length === 0 ? (
        <div className="empty-state-admin">
          <p>No donation records found.</p>
        </div>
      ) : (
        <div className="table-container shadow-sm">
          <table className="devotional-table">
            <thead>
              <tr>
                <th>Devotee / User</th>
                <th>Amount</th>
                <th>Transaction ID</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d) => (
                <tr key={d.id}>
                  <td className="fw-bold text-primary-blue">
                    {d.user?.email || "Unknown User"}
                  </td>
                  <td className="amount-cell">₹ {d.amount}</td>
                  <td className="mono-text">{d.razorpayId || "N/A"}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        d.paymentStatus === "SUCCESS"
                          ? "status-success"
                          : d.paymentStatus === "CREATED" || d.paymentStatus === "PENDING"
                          ? "status-warning"
                          : "status-secondary"
                      }`}
                    >
                      {d.paymentStatus}
                    </span>
                  </td>
                  <td>
                    {(d.paymentStatus === "CREATED" || d.paymentStatus === "PENDING") ? (
                      <button
                        className="approve-btn"
                        onClick={() => approveDonation(d.id)}
                      >
                        Approve
                      </button>
                    ) : (
                      <span className="text-muted small">No Action</span>
                    )}
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