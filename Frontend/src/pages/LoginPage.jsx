import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../utilities/context/ThemeContext";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [ShowPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://hb-portfolio-n59p.onrender.com/api/auth/login",
        formData,
      );
      localStorage.setItem("token", data.token);
      setSuccess("Login successful! Redirecting to dashboard...");
      setTimeout(() => navigate("/admin"), 1000);
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };
  return (
    <section className="login-page min-vh-100 d-flex align-items-center justify-content-center overflow-hidden position-relative">
      <div className="blur-orb orb-1"></div>
      <div className="blur-orb orb-2"></div>

      <button
        onClick={toggleTheme}
        className="theme-toggle-btn login-theme-toggle"
        aria-label="Toggle theme"
      >
        <i className={theme === "dark" ? "ri-sun-line" : "ri-moon-line"}></i>
      </button>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-11 col-md-9 col-lg-8 col-xl-7">
            <div className="login-card glass-card shadow-lg overflow-hidden animate animate-in">
              <div className="row g-0">
                <div className="col-lg-5 d-none d-lg-flex login-aside">
                  <div className="login-aside-content">
                    <div className="login-logo mb-3">
                      <span className="logo-mark mx-auto">BH</span>
                    </div>
                    <h2 className="login-aside-title">
                      Welcome back<span className="login-aside-dot">.</span>
                    </h2>
                    <p className="login-aside-text">
                      Sign in to your portfolio dashboard and keep building
                      amazing things.
                    </p>
                    <div className="login-aside-orb orb-a"></div>
                    <div className="login-aside-orb orb-b"></div>
                  </div>
                </div>

                <div className="col-lg-7 login-main">
                  <div className="d-lg-none text-center mb-4">
                    <div className="login-logo mb-3">
                      <span className="logo-mark logo-mark-mobile mx-auto">
                        BH
                      </span>
                    </div>
                  </div>

                  <h1 className="login-title">Sign In</h1>
                  <p className="login-subtitle mb-4">
                    Enter your credentials to access your account
                  </p>

                  <form onSubmit={handleSubmit}>
                    {success && (
                      <div
                        className="alert alert-success alert-dismissible fade show d-flex align-items-center mb-3"
                        role="alert"
                      >
                        <i className="fa-solid fa-circle-check me-2"></i>
                        <span>{success}</span>
                        <button
                          type="button"
                          className="btn-close"
                          aria-label="Close"
                          onClick={() => setSuccess("")}
                        ></button>
                      </div>
                    )}
                    {error && (
                      <div
                        className="alert alert-danger alert-dismissible fade show d-flex align-items-center mb-3"
                        role="alert"
                      >
                        <i className="fa-solid fa-triangle-exclamation me-2"></i>
                        <span>{error}</span>
                        <button
                          type="button"
                          className="btn-close"
                          aria-label="Close"
                          onClick={() => setError("")}
                        ></button>
                      </div>
                    )}
                    <div className="mb-3">
                      <label
                        htmlFor="login-email"
                        className="form-label fw-medium"
                      >
                        Email
                      </label>
                      <div className="login-input-group">
                        <span className="login-input-icon">
                          <i className="fa-solid fa-envelope"></i>
                        </span>
                        <input
                          type="email"
                          id="login-email"
                          name="email"
                          value={formData.email}
                          onChange={handlechange}
                          className="form-control login-input"
                          placeholder="you@example.com"
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="login-password"
                        className="form-label fw-medium"
                      >
                        Password
                      </label>
                      <div className="login-input-group">
                        <span className="login-input-icon">
                          <i className="fa-solid fa-lock"></i>
                        </span>
                        <input
                          type={ShowPassword ? "text" : "password"}
                          id="login-password"
                          name="password"
                          value={formData.password}
                          onChange={handlechange}
                          className="form-control login-input"
                          placeholder="Enter your password"
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          className="login-eye"
                          aria-label="Toggle password"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          <i
                            className={
                              ShowPassword
                                ? "fa-solid fa-eye-slash"
                                : "fa-solid fa-eye"
                            }
                          ></i>
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-gradient w-100 justify-content-center py-3"
                      disabled={loading || !!success}
                    >
                      <span>
                        {loading
                          ? "Signing in..."
                          : success
                            ? "Success!"
                            : "Sign In"}
                      </span>
                      <i className="fa-solid fa-arrow-right ms-1"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
