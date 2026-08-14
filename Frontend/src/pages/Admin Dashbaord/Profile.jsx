import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { usePortfolio } from "../../utilities/context/PortfolioContext";
import api from "../../utilities/api/api";
import SuccessCard from "../../utilities/SuccessCard";
import ErrorCard from "../../utilities/ErrorCard";

function Profile() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { portfolio, fetchPortfolioData } = usePortfolio();
  const profile = portfolio.profile?.profile;

  const profileInfo = [
    {
      key: "location",
      icon: "ri-map-pin-line",
      label: "Location",
      value: profile?.location,
    },
    {
      key: "education",
      icon: "ri-graduation-cap-line",
      label: "Education",
      value: profile?.education,
    },
    {
      key: "languages",
      icon: "ri-global-line",
      label: "Languages",
      value: profile?.languages?.join(", "),
    },
    {
      key: "experience",
      icon: "ri-briefcase-line",
      label: "Experience",
      value: profile?.experience,
    },
    {
      key: "email",
      icon: "ri-mail-line",
      label: "Email",
      value: profile?.email,
      type: "email",
    },
    {
      key: "phone",
      icon: "ri-phone-line",
      label: "Phone",
      value: profile?.phone,
    },
  ];
  const [show, setShow] = useState(false);
  const [editProfile, setEditProfile] = useState({
    name: profile?.name || "",
    role: profile?.roles?.join(", ") || "",
    location: profile?.location || "",
    education: profile?.education || "",
    languages: profile?.languages?.join(", ") || "",
    experience: profile?.experience || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
  });
  const handleEditProfile = () => {
    setShow(true);
    setEditProfile((prev) => ({
      ...prev,
      name: profile?.name || "",
      role: profile?.roles?.join(", ") || "",
      location: profile?.location || "",
      education: profile?.education || "",
      languages: profile?.languages?.join(", ") || "",
      experience: profile?.experience || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
    }));
  };

  const handleClose = () => setShow(false);

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await api.put("/profile", editProfile);

      if (response.status === 200) {
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

  const [editField, setEditField] = useState(null);
  const [fieldValue, setFieldValue] = useState("");
  const handleEditField = (item) => {
    setEditField(item);
    setFieldValue(item.value || "");
  };
  const handleCloseField = () => {
    setEditField(null);
    setFieldValue("");
  };
  const handleSubmitField = async () => {
    setSuccessMessage("");
    setErrorMessage("");
    if (!editField) return;

    try {
      const payload =
        editField.key === "languages"
          ? {
              languages: fieldValue
                .split(",")
                .map((lang) => lang.trim())
                .filter(Boolean),
            }
          : { [editField.key]: fieldValue };
      const response = await api.patch("/profile", payload);

      if (response.status === 200) {
        setSuccessMessage(`${editField.label} updated successfully!`);
        handleCloseField();
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
        error.response?.data?.message || `Failed to update ${editField?.label}.`,
      );

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const [resume, setResume] = useState(profile?.resume || "");
  const handleSubmitResume = async (e) => {
    e.preventDefault();
    // Clear previous messages
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const response = await api.put("/profile", {
        resume: resume,
      });

      if (response.status === 200) {
        await fetchPortfolioData();
        setSuccessMessage("Resume link updated successfully!");

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Status:", error.response?.status);
      console.error("Backend error:", error.response?.data);
      console.error("Message:", error.message);
      setErrorMessage(
        error.response?.data?.message || "Failed to update resume link.",
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
            <i className="ri-user-3-line"></i>
          </span>
          Profile
        </h3>
        <button onClick={handleEditProfile} className="dashboard-add-btn">
          Edit
        </button>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={editProfile.name}
              onChange={(e) =>
                setEditProfile({
                  ...editProfile,
                  name: e.target.value,
                })
              }
            />
          </div>

          {/* Role */}
          <div className="mb-3">
            <label className="form-label">Role</label>
            <input
              type="text"
              className="form-control"
              value={editProfile.role}
              onChange={(e) =>
                setEditProfile({
                  ...editProfile,
                  role: e.target.value,
                })
              }
            />
          </div>

          {/* Location */}
          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              value={editProfile.location}
              onChange={(e) =>
                setEditProfile({
                  ...editProfile,
                  location: e.target.value,
                })
              }
            />
          </div>

          {/* Education */}
          <div className="mb-3">
            <label className="form-label">Education</label>
            <input
              type="text"
              className="form-control"
              value={editProfile.education}
              onChange={(e) =>
                setEditProfile({
                  ...editProfile,
                  education: e.target.value,
                })
              }
            />
          </div>

          {/* Languages */}
          <div className="mb-3">
            <label className="form-label">Languages</label>
            <input
              type="text"
              className="form-control"
              value={editProfile.languages}
              onChange={(e) =>
                setEditProfile({
                  ...editProfile,
                  languages: e.target.value,
                })
              }
            />
          </div>

          {/* Experience */}
          <div className="mb-3">
            <label className="form-label">Experience</label>
            <input
              type="text"
              className="form-control"
              value={editProfile.experience}
              onChange={(e) =>
                setEditProfile({
                  ...editProfile,
                  experience: e.target.value,
                })
              }
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={editProfile.email}
              onChange={(e) =>
                setEditProfile({
                  ...editProfile,
                  email: e.target.value,
                })
              }
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              value={editProfile.phone}
              onChange={(e) =>
                setEditProfile({
                  ...editProfile,
                  phone: e.target.value,
                })
              }
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>

          <Button onClick={handleSubmitProfile} variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={Boolean(editField)} onHide={handleCloseField} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit {editField?.label}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type={editField?.type || "text"}
            className="form-control"
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseField}>
            Cancel
          </Button>
          <Button onClick={handleSubmitField} variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex align-items-center gap-3 mb-4">
        <span className="dashboard-profile-avatar">
          {profile?.avatar || "HB"}
        </span>
        <div>
          <div className="fw-bold">{profile?.name}</div>
          <div className="text-muted small">{profile?.roles[0]}</div>
        </div>
      </div>
      <div className="d-flex flex-column gap-2">
        {profileInfo &&
          profileInfo.map((item) => (
            <div className="admin-info-row" key={item.label}>
              <span className="admin-info-icon">
                <i className={item?.icon}></i>
              </span>
              <div className="flex-1-0 min-w-0">
                <div className="text-muted small">{item.label}</div>
                <div className="small fw-medium text-truncate">
                  {item.value}
                </div>
              </div>
              <button
                className="action-btn action-edit"
                aria-label={`Edit ${item.label}`}
                onClick={() => handleEditField(item)}
              >
                <i className="fa-solid fa-pen"></i>
              </button>
            </div>
          ))}
      </div>
      <div className="border-top pt-3 mt-3">
        <div className="text-muted small mb-1">Resume / CV Link</div>
        <div className="d-flex gap-2 mb-2">
          <input
            type="url"
            className="form-control form-control-sm"
            placeholder="https://drive.google.com/..."
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />

          <button
            className="btn btn-outline-primary btn-sm rounded flex-shrink-0"
            aria-label="Save resume link"
            onClick={handleSubmitResume}
          >
            <i className="fa-solid fa-floppy-disk"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
