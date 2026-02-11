import { useEffect, useState } from "react";
import api from "../services/api";
import "./Sevas.css"; 
export default function Sevas() {
  const [sevas, setSevas] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    api.get("/sevas").then(res => setSevas(res.data));
  }, []);

  const bookSeva = async (sevaId) => {
    if (!date) {
      alert("Please select a date for the Seva.");
      return;
    }

    try {
      await api.post("/bookings", {
        sevaId,
        date
      });
      alert("🙏 Seva booked successfully! May God bless you.");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed. Please try again.");
    }
  };

  return (
    <div className="sevas-page-wrapper">
      <div className="container py-5">
        
        {/* --- HEADER SECTION --- */}
        <div className="text-center mb-5">
          <h1 className="devotional-header">Sacred Seva Booking</h1>
          <div className="header-divider">
            <span className="om-symbol">ॐ</span>
          </div>
          <p className="devotional-subtitle">
            Choose a sacred date and perform Sevas to seek the divine blessings of Sri Satyanarayana Swamy.
          </p>
        </div>

        {/* --- DATE SELECTION --- */}
        <div className="date-selection-wrapper">
          <label className="date-label">Select Seva Date:</label>
          <div className="input-group-custom">
            <input
              type="date"
              className="devotional-date-input"
              onChange={e => setDate(e.target.value)}
            />
          </div>
        </div>

        {/* --- SEVAS GRID --- */}
        <div className="sevas-grid">
          {sevas.map(seva => (
            <div className="seva-booking-card" key={seva.id}>
              {/* Decorative Top Border */}
              <div className="card-top-decor"></div>
              
              <div className="card-body-custom">
                <h3 className="seva-title">{seva.name}</h3>
                <div className="divider-small"></div>
                <p className="seva-desc">{seva.description}</p>
                
                <div className="price-tag">
                  <span className="currency">₹</span> {seva.price}
                </div>

                <button
                  className="book-now-btn"
                  onClick={() => bookSeva(seva.id)}
                >
                  Book Seva
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}