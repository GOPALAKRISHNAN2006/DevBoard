import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";
import { FiCommand } from "react-icons/fi";
import "./Register.css";
export default function Register() {
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [busy, setBusy] = useState(false),
    nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.post("/auth/register", { name, email, password });
      toast.success("Account created. Please sign in.");
      nav("/login");
    } catch (e) {
      toast.error(e.response?.data?.message || "Registration failed");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="auth-page" data-testid="register-page">
      <div className="auth-panel">
        <div className="auth-brand">
          <FiCommand style={{ marginRight: "8px" }} /> DevBoard
        </div>
        <h1>Create your workspace</h1>
        <p>Start tracking your developer career in one place.</p>
        <form onSubmit={submit} data-testid="register-form">
          <label htmlFor="register-name">Full name</label>
          <input
            id="register-name"
            name="name"
            data-testid="register-name-input"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="register-email">Email address</label>
          <input
            id="register-email"
            name="email"
            data-testid="register-email-input"
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            name="password"
            data-testid="register-password-input"
            className="form-control"
            type="password"
            minLength="6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit"id ="register-btn" className="btn btn-primary w-100 mt-4" data-testid="register-submit-button" disabled={busy}>
            {busy ? "Creating..." : "Create account"}
          </button>
        </form>
        <div className="auth-switch">
          Already a member? <Link to="/login" data-testid="login-link">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
