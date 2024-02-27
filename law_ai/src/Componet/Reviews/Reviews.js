import { Rating } from "react-simple-star-rating";

function Reviews({ reviews }) {
  return (
    <div className="media-holder review-list mt-5">
      {reviews?.map((data, index) => (
        <div className="d-sm-flex pb-4" key={index}>
          <div className="flex-shrink-0">
            <img
              className="img-fluid box-shadow me-4"
              style={{ borderRadius: "50px" }}
              height="80px"
              width="80px"
              alt="image1"
              src={data[data.type].photoUrl}
            />
          </div>
          <div className="flex-grow-1 ms-sm-2 mt-4 mt-sm-0">
            <h6 className="mb-0">{data[data.type].name}</h6>
            <Rating
              edit={false}
              size={"25px"}
              readonly={true}
              initialValue={data.rating}
            />
            <p>{data.review}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
