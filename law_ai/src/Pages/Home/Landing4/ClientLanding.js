import React, { useEffect, useState } from "react";
import BlogStyle1 from "../../../Componet/Blog/BlogStyle1";
import Welcome from "./Welcome";
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

function ClientLanding() {
  const navigate = useNavigate();
  const [activeCases, setActiveCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState([]);
  const [authState] = useCookies(["myAuthUser"]);
  const api_url = process.env.REACT_APP_API_URL;

  const viewCaseDashboard = (caseId) => {
    navigate("/case-dashboard", { state: caseId });
  };

  const viewAllProposals = (job) => {
    navigate("/case-proposals", { state: job });
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
      console.log(response);
      setActiveCases(response.activeJobs);
      setContracts(response.contracts);
      setLoading(false);
    } else {
      setLoading(false);
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
              <h4 style={{ color: "red" }}>Active & Submitted Cases:</h4>
              <hr />
              <Row>
                {activeCases?.length > 0 ? (
                  <>
                    {activeCases.map((cas, index) => (
                      <Col key={index} className="mb-2 col-12 col-md-6 col-sm-12 col-lg-4">
                        <Card className="card-shadow">
                          <Card.Body>
                            <Card.Title className="text-center d-flex justify-content-between align-items-center">
                              {cas.title} 
                              <i className={`la la-${cas.isVisible? "eye" : "eye-slash"}`}></i>
                            </Card.Title>
                            {cas.isActive ? (
                              <Badge
                                style={{ fontSize: "16px" }}
                                pill
                                bg="success"
                              >
                                Active
                              </Badge>
                            ) : (
                              <Badge
                                style={{ fontSize: "16px" }}
                                pill
                                bg="secondary"
                              >
                                Submitted
                              </Badge>
                            )}
                            <Card.Text className="mt-3">
                              <a
                                href="javascript:void(0)"
                                style={{ textDecoration: "underline" }}
                                onClick={() => {
                                  viewAllProposals(cas);
                                }}
                              >
                                Total Proposals: <b>{cas.proposals.length}</b>
                              </a>
                            </Card.Text>
                            <Card.Text>City: {cas.city}</Card.Text>
                            <Card.Text>{cas.summary.slice(0, 40)}...</Card.Text>
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                viewCaseDashboard(cas._id);
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
          <Card>
            <Card.Body>
              <h4 style={{ color: "red" }}>Contracts:</h4>
              <hr />
              <Row>
                {contracts?.length > 0 ? (
                  <>
                    {contracts?.map((con, index) => (
                      <Col key={index} className="mb-2 col-12 col-md-12 col-sm-12 col-lg-4">
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
                  <Card.Text>You have {activeCases?.length} case.</Card.Text>
                  <Link to="/client-cases">My Cases</Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Find Lawyer</Card.Title>
                  <Card.Text>
                    Find a right lawyer for your case to handle it rightly.
                  </Card.Text>
                  <Link to="/lawyers">Find Lawyer</Link>
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

export default ClientLanding;
