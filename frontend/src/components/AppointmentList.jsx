import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/appointments";

const FILTERS = [
  { key: "all",       label: "📋 All",          url: API },
  { key: "latest",    label: "🆕 Latest 5",      url: `${API}/latest` },
  { key: "upcoming",  label: "⏰ Upcoming",       url: `${API}/status/upcoming` },
  { key: "completed", label: "✅ Completed",      url: `${API}/status/completed` },
  { key: "cancelled", label: "❌ Cancelled",      url: `${API}/status/cancelled` },
];

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [filter,       setFilter]       = useState("all");
  const [toast,        setToast]        = useState(null);
  const [loading,      setLoading]      = useState(false);
  const [form, setForm] = useState({
    doctorName: "", specialty: "", date: "", time: "",
    location: "", status: "upcoming", notes: ""
  });

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchAppointments = async (f = filter) => {
    setLoading(true);
    try {
      const chosen = FILTERS.find(x => x.key === f);
      const res    = await axios.get(chosen.url);
      setAppointments(f === "all" ? res.data : res.data.data);
    } catch {
      showToast("Failed to load appointments", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAppointments(filter); }, [filter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API, form);
      showToast(res.data.message);
      setForm({ doctorName: "", specialty: "", date: "", time: "", location: "", status: "upcoming", notes: "" });
      fetchAppointments(filter);
    } catch (err) {
      showToast(err.response?.data?.error || "Failed to book", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Cancel this appointment?")) return;
    try {
      const res = await axios.delete(`${API}/${id}`);
      showToast(res.data.message);
      fetchAppointments(filter);
    } catch {
      showToast("Failed to cancel", "error");
    }
  };

  const statusStyle = (s) => ({
    padding: "3px 10px", borderRadius: 12, fontWeight: "bold", fontSize: 12,
    background: s === "completed" ? "#dcfce7" : s === "cancelled" ? "#fee2e2" : "#fef9c3",
    color:      s === "completed" ? "#16a34a" : s === "cancelled" ? "#dc2626" : "#ca8a04",
  });

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 9999,
          background: toast.type === "success" ? "#16A34A" : "#DC2626",
          color: "#fff", padding: "14px 22px", borderRadius: 8,
          fontWeight: "bold", fontSize: 15,
          boxShadow: "0 4px 16px rgba(0,0,0,0.25)"
        }}>{toast.msg}</div>
      )}

      <h2 style={{ color: "#0D2B45" }}>📅 Appointment Manager</h2>

      {/* Add Form */}
      <div style={{ background: "#f8fffe", border: "1px solid #0E8C8C", borderRadius: 8, padding: 20, marginBottom: 24 }}>
        <h3 style={{ color: "#0E8C8C", marginTop: 0 }}>➕ Book New Appointment</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
            <input placeholder="Doctor Name *"     value={form.doctorName} onChange={e => setForm({...form, doctorName: e.target.value})} required style={inp} />
            <input placeholder="Specialty *"       value={form.specialty}  onChange={e => setForm({...form, specialty: e.target.value})}  required style={inp} />
            <input type="date"                     value={form.date}       onChange={e => setForm({...form, date: e.target.value})}       required style={inp} />
            <input placeholder="Time (10:30 AM) *" value={form.time}       onChange={e => setForm({...form, time: e.target.value})}       required style={inp} />
            <input placeholder="Location"          value={form.location}   onChange={e => setForm({...form, location: e.target.value})}           style={inp} />
            <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} style={inp}>
              <option value="upcoming">⏰ Upcoming</option>
              <option value="completed">✅ Completed</option>
              <option value="cancelled">❌ Cancelled</option>
            </select>
            <input placeholder="Notes" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}
              style={{...inp, gridColumn: "span 3"}} />
          </div>
          <button type="submit" style={btn}>+ Book Appointment</button>
        </form>
      </div>

      {/* Filter Bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontWeight: "bold", color: "#0D2B45", marginRight: 4 }}>🔍 Filter:</span>
        {FILTERS.map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)} style={{
            padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer",
            fontWeight: "bold", fontSize: 13,
            background: filter === f.key ? "#0E8C8C" : "#e2e8f0",
            color:      filter === f.key ? "#fff"    : "#333",
          }}>{f.label}</button>
        ))}
        <span style={{ marginLeft: "auto", color: "#64748B", fontSize: 13 }}>
          {loading ? "Loading..." : `${appointments.length} record(s)`}
        </span>
      </div>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#0D2B45", color: "#fff" }}>
            {["Doctor","Specialty","Date","Time","Location","Status","Notes","Action"].map(h =>
              <th key={h} style={th}>{h}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {appointments.map((a, i) => (
            <tr key={a._id} style={{ background: i % 2 === 0 ? "#f9f9f9" : "#fff" }}>
              <td style={td}><strong>{a.doctorName}</strong></td>
              <td style={td}>{a.specialty}</td>
              <td style={td}>{a.date?.slice(0,10)}</td>
              <td style={td}>{a.time}</td>
              <td style={td}>{a.location || "—"}</td>
              <td style={td}><span style={statusStyle(a.status)}>{a.status}</span></td>
              <td style={td}>{a.notes || "—"}</td>
              <td style={td}>
                <button onClick={() => handleDelete(a._id)} style={delBtn}>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!loading && appointments.length === 0 && (
        <p style={{ color: "#999", textAlign: "center", marginTop: 20 }}>No appointments found.</p>
      )}
    </div>
  );
}

const inp   = { padding: 10, borderRadius: 6, border: "1px solid #ccc", fontSize: 14, width: "100%", boxSizing: "border-box" };
const btn   = { background: "#0E8C8C", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 6, cursor: "pointer", fontWeight: "bold", fontSize: 15 };
const delBtn= { background: "#DC2626", color: "#fff", border: "none", padding: "6px 12px", borderRadius: 4, cursor: "pointer" };
const th    = { padding: "12px 14px", textAlign: "left" };
const td    = { padding: "10px 14px", borderBottom: "1px solid #eee" };