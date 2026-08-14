import React, { useEffect, useState } from "react";
import { usePortfolio } from "../../utilities/context/PortfolioContext";
import { Button, Modal } from "react-bootstrap";
import SuccessCard from "../../utilities/SuccessCard";
import ErrorCard from "../../utilities/ErrorCard";
import api from "../../utilities/api/api";

function Skills() {
  const { portfolio, fetchPortfolioData } = usePortfolio();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const skills = portfolio.skills?.items;
  const [show, setShow] = useState(false);
  const [addSkill, setAddSkill] = useState({ name: "", icon: "" });
  const handleClose = () => setShow(false);

  const handleSubmitAddSkill = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/skills", addSkill);
      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Profile updated successfully!");
        setShow(false);
         setAddSkill({
            name:'',
            icon:''
        })
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
        error.response?.data?.message || "Failed to update profile.",
      );

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const handleDeleteSkill = async (item) => {
    try {
      const response = await api.delete(`/skills/${item._id}`);
      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Profile updated successfully!");
        setShow(false);
       
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
        error.response?.data?.message || "Failed to update profile.",
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
            <i className="ri-cpu-line"></i>
          </span>
          Skills
        </h3>
        <button onClick={() => setShow(true)} className="dashboard-add-btn">
          Add
        </button>
      </div>
      <div className="d-flex flex-wrap gap-2">
        {skills &&
          skills.map((skill) => (
            <span className="skill-chip" key={skill._id}>
              {skill.name}
              <button
                className="skill-chip-remove"
                onClick={() => handleDeleteSkill(skill)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </span>
          ))}

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Skill</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label className="form-label">Name</label>

              <input
                type="text"
                className="form-control"
                value={addSkill.name}
                placeholder="Add Skill"
                onChange={(e) => setAddSkill({...addSkill,name: e.target.value})}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Icon</label>

              <input
                type="text"
                className="form-control"
                value={addSkill.icon}
                placeholder="Add Skill"
                onChange={(e) => setAddSkill({...addSkill,icon: e.target.value})}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmitAddSkill}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Skills;
