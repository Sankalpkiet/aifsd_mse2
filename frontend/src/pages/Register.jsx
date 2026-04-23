import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
    const res = await axios.post(
      "https://grievance-backend-ppn2.onrender.com/register",
      { name, email, password },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 5000
      }
    );

    console.log(res.data);
    alert("Registered successfully");
    navigate("/");

  } catch (err) {
    console.log("FULL ERROR:", err);
    alert(err.response?.data?.message || err.message);
  }
};

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;