import { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
} from "reactstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import Modal from "react-bootstrap/Modal";

const api_url = process.env.REACT_APP_API_URL;
const toastConfig = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

const ApproveModal = ({ show, handleClose, handleApprove }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-capitalize">Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Would you like to proceed with approving this verification request?
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleApprove}>Yes</Button>
        <Button onClick={handleClose} color="danger">No</Button>
      </Modal.Footer>
    </Modal>
  )
}

const RejectModal = ({ show, handleClose, handleReject }) => {

  const [description, setDescription] = useState("");

  return (
    <Modal
      show={show}
      onHide={() => {
        setDescription("");
        handleClose();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-capitalize">Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup>
          <Label style={{ fontWeight: "bold" }}>
            Refute reason
          </Label>
          <Input
            type="textarea"
            name="main_court_of_practice"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        Would you like to proceed with refuting this verification request?
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleReject(description)}>Yes</Button>
        <Button onClick={() => {
          setDescription("");
          handleClose();
        }} color="danger">No</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default function RequestDetails({ request, show, handleClose, refresh }) {

  const [authState] = useCookies(["myAuthUser"]);

  const [loading, setLoading] = useState(false);
  const [showApprove, setShowApprove] = useState(false);
  const [showReject, setShowReject] = useState(false);

  const handleApprove = async () => {
    setLoading(true);

    try {
      const result = await fetch(
        `${api_url}/user/verification/approve`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authState?.myAuthUser?.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            verification_id: request?._id
          })
        }
      );
      const response = await result.json();

      if (result.status !== 200) {
        throw new Error(response.resultMessage.en);
      }

      toast.success(response.resultMessage.en, toastConfig);
      refresh();
    } catch (error) {
      toast.error(error.message, toastConfig);
    }

    setShowApprove(false);
    setLoading(false);
    handleClose();
  }
  const handleReject = async (description) => {
    setLoading(true);

    try {
      const result = await fetch(
        `${api_url}/user/verification/refute`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authState?.myAuthUser?.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            verification_id: request?._id,
            description
          })
        }
      );
      const response = await result.json();

      if (result.status !== 200) {
        throw new Error(response.resultMessage.en);
      }

      toast.success(response.resultMessage.en, toastConfig);
      refresh();
    } catch (error) {
      toast.error(error.message, toastConfig);
    }

    setShowReject(false);
    setLoading(false);
    handleClose();
  }

  return (
    <>
      <Offcanvas show={show} placement="end" onHide={handleClose}>
        <Offcanvas.Body>
          <Container className="px-0 px-md-5 mb-4">
            <h3
              className="custom-h3 text-center mb-2"
              style={{ color: "#aa0505" }}
            >
              Verification Data - {request?.user?.name}
            </h3>
            <hr />
            
            <Form onSubmit={(e) => e.preventDefault()}>
              <div
                className="d-flex flex-wrap"
                style={{
                  gap: 16,
                }}
              >
                <FormGroup className="flex-grow-1 d-flex flex-column">
                  <Label style={{ fontWeight: "bold" }}>
                    CNIC of Lawyer front image
                  </Label>
                  <img
                    src={request?.CNIC_front_image_url}
                    alt="CNIC_front"
                    className="img-fluid"
                    style={{
                      maxWidth: "350px",
                    }}
                  />
                </FormGroup>
                <FormGroup className="flex-grow-1 d-flex flex-column">
                  <Label style={{ fontWeight: "bold" }}>
                    CNIC of Lawyer back image
                  </Label>
                  <img
                    src={request?.CNIC_back_image_url}
                    alt="CNIC_back"
                    className="img-fluid"
                    style={{
                      maxWidth: "350px",
                    }}
                  />
                </FormGroup>
              </div>
              <div
                className="d-flex flex-wrap"
                style={{
                  gap: 16,
                }}
              >
                <FormGroup className="flex-grow-1 d-flex flex-column">
                  <Label style={{ fontWeight: "bold" }}>
                    BAR Council Card front image
                  </Label>
                  <img
                    src={request?.BAR_front_image_url}
                    alt="BAR_front"
                    className="img-fluid"
                    style={{
                      maxWidth: "350px",
                    }}
                  />
                </FormGroup>
                <FormGroup className="flex-grow-1 d-flex flex-column">
                  <Label style={{ fontWeight: "bold" }}>
                    BAR Council Card back image
                  </Label>
                  <img
                    src={request?.BAR_back_image_url}
                    alt="BAR_back"
                    className="img-fluid"
                    style={{
                      maxWidth: "350px",
                    }}
                  />
                </FormGroup>
              </div>
              <FormGroup>
                <Label style={{ fontWeight: "bold" }}>BAR No</Label>
                <Input name="BAR_no" value={request?.BAR_no} readOnly required />
              </FormGroup>
              <div
                className="d-flex flex-wrap"
                style={{
                  gap: 16,
                }}
              >
                <FormGroup className="flex-grow-1">
                  <Label style={{ fontWeight: "bold" }}>Location</Label>
                  <Input
                    name="location"
                    value={request?.location}
                    readOnly
                    required
                  />
                </FormGroup>
                <FormGroup className="flex-grow-1">
                  <Label style={{ fontWeight: "bold" }}>
                    Main Court of Practice
                  </Label>
                  <Input
                    name="main_court_of_practice"
                    value={request?.main_court_of_practice}
                    readOnly
                    required
                  />
                </FormGroup>
              </div>
              <Table bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Case Type</th>
                  </tr>
                </thead>
                <tbody>
                  {request?.clients.length > 0 ? (
                    request?.clients.map((client, index) => (
                      <tr
                        key={index}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <th scope="row">{index + 1}</th>
                        <td>{client.name}</td>
                        <td>{client.phone}</td>
                        <td>{client.case_type}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <th colSpan={4} className="text-center">
                        Empty.
                      </th>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Form>
            <hr />

            {request?.status === "pending" && (
              <div className="d-flex" style={{ gap: 16 }}>
                <Button
                  disabled={loading}
                  onClick={() => setShowApprove(true)}
                >
                  Approve
                </Button>
                <Button
                  color="danger"
                  onClick={() => setShowReject(true)}
                  disabled={loading}
                >
                  Refute
                </Button>
              </div>
            )}
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
      
      <ApproveModal
        show={showApprove}
        handleApprove={handleApprove}
        handleClose={() => setShowApprove(false)}
      />

      <RejectModal
        show={showReject}
        handleReject={handleReject}
        handleClose={() => setShowReject(false)}
      />
    </>
  );
}
