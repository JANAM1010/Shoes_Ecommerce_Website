import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Auth.css";

const Login = () => {
const navigate = useNavigate();
const [loginInput, setLoginInput] = useState("");
const [password, setPassword] = useState("");
const handleLogin = (e) => {
  e.preventDefault();
  console.log("Login button clicked");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (!storedUser) {
    alert("No user found. Please signup first.");
      return;
  }
  if (
        (loginInput === storedUser.username ||
          loginInput === storedUser.email) &&
        password === storedUser.password
      ) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/dashboard");
      } else {
        alert("Invalid credentials!");
        navigate("/register");
      }
    };
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Login Form</h2>

          <div className="auth-tabs">
            <button className="active">Login</button>
            <button onClick={() => navigate("/register")}>Signup</button>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username or Email"
              className="auth-input"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="auth-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };

  export default Login;
