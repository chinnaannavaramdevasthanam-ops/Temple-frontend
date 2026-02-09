import { useEffect, useState } from "react";
import api from "../services/api";

export default function Sevas() {
  const [sevas, setSevas] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    api.get("/sevas").then(res => setSevas(res.data));
  }, []);

  const bookSeva = async (sevaId) => {
    if (!date) {
      alert("Please select date");
      return;
    }

    try {
      await api.post("/bookings", { sevaId, date });
      alert("Seva booked successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <>
      <h3 className="mb-3">Available Sevas</h3>

      <input
        type="date"
        className="form-control mb-3"
        value={date}
        onChange={e => setDate(e.target.value)}
      />

      <div className="row">
        {sevas.map(seva => (
          <div className="col-md-4 mb-4" key={seva.id}>
            <div className="card p-3 h-100">
              <h5>{seva.name}</h5>
              <p>{seva.description}</p>

              <p><b>Price:</b> ₹{seva.price}</p>
              <p><b>Total Tickets:</b> {seva.totalSlots}</p>

              <button
                className="btn btn-danger mt-auto"
                onClick={() => bookSeva(seva.id)}
              >
                Book Seva
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
