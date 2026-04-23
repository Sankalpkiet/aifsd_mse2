import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Dashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Academic");
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 🔐 Protect route
  useEffect(() => {
    if (!token) {
      alert("Please login first");
      navigate("/");
    } else {
      fetchData();
    }
  }, []);

  // 📥 Fetch grievances
  const fetchData = async () => {
    try {
      const res = await axios.get("https://grievance-backend-ppn2.onrender.com/grievances", {
        headers: { Authorization: token }
      });
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ➕ Add grievance
  const submit = async () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "https://grievance-backend-ppn2.onrender.com/grievances",
        { title, description, category },
        { headers: { Authorization: token } }
      );

      alert("Grievance submitted");
      setTitle("");
      setDescription("");
      fetchData();
    } catch (err) {
      console.log(err);
      alert("Error submitting grievance");
    }
  };

  // ❌ Delete grievance
  const deleteGrievance = async (id) => {
    try {
      await axios.delete(
        `https://grievance-backend-ppn2.onrender.com/grievances/${id}`,
        {
          headers: { Authorization: token }
        }
      );

      alert("Deleted successfully");
      fetchData();
    } catch (err) {
      console.log(err);
      alert("Error deleting grievance");
    }
  };

  // 🔓 Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container">

      {/* ✅ CLEAN HEADER */}
      <div style={{ textAlign: "center", marginBottom: "25px" }}>
        
        <h1 style={{ 
          fontSize: "28px",
          fontWeight: "bold",
          color: "#2c3e50"
        }}>
          🎓 Student Grievance System
        </h1>

        <p style={{ color: "gray", marginTop: "5px" }}>
          Manage your complaints easily
        </p>

        <h2 style={{ marginTop: "15px" }}>Dashboard</h2>

      </div>

      {/* 🔓 Logout */}
      <button
        onClick={logout}
        style={{ background: "#555", marginBottom: "15px" }}
      >
        Logout
      </button>

      {/* ➕ Add Grievance */}
      <h3>📝 Add Grievance</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select onChange={(e) => setCategory(e.target.value)}>
        <option>Academic</option>
        <option>Hostel</option>
        <option>Transport</option>
        <option>Other</option>
      </select>

      <button onClick={submit}>Submit</button>

      {/* 📋 Display grievances */}
      <h3>📋 My Grievances</h3>

      {data.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>
          No grievances yet. Add one above 👆
        </p>
      ) : (
        data.map((item) => (
          <div key={item._id} className="card">

            <p><b>Title:</b> {item.title}</p>
            <p><b>Description:</b> {item.description}</p>
            <p><b>Category:</b> {item.category}</p>
            <p><b>Status:</b> {item.status}</p>

            <button
              onClick={() => deleteGrievance(item._id)}
              style={{ background: "red", marginTop: "10px" }}
            >
              Delete
            </button>

          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;