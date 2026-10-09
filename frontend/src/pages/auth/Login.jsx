import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { FiCommand, FiArrowLeft, FiEye, FiEyeOff, FiZap } from "react-icons/fi";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e, customCreds = null) => {
    if (e) e.preventDefault();
    const loginEmail = customCreds ? customCreds.email : email;
    const loginPassword = customCreds ? customCreds.password : password;

    setBusy(true);
    try {
      const { data } = await api.post("/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });
      login(data);
      toast.success("Welcome back to DevBoard!");
      nav("/dashboard", { replace: true });
    } catch (e) {
      toast.error(e.response?.data?.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  const handleQuickDemo = () => {
    setEmail("demo@devboard.com");
    setPassword("password123");
    handleLogin(null, {
      email: "demo@devboard.com",
      password: "password123",
    });
  };

  return (
    <div className="auth-page" data-testid="login-page">
      <div className="auth-panel">
        <div className="auth-brand">
          <Link to="/" className="auth-brand-logo">
            <FiCommand /> DevBoard
          </Link>
          <Link to="/" className="auth-back-link">
            <FiArrowLeft /> Back to Home
          </Link>
        </div>

        <h1>Welcome back</h1>
        <p>Sign in to manage your developer career and dashboard.</p>

        {/* 1-Click Demo Login Banner */}
        <div className="demo-account-box">
          <div className="demo-account-text">
            <strong>⚡ Instant Demo Mode</strong>
            <span>Preloaded with portfolio & jobs</span>
          </div>
          <button
            type="button"
            className="btn-demo-quick"
            onClick={handleQuickDemo}
            disabled={busy}
          >
            <FiZap className="me-1" /> Quick Demo
          </button>
        </div>

        <form onSubmit={handleLogin} data-testid="login-form">
          <label htmlFor="email">Email address</label>
          <div className="auth-input-wrap">
            <input
              className="form-control"
              id="email"
              name="email"
              data-testid="login-email-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label htmlFor="password">Password</label>
          <div className="auth-input-wrap">
            <input
              className="form-control"
              id="password"
              name="password"
              data-testid="login-password-input"
              type={showPassword ? "text" : "password"}
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
            className="btn btn-primary w-100"
            data-testid="login-submit-button"
            disabled={busy}
            id="loginBtn"
          >
            {busy ? "Signing in..." : "Sign in to Dashboard"}
          </button>
        </form>

        <div className="auth-switch">
          New to DevBoard?{" "}
          <Link to="/register" data-testid="register-link">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
