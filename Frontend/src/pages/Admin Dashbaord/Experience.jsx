import { useState } from "react";
import { usePortfolio } from "../../utilities/context/PortfolioContext";
import { Button, Modal } from "react-bootstrap";
import SuccessCard from "../../utilities/SuccessCard";
import ErrorCard from "../../utilities/ErrorCard";
import api from "../../utilities/api/api";

function Experience() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { portfolio, fetchPortfolioData } = usePortfolio();
  const experiences = portfolio.experience?.items ?? [];

  const [show, setShow] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingId, setEditingId] = useState("");

  const emptyExperience = {
    role: "",
    company: "",
    period: "",
    type: "fulltime",
    points: "",
  };

  const [experienceForm, setExperienceForm] = useState(emptyExperience);

  const handleClose = () => setShow(false);

  const handleOpenAdd = () => {
    setModalMode("add");
    setEditingId("");
    setExperienceForm(emptyExperience);
    setShow(true);
  };

  const handleOpenEdit = (item) => {
    setModalMode("edit");
    setEditingId(item._id);
    setExperienceForm({
      role: item.role || "",
      company: item.company || "",
      period: item.period || "",
      type: item.type || "fulltime",
      points: item.points?.join("\n") || "",
    });
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExperienceForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const payload = {
      ...experienceForm,
      points: experienceForm.points
        .split("\n")
        .map((point) => point.trim())
        .filter(Boolean),
    };

    try {
      const response =
        modalMode === "edit"
          ? await api.put(`/experience/${editingId}`, payload)
          : await api.post("/experience", payload);

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage(
          modalMode === "edit"
            ? "Experience updated successfully!"
            : "Experience added successfully!",
        );
        setShow(false);
        setExperienceForm(emptyExperience);
        await fetchPortfolioData();

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Status:", error.response?.status);
      console.error("Backend error:", error.response?.data);
      console.error("Message:", error.message);
      setErrorMessage(
        error.response?.data?.message ||
          (modalMode === "edit"
            ? "Failed to update experience."
            : "Failed to add experience."),
      );

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const handleDelete = async (item) => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await api.delete(`/experience/${item._id}`);
      if (response.status === 200 || response.status === 204) {
        setSuccessMessage("Experience deleted successfully!");
        await fetchPortfolioData();
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Status:", error.response?.status);
      console.error("Backend error:", error.response?.data);
      console.error("Message:", error.message);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete experience.",
      );
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <div className="dashboard-card glass-card">
      <SuccessCard
        message={successMessage}
        onDismiss={() => setSuccessMessage("")}
      />
      <ErrorCard message={errorMessage} onDismiss={() => setErrorMessage("")} />
      <div className="dashboard-card-header">
        <h3 className="dashboard-card-title">
          <span className="dashboard-card-icon">
            <i className="ri-briefcase-4-line"></i>
          </span>
          Experience
        </h3>
        <button onClick={handleOpenAdd} className="dashboard-add-btn">
          Add
        </button>
      </div>
      <div className="table-responsive">
        <table className="table dashboard-table align-middle mb-0">
          <thead>
            <tr>
              <th>Role</th>
              <th>Company</th>
              <th>Period</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="d-flex flex-column">
                    <span className="fw-medium">{item.role}</span>
                    <span className={`exp-badge exp-badge-${item.type} mt-1`}>
                      {item.type}
                    </span>
                  </div>
                </td>
                <td className="text-muted">{item.company}</td>
                <td className="text-muted">{item.period}</td>
                <td className="text-end">
                  <div className="d-inline-flex gap-1">
                    <button
                      className="action-btn action-edit"
                      aria-label="Edit"
                      onClick={() => handleOpenEdit(item)}
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button
                      className="action-btn action-delete"
                      aria-label="Delete"
                      onClick={() => handleDelete(item)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {modalMode === "edit" ? "Edit Experience" : "Add Experience"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <input
                type="text"
                className="form-control"
                name="role"
                value={experienceForm.role}
                placeholder="e.g. Senior Frontend Developer"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Company</label>
              <input
                type="text"
                className="form-control"
                name="company"
                value={experienceForm.company}
                placeholder="e.g. Acme Corp"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Period</label>
              <input
                type="text"
                className="form-control"
                name="period"
                value={experienceForm.period}
                placeholder="e.g. Jan 2022 - Present"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                name="type"
                value={experienceForm.type}
                onChange={handleChange}
              >
                <option value="fulltime">Full-time</option>
                <option value="internship">Internship</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Points (one per line)</label>
              <textarea
                className="form-control"
                name="points"
                rows="4"
                value={experienceForm.points}
                placeholder="Led a team of 5 developers&#10;Improved performance by 40%"
                onChange={handleChange}
              ></textarea>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Experience;
