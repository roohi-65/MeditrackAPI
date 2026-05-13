import { useState } from "react";
import MedicineList from "./components/MedicineList";
import AppointmentList from "./components/AppointmentList";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("medicines");

  return (
    <div>
      {/* Header */}
      <div style={{
        backgroundColor: "#0D2B45",
        padding: "18px 30px",
        color: "white",
        fontSize: "24px",
        fontWeight: "bold"
      }}>
        🏥 MediTrack Personal Health & Appointment Manager
      </div>

      {/* Tabs */}
      <div style={{ backgroundColor: "#f0f4f8", padding: "12px 30px", borderBottom: "2px solid #ddd" }}>
        <button
          onClick={() => setActiveTab("medicines")}
          style={{
            marginRight: "10px",
            padding: "10px 24px",
            backgroundColor: activeTab === "medicines" ? "#0E8C8C" : "#ddd",
            color: activeTab === "medicines" ? "white" : "#333",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px"
          }}>
          💊 Medicines
        </button>
        <button
          onClick={() => setActiveTab("appointments")}
          style={{
            padding: "10px 24px",
            backgroundColor: activeTab === "appointments" ? "#0E8C8C" : "#ddd",
            color: activeTab === "appointments" ? "white" : "#333",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px"
          }}>
          📅 Appointments
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: "30px" }}>
        {activeTab === "medicines" ? <MedicineList /> : <AppointmentList />}
      </div>
    </div>
  );
}

export default App;