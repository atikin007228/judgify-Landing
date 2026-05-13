import React, { useState } from "react";

export default function SignInModal({ isOpen, onClose, onOpenSignUp, onComplete }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [busy, setBusy] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Enter email and password.");
      return;
    }

    setBusy(true);
    try {
      await onComplete?.({
        email: form.email,
        username: form.email.split("@")[0] || "demo_user",
        displayName: form.email.split("@")[0] || "Demo User",
      });
      onClose?.();
    } finally {
      setBusy(false);
    }
  };

  const handleDemoLogin = async () => {
    setBusy(true);
    try {
      await onComplete?.({
        email: "organizer@example.com",
        username: "organizer",
        displayName: "Organizer Demo",
        primaryRole: "organizer",
      });
      onClose?.();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal signin-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="auth-modal-logo">Judgify</div>
        <div className="auth-modal-subtitle">Welcome back</div>
        <div className="auth-modal-caption">
          Sign in to manage saved competitions, applications and organizer tools.
        </div>

        <form className="email-signup-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="Password"
            />
          </div>

          <button type="submit" className="create-account-btn" disabled={busy}>
            {busy ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button className="continue-email-btn" type="button" onClick={handleDemoLogin} disabled={busy}>
          Continue as organizer demo
        </button>

        <div className="auth-bottom-link">
          No account yet?{" "}
          <button type="button" className="auth-link-btn" onClick={onOpenSignUp}>
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}
