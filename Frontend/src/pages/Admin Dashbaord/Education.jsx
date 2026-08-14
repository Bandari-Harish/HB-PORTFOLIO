import { useState } from "react";
import { usePortfolio } from "../../utilities/context/PortfolioContext";
import SuccessCard from "../../utilities/SuccessCard";
import ErrorCard from "../../utilities/ErrorCard";
import { Button, Modal } from "react-bootstrap";
import api from "../../utilities/api/api";

function Education() {
  const [show, setShow] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { portfolio, fetchPortfolioData } = usePortfolio();
  const education = portfolio.education?.items ?? [];

  const [modalMode, setModalMode] = useState("add");
  const [editingId, setEditingId] = useState("");

  const emptyEducation = {
    degree: "",
    field: "",
    institution: "",
    period: "",
    grade: "",
    location: "",
  };

  const [educationForm, setEducationForm] = useState(emptyEducation);

  const handleClose = () => setShow(false);

  const handleOpenAdd = () => {
    setModalMode("add");
    setEditingId("");
    setEducationForm(emptyEducation);
    setShow(true);
  };

  const handleOpenEdit = (item) => {
    setModalMode("edit");
    setEditingId(item._id);
    setEducationForm({
      degree: item.degree || "",
      field: item.field || "",
      institution: item.institution || "",
      period: item.period || "",
      grade: item.grade || "",
      location: item.location || "",
    });
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response =
        modalMode === "edit"
          ? await api.put(`/education/${editingId}`, educationForm)
          : await api.post("/education", educationForm);

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage(
          modalMode === "edit"
            ? "Education updated successfully!"
            : "Education added successfully!",
        );
        setShow(false);
        setEducationForm(emptyEducation);
        await fetchPortfolioData();

        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Status:", error.response?.status);
      console.error("Backend error:", error.response?.data);
      console.error("Message:", error.message);
      setErrorMessage(
        error.response?.data?.message ||
          (modalMode === "edit"
            ? "Failed to update education."
            : "Failed to add education."),
      );
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleDelete = async (item) => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await api.delete(`/education/${item._id}`);
      if (response.status === 200 || response.status === 204) {
        setSuccessMessage("Education deleted successfully!");
        await fetchPortfolioData();
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Status:", error.response?.status);
      console.error("Backend error:", error.response?.data);
      console.error("Message:", error.message);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete education.",
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
            <i className="ri-graduation-cap-line"></i>
          </span>
          Education
        </h3>
        <button onClick={handleOpenAdd} className="dashboard-add-btn">
          Add
        </button>
      </div>
      <div className="table-responsive">
        <table className="table dashboard-table align-middle mb-0">
          <thead>
            <tr>
              <th>Degree</th>
              <th>Course</th>
              <th>Institution</th>
              <th>Location</th>
              <th>Period</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {education &&
              education.map((item) => (
                <tr key={item._id}>
                  <td className="fw-medium">{item.degree}</td>
                  <td className="fw-medium">{item.field}</td>
                  <td className="text-muted">{item.institution}</td>
                  <td className="text-muted">{item.location}</td>
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
              {modalMode === "edit" ? "Edit Education" : "Add Education"}
            </Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <div className="mb-3">
                <label className="form-label">Degree</label>
                <input
                  type="text"
                  className="form-control"
                  name="degree"
                  value={educationForm.degree}
                  placeholder="e.g. Bachelor of Science"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Course / Field</label>
                <input
                  type="text"
                  className="form-control"
                  name="field"
                  value={educationForm.field}
                  placeholder="e.g. Computer Science"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Institution</label>
                <input
                  type="text"
                  className="form-control"
                  name="institution"
                  value={educationForm.institution}
                  placeholder="e.g. University of Oxford"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={educationForm.location}
                  placeholder="e.g. London, UK"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Period</label>
                <input
                  type="text"
                  className="form-control"
                  name="period"
                  value={educationForm.period}
                  placeholder="e.g. Sep 2018 - Jun 2022"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Grade</label>
                <input
                  type="text"
                  className="form-control"
                  name="grade"
                  value={educationForm.grade}
                  placeholder="e.g. First Class Honours"
                  onChange={handleChange}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default Education;
