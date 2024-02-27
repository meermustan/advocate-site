import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import LargeSpinner from "../../../Componet/Spinners/LargeSpinner";
import HerosectionHeader from "../../../Componet/Herosection/HerosectionHeader";
import ProductPagination from "../../../Componet/ProductPagination";
import ProposalDetails from "./ProposalDetails";
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

function LawyerProposals() {
  const [authState] = useCookies(["myAuthUser"]);
  const api_url = process.env.REACT_APP_API_URL;
  const [myProposals, setMyProposals] = useState([]);
  const [activeProposals, setActiveProposals] = useState([]);
  const [activeProposal, setActiveProposal] = useState();
  const [loading, setLoading] = useState(true);

  const [showCanvas, setShowCanvas] = useState(false);

  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [activePage, setActivePage] = useState(1);
  const [activePage1, setActivePage1] = useState(1);
  const pageSize = 6;

  const totalPages = Math.ceil(myProposals.length / pageSize);
  const startIndex = (activePage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const proposalsToShow = myProposals.slice(startIndex, endIndex);

  const totalPages1 = Math.ceil(activeProposals.length / pageSize);
  const startIndex1 = (activePage1 - 1) * pageSize;
  const endIndex1 = startIndex1 + pageSize;
  const proposalsToShow1 = activeProposals.slice(startIndex1, endIndex1);

  const getProposals = async () => {
    const result = await fetch(`${api_url}/proposal/my-proposal`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authState.myAuthUser.token}`,
        "Content-Type": "application/json",
      },
    });
    const response = await result.json();
    if (result.status === 200) {
      setMyProposals(response.myProposals);
      setActiveProposals(response.myProposals.filter((j) => j.isActive));
      setLoading(false);
    } else {
      toast.error(response.resultMessage.en, toastConfig);
    }
  };

  const showProposalDetails = (data) => {
    setActiveProposal(data);
    setShowCanvas(true);
  };

  useEffect(() => {
    getProposals();
  }, []);

  return (
    <div className="page-wrapper">
      <HerosectionHeader name={"Proposals"} />
      <Offcanvas
        show={showCanvas}
        placement="end"
        onHide={() => {
          setShowCanvas(false);
        }}
      >
        <Offcanvas.Body>
          <ProposalDetails proposal={activeProposal} />
        </Offcanvas.Body>
      </Offcanvas>

      <div className="page-content py-5">
        <Container>
          <Row>
            <Col md={12}>
              <Nav
                tabs
                className="nav nav-tabs mb-4"
                style={{ cursor: "pointer", borderBottom: "none" }}
              >
                <NavItem className="mb-md-0 mb-2">
                  <NavLink
                    className={
                      activeTab === "1"
                        ? " active ms-0 nav-item nav-link"
                        : " ms-0 nav-item nav-link"
                    }
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    Submitted ({proposalsToShow.length})
                  </NavLink>
                </NavItem>
                <NavItem className="mb-md-0 mb-2">
                  <NavLink
                    className={
                      activeTab === "2"
                        ? "active nav-item nav-link"
                        : "nav-item nav-link"
                    }
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Active ({proposalsToShow1.length})
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent
                activeTab={activeTab}
                className="px-2 px-md-4 pt-3"
                style={{ border: "1px solid lightgray", borderRadius: "6px" }}
              >
                <TabPane tabId="1" className="tab-pane fade show">
                  {loading ? (
                    <LargeSpinner />
                  ) : (
                    <Container>
                      <Row>
                        <Col className="order-lg-1">
                          {proposalsToShow.length < 1 ? (
                            <h5 className="w-100 text-center my-5">
                              You have no submitted proposals
                            </h5>
                          ) : (
                            proposalsToShow.reverse().map((proposal, index) => (
                              <div
                                key={index}
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  showProposalDetails(proposal);
                                }}
                                className="card product-card product-list mb-3"
                              >
                                <Row className="align-items-center py-3 px-1 px-md-4">
                                  <Col>
                                    <div className="card-body">
                                      <div className="row card-head d-flex">
                                        <div className="col-12">
                                          <button
                                            className="case-heading"
                                            type="button"
                                          >
                                            {proposal.job.title}
                                          </button>
                                        </div>
                                        <div className="col-12 pt-2 text-end">
                                          {proposal.isViewed ? (
                                            <span>
                                              <i className="la la-eye"> </i>{" "}
                                              Viewed By Client
                                            </span>
                                          ) : (
                                            <span>Not Viewed Yet</span>
                                          )}
                                        </div>
                                      </div>
                                      <p className="mt-2 mb-0">
                                        {proposal.summary.substring(0, 300)}...
                                      </p>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            ))
                          )}
                          <Row className="my-5">
                            <ProductPagination
                              activePage={activePage}
                              totalPages={totalPages}
                              onPageChange={(n) => {
                                setActivePage(n);
                              }}
                            />
                          </Row>
                        </Col>
                      </Row>
                    </Container>
                  )}
                </TabPane>
                <TabPane tabId="2" className="tab-pane fade show">
                  {loading ? (
                    <LargeSpinner />
                  ) : (
                    <Container>
                      <Row>
                        <Col className="order-lg-1">
                          {proposalsToShow1.length < 1 ? (
                            <h5 className="w-100 text-center my-5">
                              You have no active proposals
                            </h5>
                          ) : (
                            proposalsToShow1
                              .reverse()
                              .map((proposal, index) => (
                                <div
                                  key={index}
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    showProposalDetails(proposal);
                                  }}
                                  className="card card-shadow product-card product-list mb-3"
                                >
                                  <div className="row align-items-center py-3 px-1 px-md-4">
                                    <div className="col-lg-12">
                                      <div className="card-body">
                                        <div className="card-head d-flex justify-content-between">
                                          <button
                                            className="case-heading"
                                            type="button"
                                          >
                                            {proposal.job.title}
                                          </button>
                                        </div>
                                        <p className="mt-2 mb-0">
                                          {proposal.summary.substring(0, 300)}
                                          ...
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                          )}
                          <Row className="my-5">
                            <ProductPagination
                              activePage={activePage1}
                              totalPages={totalPages1}
                              onPageChange={(n) => {
                                setActivePage1(n);
                              }}
                            />
                          </Row>
                        </Col>
                      </Row>
                    </Container>
                  )}
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default LawyerProposals;
