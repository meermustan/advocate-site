import React from "react";
import moment from "moment";

const ChatHeader = ({ name, status, photoUrl, additonalClass }) => {

  additonalClass = additonalClass || "";

  return (
    <div className={`chat-header d-flex justify-content-between sticky-top p-3 ${additonalClass}`} >
      <div className="d-flex flex-row">
        <div className="d-flex align-self-center me-3">
          <div
            style={{
              width: "55px",
              height: "55px",
              position: "relative",
            }}
          >
            <img
              src={photoUrl}
              alt="avatar"
              className=""
              style={{borderRadius:"50px"}}
              width="55px"
              height="55px"
            />
            {/* <div className="status-circle bg-primary"></div> */}
          </div>
        </div>
        <div className="pt-3">
          <p className="fw-bold mb-0">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
