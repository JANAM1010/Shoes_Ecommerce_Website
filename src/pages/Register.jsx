import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validate = () => {
    let newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be 6+ chars, include 1 Capital letter, 1 number & 1 special character.";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
  };
  const handleRegister = (e) => {
  e.preventDefault();
  const validationErrors = validate();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    const userToSave = {
      ...formData,
      password: formData.password.trim(),
      confirmPassword: formData.confirmPassword.trim(),
    };
    localStorage.setItem("user", JSON.stringify(userToSave));
    navigate("/login");
  }
};
return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Signup Form</h2>
        <div className="auth-tabs">
          <button onClick={() => navigate("/login")}>Login</button>
          <button className="active">Signup</button>
        </div>
        <form onSubmit={handleRegister}>
          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="auth-input"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <div className="auth-error">{errors.username}</div>
          )}
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="auth-input"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="auth-error">{errors.email}</div>
          )}
          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="auth-input"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="auth-error">{errors.password}</div>
          )}
          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="auth-input"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="auth-error">{errors.confirmPassword}</div>
          )}
          <button type="submit" className="auth-btn">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};
export default Register;