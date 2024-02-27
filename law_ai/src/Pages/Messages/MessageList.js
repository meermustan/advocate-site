import Image from "react-bootstrap/Image";
import React, { useState, useEffect } from "react";
import moment from "moment";

const MessageList = ({ messages, me, other }) => {
  return (
    <div>
      {messages?.map((message, index) => (
        <div className="p-3 message-item" key={index}>
          <div className="d-flex flex-row">
            <div>
              <div>
                <Image
                  src={
                    message.sender === other?._id ? other?.photoUrl : me?.photoUrl
                  }
                  alt="avatar"
                  className="d-flex align-self-center me-3"
                  width={"50px"}
                  style={{borderRadius:"50px"}}
                  height={"50px"}
                />
              </div>
            </div>
            <div className="w-100">
              <p className="fw-bold mb-0">
                {message.sender === other?._id ? other?.name : me?.name}{" "}
                &nbsp;&nbsp;{" "}
                <span
                  style={{
                    fontWeight: "normal",
                    fontSize: "14px",
                    color: "gray",
                  }}
                >
                  {moment(message.time).format("hh:mm")}
                </span>
              </p>
              <p className="small mb-0">{message.msg}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
