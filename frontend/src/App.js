import { useState, useEffect } from "react";
import MedicineList     from "./components/MedicineList";
import AppointmentList  from "./components/AppointmentList";
import Login            from "./components/Login";
import axios            from "axios";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("medicines");
  const [user,  setUser]  = useState(null);
  const [token, setToken] = useState(null);

  // Check if already logged in
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser  = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
    }
  }, []);

  const handleLogin = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    // Set axios default header so all requests send the token
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setToken(null);
  };

  // Show login page if not logged in
  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <div>
      {/* Header */}
      <div style={{
        backgroundColor: "#0D2B45", padding: "14px 30px",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <span style={{ color: "#fff", fontSize: 22, fontWeight: "bold", fontFamily: "Georgia" }}>
          🏥 MediTrack
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ color: "#14B8A6", fontSize: 14 }}>
            👤 Welcome, <strong>{user.name}</strong>
          </span>
          <button onClick={handleLogout} style={{
            backgroundColor: "#DC2626", color: "#fff", border: "none",
            padding: "7px 16px", borderRadius: 6, cursor: "pointer",
            fontWeight: "bold", fontSize: 13
          }}>Logout</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ backgroundColor: "#f0f4f8", padding: "12px 30px", borderBottom: "2px solid #ddd" }}>
        <button onClick={() => setActiveTab("medicines")} style={{
          marginRight: 10, padding: "10px 24px",
          backgroundColor: activeTab === "medicines" ? "#0E8C8C" : "#ddd",
          color: activeTab === "medicines" ? "white" : "#333",
          border: "none", borderRadius: 6, cursor: "pointer",
          fontWeight: "bold", fontSize: 15
        }}>💊 Medicines</button>
        <button onClick={() => setActiveTab("appointments")} style={{
          padding: "10px 24px",
          backgroundColor: activeTab === "appointments" ? "#0E8C8C" : "#ddd",
          color: activeTab === "appointments" ? "white" : "#333",
          border: "none", borderRadius: 6, cursor: "pointer",
          fontWeight: "bold", fontSize: 15
        }}>📅 Appointments</button>
      </div>

      {/* Content */}
      <div style={{ padding: 30 }}>
        {activeTab === "medicines"
          ? <MedicineList />
          : <AppointmentList />
        }
      </div>
    </div>
  );
}

export default App;