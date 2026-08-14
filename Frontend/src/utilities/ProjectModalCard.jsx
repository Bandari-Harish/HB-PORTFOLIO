import { Modal, Button } from "react-bootstrap";

function ProjectModalCard({
  show,
  onHide,
  title,
  project,
  onChange,
  onSubmit,
}) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={project.title}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            name="category"
            className="form-control"
            value={project.category}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Icon</label>
          <input
            type="text"
            name="icon"
            className="form-control"
            placeholder="fa-solid fa-code"
            value={project.icon}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Period</label>
          <input
            type="text"
            name="period"
            className="form-control"
            placeholder="Jan 2025 - Mar 2025"
            value={project.period}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="3"
            value={project.description}
            onChange={onChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Technologies (comma separated)
          </label>
          <input
            type="text"
            name="tech"
            className="form-control"
            placeholder="React, Node.js, MongoDB"
            value={project.tech}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">GitHub URL</label>
          <input
            type="url"
            name="github"
            className="form-control"
            value={project.github}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Demo URL</label>
          <input
            type="url"
            name="demo"
            className="form-control"
            value={project.demo}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            className="form-select"
            value={project.status}
            onChange={onChange}
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          {title}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProjectModalCard;
