import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Button,
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
import HerosectionHeader from "../../../Componet/Herosection/HerosectionHeader";
import ProductPagination from "../../../Componet/ProductPagination";
import CaseDetail from "./CaseDetail";
import AddNewCase from "./AddNewCase";
import LargeSpinner from "../../../Componet/Spinners/LargeSpinner";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
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

function ClientCases() {
  const [authState] = useCookies(["myAuthUser"]);
  const [loading, setLoading] = useState(false);
  const [allJobs, setAllJobs] = useState([]);
  const [activeJobs, setActiveJobs] = useState([]);

  const [activeCase, setActiveCase] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [showCanvas, setShowCanvas] = useState(false);
  const [activePage1, setActivePage1] = useState(1);
  const [activePage2, setActivePage2] = useState(1);

  const api_url = process.env.REACT_APP_API_URL;
  const pageSize = 6;

  const totalPages1 = Math.ceil(allJobs.length / pageSize);
  const startIndex1 = (activePage1 - 1) * pageSize;
  const endIndex1 = startIndex1 + pageSize;
  const jobsToShow1 = allJobs.slice(startIndex1, endIndex1);

  const totalPages2 = Math.ceil(activeJobs.length / pageSize);
  const startIndex2 = (activePage2 - 1) * pageSize;
  const endIndex2 = startIndex2 + pageSize;
  const jobsToShow2 = activeJobs.slice(startIndex2, endIndex2);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const showCaseDetails = (data) => {
    setActiveCase(data);
    setShowCanvas(true);
  };

  const fetchData = async () => {
    const result = await fetch(`${api_url}/job/my-jobs`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authState.myAuthUser.token}`,
        "Content-Type": "application/json",
      },
    });
    const response = await result.json();
    if (result.status === 200) {
      setAllJobs(response.myJobs);
      setActiveJobs(response.myJobs.filter((j) => j.isActive));
    } else {
      toast.error(response.resultMessage.en, toastConfig);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="page-wrapper">
      <HerosectionHeader name={"My Cases"} />

      <Offcanvas
        show={showCanvas}
        placement="end"
        onHide={() => {
          setShowCanvas(false);
        }}
      >
        <Offcanvas.Body>
          <CaseDetail data={activeCase} />
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
                        ? "active nav-item nav-link"
                        : "nav-item nav-link"
                    }
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    <i className="las la-plus"></i> Add New Case
                  </NavLink>
                </NavItem>
                <NavItem className="mb-md-0 mb-2">
                  <NavLink
                    className={
                      activeTab === "3"
                        ? " active nav-item nav-link"
                        : " nav-item nav-link"
                    }
                    onClick={() => {
                      toggle("3");
                    }}
                  >
                    Submitted ({jobsToShow1.length})
                  </NavLink>
                </NavItem>
                <NavItem className="mb-md-0 mb-2">
                  <NavLink
                    className={
                      activeTab === "4"
                        ? "active nav-item nav-link"
                        : "nav-item nav-link"
                    }
                    onClick={() => {
                      toggle("4");
                    }}
                  >
                    Active ({jobsToShow2.length})
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent
                activeTab={activeTab}
                className="px-2 px-md-4 pt-3"
                style={{ border: "1px solid lightgray", borderRadius: "6px" }}
              >
                <TabPane tabId="1" className="tab-pane fade show">
                  <AddNewCase />
                </TabPane>
                <TabPane tabId="3" className="tab-pane fade show">
                  <Container>
                    {loading ? (
                      <LargeSpinner />
                    ) : (
                      <Row>
                        <Col>
                          {jobsToShow1.length < 1 ? (
                            <p>You have no submitted cases</p>
                          ) : (
                            jobsToShow1.reverse().map((job, index) => (
                              <div
                                key={index}
                                onClick={() => {
                                  showCaseDetails(job);
                                }}
                                style={{ cursor: "pointer" }}
                                className="card card-shadow product-card product-list mb-3"
                              >
                                <Row className="align-items-center p-md-4 p-2">
                                  <Col>
                                    <div className="card-body">
                                      <div className="card-head d-flex justify-content-between">
                                        <button
                                          className="case-heading"
                                          type="button"
                                        >
                                          {job.title}
                                        </button>
                                        <div>
                                          {/* <Button
                                                style={{ height: "35px" }}
                                                onClick={() => { openJobSettings(job) }}
                                                className="btn btn-primary align-self-end py-0 px-3"
                                            >
                                                <i className="la la-trash"></i>
                                            </Button> */}
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col">
                                          <i className="la la-clock"></i>{" "}
                                          {moment(job.createdAt).fromNow()}
                                        </div>
                                        <div className="col">
                                          <i className="la la-map-marked"></i>{" "}
                                          {job.city}
                                        </div>
                                        <div className="col">
                                          <i className="la la-eye"></i>{" "}
                                          {job.isVisible
                                            ? "Visible"
                                            : "Not Visible"}
                                        </div>
                                      </div>
                                      <p
                                        className="mt-2 mb-0"
                                        style={{ fontSize: "13px" }}
                                      >
                                        {job.summary.substring(0, 300)}...
                                      </p>
                                    </div>
                                  </Col>
                                </Row>
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
                    )}
                  </Container>
                </TabPane>
                <TabPane tabId="4" className="tab-pane fade show">
                  <Container>
                    {loading ? (
                      <LargeSpinner />
                    ) : (
                      <Row>
                        <Col>
                          {jobsToShow2.length < 1 ? (
                            <p>You have no Active cases</p>
                          ) : (
                            jobsToShow2.reverse().map((job, index) => (
                              <div
                                key={index}
                                onClick={() => {
                                  showCaseDetails(job);
                                }}
                                style={{ cursor: "pointer" }}
                                className="card card-shadow product-card product-list mb-3"
                              >
                                <div className="row align-items-center p-md-4 p-2">
                                  <div className="col-lg-12">
                                    <div className="card-body">
                                      <div className="card-head">
                                        <button
                                          className="case-heading"
                                          type="button"
                                        >
                                          {job.title}
                                        </button>
                                      </div>
                                      <div className="row">
                                        <div className="col">
                                          <i className="la la-clock"></i>{" "}
                                          {moment(job.createdAt).fromNow()}
                                        </div>
                                        <div className="col">
                                          <i className="la la-map-marked"></i>{" "}
                                          {job.city}
                                        </div>
                                        <div className="col">
                                          Last Activity:{" "}
                                          {moment(job.updatedAt).fromNow()}
                                        </div>
                                      </div>
                                      <p
                                        className="mt-2 mb-0"
                                        style={{ fontSize: "13px" }}
                                      >
                                        {job.summary.substring(0, 300)}...
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                          <Row className="my-5">
                            <ProductPagination
                              activePage={activePage2}
                              totalPages={totalPages2}
                              onPageChange={(n) => {
                                setActivePage2(n);
                              }}
                            />
                          </Row>
                        </Col>
                      </Row>
                    )}
                  </Container>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default ClientCases;
