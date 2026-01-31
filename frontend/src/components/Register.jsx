import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";
import '../styles/register.css';

export default function Register({ onSwitch }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    full_name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleRegister = async () => {
  try {
    await dispatch(register(form)).unwrap();
    alert("Registered successfully. Now login.");
    onSwitch();
  } catch (err) {
    alert("Registration failed");
    console.error(err);
  }
};


  return (
    <div className="register-container">
      <h2>Register</h2>
      {Object.keys(form).map((key) => (
      
        <input
          key={key}
          placeholder={key}
          type={key === "password" ? "password" : "text"}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          /> 
  
      ))}
      <br></br>
      <button onClick={handleRegister}>
        {loading ? "Registering..." : "Register"}
      </button>

      <p onClick={onSwitch} style={{ cursor: "pointer", color: "blue" }}>
        Already have account? Login
      </p>
      
    </div>
  );
}
