import { Modal, Button } from "react-bootstrap";

function ErrorCard({ message, onDismiss }) {
  return (
    <Modal show={Boolean(message)} onHide={onDismiss} centered>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center gap-3">
          <span className="text-danger fs-2">
            <i className="fa-solid fa-triangle-exclamation"></i>
          </span>
          <span>{message}</span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onDismiss}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ErrorCard;
