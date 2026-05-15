import { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/auth";

export default function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [error, setError]   = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const url = isRegister ? `${API}/register` : `${API}/login`;
      const body = isRegister
        ? { name: form.name, email: form.email, password: form.password }
        : { email: form.email, password: form.password };

      const res = await axios.post(url, body);

      if (isRegister) {
        setError(null);
        alert(res.data.message);
        setIsRegister(false);
      } else {
        // Save token to localStorage
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user',  JSON.stringify(res.data.user));
        onLogin(res.data.user, res.data.token);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", backgroundColor: "#0D2B45"
    }}>
      <div style={{
        backgroundColor: "#fff", borderRadius: 12, padding: "40px 36px",
        width: 400, boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 40 }}>🏥</div>
          <h1 style={{ color: "#0D2B45", margin: "8px 0 4px", fontFamily: "Georgia" }}>
            MediTrack
          </h1>
          <p style={{ color: "#64748B", margin: 0, fontSize: 14 }}>
            Personal Health & Appointment Manager
          </p>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: "flex", marginBottom: 24, borderRadius: 8, overflow: "hidden", border: "1px solid #e2e8f0" }}>
          <button onClick={() => setIsRegister(false)} style={{
            flex: 1, padding: "10px", border: "none", cursor: "pointer",
            fontWeight: "bold", fontSize: 14,
            backgroundColor: !isRegister ? "#0E8C8C" : "#f8f9fa",
            color: !isRegister ? "#fff" : "#333",
          }}>Login</button>
          <button onClick={() => setIsRegister(true)} style={{
            flex: 1, padding: "10px", border: "none", cursor: "pointer",
            fontWeight: "bold", fontSize: 14,
            backgroundColor: isRegister ? "#0E8C8C" : "#f8f9fa",
            color: isRegister ? "#fff" : "#333",
          }}>Register</button>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            backgroundColor: "#fee2e2", color: "#dc2626", padding: "10px 14px",
            borderRadius: 6, marginBottom: 16, fontSize: 14
          }}>{error}</div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input placeholder="Full Name *" value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              required style={inp} />
          )}
          <input placeholder="Email Address *" type="email" value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            required style={inp} />
          <input placeholder="Password *" type="password" value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
            required style={inp} />
          <button type="submit" disabled={loading} style={{
            width: "100%", padding: "12px", backgroundColor: "#0D2B45",
            color: "#fff", border: "none", borderRadius: 8,
            fontWeight: "bold", fontSize: 16, cursor: "pointer", marginTop: 8
          }}>
            {loading ? "Please wait..." : isRegister ? "Create Account" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

const inp = {
  display: "block", width: "100%", padding: "11px 14px", marginBottom: 12,
  borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14,
  boxSizing: "border-box", outline: "none"
};