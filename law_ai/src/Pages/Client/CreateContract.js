import React, { useState, useEffect } from "react";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row, Button, Spinner, Tooltip } from "reactstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import HerosectionHeader from "../../Componet/Herosection/HerosectionHeader";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ProposalDetail from "./Cases/ProposalDetail";
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

const CreateContract = () => {
  const { state } = useLocation();
  const [authState] = useCookies(["myAuthUser"]);
  const [milestoneModal, setMilestoneModal] = useState(false);
  const api_url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [job, setJob] = useState();
  const [proposal, setProposal] = useState();
  const [loading, setLoading] = useState(false);
  const [contract, setContact] = useState({});
  const [mileStone, setMileStone] = useState({});
  const [mileStones, setMileStones] = useState([]);
  const [showCanvas, setShowCanvas] = useState(false);

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  const submitContract = async () => {
    if (contract.total == "") {
      toast.warn("Invalid Contract Price.", toastConfig);
      return;
    }
    if (contract.summary == "") {
      toast.warn("Please add summary to contract.", toastConfig);
      return;
    }
    const nextData = {
      proposalId: proposal._id,
      jobId: job._id,
      lawyerId: proposal.owner._id,
      total: contract.total,
      summary: contract.summary,
      milestones: mileStones,
    };
    setLoading(true);
    const result = await fetch(`${api_url}/contract/create-contract`, {
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

  const addMileStone = (e) => {
    e.preventDefault();
    setMileStones([
      ...mileStones,
      {
        total: mileStone.total,
        title: mileStone.title,
        paymentStatus: "pending",
        status: "pending",
      },
    ]);
    setMileStone({});
    setMilestoneModal(false);
  };

  const deleteMilestone = (index) => {
    const newArray = [...mileStones];
    newArray.splice(index, 1);
    setMileStones(newArray);
  };

  useEffect(() => {
    if (!state) {
      navigate("/client-cases");
    } else {
      setJob(state.job);
      setProposal(state.proposal);
    }
  }, []);

  return (
    <>
      <HerosectionHeader folder1={"My Cases"} name={"Create Contract"} />

      <Modal
        show={milestoneModal}
        onHide={() => {
          setMilestoneModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Milestone</Modal.Title>
        </Modal.Header>
        <form onSubmit={addMileStone}>
          <Modal.Body>
            <span style={{ fontWeight: "bold" }}>Milestone Name :</span>
            <input
              type="text"
              value={mileStone.title}
              required={true}
              placeholder="Enter Descriptive Name for mile stone"
              onChange={(e) => {
                setMileStone({ ...mileStone, title: e.target.value });
              }}
              className="form-control mb-2"
            />
            <span style={{ fontWeight: "bold" }}>Total Price :</span>
            <input
              type="number"
              value={mileStone.total}
              required={true}
              placeholder="set price for this project in PKR"
              onChange={(e) => {
                setMileStone({ ...mileStone, total: e.target.value });
              }}
              className="form-control mb-2"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-primary">Add Milestone</Button>
          </Modal.Footer>
        </form>
      </Modal>
      <Offcanvas
        show={showCanvas}
        placement="end"
        onHide={() => {
          setShowCanvas(false);
        }}
      >
        <Offcanvas.Body>
          <ProposalDetail
            proposal={proposal}
            job={job}
            showHireButton={false}
          />
        </Offcanvas.Body>
      </Offcanvas>
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
                  <div
                    style={{ cursor: "pointer" }}
                    className="card product-card product-list mb-3"
                  >
                    <Row
                      className="align-items-center py-3 px-1 px-md-4"
                    >
                      <Col>
                        <div className="card-body">
                          <div className="card-head">
                            <div className="case-heading" type="button">
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
                          <p className="mt-2 mb-0" style={{ fontSize: "13px" }}>
                            {job.summary.substring(0, 250)}...
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
                  <div
                    className="card product-card product-list mb-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setShowCanvas(true);
                    }}
                  >
                    <div
                      className="row align-items-center py-3 px-1 px-md-4"
                    >
                      <div className="col-lg-12">
                        <div className="card-body">
                          <div className="card-head">
                            <div className="d-flex">
                              <div className="d-flex flex-row">
                                <div className="d-flex align-self-center me-3">
                                  <div
                                    style={{
                                      width: "55px",
                                      height: "55px",
                                      position: "relative",
                                    }}
                                  >
                                    <img
                                      src={proposal.owner.photoUrl}
                                      alt="avatar"
                                      className=""
                                      width="55px"
                                      height="55px"
                                    />
                                    {/* <div className='status-circle bg-primary'></div> */}
                                  </div>
                                </div>
                                <div>
                                  <div
                                    className="d-flex align-items-center"
                                    style={{
                                      gap: 5
                                    }}
                                  >
                                    <h6 className="mb-0">
                                      {proposal.owner.name}
                                    </h6>
                                    <i
                                      id="verified-tooltip"
                                      className="la la-check-circle"
                                      style={{
                                        cursor: "pointer",
                                        color: proposal?.owner?.verified_by_admin ? "blue" : "gray"
                                      }}
                                    ></i>
                                    <Tooltip
                                      placement="top"
                                      isOpen={tooltipOpen}
                                      target="verified-tooltip"
                                      toggle={toggleTooltip}
                                    >
                                      {proposal?.owner?.verified_by_admin ? "Verified" : "Not Verified"}
                                    </Tooltip>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <i className="la la-clock"></i>{" "}
                              {moment(proposal.createdAt).fromNow()}
                            </div>
                            <div className="col">
                              <i className="la la-map-marked"></i>{" "}
                              {proposal.owner.city}
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
                  Create Contract
                </h4>
                <hr />
                <span style={{ fontWeight: "bold" }}>Total Price :</span>
                <input
                  type="number"
                  value={contract.total}
                  required
                  placeholder="set price for this project in PKR"
                  onChange={(e) => {
                    setContact({ ...contract, total: e.target.value });
                  }}
                  className="form-control mb-2"
                />
                <span style={{ fontWeight: "bold" }}>Contract Summary :</span>
                <textarea
                  type="text"
                  value={contract.summary}
                  required
                  placeholder="Enter details about contract..."
                  onChange={(e) => {
                    setContact({ ...contract, summary: e.target.value });
                  }}
                  style={{ height: "150px", resize: "none" }}
                  className="form-control mb-3"
                />
                <span style={{ fontWeight: "bold" }}>
                  Case Milestone :{" "}
                  <i style={{ fontWeight: "normal", color: "gray" }}>
                    {" "}
                    "( you can also add milestone later on dashboard )"
                  </i>
                </span>
                <div className="d-flex justify-content-end">
                  <button
                    onClick={() => {
                      setMilestoneModal(true);
                    }}
                    className={"btn btn-primary px-3 mb-4 py-1"}
                  >
                    <i className="las la-plus"></i> Add Milestone
                  </button>
                </div>
                {mileStones.length > 0 ? (
                  <>
                    {mileStones.map((mile, index) => (
                      <div key={index} className="card my-3">
                        <div
                          className="row align-items-center"
                          style={{ padding: ".5rem" }}
                        >
                          <div className="col-lg-12">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-6">
                                  <h5>{mile.title}</h5>
                                </div>
                                <div className="col-md-3">
                                  <p>{mile.total} PKR</p>
                                </div>
                                <div className="col-md-3 d-flex justify-content-end">
                                  <Button
                                    onClick={() => {
                                      deleteMilestone(index);
                                    }}
                                    style={{ height: "35px" }}
                                    className="btn btn-primary px-3 py-1"
                                  >
                                    Delete
                                  </Button>
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
                    <p className="my-4">No milestone added.</p>
                  </>
                )}
                <hr></hr>
                <Button
                  disabled={loading}
                  onClick={submitContract}
                  className="mt-4 btn btn-primary"
                >
                  {loading ? (
                    <Spinner
                      animation="border"
                      size="sm"
                      role="status"
                    ></Spinner>
                  ) : (
                    "Submit Contract"
                  )}
                </Button>
              </div>
            </Container>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateContract;
