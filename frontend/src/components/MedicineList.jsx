import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/medicines";

const FILTERS = [
  { key: "all",     label: "📋 All",      url: API },
  { key: "latest",  label: "🆕 Newest",   url: `${API}/latest` },
  { key: "active",  label: "✅ Active",   url: `${API}/active` },
  { key: "expired", label: "⚠️ Expired",  url: `${API}/expired` },
];

export default function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const [filter,    setFilter]    = useState("all");
  const [toast,     setToast]     = useState(null);
  const [loading,   setLoading]   = useState(false);

  // ── Edit state ───────────────────────────────────────
  const [editId,   setEditId]   = useState(null);
  const [editForm, setEditForm] = useState({
    name: "", dosage: "", frequency: "", startDate: "", endDate: "", notes: ""
  });

  // ── Add form state ───────────────────────────────────
  const [form, setForm] = useState({
    name: "", dosage: "", frequency: "", startDate: "", endDate: "", notes: ""
  });

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchMedicines = async (f = filter) => {
    setLoading(true);
    try {
      const chosen = FILTERS.find(x => x.key === f);
      const res    = await axios.get(chosen.url);
      setMedicines(f === "all" ? res.data : res.data.data);
    } catch {
      showToast("Failed to load medicines", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMedicines(filter); }, [filter]);

  // ── Add Medicine ─────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API, form);
      showToast(res.data.message);
      setForm({ name:"", dosage:"", frequency:"", startDate:"", endDate:"", notes:"" });
      fetchMedicines(filter);
    } catch (err) {
      showToast(err.response?.data?.error || "Failed to add medicine", "error");
    }
  };

  // ── Delete Medicine ──────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this medicine?")) return;
    try {
      const res = await axios.delete(`${API}/${id}`);
      showToast(res.data.message);
      fetchMedicines(filter);
    } catch {
      showToast("Failed to delete", "error");
    }
  };

  // ── Open Edit Modal ──────────────────────────────────
  const handleEditOpen = (m) => {
    setEditId(m._id);
    setEditForm({
      name:      m.name      || "",
      dosage:    m.dosage    || "",
      frequency: m.frequency || "",
      startDate: m.startDate ? m.startDate.slice(0, 10) : "",
      endDate:   m.endDate   ? m.endDate.slice(0, 10)   : "",
      notes:     m.notes     || "",
    });
  };

  // ── Cancel Edit ──────────────────────────────────────
  const handleEditCancel = () => {
    setEditId(null);
    setEditForm({ name:"", dosage:"", frequency:"", startDate:"", endDate:"", notes:"" });
  };

  // ── Save Edit ────────────────────────────────────────
  const handleEditSave = async (id) => {
    try {
      const res = await axios.put(`${API}/${id}`, editForm);
      showToast(res.data.message);
      setEditId(null);
      fetchMedicines(filter);
    } catch (err) {
      showToast(err.response?.data?.error || "Failed to update", "error");
    }
  };

  const isExpired = (endDate) => endDate && new Date(endDate) < new Date();

  return (
    <div>
      {/* ── Toast ── */}
      {toast && (
        <div style={{
          position:"fixed", top:20, right:20, zIndex:9999,
          background: toast.type === "success" ? "#16A34A" : "#DC2626",
          color:"#fff", padding:"14px 22px", borderRadius:8,
          fontWeight:"bold", fontSize:15,
          boxShadow:"0 4px 16px rgba(0,0,0,0.25)"
        }}>{toast.msg}</div>
      )}

      <h2 style={{ color:"#0D2B45" }}>💊 Medicine Tracker</h2>

      {/* ── Add Form ── */}
      <div style={{ background:"#f8fffe", border:"1px solid #0E8C8C", borderRadius:8, padding:20, marginBottom:24 }}>
        <h3 style={{ color:"#0E8C8C", marginTop:0 }}>➕ Add New Medicine</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:12 }}>
            <input placeholder="Medicine Name *"           value={form.name}      onChange={e=>setForm({...form,name:e.target.value})}      required style={inp}/>
            <input placeholder="Dosage (e.g. 500mg) *"    value={form.dosage}    onChange={e=>setForm({...form,dosage:e.target.value})}    required style={inp}/>
            <input placeholder="Frequency (e.g. Twice) *" value={form.frequency} onChange={e=>setForm({...form,frequency:e.target.value})} required style={inp}/>
            <input type="date" value={form.startDate}      onChange={e=>setForm({...form,startDate:e.target.value})} required style={inp}/>
            <input type="date" value={form.endDate}        onChange={e=>setForm({...form,endDate:e.target.value})}           style={inp}/>
            <input placeholder="Notes"                     value={form.notes}     onChange={e=>setForm({...form,notes:e.target.value})}             style={inp}/>
          </div>
          <button type="submit" style={addBtn}>+ Add Medicine</button>
        </form>
      </div>

      {/* ── Filter Bar ── */}
      <div style={{ display:"flex", gap:8, marginBottom:16, alignItems:"center", flexWrap:"wrap" }}>
        <span style={{ fontWeight:"bold", color:"#0D2B45" }}>🔍 Filter:</span>
        {FILTERS.map(f=>(
          <button key={f.key} onClick={()=>setFilter(f.key)} style={{
            padding:"8px 16px", borderRadius:6, border:"none", cursor:"pointer",
            fontWeight:"bold", fontSize:13,
            background: filter===f.key ? "#0E8C8C" : "#e2e8f0",
            color:      filter===f.key ? "#fff"    : "#333",
          }}>{f.label}</button>
        ))}
        <span style={{ marginLeft:"auto", color:"#64748B", fontSize:13 }}>
          {loading ? "Loading..." : `${medicines.length} record(s)`}
        </span>
      </div>

      {/* ── Table ── */}
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr style={{ background:"#0D2B45", color:"#fff" }}>
            {["Name","Dosage","Frequency","Start Date","End Date","Status","Notes","Actions"].map(h=>
              <th key={h} style={th}>{h}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {medicines.map((m, i) => (
            editId === m._id ? (
              // ── EDIT ROW ──────────────────────────────────
              <tr key={m._id} style={{ background:"#F0FDF4" }}>
                <td style={td}><input value={editForm.name}      onChange={e=>setEditForm({...editForm,name:e.target.value})}      style={editInp}/></td>
                <td style={td}><input value={editForm.dosage}    onChange={e=>setEditForm({...editForm,dosage:e.target.value})}    style={editInp}/></td>
                <td style={td}><input value={editForm.frequency} onChange={e=>setEditForm({...editForm,frequency:e.target.value})} style={editInp}/></td>
                <td style={td}><input type="date" value={editForm.startDate} onChange={e=>setEditForm({...editForm,startDate:e.target.value})} style={editInp}/></td>
                <td style={td}><input type="date" value={editForm.endDate}   onChange={e=>setEditForm({...editForm,endDate:e.target.value})}   style={editInp}/></td>
                <td style={td}>—</td>
                <td style={td}><input value={editForm.notes} onChange={e=>setEditForm({...editForm,notes:e.target.value})} style={editInp}/></td>
                <td style={td}>
                  <div style={{ display:"flex", gap:6 }}>
                    <button onClick={()=>handleEditSave(m._id)} style={saveBtn}>💾 Save</button>
                    <button onClick={handleEditCancel}           style={cancelBtn}>✕</button>
                  </div>
                </td>
              </tr>
            ) : (
              // ── NORMAL ROW ────────────────────────────────
              <tr key={m._id} style={{ background: i%2===0 ? "#f9f9f9" : "#fff" }}>
                <td style={td}><strong>{m.name}</strong></td>
                <td style={td}>{m.dosage}</td>
                <td style={td}>{m.frequency}</td>
                <td style={td}>{m.startDate?.slice(0,10)}</td>
                <td style={td}>{m.endDate?.slice(0,10) || "—"}</td>
                <td style={td}>
                  <span style={{
                    padding:"3px 10px", borderRadius:12, fontWeight:"bold", fontSize:12,
                    background: isExpired(m.endDate) ? "#fee2e2" : "#dcfce7",
                    color:      isExpired(m.endDate) ? "#dc2626" : "#16a34a",
                  }}>
                    {isExpired(m.endDate) ? "⚠️ Expired" : "✅ Active"}
                  </span>
                </td>
                <td style={td}>{m.notes || "—"}</td>
                <td style={td}>
                  <div style={{ display:"flex", gap:6 }}>
                    <button onClick={()=>handleEditOpen(m)} style={editBtn}>✏️ Edit</button>
                    <button onClick={()=>handleDelete(m._id)} style={delBtn}>🗑 Delete</button>
                  </div>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
      {!loading && medicines.length === 0 && (
        <p style={{ color:"#999", textAlign:"center", marginTop:20 }}>No medicines found.</p>
      )}
    </div>
  );
}

const inp      = { padding:10, borderRadius:6, border:"1px solid #ccc", fontSize:14, width:"100%", boxSizing:"border-box" };
const editInp  = { padding:6, borderRadius:4, border:"1px solid #0E8C8C", fontSize:13, width:"100%", boxSizing:"border-box" };
const addBtn   = { background:"#0E8C8C", color:"#fff", border:"none", padding:"10px 24px", borderRadius:6, cursor:"pointer", fontWeight:"bold", fontSize:15 };
const editBtn  = { background:"#0E8C8C", color:"#fff", border:"none", padding:"6px 12px", borderRadius:4, cursor:"pointer", fontSize:13, fontWeight:"bold" };
const saveBtn  = { background:"#16A34A", color:"#fff", border:"none", padding:"6px 14px", borderRadius:4, cursor:"pointer", fontSize:13, fontWeight:"bold" };
const cancelBtn= { background:"#64748B", color:"#fff", border:"none", padding:"6px 10px", borderRadius:4, cursor:"pointer", fontSize:13, fontWeight:"bold" };
const delBtn   = { background:"#DC2626", color:"#fff", border:"none", padding:"6px 12px", borderRadius:4, cursor:"pointer", fontSize:13 };
const th       = { padding:"12px 14px", textAlign:"left" };
const td       = { padding:"10px 14px", borderBottom:"1px solid #eee" };