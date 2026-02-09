import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminSevas() {
  const [sevas, setSevas] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    totalSlots: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadSevas = async () => {
    const res = await api.get("/admin/sevas");
    setSevas(res.data);
  };

  useEffect(() => {
    loadSevas();
  }, []);

  const createSeva = async () => {
    setError("");
    setSuccess("");

    try {
      await api.post("/sevas", {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        totalSlots: Number(form.totalSlots)
      });

      setSuccess("Seva created successfully");
      setForm({ name: "", description: "", price: "", totalSlots: "" });
      loadSevas();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create seva");
    }
  };

  const toggleSeva = async (id) => {
    await api.patch(`/sevas/${id}/toggle`);
    loadSevas();
  };

  return (
    <div>
      <h3 className="mb-3">Admin – Manage Sevas</h3>

      {/* CREATE SEVA */}
      <div className="card p-3 mb-4">
        <h5>Add New Seva</h5>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <input
          className="form-control mb-2"
          placeholder="Seva Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <input
          className="form-control mb-2"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
        />

        <input
          className="form-control mb-3"
          type="number"
          placeholder="Total Tickets"
          value={form.totalSlots}
          onChange={e => setForm({ ...form, totalSlots: e.target.value })}
        />

        <button className="btn btn-danger" onClick={createSeva}>
          Create Seva
        </button>
      </div>

      {/* LIST */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Seva</th>
            <th>Price</th>
            <th>Total Tickets</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sevas.map(seva => (
            <tr key={seva.id}>
              <td>{seva.name}</td>
              <td>₹{seva.price}</td>
              <td>{seva.totalSlots}</td>
              <td>
                {seva.active ? (
                  <span className="badge bg-success">Active</span>
                ) : (
                  <span className="badge bg-secondary">Inactive</span>
                )}
              </td>
              <td>
                <button
                  className={`btn btn-sm ${
                    seva.active ? "btn-warning" : "btn-success"
                  }`}
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
  );
}
