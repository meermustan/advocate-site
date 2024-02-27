import { Rating } from "react-simple-star-rating";
import { useState, useEffect } from "react";
import { Tooltip } from "reactstrap";

import moment from "moment";
import Reviews from "../Reviews/Reviews";

function ProfileComponent({ user }) {
  console.log(user?.profile);
  const [rating, setRating] = useState(0);

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

  useEffect(() => {
    calculateAverageRating(user.profile.reviews);
  }, []);
  
  return (
    <div className="card product-card product-list mb-3">
      <div className="row align-items-center py-3 px-1 px-md-4">
        <div className="col-lg-12">
          <div className="card-body">
            <div className="card-head">
              <div className="d-flex">
                <div className="row">
                  <div className="col me-3">
                    <img
                      src={user.photoUrl}
                      style={{ borderRadius: "50px" }}
                      alt="avatar"
                      className=""
                      width="100px"
                      height="100px"
                    />
                  </div>
                  <div className="col">
                    <div
                      className="d-flex align-items-center"
                      style={{
                        gap: 5
                      }}
                    >
                      <h4 className="mb-0">{user.gender === "male"? "He" : "She"}</h4>
                    </div>
                    <span className="text-primary">
                      <Rating
                        edit={false}
                        readonly={true}
                        initialValue={rating}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                Member Since: {moment(user.createdAt).format("MMM Do YY")}
              </div>
              <div className="col">
                <i className="la la-map-marked"></i> {user.city}
              </div>
            </div>
            <hr />
            <h5>Profile:</h5>
            <p className="mb-4">{user.profile.about}</p>
            <h5>Profile Reviews:</h5>
            <Reviews reviews={user.profile.reviews} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;
