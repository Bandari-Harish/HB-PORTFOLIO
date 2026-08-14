import { useEffect, useState } from "react";
import { usePortfolio } from "../utilities/context/PortfolioContext";
import api from "../utilities/api/api.js";

function Contact() {
  const { portfolio } = usePortfolio();
  const profile = portfolio.profile?.profile;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!success && !error) return;
    const timer = setTimeout(() => {
      setSuccess("");
      setError("");
    }, 4000);
    return () => clearTimeout(timer);
  }, [success, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      const [dbResult, emailResult] = await Promise.allSettled([
        api.post("/messages", formData),
        profile?.email
          ? api.post(
              `https://formsubmit.co/${encodeURIComponent(profile.email)}`,
              formData,
              { headers: { Accept: "application/json" } }
            )
          : Promise.resolve(null),
      ]);

      if (dbResult.status === "rejected") {
        console.error("Failed to save message:", dbResult.reason);
      }

      if (emailResult.status === "fulfilled" && emailResult.value) {
        setSuccess("Message sent! You'll receive a copy by email.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else if (emailResult.status === "rejected") {
        setError("Message saved, but email delivery failed. Please try again.");
      } else if (dbResult.status === "fulfilled") {
        setSuccess("Message sent!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact py-6">
      <div className="container">
        <h2 className="section-title text-center mb-5 animate animate-in">
          Get In Touch
        </h2>
        <div className="row g-4 justify-content-center">
          <div className="col-lg-5 animate animate-in">
            <div className="card glass-card border-0 shadow-sm p-4 h-100">
              <h5 className="fw-bold mb-2">Let's talk about everything!</h5>
              <p className="text-muted small mb-4">
                Have a project in mind or just want to say hi? Feel free to
                reach out!
              </p>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center gap-3 p-3 rounded-3 bg-body-tertiary border">
                  <div className="info-icon d-flex align-items-center justify-content-center rounded-2 flex-shrink-0">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div className="min-w-0">
                    <p className="text-muted small fw-medium mb-0">Email</p>
                    <a
                      href={`mailto:${profile?.email}`}
                      className="text-decoration-none text-body small fw-semibold text-break"
                    >
                      {profile?.email}
                    </a>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3 p-3 rounded-3 bg-body-tertiary border">
                  <div className="info-icon d-flex align-items-center justify-content-center rounded-2 flex-shrink-0">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <p className="text-muted small fw-medium mb-0">Phone</p>
                    <a
                      href={`tel:${profile?.phone?.replace(/[^\d+]/g, "")}`}
                      className="text-decoration-none text-body small fw-semibold"
                    >
                      {profile?.phone}
                    </a>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3 p-3 rounded-3 bg-body-tertiary border">
                  <div className="info-icon d-flex align-items-center justify-content-center rounded-2 flex-shrink-0">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </div>
                  <div>
                    <p className="text-muted small fw-medium mb-0">LinkedIn</p>
                    <a
                      href={profile?.social?.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none text-body small fw-semibold text-break"
                    >
                      {profile?.social?.linkedin}
                    </a>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3 p-3 rounded-3 bg-body-tertiary border">
                  <div className="info-icon d-flex align-items-center justify-content-center rounded-2 flex-shrink-0">
                    <i className="fa-brands fa-github"></i>
                  </div>
                  <div>
                    <p className="text-muted small fw-medium mb-0">GitHub</p>
                    <a
                      href={profile?.social?.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none text-body small fw-semibold text-break"
                    >
                      {profile?.social?.github}
                    </a>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3 p-3 rounded-3 bg-body-tertiary border">
                  <div className="info-icon d-flex align-items-center justify-content-center rounded-2 flex-shrink-0">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <p className="text-muted small fw-medium mb-0">Location</p>
                    <span className="small fw-semibold">{profile?.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 animate animate-in">
            <div className="card glass-card border-0 shadow-sm p-4 h-100">
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
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label className="form-label small fw-medium">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label small fw-medium">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-medium">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Project Inquiry"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-medium">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-control"
                      rows="5"
                      placeholder="Tell me about your project..."
                      required
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-gradient w-100 py-2"
                      disabled={loading}
                    >
                      <span>{loading ? "Sending..." : "Send Message"}</span>
                      <i className="fa-solid fa-paper-plane ms-1"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
