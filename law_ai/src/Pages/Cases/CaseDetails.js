import { useNavigate } from "react-router-dom";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import ProfileComponent from "../../Componet/profile/ProfileComponent";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const api_url = process.env.REACT_APP_API_URL;

function CaseDetails({ job, User }) {
  const [authState] = useCookies(["myAuthUser"]);
  const navigate = useNavigate();

  const sendProposal = () => {
    navigate("/send-proposal", { state: job });
  };


  return (
    <Container className="px-0 px-md-5">
      <h3 className="text-center mb-2" style={{ color: "#aa0505" }}>
        Case Details
      </h3>
      <hr />
      <div className="product-details">
        <div className="row">
          <div className="col-12 text-end">
            {authState?.myAuthUser &&
              authState?.myAuthUser?.type == "lawyer" && (
                <Button
                  style={{ height: "35px" }}
                  onClick={sendProposal}
                  disabled={User?.verification?._id ? false : true}
                  className="btn btn-primary align-self-end py-0 px-3"
                >
                  Send Proposal
                </Button>
              )}
          </div>
          <div className="col-12 mt-3">
            <h4>{job.title}</h4>
          </div>
        </div>
        <ul className="list-unstyled my-4">
          <li className="mb-2 text-black">
            Visibility:{" "}
            <span className="text-muted">
              {job.isVisible ? "Visible" : "Not Visible"}
            </span>
          </li>
          <li className="mb-2 text-black">
            Location: <span className="text-muted">{job.city}</span>
          </li>
          <li className="text-black">
            Time:{" "}
            <span className="text-muted">
              {moment(job.createdAt).fromNow()}
            </span>
          </li>
        </ul>
        <div className="mt-3">
          <p><i className="las la-coins" style={{fontSize: "20px"}}></i> {" "}Est. Budget {`${job.estimatedBudget}`}</p>
        </div>
        <p className="mb-4">{job.summary}</p>
        <hr></hr>
        <h5>Case Owner:</h5>
        <ProfileComponent user={job.owner} />
      </div>

    </Container>
  );
}

export default CaseDetails;
