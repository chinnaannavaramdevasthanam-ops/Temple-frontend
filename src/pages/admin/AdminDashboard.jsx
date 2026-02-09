import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [donations, setDonations] = useState([]);

  const loadDashboard = async () => {
    const statsRes = await api.get("/admin/stats");
    const donationRes = await api.get("/donations/all");

    setStats(statsRes.data);
    setDonations(donationRes.data);
  };

  const approveDonation = async (id) => {
    try {
      await api.patch(`/admin/donations/${id}`, {
  status: "SUCCESS"
});

      alert("Donation approved");
      loadDashboard();
    } catch {
      alert("Approval failed");
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <>
      <h3>Admin Dashboard</h3>

      {/* STATS */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card p-3">Users: <b>{stats.totalUsers}</b></div>
        </div>
        <div className="col-md-3">
          <div className="card p-3">Bookings: <b>{stats.totalBookings}</b></div>
        </div>
        <div className="col-md-3">
          <div className="card p-3">Sevas: <b>{stats.totalSevas}</b></div>
        </div>
        <div className="col-md-3">
          <div className="card p-3">
            Donations: <b>₹ {stats.totalDonationAmount}</b>
          </div>
        </div>
      </div>

      {/* DONATIONS */}
      <h4>Donation Approvals</h4>

      {donations.length === 0 ? (
        <p>No donations yet</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>User</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map(d => (
              <tr key={d.id}>
                <td>{d.user.email}</td>
                <td>₹ {d.amount}</td>
                <td>{d.razorpayId}</td>
                <td>
                  <span className={`badge ${d.paymentStatus === "SUCCESS" ? "bg-success" : "bg-warning"}`}>
                    {d.paymentStatus}
                  </span>
                </td>
                <td>
                  {d.paymentStatus === "CREATED" && (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => approveDonation(d.id)}
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
    </>
  );
}
