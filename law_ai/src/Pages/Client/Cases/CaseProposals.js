import React, { useState, useEffect } from "react";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import LargeSpinner from "../../../Componet/Spinners/LargeSpinner";
import { Col, Container, Row, Tooltip } from "reactstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import ProposalDetail from "./ProposalDetail";
import HerosectionHeader from "../../../Componet/Herosection/HerosectionHeader";
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

const CaseProposals = () => {
  const { state } = useLocation();
  const [authState] = useCookies(["myAuthUser"]);
  const api_url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [job, setJob] = useState();
  const [loading, setLoading] = useState(true);
  const [proposals, setProposals] = useState([]);
  const [activeProposal, setActiveProposal] = useState(false);

  const [showCanvas, setShowCanvas] = useState(false);
  const handleCanvasClose = () => setShowCanvas(false);

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  const getProposals = async (job) => {
    const result = await fetch(
      `${api_url}/proposal/job-proposal?jobId=${job._id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authState?.myAuthUser?.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const response = await result.json();
    if (result.status === 200) {
      setProposals(response.jobProposals);
      setLoading(false);
    } else {
      toast.error(response.resultMessage.en, toastConfig);
    }
  };

  const updateProposal = (proposal) => {
    fetch(`${api_url}/proposal/edit-proposal`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState.myAuthUser.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        proposalId: proposal._id,
        updateViewed: true,
        isViewed: true,
      }),
    });
  };

  const showProposalDetails = (proposal) => {
    setActiveProposal(proposal);
    setShowCanvas(true);
    if (!proposal.isViewed) {
      updateProposal(proposal);
    }
  };

  useEffect(() => {
    if (!state) {
      navigate("/cases");
    } else {
      setJob(state);
      getProposals(state);
    }
  }, []);

  return (
    <>
      <HerosectionHeader folder1={"My Cases"} name={"Case Proposal"} />
      <Offcanvas show={showCanvas} placement="end" onHide={handleCanvasClose}>
        <Offcanvas.Body>
          <ProposalDetail proposal={activeProposal} job={job} />
        </Offcanvas.Body>
      </Offcanvas>
      <div className="page-wrapper">
        {job && (
          <div className="page-content">
            <Container>
              <div style={{ border: "1px solid lightgray", borderTop: "none" }}>
                <Row className="align-items-center px-3 pt-4 px-md-5">
                  <Col lg={12}>
                    <div className="product-details">
                      <div className="d-flex mt-2 justify-content-between">
                        <h4>{job.title}</h4>
                        {moment(job.createdAt).fromNow()}
                      </div>
                      <ul className="list-unstyled my-4">
                        <li className="mb-2 text-black">
                          Vosibility:{" "}
                          <span className="text-muted">
                            {job.isVisible ? "Visible" : "Not Visible"}
                          </span>
                        </li>
                        <li className="mb-2 text-black">
                          Location:{" "}
                          <span className="text-muted">{job.city}</span>
                        </li>
                      </ul>
                      <p className="mb-4">{job.summary}</p>
                    </div>
                  </Col>
                </Row>
                {loading ? (
                  <LargeSpinner />
                ) : (
                  <div className="mx-3 mt-2">
                    <h4>Submitted Proposals ({proposals.length})</h4>
                    {proposals.length < 1 ? (
                      <h5 className="w-100 text-center my-5">
                        No proposal submited yet.
                      </h5>
                    ) : (
                      proposals.reverse().map((proposal, index) => (
                        <div
                          key={index}
                          className="card card-shadow product-card product-list mb-3"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            showProposalDetails(proposal);
                          }}
                        >
                          <div className="row align-items-center py-3 px-1 px-md-4">
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
                                <p
                                  className="mt-2 mb-0"
                                  style={{ fontSize: "14px" }}
                                >
                                  {proposal.summary.substring(0, 350)}...
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </Container>
          </div>
        )}
      </div>
    </>
  );
};

export default CaseProposals;
