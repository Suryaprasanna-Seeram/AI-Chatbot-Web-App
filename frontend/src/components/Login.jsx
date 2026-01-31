import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import '../styles/login.css';

export default function Login({onSwitch}) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(login({ email, password }));
  };

  return (
  <div className="login-container">
    <h2>Login</h2>

    <input
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
    />
    <br/> 
    <input
      type="password"
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)}
    />
      <br/>
    <button onClick={handleLogin}>
      {loading ? "Logging in..." : "Login"}
    </button>

    <p
      onClick={onSwitch}
      style={{ cursor: "pointer", color: "blue", marginTop: "10px" }}
    > <br/>
      Don't have account? Register
    </p>
  </div>
);

}
