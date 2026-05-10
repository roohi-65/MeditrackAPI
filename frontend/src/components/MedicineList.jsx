import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/medicines";

function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState({
    name: "", dosage: "", frequency: "", startDate: "", endDate: "", notes: ""
  });

  const fetchMedicines = async () => {
    const res = await axios.get(API);
    setMedicines(res.data);
  };

  useEffect(() => { fetchMedicines(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API, form);
    setForm({ name: "", dosage: "", frequency: "", startDate: "", endDate: "", notes: "" });
    fetchMedicines();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchMedicines();
  };

  return (
    <div>
      <h2 style={{ color: "#0D2B45" }}>💊 Medicine Tracker</h2>

      {/* Add Form */}
      <div style={{ backgroundColor: "#f8fffe", border: "1px solid #0E8C8C", borderRadius: "8px", padding: "20px", marginBottom: "30px" }}>
        <h3 style={{ color: "#0E8C8C", marginTop: 0 }}>Add New Medicine</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "12px" }}>
            <input placeholder="Medicine Name *" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required style={inputStyle} />
            <input placeholder="Dosage (e.g. 500mg) *" value={form.dosage}
              onChange={e => setForm({ ...form, dosage: e.target.value })}
              required style={inputStyle} />
            <input placeholder="Frequency (e.g. Twice a day) *" value={form.frequency}
              onChange={e => setForm({ ...form, frequency: e.target.value })}
              required style={inputStyle} />
            <input type="date" placeholder="Start Date *" value={form.startDate}
              onChange={e => setForm({ ...form, startDate: e.target.value })}
              required style={inputStyle} />
            <input type="date" placeholder="End Date" value={form.endDate}
              onChange={e => setForm({ ...form, endDate: e.target.value })}
              style={inputStyle} />
            <input placeholder="Notes" value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
              style={inputStyle} />
          </div>
          <button type="submit" style={btnStyle}>+ Add Medicine</button>
        </form>
      </div>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#0D2B45", color: "white" }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Dosage</th>
            <th style={thStyle}>Frequency</th>
            <th style={thStyle}>Start Date</th>
            <th style={thStyle}>End Date</th>
            <th style={thStyle}>Notes</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((m, i) => (
            <tr key={m._id} style={{ backgroundColor: i % 2 === 0 ? "#f9f9f9" : "white" }}>
              <td style={tdStyle}>{m.name}</td>
              <td style={tdStyle}>{m.dosage}</td>
              <td style={tdStyle}>{m.frequency}</td>
              <td style={tdStyle}>{m.startDate?.slice(0, 10)}</td>
              <td style={tdStyle}>{m.endDate?.slice(0, 10) || "—"}</td>
              <td style={tdStyle}>{m.notes || "—"}</td>
              <td style={tdStyle}>
                <button onClick={() => handleDelete(m._id)}
                  style={{ backgroundColor: "#DC2626", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {medicines.length === 0 && <p style={{ color: "#999", textAlign: "center" }}>No medicines added yet.</p>}
    </div>
  );
}

const inputStyle = { padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px", width: "100%" };
const btnStyle = { backgroundColor: "#0E8C8C", color: "white", border: "none", padding: "10px 24px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "15px" };
const thStyle = { padding: "12px 16px", textAlign: "left" };
const tdStyle = { padding: "10px 16px", borderBottom: "1px solid #eee" };

export default MedicineList;