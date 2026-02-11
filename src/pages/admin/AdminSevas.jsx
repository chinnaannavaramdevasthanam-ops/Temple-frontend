import { useEffect, useState } from "react";
import api from "../../services/api";
import "./AdminSevas.css"; // Ensure this file is created

export default function AdminSevas() {
  const [sevas, setSevas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    totalSlots: "",
    date: "" 
  });
  
  const [isDaily, setIsDaily] = useState(true); 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadSevas = async () => {
    try {
      const res = await api.get("/admin/sevas"); 
      setSevas(res.data);
    } catch (err) {
      console.error("Failed to load sevas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSevas();
  }, []);

  const createSeva = async () => {
    setError("");
    setSuccess("");
    
    // Validation
    if (!form.name || !form.price || !form.totalSlots) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!isDaily && !form.date) {
      setError("Please select a date for the specific Seva.");
      return;
    }

    try {
      setSubmitting(true);
      
      // Prepare Payload
      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        totalSlots: Number(form.totalSlots),
        date: isDaily ? null : form.date, 
        isDaily: isDaily 
      };

      await api.post("/sevas", payload);

      setSuccess("✅ Seva created successfully");
      
      // Reset Form
      setForm({ name: "", description: "", price: "", totalSlots: "", date: "" });
      setIsDaily(true);
      loadSevas();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create seva");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleSeva = async (id) => {
    try {
      await api.patch(`/sevas/${id}/toggle`);
      loadSevas();
    } catch {
      alert("Failed to update status");
    }
  };

  return (
    <div className="admin-page-wrapper">
      
      {/* --- HEADER --- */}
      <div className="admin-header-row mb-4">
        <div>
          <h2 className="admin-page-title">Manage Sevas</h2>
          <p className="admin-subtitle">Create and update temple services</p>
        </div>
        <div className="header-actions">
           <span className="count-badge">Total Sevas: {sevas.length}</span>
        </div>
      </div>

      {/* --- CREATE SEVA FORM CARD --- */}
      <div className="seva-form-card mb-5">
        <div className="card-header-decor"></div>
        <h4 className="form-title">Add New Seva</h4>

        {error && <div className="devotional-alert error mb-3">{error}</div>}
        {success && <div className="devotional-alert success mb-3">{success}</div>}

        <div className="row g-3">
          {/* Name */}
          <div className="col-md-6">
            <label className="form-label">Seva Name</label>
            <input
              className="form-control-custom"
              placeholder="e.g. Special Abhishekam"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Price */}
          <div className="col-md-3">
            <label className="form-label">Price (₹)</label>
            <input
              className="form-control-custom"
              type="number"
              placeholder="0"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
            />
          </div>

          {/* Slots */}
          <div className="col-md-3">
            <label className="form-label">Total Tickets</label>
            <input
              className="form-control-custom"
              type="number"
              placeholder="100"
              value={form.totalSlots}
              onChange={e => setForm({ ...form, totalSlots: e.target.value })}
            />
          </div>

          {/* Description */}
          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea
              className="form-control-custom"
              rows="2"
              placeholder="Details about the seva..."
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
          </div>

          {/* --- DATE TOGGLE SECTION --- */}
          <div className="col-12 mt-4">
            <label className="form-label mb-2">Schedule Type:</label>
            <div className="schedule-toggle-group">
              <label className={`toggle-btn ${isDaily ? "active" : ""}`}>
                <input 
                  type="radio" 
                  name="schedule" 
                  checked={isDaily} 
                  onChange={() => setIsDaily(true)} 
                  className="d-none"
                />
                Daily Seva (All Days)
              </label>

              <label className={`toggle-btn ${!isDaily ? "active" : ""}`}>
                <input 
                  type="radio" 
                  name="schedule" 
                  checked={!isDaily} 
                  onChange={() => setIsDaily(false)} 
                  className="d-none"
                />
                Specific Date
              </label>
            </div>
          </div>

          {/* Date Input (Only visible if specific date selected) */}
          {!isDaily && (
            <div className="col-md-6 mt-3 fade-in">
              <label className="form-label text-gold">Select Date</label>
              <input
                type="date"
                className="form-control-custom border-gold"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="col-12 mt-4">
            <button 
              className="gold-btn-solid w-100" 
              onClick={createSeva}
              disabled={submitting}
            >
              {submitting ? "Creating..." : "Create Seva"}
            </button>
          </div>
        </div>
      </div>

      {/* --- SEVAS LIST TABLE --- */}
      {loading ? (
        <div className="admin-loading">
          <div className="spinner-border text-gold" role="status"></div>
          <p>Loading Sevas...</p>
        </div>
      ) : (
        <div className="table-container shadow-sm">
          <table className="devotional-table">
            <thead>
              <tr>
                <th>Seva Name</th>
                <th>Schedule</th>
                <th>Price</th>
                <th>Tickets</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sevas.map(seva => (
                <tr key={seva.id}>
                  <td className="fw-bold text-primary-blue">{seva.name}</td>
                  
                  {/* Schedule Column */}
                  <td>
                    {seva.date ? (
                      <span className="badge-date">
                         📅 {new Date(seva.date).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    ) : (
                      <span className="badge-daily">🔄 Daily</span>
                    )}
                  </td>

                  <td className="amount-cell">₹ {seva.price}</td>
                  <td>{seva.totalSlots}</td>
                  
                  <td>
                    {seva.active ? (
                      <span className="status-badge status-success">Active</span>
                    ) : (
                      <span className="status-badge status-secondary">Inactive</span>
                    )}
                  </td>
                  
                  <td>
                    <button
                      className={`action-btn-sm ${seva.active ? "btn-outline-danger" : "btn-outline-success"}`}
                      onClick={() => toggleSeva(seva.id)}
                    >
                      {seva.active ? "Deactivate" : "Activate"}
                    </button>
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