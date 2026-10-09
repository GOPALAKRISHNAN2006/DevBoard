import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";
import { FiCommand, FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";
import "./Register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.post("/auth/register", { name, email, password });
      toast.success("Account created successfully! Please sign in.");
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
          <Link to="/" className="auth-brand-logo">
            <FiCommand /> DevBoard
          </Link>
          <Link to="/" className="auth-back-link">
            <FiArrowLeft /> Back to Home
          </Link>
        </div>

        <h1>Create your workspace</h1>
        <p>Start tracking your developer portfolio and applications in one unified platform.</p>

        <form onSubmit={submit} data-testid="register-form">
          <label htmlFor="register-name">Full name</label>
          <div className="auth-input-wrap">
            <input
              id="register-name"
              name="name"
              data-testid="register-name-input"
              className="form-control"
              placeholder="Alex Rivera"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <label htmlFor="register-email">Email address</label>
          <div className="auth-input-wrap">
            <input
              id="register-email"
              name="email"
              data-testid="register-email-input"
              className="form-control"
              type="email"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label htmlFor="register-password">Password (min. 6 characters)</label>
          <div className="auth-input-wrap">
            <input
              id="register-password"
              name="password"
              data-testid="register-password-input"
              className="form-control"
              type={showPassword ? "text" : "password"}
              minLength="6"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="auth-toggle-pwd"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button
            type="submit"
            id="register-btn"
            className="btn btn-primary w-100"
            data-testid="register-submit-button"
            disabled={busy}
          >
            {busy ? "Setting up workspace..." : "Create Free Account"}
          </button>
        </form>

        <div className="auth-switch">
          Already a member?{" "}
          <Link to="/login" data-testid="login-link">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
