import { useState } from "react";
import { usePortfolio } from "../../utilities/context/PortfolioContext";
import api from "../../utilities/api/api";
import SuccessCard from "../../utilities/SuccessCard";
import ErrorCard from "../../utilities/ErrorCard";
import ProjectModalCard from "../../utilities/ProjectModalCard";

function Projects() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { portfolio, fetchPortfolioData } = usePortfolio();
  const projects = portfolio.projects?.items ?? [];

  const [showProject, setShowProject] = useState(false);
  const [projectModalMode, setProjectModalMode] = useState("add");
  const [editingProjectId, setEditingProjectId] = useState("");
  const [newProject, setNewProject] = useState({
    title: "",
    category: "",
    icon: "",
    period: "",
    description: "",
    tech: "",
    github: "",
    demo: "",
    status: "published",
  });

  const emptyProject = {
    title: "",
    category: "",
    icon: "",
    period: "",
    description: "",
    tech: "",
    github: "",
    demo: "",
    status: "published",
  };

  const handleOpenProject = () => {
    setProjectModalMode("add");
    setEditingProjectId("");
    setNewProject(emptyProject);
    setShowProject(true);
  };

  const handleEditProject = (item) => {
    setProjectModalMode("edit");
    setEditingProjectId(item._id);
    setNewProject({
      title: item.title || "",
      category: item.category || "",
      icon: item.icon || "",
      period: item.period || "",
      description: item.description || "",
      tech: item.tech?.join(", ") || "",
      github: item.github || "",
      demo: item.demo || "",
      status: item.status || "published",
    });
    setShowProject(true);
  };

  const handleCloseProject = () => setShowProject(false);

  const handleChangeProject = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteProject = async (item) => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await api.delete(`/projects/${item._id}`);
      if (response.status === 200 || response.status === 204) {
        setSuccessMessage("Project deleted successfully!");
        await fetchPortfolioData();
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Status:", error.response?.status);
      console.error("Backend error:", error.response?.data);
      console.error("Message:", error.message);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete project.",
      );
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };
  const handleSubmitProject = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const payload = {
      ...newProject,
      tech: newProject.tech
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
    };

    try {
      const response =
        projectModalMode === "edit"
          ? await api.put(`/projects/${editingProjectId}`, payload)
          : await api.post("/projects", payload);

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage(
          projectModalMode === "edit"
            ? "Project updated successfully!"
            : "Project added successfully!",
        );
        setShowProject(false);
        setNewProject(emptyProject);
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
          (projectModalMode === "edit"
            ? "Failed to update project."
            : "Failed to add project."),
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
            <i className="ri-code-box-line"></i>
          </span>
          Projects
        </h3>
        <button className="dashboard-add-btn" onClick={handleOpenProject}>
          Add Project
        </button>
      </div>
      <div className="table-responsive">
        <table className="table dashboard-table align-middle mb-0">
          <thead>
            <tr>
              <th>Project</th>
              <th>Category</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <span className="dashboard-project-icon">
                      <i className={item.icon}></i>
                    </span>
                    <span className="fw-medium">{item.title}</span>
                  </div>
                </td>
                <td>
                  <span className="tech-badge">{item.category}</span>
                </td>
                <td className="text-muted">{item.period}</td>
                <td>
                  <span className={`status-badge status-${item.status}`}>
                    {item.status}
                  </span>
                </td>
                <td className="text-end">
                  <div className="d-inline-flex gap-1">
                    <button
                      className="action-btn action-edit"
                      aria-label="Edit"
                      onClick={() => handleEditProject(item)}
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button
                      className="action-btn action-delete"
                      aria-label="Delete"
                      onClick={() => handleDeleteProject(item)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProjectModalCard
        show={showProject}
        onHide={handleCloseProject}
        title={projectModalMode === "edit" ? "Edit Project" : "Add Project"}
        project={newProject}
        onChange={handleChangeProject}
        onSubmit={handleSubmitProject}
      />
    </div>
  );
}

export default Projects;
