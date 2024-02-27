import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import {
  Col,
  Container,
  Row,
} from "reactstrap";

import moment from "moment";

import LargeSpinner from "../../../Componet/Spinners/LargeSpinner";
import RequestDetails from "./RequestDetails";

const api_url = process.env.REACT_APP_API_URL;

export default function Request({ status = "pending", effect }) {
  const [authState] = useCookies(["myAuthUser"]);

  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [requests, setRequest] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleShowDetails = (request) => {
    setSelectedRequest(request);
    setShowDetails(true);
  };
  const handleHideDetails = () => {
    setSelectedRequest(null);
    setShowDetails(false);
  };

  async function getVerificationRequest() {
    setLoading(true);
    try {
      const result = await fetch(
        `${api_url}/user/verification?status=${status}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState?.myAuthUser?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const response = await result.json();

      if (result.status !== 200) {
        throw new Error(response.resultMessage.en);
      }

      setRequest(response.result);
    } catch (error) {
      setRequest([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    getVerificationRequest();
  }, [effect]);

  return (
    <>
      {requests === null ? (
        <LargeSpinner />
      ) : (
        <Container>
          <Row>
            <Col className="order-lg-1">
              {requests.length > 0 ? (
                requests.map((request) => (
                  <div
                    key={request._id}
                    className="card card-shadow product-card product-list mb-3"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleShowDetails(request);
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
                                      borderRadius: "50px",
                                      height: "55px",
                                      position: "relative",
                                    }}
                                  >
                                    <img
                                      src={request.user?.photoUrl}
                                      alt="avatar"
                                      className="rounded"
                                      width="55px"
                                    />
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
                                    {request.user?.name}
                                  </button>
                                  <p className="small text-muted m-0">
                                    {request.user?.email}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              Member Since:{" "}
                              {moment(request.user?.createdAt).format(
                                "MMM Do YY"
                              )}
                            </div>
                            <div className="col">
                              <i className="la la-map-marked"></i>{" "}
                              {request.user?.city}
                            </div>
                          </div>
                          <hr />
                          <p className="mt-2 mb-0" style={{ fontSize: "14px" }}>
                            {request.user?.profile?.about}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h5 className="w-100 text-center my-5 pt-0 text-capitalize">
                  {status} request empty.
                </h5>
              )}
            </Col>
          </Row>
        </Container>
      )}
      <RequestDetails
        show={showDetails}
        request={selectedRequest}
        handleClose={handleHideDetails}
        refresh={getVerificationRequest}
      />
    </>
  );
}
