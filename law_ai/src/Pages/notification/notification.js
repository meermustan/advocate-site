import React, { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row, Button, Spinner } from "reactstrap";
import HerosectionHeader from "../../Componet/Herosection/HerosectionHeader";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import LargeSpinner from "../../Componet/Spinners/LargeSpinner";
import { useDispatch, useSelector } from "react-redux";
import CaseDetails from "../Cases/CaseDetails";
import InvitedCase from "../InvitedCase/InvitedCase";
import {
  setUnSeen,
  setNotifications,
} from "../../store/reducer/notificationReducer";
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

const Notification = () => {
  const { unSeen, notifications } = useSelector((state) => state?.notification);
  const [authState] = useCookies(["myAuthUser"]);
  const [showCanvas, setShowCanvas] = useState(false);
  const api_url = process.env.REACT_APP_API_URL;
  const [caseId, setCaseId] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [User, setUser] = useState({});

  const fetchData = async () => {
    const result = await fetch(`${api_url}/notification/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authState.myAuthUser.token}`,
        "Content-Type": "application/json",
      },
    });
    const response = await result.json();
    if (result.status === 200) {
      const unSeen = response.myNotifications.filter((obj) => !obj.isSeen);
      const notifications = response.myNotifications.reverse();
      dispatch(
        setNotifications({
          notifications,
          unSeen: unSeen.length,
        })
      );
      updateStatus();
    } else {
      toast.error(response.resultMessage.en, toastConfig);
    }
  };

  const updateStatus = async () => {
    const result = await fetch(`${api_url}/notification/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${authState.myAuthUser.token}`,
        "Content-Type": "application/json",
      },
    });
    const response = await result.json();
    if (result.status === 200) {
      console.log(response);
    } else {
      toast.error(response.resultMessage.en, toastConfig);
    }
  };

  const viewCaseDashboard = (caseId) => {
    navigate("/case-dashboard", { state: caseId });
  };

  const viewInvitedJob = (caseId) =>{
    setCaseId(caseId);
    setShowCanvas(true);
  }

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

  useEffect(() => {
    fetchData();
    return () => {
      dispatch(setUnSeen(0));
    };
  }, []);

  return (
    <>
      <HerosectionHeader name={"Notifications"} />
      <InvitedCase setShowCanvas={setShowCanvas} showCanvas={showCanvas} caseId={caseId} setCaseId={setCaseId} User={User} />
      <div className="page-wrapper">
        <div className="page-content">
          <Container className="container">
            <div
              style={{
                border: "1px solid lightgray",
                borderTop: "none",
                padding: "20px 30px",
              }}
            >
              <h4 style={{ color: "red", marginBottom: "20px" }}>
                {`Notifications ( ${unSeen} New)`}
              </h4>
              <hr />
              {loading ? (
                <LargeSpinner />
              ) : (
                <>
                  {notifications?.length > 0 ? (
                    <>
                      {notifications?.map((note, index) => (
                        <div
                          key={index}
                          className="card card-shadow my-3"
                          // style={
                          //   !note.isRead && {
                          //     borderColor: "rgba(255, 0, 0, 0.277)",
                          //   }
                          // }
                        >
                          <div className="row align-items-center">
                            <div className="col-lg-12">
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-md-8">
                                    <h5
                                      style={!note.isRead && { color: "red" }}
                                    >
                                      {note.title}{" "}
                                      <span
                                        style={{
                                          color: "gray",
                                          fontSize: "14px",
                                        }}
                                      >{`( ${moment(
                                        note.createdAt
                                      ).fromNow()} )`}</span>
                                    </h5>
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: note.description,
                                      }}
                                    />
                                  </div>
                                  <div className="col-md-4 d-flex justify-content-end">
                                    <Button
                                      style={{ width: "65px", height: "35px" }}
                                      className="btn btn-primary p-0 pt-1"
                                      onClick={() => {
                                        note.type == "invitation" ?
                                        viewInvitedJob(note.job)
                                        :
                                        viewCaseDashboard(note.job);
                                      }}
                                    >
                                      {/* <i className="la la-arrow"></i> */}
                                      <i
                                        style={{ fontSize: "24px" }}
                                        className="las la-arrow-circle-right"
                                      ></i>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p className="my-4">you no new notifications.</p>
                  )}
                </>
              )}
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Notification;
