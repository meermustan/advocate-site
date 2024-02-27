import React, { useState, useEffect } from "react";
import { Button, Tooltip } from "reactstrap";
import Highlighter from "react-highlight-words";
import moment from "moment";
import { Card, CardText, Col, Container, Row } from "reactstrap";
import HerosectionHeader from "../../Componet/Herosection/HerosectionHeader";
import ProductPagination from "../../Componet/ProductPagination";
import Offcanvas from "react-bootstrap/Offcanvas";
import LawyerDetails from "./LawyerDetails";
import { useLocation } from "react-router-dom";
import LargeSpinner from "../../Componet/Spinners/LargeSpinner";
import { toast } from "react-toastify";

import { Rating } from "react-simple-star-rating";

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

function Lawyers() {
  const { state } = useLocation();
  const [showCanvas, setShowCanvas] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState();
  const [searchProfiles, setSearchProfiles] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);
  const [activeProfile, setActiveProfile] = useState(false);
  const [activePage1, setActivePage1] = useState(1);

  const [sort, setSort] = useState("rating_desc");

  const api_url = process.env.REACT_APP_API_URL;
  const pageSize = 6;

  const totalPages1 = Math.ceil(searchProfiles.length / pageSize);
  const startIndex1 = (activePage1 - 1) * pageSize;
  const endIndex1 = startIndex1 + pageSize;
  const profileToShow1 = searchProfiles.slice(startIndex1, endIndex1);

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  const handleOptionChange = (e) => {
    setSort(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery || searchQuery == "") {
      setSearchProfiles(allProfiles);
    } else {
      setSearchProfiles(
        allProfiles.filter((profile) => profile.name?.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
  };

  const showProfileDetails = (data) => {
    setActiveProfile(data);
    setShowCanvas(true);
  };
  // body: {}
  const fetchData = async () => {
    const result = await fetch(`${api_url}/user/lawyers/?onlyVerifiedLawyers=${state?.privateRequest === true? true : false }`);
    const response = await result.json();
    if (result.status === 200) {
      
      const lawyers = response.lawyers?.map(lawyer => {
        const user = {
          ...lawyer
        };

        let totalRating = 0;
        lawyer?.profile?.reviews?.forEach(review => {
          totalRating += review?.rating || 0;
        });

        user.rating = Math.round(totalRating / (lawyer?.profile?.reviews?.length || 0)) || 0;

        return user;
      });

      setSearchProfiles(lawyers);
      setAllProfiles(lawyers);
    } else {
      toast.error(response.resultMessage.en, toastConfig);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortData = (data = []) => {
    const [sortBy, sortDir] = sort.split("_");
    if (sortBy === "rating") {
      const sorted = [...data];

      sorted.sort((a, b) => {
        if (sortDir === "asc") {
          return a.rating - b.rating;
        } else {
          return b.rating - a.rating;
        }
      });

      return sorted;
    }
    return data;
  }

  return (
    <div className="page-wrapper">
      <HerosectionHeader name={"Lawyers"} />
      <Offcanvas
        show={showCanvas}
        placement="end"
        onHide={() => {
          setShowCanvas(false);
        }}
      >
        <Offcanvas.Body>
          <LawyerDetails profile={activeProfile} caseId={state?.caseId} />
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
          >ase Owner:
            <Col className="order-lg-1">
              <Row className="px-md-5 px-0">
                <form onSubmit={handleSearch} className="row g-0">
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
                        Showing 1 to {profileToShow1.length} of{" "}
                        {searchProfiles.length} total
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
                          <option value="rating_desc">Highest Rating</option>
                          <option value="rating_asc">Lowest Rating</option>
                        </select>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Row>
              {loading ? (
                <LargeSpinner />
              ) : (
                <>
                  {sortData(profileToShow1).map((user, index) => (
                    <div
                      key={index}
                      className="card card-shadow product-card product-list mb-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        showProfileDetails(user);
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
                                        borderRadius: "50px",
                                        height: "55px",
                                        position: "relative",
                                      }}
                                    >
                                      <img
                                        src={user.photoUrl}
                                        alt="avatar"
                                        className=""
                                        width="55px"
                                      />
                                      {/* <div className='status-circle bg-primary'></div> */}
                                    </div>
                                  </div>
                                  <div>
                                    <button
                                      className="case-heading p-0 d-flex align-items-center"
                                      style={{
                                        gap: 5
                                      }}
                                      type="button"
                                    >
                                      <Highlighter
                                        searchWords={[searchQuery]}
                                        autoEscape={true}
                                        textToHighlight={user.name}
                                      />
                                      <i
                                        id="verified-tooltip"
                                        className="la la-check-circle"
                                        style={{
                                          cursor: "pointer",
                                          color: user?.verified_by_admin ? "blue" : "gray"
                                        }}
                                      ></i>
                                    </button>
                                    <Tooltip
                                      placement="top"
                                      isOpen={tooltipOpen}
                                      target="verified-tooltip"
                                      toggle={toggleTooltip}
                                    >
                                      {user?.verified_by_admin ? "Verified" : "Not Verified"}
                                    </Tooltip>
                                    <p>
                                      <Rating
                                        edit={false}
                                        readonly={true}
                                        initialValue={user?.rating}
                                        size={20}
                                      />
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                Member Since:{" "}
                                {moment(user.createdAt).format("MMM Do YY")}
                              </div>
                              <div className="col">
                                <i className="la la-map-marked"></i> {user.city}
                              </div>
                              {/* <div className="col"><i className="la la-eye"></i>{" "}{job.isVisible ? "Visible" : "Not Visible"}</div> */}
                            </div>
                            <hr />
                            <p
                              className="mt-2 mb-0"
                              style={{ fontSize: "14px" }}
                            >
                              {user.profile.about}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Row className="my-5">
                    <ProductPagination
                      activePage={activePage1}
                      totalPages={totalPages1}
                      onPageChange={(n) => {
                        setActivePage1(n);
                      }}
                    />
                  </Row>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Lawyers;
