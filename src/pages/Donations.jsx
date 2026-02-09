import { useEffect, useState } from "react";
import api from "../services/api";

export default function Donations() {
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [donations, setDonations] = useState([]);

  const submitDonation = async () => {
    try {
      await api.post("/donations", {
        amount,
        transactionId
      });
      alert("Donation submitted for verification");
      setAmount("");
      setTransactionId("");
      loadDonations();
    } catch (err) {
      alert(err.response?.data?.message || "Donation failed");
    }
  };

  const loadDonations = () => {
    api.get("/donations/my").then(res => setDonations(res.data));
  };

  useEffect(() => {
    loadDonations();
  }, []);

  return (
    <>
      <h3>Donate (QR Payment)</h3>

      <div className="row">
        <div className="col-md-4">
          <p><b>Scan QR & Pay</b></p>
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=temple@upi"
            alt="QR Code"
          />
        </div>

        <div className="col-md-4">
          <input
            className="form-control mb-2"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="UPI Transaction ID"
            value={transactionId}
            onChange={e => setTransactionId(e.target.value)}
          />

          <button className="btn btn-danger" onClick={submitDonation}>
            Submit Donation
          </button>
        </div>
      </div>

      <hr />

      <h4>My Donations</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Transaction ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {donations.map(d => (
            <tr key={d.id}>
              <td>₹ {d.amount}</td>
              <td>{d.razorpayId}</td>
              <td>
                <span className={`badge ${d.paymentStatus === "SUCCESS" ? "bg-success" : "bg-warning"}`}>
                  {d.paymentStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
