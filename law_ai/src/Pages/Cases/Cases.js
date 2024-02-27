import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { useCookies } from "react-cookie";
import Highlighter from "react-highlight-words";
import moment from "moment";
import { Card, CardText, Col, Container, Row } from "reactstrap";
import HerosectionHeader from "../../Componet/Herosection/HerosectionHeader";
import ProductPagination from "../../Componet/ProductPagination";
import { useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import CaseDetails from "./CaseDetails";
import LargeSpinner from "../../Componet/Spinners/LargeSpinner";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
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

function Cases() {
  const [selectedOption, setSelectedOption] = useState("1");
  const [showCanvas, setShowCanvas] = useState(false);
  const [authState] = useCookies(["myAuthUser"]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [allJobs, setAllJobs] = useState([]);

  const [searchQuery, setSearchQuery] = useState();
  const [searchJobs, setSearchJobs] = useState([]);
  const [activeCase, setActiveCase] = useState(false);
  const [activePage1, setActivePage1] = useState(1);
  const [User, setUser] = useState({});
  const [verifyModal, setVerifyModal] = useState(false);

  const [sort, setSort] = useState("createdAt_desc");

  const api_url = process.env.REACT_APP_API_URL;
  const pageSize = 6;

  const totalPages1 = Math.ceil(searchJobs.length / pageSize);
  const startIndex1 = (activePage1 - 1) * pageSize;
  const endIndex1 = startIndex1 + pageSize;
  const jobsToShow1 = searchJobs.slice(startIndex1, endIndex1);

  const fetchUser = async () => {
    const result = await fetch(`${api_url}/user/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authState?.myAuthUser?.token}`,
        "Content-Type": "application/json",
      },
    });
    const response = await result.json();
    if (result.status === 200) {
      setUser(response.user);
    } else {
      toast.error(response.resultMessage.en, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);


  const handleOptionChange = (e) => {
    setSort(e.target.value);
    setActivePage1(1);
  };

  const handleSearch = () => {
    if (!searchQuery || searchQuery == "") {
      setSearchJobs(allJobs);
    } else {
      setSearchJobs(allJobs.filter((job) => job.title.includes(searchQuery)));
    }
  };

  const showCaseDetails = (data) => {
    setActiveCase(data);
    setShowCanvas(true);
  };

  const fetchData = async () => {
    const result = await fetch(`${api_url}/job/jobs`);
    const response = await result.json();
    if (result.status === 200) {
      setAllJobs(response.allJobs);
      setSearchJobs(response.allJobs);
    } else {
      toast.error(response.resultMessage.en, toastConfig);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {

    const [sortBy, sortDir] = sort.split("_");
    if (sortBy === "createdAt") {
      setSearchJobs(prev => {
        const sorted = [...prev];

        sorted.sort((a, b) => {
          if (sortDir === "asc") {
            return new Date(a.createdAt )- new Date(b.createdAt);
          } else {
            return new Date(b.createdAt )- new Date(a.createdAt);
          }
        });

        return sorted;
      });
    }

  }, [sort]);



  useEffect(() => {
    if (User?._id && !(User?.verification?._id)) {
      setVerifyModal(true);
    }
  }, [User]);

  const VerifyModal = ({ show, action, handleClose }) => {
    
    return (
      <Modal
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-capitalize">Unverified Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your profile is not verified yet. You have to verify your profile for submmiting a proposals!
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={action} className="w-100">Go to Profile</Button>
        </Modal.Footer>
      </Modal>
    )
  }


  return (
    <div className="page-wrapper">
      <HerosectionHeader name={"Cases"} />
      <Offcanvas
        show={showCanvas}
        placement="end"
        onHide={() => {
          setShowCanvas(false);
        }}
      >
        <Offcanvas.Body>
          <CaseDetails job={activeCase} User={User} />
        </Offcanvas.Body>
      </Offcanvas>
      <div className="page-content">
        <Container>
          <Row
            style={{
              border: "1px solid lightgray",
              borderTop: "none",
            }}
            className="pt-3 px-md-5 px-2"
          >
            <Col>
              <Row className="px-md-5 px-0">
                <form className="row g-0">
                  <input
                    className="form-control col mx-3"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <Button
                    style={{ width: "65px", height: "35px" }}
                    onClick={handleSearch}
                    className="bg-transparent align-self-end p-0 text-dark"
                  >
                    <i className="las la-search"></i>
                  </Button>
                </form>
              </Row>
              <hr />
              <Row className="mb-4 align-items-center">
                <Card className="border-0 p-2">
                  <Row className="align-items-center">
                    <Col md="5" className="mb-3 mb-md-0">
                      <CardText tag="span" className="text-muted">
                        Showing 1 to {jobsToShow1.length} of {searchJobs.length}{" "}
                        total
                      </CardText>
                    </Col>
                    <Col
                      md="7"
                      className="d-flex align-items-center justify-content-md-end"
                    >
                      <div className="sort-filter ms-2 d-flex align-items-center">
                        <select
                          className="form-select"
                          id="inputGroupSelect02"
                          onChange={handleOptionChange}
                          value={sort}
                        >
                          <option selected>Sort By</option>
                          <option value="createdAt_desc">Newest Item</option>
                          <option value="createdAt_asc">Oldest Item</option>
                        </select>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Row>
              {loading ? (
                <LargeSpinner />
              ) : (
                <Row>
                  <Col>
                    {jobsToShow1.length < 1 ? (
                      <p>No Data Found..</p>
                    ) : (
                      jobsToShow1.map((job, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            showCaseDetails(job);
                          }}
                          style={{ cursor: "pointer" }}
                          className="card card-shadow product-card product-list mb-3"
                        >
                          <Row
                            className="align-items-center  py-3 px-1 px-md-4"
                          >
                            <Col>
                              <div className="card-body">
                                <div className="card-head">
                                  <div className="case-heading" type="button">
                                    <Highlighter
                                      searchWords={[searchQuery]}
                                      autoEscape={true}
                                      textToHighlight={job.title}
                                    />
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
                                  {/* <div className="col"><i className="la la-eye"></i>{" "}{job.isVisible ? "Visible" : "Not Visible"}</div> */}
                                </div>
                                <p
                                  className="mt-2 mb-0"
                                  style={{ fontSize: "13px" }}
                                >
                                  {job.summary.substring(0, 300)}...
                                </p>
                                <div className="mt-3">
                                  <p><i className="las la-coins" style={{fontSize: "20px"}}></i> {" "}Est. Budget {`${job.estimatedBudget}`}</p>
                                </div>
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
            </Col>
          </Row>
        </Container>
        <VerifyModal
          show={verifyModal}
          action={() => {
            navigate('/lawyer-profile');
          }}
          handleClose={() => setVerifyModal(false)}
        />
      </div>
    </div>
  );
}

export default Cases;