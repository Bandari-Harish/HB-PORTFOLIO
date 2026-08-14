import { useState } from "react";
import { usePortfolio } from "../../utilities/context/PortfolioContext";
import SuccessCard from "../../utilities/SuccessCard";
import ErrorCard from "../../utilities/ErrorCard";
import { Button, Modal } from "react-bootstrap";
import api from "../../utilities/api/api";

function Achivements() {
  const [show, setShow] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { portfolio, fetchPortfolioData } = usePortfolio();
  const achievements = portfolio.achievements?.items ?? [];

  const [modalMode, setModalMode] = useState("add");
  const [editingId, setEditingId] = useState("");

  const emptyAchievement = { text: "", icon: "" };
  const [achievementForm, setAchievementForm] = useState(emptyAchievement);

  const handleClose = () => setShow(false);

  const handleOpenAdd = () => {
    setModalMode("add");
    setEditingId("");
    setAchievementForm(emptyAchievement);
    setShow(true);
  };

  const handleOpenEdit = (item) => {
    setModalMode("edit");
    setEditingId(item._id);
    setAchievementForm({
      text: item.text || "",
      icon: item.icon || "",
    });
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAchievementForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response =
        modalMode === "edit"
          ? await api.put(`/achievements/${editingId}`, achievementForm)
          : await api.post("/achievements", achievementForm);

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage(
          modalMode === "edit"
            ? "Achievement updated successfully!"
            : "Achievement added successfully!",
        );
        setShow(false);
        setAchievementForm(emptyAchievement);
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
            ? "Failed to update achievement."
            : "Failed to add achievement."),
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
      const response = await api.delete(`/achievements/${item._id}`);
      if (response.status === 200 || response.status === 204) {
        setSuccessMessage("Achievement deleted successfully!");
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
        error.response?.data?.message || "Failed to delete achievement.",
      );

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
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
            <i className="ri-trophy-line"></i>
          </span>
          Achievements
        </h3>
        <button onClick={handleOpenAdd} className="dashboard-add-btn">
          Add
        </button>
      </div>
      <div className="d-flex flex-column gap-2">
        {achievements.map((item) => (
          <div className="admin-info-row" key={item._id}>
            <span className="admin-info-icon">
              <i className={item.icon}></i>
            </span>
            <div className="flex-1-0 small fw-medium">{item.text}</div>

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
          </div>
        ))}
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === "edit" ? "Edit Achievement" : "Add Achievement"}
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="mb-3">
              <label className="form-label">Text</label>

              <input
                type="text"
                className="form-control"
                name="text"
                value={achievementForm.text}
                placeholder="e.g. Winner of Hackathon 2024"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Icon</label>

              <input
                type="text"
                className="form-control"
                name="icon"
                value={achievementForm.icon}
                placeholder="e.g. fa-solid fa-trophy"
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
  );
}

export default Achivements;
