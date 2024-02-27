import React, { useState, useEffect } from "react";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row, Button, Spinner } from "reactstrap";
import HerosectionHeader from "../../Componet/Herosection/HerosectionHeader";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import Modal from "react-bootstrap/Modal";
import { Badge } from "react-bootstrap";
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

const ContractDetails = () => {
  const { state } = useLocation();
  const [authState] = useCookies(["myAuthUser"]);
  const [showModal, setShowModal] = useState(false);
  const api_url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [job, setJob] = useState();
  const [proposal, setProposal] = useState();
  const [loading, setLoading] = useState(false);
  const [contract, setContact] = useState({});

  const acceptContract = async () => {
    const nextData = {
      jobId: job._id,
      contractId: contract._id,
      proposalId: proposal._id,
    };
    setLoading(true);
    const result = await fetch(`${api_url}/contract/accept-contract`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState?.myAuthUser?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nextData),
    });
    const response = await result.json();
    if (result.status === 200) {
      toast.success(response.resultMessage.en, toastConfig);
      setLoading(true);
      setTimeout(() => {
        navigate("/client-cases");
      }, 1000);
    } else {
      toast.error(response.resultMessage.en, toastConfig);
    }
  };

  useEffect(() => {
    if (!state) {
      navigate("/");
    } else {
      setContact(state);
      setJob(state.job);
      setProposal(state.proposal);
    }
  }, []);

  return (
    <>
      <HerosectionHeader name={"Create Details"} />
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Hire Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            You have successfully hire this lawyer. now you can chat with this
            lawyer.
          </p>
          <Row className="text-center">
            <Col>
              <Button
                style={{ height: "35px" }}
                className="btn btn-primary align-self-end py-0 my-4"
              >
                View Case Dashboard
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <div className="page-wrapper">
        <Container className="container">
          <div
            style={{
              border: "1px solid lightgray",
              borderTop: "none",
              padding: "20px 30px",
            }}
          >
            <div className="row mt-3">
              <div className="col-md-6">
                <h4>Case:</h4>
                {job && (
                  <div className="card product-card product-list mb-3">
                    <Row
                      className="align-items-center py-3 px-1 px-md-4"
                    >
                      <Col>
                        <div className="card-body">
                          <div className="card-head">
                            <div className="case-heading">
                              <h6>{job.title}</h6>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <i className="la la-clock"></i>{" "}
                              {moment(job.createdAt).fromNow()}
                            </div>
                            <div className="col">
                              <i className="la la-map-marked"></i> {job.city}
                            </div>
                            {/* <div className="col"><i className="la la-eye"></i>{" "}{job.isVisible ? "Visible" : "Not Visible"}</div> */}
                          </div>
                          <p className="mt-2 mb-0" style={{ fontSize: "14px" }}>
                            {job.summary.substring(0, 200)}...
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <h4>Proposal:</h4>
                {proposal && (
                  <div className="card product-card product-list mb-3">
                    <div
                      className="row align-items-center py-3 px-1 px-md-4"
                    >
                      <div className="col-lg-12">
                        <div className="card-body">
                          <div className="card-head">
                            <div className="case-heading">
                              <h6>Job: {job.title}</h6>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <i className="la la-clock"></i>{" "}
                              {moment(proposal.createdAt).fromNow()}
                            </div>
                            {/* <div className="col"><i className="la la-eye"></i>{" "}{job.isVisible ? "Visible" : "Not Visible"}</div> */}
                          </div>
                          <p className="mt-2 mb-0" style={{ fontSize: "14px" }}>
                            {proposal.summary.substring(0, 200)}...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
        {job && (
          <div className="page-content">
            <Container className="container">
              <div
                style={{
                  border: "1px solid lightgray",
                  borderTop: "none",
                  padding: "20px 30px",
                }}
              >
                <h4 style={{ color: "red", marginBottom: "20px" }}>
                  Contract Details
                </h4>
                <hr />
                <h6 className="text-end">
                  <Badge style={{ fontSize: "16px" }} pill bg="success">
                    {contract.status}
                  </Badge>
                </h6>
                <span style={{ fontWeight: "bold" }}>
                  Total Price : {contract.total} PKR
                </span>
                <span style={{ fontWeight: "bold" }}>Contract Summary :</span>
                <p>{contract.summary}</p>
                <span style={{ fontWeight: "bold" }}>Case Milestone :</span>
                {contract.milestones.length > 0 ? (
                  <>
                    {contract.milestones.map((mile, index) => (
                      <div key={index} className="card card-shadow my-3">
                        <div
                          className="row align-items-center"
                          style={{ padding: ".5rem" }}
                        >
                          <div className="col-lg-12">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-8">
                                  <h5>{mile.title}</h5>
                                </div>
                                <div className="col-md-4 d-flex justify-content-end">
                                  <p>{mile.total} PKR</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <p className="my-4">No milestone added yet.</p>
                  </>
                )}
                <hr></hr>
                {contract.status === "Initiated By Client" && authState?.myAuthUser?.type === "lawyer" && (
                  <Button
                    disabled={loading}
                    onClick={acceptContract}
                    className="mt-4 btn btn-primary"
                  >
                    {loading ? (
                      <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                      ></Spinner>
                    ) : (
                      "Accept Contract"
                    )}
                  </Button>
                )}
              </div>
            </Container>
          </div>
        )}
      </div>
    </>
  );
};

export default ContractDetails;
