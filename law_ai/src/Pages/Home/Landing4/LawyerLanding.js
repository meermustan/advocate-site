import React, { useEffect, useState } from "react";
import BlogStyle1 from "../../../Componet/Blog/BlogStyle1";
import Welcome from "./Welcome1";
import { Container, Card, Row, Col, ProgressBar, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import HerosectionHeader from "../../../Componet/Herosection/HerosectionHeader";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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

function LawyerLanding() {
  const navigate = useNavigate();
  const [activeProposals, setActiveProposals] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [authState] = useCookies(["myAuthUser"]);
  const api_url = process.env.REACT_APP_API_URL;

  const viewCaseDashboard = (caseId) => {
    navigate("/case-dashboard", { state: caseId });
  };

  const viewContract = (contract) => {
    navigate("/contract-details", { state: contract });
  };

  const fetchData = async () => {
    const result = await fetch(`${api_url}/job/welcome`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authState.myAuthUser.token}`,
        "Content-Type": "application/json",
      },
    });
    const response = await result.json();
    if (result.status === 200) {
      setActiveProposals(response.activeJobs);
      setContracts(response.contracts);
    } else {
      toast.error(response.resultMessage.en, toastConfig);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <HerosectionHeader name="Welcome" />
      <div className="page-content pt-5">
        <Welcome name={authState?.myAuthUser?.name} />
        <Container className="my-5">
          <Card>
            <Card.Body>
              <h4 style={{ color: "red" }}>Active Cases:</h4>
              <hr />
              <Row>
                {activeProposals?.length > 0 ? (
                  <>
                    {activeProposals.map((proposal, index) => (
                      <Col key={index} className="mb-2">
                        <Card className="card-shadow">
                          <Card.Body>
                            <Card.Title>{proposal.job.title}</Card.Title>
                            <Card.Text>
                              <Badge
                                style={{ fontSize: "16px" }}
                                pill
                                bg="success"
                              >
                                Active
                              </Badge>
                            </Card.Text>
                            <Card.Text>City: {proposal.job.city}</Card.Text>
                            <Card.Text>
                              {proposal.job.summary.slice(0, 40)}...
                            </Card.Text>
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                viewCaseDashboard(proposal.job._id);
                              }}
                            >
                              Visit Dashboard
                            </button>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </>
                ) : (
                  <div>
                    <h4 className="text-center">You have no active cases</h4>
                    <h4 className="text-center mt-4">
                      <Link className="btn btn-primary" to="/cases">
                        Find Cases
                      </Link>
                    </h4>
                  </div>
                )}
              </Row>
            </Card.Body>
          </Card>
        </Container>
        <Container className="my-5">
          <Card>
            <Card.Body>
              <h4 style={{ color: "red" }}>Contracts:</h4>
              <hr />
              <Row>
                {contracts?.length > 0 ? (
                  <>
                    {contracts?.map((con, index) => (
                      <Col key={index} className="mb-2">
                        <Card className="card-shadow">
                          <Card.Body>
                            <Card.Title>Case: {con.job.title}</Card.Title>
                            <Card.Text>
                              <Badge
                                style={{ fontSize: "16px" }}
                                pill
                                bg="success"
                              >
                                {con.status}
                              </Badge>
                            </Card.Text>

                            <Card.Text>Budget: {con.total} PKR</Card.Text>
                            <Card.Text>City: {con.job.city}</Card.Text>
                            <Card.Text>{con.summary.slice(0, 40)}...</Card.Text>
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                viewContract(con);
                              }}
                            >
                              View Contract
                            </button>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </>
                ) : (
                  <div>
                    <h4 className="text-center">You have no active cases</h4>
                    <h4 className="text-center mt-4">
                      <Link className="btn btn-primary" to="/client-cases">
                        Add New Case
                      </Link>
                    </h4>
                  </div>
                )}
              </Row>
            </Card.Body>
          </Card>
        </Container>
        <Container className="my-5">
          <Row>
            {/* <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Balance Information</Card.Title>
                  <Card.Text>
                    Remaining Balance is 40k out of 90k.
                    <ProgressBar
                      variant="success"
                      style={{ height: "40px" }}
                      now={40}
                      label="40k"
                    />
                  </Card.Text>
                  <Link to="/client-profile">Feedback</Link>
                </Card.Body>
              </Card>
            </Col> */}  
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Cases Information</Card.Title>
                  <Card.Text>
                    You have {activeProposals?.length} active case.
                  </Card.Text>
                  <Link to="/proposals">My Proposal</Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Find Cases</Card.Title>
                  <Card.Text>
                    Find a right Case for your to make your bread and butter
                    easy.
                  </Card.Text>
                  <Link to="/cases">Find Cases</Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <BlogStyle1 />
      </div>
    </>
  );
}

export default LawyerLanding;