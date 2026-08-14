import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";
export default function Login() {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [busy, setBusy] = useState(false),
    nav = useNavigate(),
    { login } = useAuth();
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      login(data);
      toast.success("Welcome back!");
      nav("/dashboard", { replace: true });
    } catch (e) {
      toast.error(e.response?.data?.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="auth-page" data-testid="login-page">
      <div className="auth-panel">
        <div className="auth-brand">&lt;/&gt; DevBoard</div>
        <h1>Welcome back</h1>
        <p>Sign in to manage your developer journey.</p>
        <form onSubmit={submit} data-testid="login-form">
          <label htmlFor="email">Email address</label>
          <input
            className="form-control"
            id="email"
            name="email"
            data-testid="login-email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            id="password"
            name="password"
            data-testid="login-password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-100 mt-4" data-testid="login-submit-button" disabled={busy}
          id="loginBtn">
            {busy ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <div className="auth-switch">
          New to DevBoard? <Link to="/register" data-testid="register-link">Create account</Link>
        </div>
      </div>
    </div>
  );
}
