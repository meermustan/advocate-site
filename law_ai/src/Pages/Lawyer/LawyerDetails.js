import { Col, Container, Row, Tooltip, Button } from "reactstrap";
import { Rating } from "react-simple-star-rating";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Reviews from "../../Componet/Reviews/Reviews";
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

function LawyerDetails({ profile, caseId }) {
  const [authState] = useCookies(["myAuthUser"]);
  const [rating, setRating] = useState(0);
  const api_url = process.env.REACT_APP_API_URL;

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  function calculateAverageRating(ratingsArray) {
    if (ratingsArray.length === 0) {
      setRating(0);
      return;
    }
    const sumOfRatings = ratingsArray.reduce((accumulator, ratingObject) => {
      return accumulator + ratingObject.rating;
    }, 0);
    const averageRating = sumOfRatings / ratingsArray.length;

    setRating(averageRating);
  }

  async function handleInviteLawyer(){
    const result = await fetch(`${api_url}/proposal/invite-lawyer/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState?.myAuthUser?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        case: caseId,
        lawyer: profile?._id,
      }),
    });
    const response = await result.json();
    console.log(response);
    if(response.resultCode === "00600"){
      toast.success(response?.resultMessage.en, toastConfig);
    }else{
      toast.error(response?.resultMessage.en, toastConfig);
    }

  }

  useEffect(() => {
    calculateAverageRating(profile.profile.reviews);
  }, []);

  return (
    <Container className="px-0 px-md-5">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="custom-h3 text-center mb-2" style={{ color: "#aa0505" }}>
          Lawyer Profile Details
        </h3>
        {
          caseId && <Button
            onClick={handleInviteLawyer}
            className="mt-4 btn btn-primary"
          >
            Invite Lawyer
          </Button>
        }
      </div>
      <hr />
      <Row className="align-items-center">
        <Col lg={12}>
          <div className="product-details">
            <div className="d-flex justify-content-between pt-2">
              <div className="row">
                <div className="col align-self-center me-3">
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      position: "relative",
                    }}
                  >
                    <img
                      src={profile.photoUrl}
                      alt="avatar"
                      style={{ borderRadius: "50px" }}
                      height="100px"
                      width="100px"
                    />
                  </div>
                </div>
                <div className="col pt-1">
                  <div className="d-flex align-items-center" style={{ gap: 5 }}>
                    <h4 className="fw-bold mb-0">{profile.name}</h4>
                    <i
                      id="verified-tooltip"
                      className="la la-check-circle"
                      style={{
                        cursor: "pointer",
                        color: profile?.verified_by_admin ? "blue" : "gray"
                      }}
                    ></i>
                    <Tooltip
                      placement="top"
                      isOpen={tooltipOpen}
                      target="verified-tooltip"
                      toggle={toggleTooltip}
                    >
                      {profile?.verified_by_admin ? "Verified" : "Not Verified"}
                    </Tooltip>
                  </div>
                  <Rating edit={false} readonly={true} initialValue={rating} />
                </div>
              </div>
            </div>
            <ul className="list-unstyled my-4">
              <li className="mb-2 text-black">
                city Name: <span className="text-muted">{profile.city}</span>
              </li>
              <li className="mb-2 text-black">
                Court Name:{" "}
                <span className="text-muted">{profile.courtName}</span>
              </li>
              <li className="text-black">
                Lawyer ID:{" "}
                <span className="text-muted">{profile.lawyerId}</span>
              </li>
            </ul>
            <h5>About This Profile:</h5>
            <p className="mb-4">{profile.profile.about}</p>
            <hr />
            <h5>Profile History:</h5>
            <p className="mb-4">{profile.profile.about}</p>
            <hr />
            <h5>Profile Reviews:</h5>
            <Reviews reviews={profile.profile.reviews} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LawyerDetails;
