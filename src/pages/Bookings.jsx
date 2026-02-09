import { useEffect, useState } from "react";
import api from "../services/api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/bookings/my").then(res => setBookings(res.data));
  }, []);

  return (
    <>
      <h3>My Bookings</h3>

      {bookings.length === 0 && <p>No bookings yet</p>}

      <table className="table">
        <thead>
          <tr>
            <th>Seva</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id}>
              <td>{b.seva.name}</td>
              <td>{new Date(b.date).toLocaleDateString()}</td>
              <td>
                <span className="badge bg-success">{b.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
