import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/appointments";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    doctorName: "", specialty: "", date: "", time: "", location: "", status: "upcoming", notes: ""
  });

  const fetchAppointments = async () => {
    const res = await axios.get(API);
    setAppointments(res.data);
  };

  useEffect(() => { fetchAppointments(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API, form);
    setForm({ doctorName: "", specialty: "", date: "", time: "", location: "", status: "upcoming", notes: "" });
    fetchAppointments();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchAppointments();
  };

  const statusColor = (status) => {
    if (status === "completed") return { backgroundColor: "#dcfce7", color: "#16a34a", padding: "3px 10px", borderRadius: "12px", fontWeight: "bold" };
    if (status === "cancelled") return { backgroundColor: "#fee2e2", color: "#dc2626", padding: "3px 10px", borderRadius: "12px", fontWeight: "bold" };
    return { backgroundColor: "#fef9c3", color: "#ca8a04", padding: "3px 10px", borderRadius: "12px", fontWeight: "bold" };
  };

  return (
    <div>
      <h2 style={{ color: "#0D2B45" }}>📅 Appointment Manager</h2>

      {/* Add Form */}
      <div style={{ backgroundColor: "#f8fffe", border: "1px solid #0E8C8C", borderRadius: "8px", padding: "20px", marginBottom: "30px" }}>
        <h3 style={{ color: "#0E8C8C", marginTop: 0 }}>Book New Appointment</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "12px" }}>
            <input placeholder="Doctor Name *" value={form.doctorName}
              onChange={e => setForm({ ...form, doctorName: e.target.value })}
              required style={inputStyle} />
            <input placeholder="Specialty *" value={form.specialty}
              onChange={e => setForm({ ...form, specialty: e.target.value })}
              required style={inputStyle} />
            <input type="date" value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              required style={inputStyle} />
            <input placeholder="Time (e.g. 10:30 AM) *" value={form.time}
              onChange={e => setForm({ ...form, time: e.target.value })}
              required style={inputStyle} />
            <input placeholder="Location" value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
              style={inputStyle} />
            <select value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
              style={inputStyle}>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <input placeholder="Notes" value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
              style={{ ...inputStyle, gridColumn: "span 3" }} />
          </div>
          <button type="submit" style={btnStyle}>+ Book Appointment</button>
        </form>
      </div>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#0D2B45", color: "white" }}>
            <th style={thStyle}>Doctor</th>
            <th style={thStyle}>Specialty</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Time</th>
            <th style={thStyle}>Location</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Notes</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a, i) => (
            <tr key={a._id} style={{ backgroundColor: i % 2 === 0 ? "#f9f9f9" : "white" }}>
              <td style={tdStyle}>{a.doctorName}</td>
              <td style={tdStyle}>{a.specialty}</td>
              <td style={tdStyle}>{a.date?.slice(0, 10)}</td>
              <td style={tdStyle}>{a.time}</td>
              <td style={tdStyle}>{a.location || "—"}</td>
              <td style={tdStyle}><span style={statusColor(a.status)}>{a.status}</span></td>
              <td style={tdStyle}>{a.notes || "—"}</td>
              <td style={tdStyle}>
                <button onClick={() => handleDelete(a._id)}
                  style={{ backgroundColor: "#DC2626", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {appointments.length === 0 && <p style={{ color: "#999", textAlign: "center" }}>No appointments booked yet.</p>}
    </div>
  );
}

const inputStyle = { padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px", width: "100%" };
const btnStyle = { backgroundColor: "#0E8C8C", color: "white", border: "none", padding: "10px 24px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "15px" };
const thStyle = { padding: "12px 16px", textAlign: "left" };
const tdStyle = { padding: "10px 16px", borderBottom: "1px solid #eee" };

export default AppointmentList;