import { Modal, Button } from "react-bootstrap";

function SuccessCard({ message, onDismiss }) {
  return (
    <Modal show={Boolean(message)} onHide={onDismiss} centered>
      <Modal.Header closeButton>
        <Modal.Title>Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center gap-3">
          <span className="text-success fs-2">
            <i className="fa-solid fa-circle-check"></i>
          </span>
          <span>{message}</span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onDismiss}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SuccessCard;
