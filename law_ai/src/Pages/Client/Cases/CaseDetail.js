import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Button, Col, Container, Image, Row } from "reactstrap";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
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

function CaseDetail({ data }) {
  const [authState] = useCookies(["myAuthUser"]);
  const navigate = useNavigate();
  const [updating, setUpdating] = useState(false);
  const [editJob, setEditJob] = useState(data);
  const api_url = process.env.REACT_APP_API_URL;

  const viewAllProposals = () => {
    navigate("/case-proposals", { state: data });
  };

  const viewCaseDashboard = () => {
    navigate("/case-dashboard", { state: data._id });
  };

  const updateJob = async () => {
    setUpdating(true);
    const result = await fetch(`${api_url}/job/`, {
      method: "Put",
      headers: {
        Authorization: `Bearer ${authState?.myAuthUser?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobId: editJob._id,
        summary: editJob.summary,
        title: editJob.title,
        city: editJob.city,
        updateVisibility: true,
        isVisible: editJob.isVisible,
      }),
    });
    const response = await result.json();
    if (result.status === 200) {
      toast.success(response.resultMessage.en, toastConfig);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      toast.error(response.resultMessage.en, toastConfig);
    }
    setUpdating(false);
  };

  return (
    <Container className="px-0 px-md-5">
      <h3 className="text-center mb-2" style={{ color: "#aa0505" }}>
        Case Details
      </h3>
      <hr />
      <Row className="align-items-center">
        <Col lg={12}>
          <div className="product-details">
            <div className="row">
              <div className="col-12 text-end">
                <Button
                  style={{ height: "35px", marginRight: "10px" }}
                  onClick={viewCaseDashboard}
                  className="btn btn-primary align-self-end py-0"
                >
                  View Case Dashboard
                </Button>

                <Button
                  style={{ height: "35px" }}
                  onClick={viewAllProposals}
                  className="btn btn-primary align-self-end py-0 px-3"
                >
                  View Proposals
                </Button>
              </div>
              <div className="col-12 mt-3">
                <h4>{data.title}</h4>
              </div>
            </div>
            <Modal.Body>
              <span className="text-muted">
                Last Activity: {moment(data.updatedAt).fromNow()}
              </span>
              <hr></hr>
              <span style={{ fontWeight: "bold" }}>Case Visibility :</span>
              <Form.Check
                className="my-2"
                type="switch"
                checked={editJob.isVisible}
                onChange={() => {
                  setEditJob({ ...editJob, isVisible: !editJob.isVisible });
                }}
                label={editJob.isVisible ? "Case is Visible" : "Case is Hidden"}
              />
              <span style={{ fontWeight: "bold" }}>Location :</span>
              <input
                type="text"
                value={editJob.city}
                onChange={(e) => {
                  setEditJob({ ...editJob, city: e.target.value });
                }}
                className="form-control mb-2"
              />
              <span style={{ fontWeight: "bold" }}>Case Title :</span>
              <input
                type="text"
                value={editJob.title}
                onChange={(e) => {
                  setEditJob({ ...editJob, title: e.target.value });
                }}
                className="form-control mb-2"
              />
              <span style={{ fontWeight: "bold" }}>Case Summary :</span>
              <textarea
                type="text"
                value={editJob.summary}
                onChange={(e) => {
                  setEditJob({ ...editJob, summary: e.target.value });
                }}
                style={{ height: "200px", resize: "none" }}
                className="form-control"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={updateJob}
                disabled={updating}
                className="mt-4"
                variant="primary"
              >
                {updating ? (
                  <Spinner animation="border" size="sm" role="status"></Spinner>
                ) : (
                  "Update Case"
                )}
              </Button>
            </Modal.Footer>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CaseDetail;
