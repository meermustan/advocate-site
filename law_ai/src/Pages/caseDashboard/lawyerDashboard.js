import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { saveAs } from "file-saver";
import { CopyToClipboard } from "react-copy-to-clipboard";
import MyCalendar from "../../Componet/MyCalendar";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import {
  Badge,
  Col,
  Container,
  Button,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Spinner,
  Card,
} from "reactstrap";
import Modal from "react-bootstrap/Modal";
import { Rating } from "react-simple-star-rating";
import { useLocation, useNavigate } from "react-router-dom";
import HerosectionHeader from "../../Componet/Herosection/HerosectionHeader";
import LargeSpinner from "../../Componet/Spinners/LargeSpinner";
import { useCookies } from "react-cookie";
import LegalResearch from "../Lawyer/LegalResearch/LegalResearch"
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

function LawyerDashboard() {
  const { state } = useLocation();
  const downloadFileRef = useRef();
  const navigate = useNavigate();
  const [authState] = useCookies(["myAuthUser"]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [caseId, setCaseId] = useState();
  const [activeCase, setActiveCase] = useState();
  const [caseDocuments, setCaseDocuments] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [rating, setRating] = useState(0);
  const [newReview, setNewReview] = useState();
  const [newFile, setNewFile] = useState();
  const [fileModal, setFileModal] = useState(false);
  const [eventModal, setEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [meetingTime, setMeetingTime] = useState(0);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetings, setMeetings] = useState([]);
  const [meetingEventShowing, setMeetingEventShowing] = useState(false);
  const [meetingEventActive, setMeetingEventActive] = useState({});
  const api_url = process.env.REACT_APP_API_URL;

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const addReview = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const result = await fetch(`${api_url}/job/add-review`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.myAuthUser?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        job: caseId,
        lawyer: activeCase?.activeProposal?.owner?._id,
        client: activeCase?.owner?._id,
        profile: activeCase?.owner?.profile,
        review: newReview,
        rating: rating,
        jobTitle: activeCase?.title,
      }),
    });
    const response = await result.json();
    if (result.status === 200) {
      console.log(response);
      setUpdating(false);
      setActiveCase({
        ...activeCase,
        lawyerReview: response?.newReview,
      });
    } else {
      setUpdating(false);
      toast.error(response.resultMessage.en, toastConfig);
    }
  };

  const addFile = async () => {
    if (!newFile) {
      toast.warn("Choose a file to upload", toastConfig);
      return;
    }
    setUpdating(true);
    const formData = new FormData();
    formData.append("caseFile", newFile);
    formData.append("sender", "lawyer");
    formData.append("job", caseId);
    formData.append("user", activeCase?.owner?._id);
    const result = await fetch(`${api_url}/job/add-file`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState?.myAuthUser?.token}`,
      },
      body: formData,
    });
    const response = await result.json();
    if (result.status === 200) {
      setUpdating(false);
      setFileModal(false);
      setCaseDocuments(response.savedJob.jobDocuments);
      toast.success(response.resultMessage.en, toastConfig);
    } else {
      setUpdating(false);
      toast.error(response.resultMessage.en, toastConfig);
    }
  };

  const addNewEvent = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      toast.warn("Invalid Date Or Time", toastConfig);
      return;
    }
    setUpdating(true);
    const startTime = new Date(selectedDate);
    const [hours, minutes] = selectedTime?.split(":");
    startTime.setHours(parseInt(hours, 10));
    startTime.setMinutes(parseInt(minutes, 10));
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + Number(meetingTime));
    const event = {
      duration: meetingTime,
      title: meetingTitle,
      start: startTime,
      end: endTime,
    };
    const result = await fetch(`${api_url}/job/add-event`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState?.myAuthUser?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: event,
        job: activeCase?._id,
        user: activeCase?.owner?._id,
      }),
    });
    const response = await result.json();
    if (result.status === 200) {
      setUpdating(false);
      setEventModal(false);
      setMeetings([...meetings, event]);
      toast.success(response.resultMessage.en, toastConfig);
      setMeetingTitle("");
      setMeetingTime("");
      setSelectedDate(null);
      setSelectedTime("");
      fetchData(state);
    } else {
      setUpdating(false);
      toast.error(response.resultMessage.en, toastConfig);
    }
  };

  const fetchData = async (jobId) => {
    const result = await fetch(`${api_url}/job/job?jobId=${jobId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authState?.myAuthUser?.token}`,
        "Content-Type": "application/json",
      },
    });
    const response = await result.json();
    if (result.status === 200) {
      console.log(response);
      setActiveCase(response.job);
      setCaseDocuments(response.job.jobDocuments);
      setMeetings(response.job.events);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(response.resultMessage.en, toastConfig);
    }
  };

  const getMinDate = ()=>{
    let todayDate = new Date().getDate()
    let currentMonth = new Date().getMonth() + 1;
    let currentYear = new Date().getFullYear()
    return new Date(`${currentMonth}-${todayDate}-${currentYear}`);
  }

  const getMinTime = () =>{
    if(selectedDate != null && selectedDate?.toString().slice(0,15) === new Date().toString().slice(0,15)){
      return `${new Date().getHours()}:${new Date().getMinutes()}`
    }else{
      return `0:0`
    }
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setNewFile(event.target.files[0]);
    }
  };

  const contactLawyer = () => {
    navigate("/messages", {
      state: {
        job: activeCase?._id,
        user: activeCase?.owner?._id,
      },
    });
  };

  useEffect(() => {
    if (!state) {
      navigate("/");
    } else {
      setCaseId(state);
      fetchData(state);
    }
  }, []);


  function formatAMPM(date) {
    var hours = date?.getHours();
    var minutes = date?.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }


  const MeetingModalPop = ({ show, handleClose })=>{

    return (
        <Modal
            show={show}
            onHide={handleClose}
          >
          <Modal.Header closeButton>
            <Modal.Title className="text-capitalize">Meeting Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex">
              <h5 style={{marginRight: "10px"}} >Title :</h5>
              <p> {meetingEventActive.title}</p>
            </div>
            <div className="d-flex">
              <h5 style={{marginRight: "10px"}} >Start date & time : </h5>
              <p> {meetingEventActive.start?.toDateString()} <span style={{fontWeight: "bold", color: "green"}}>|</span> {formatAMPM(meetingEventActive.start)}</p>
            </div>
            <div>
              <h5 style={{marginRight: "10px"}} >Join Meeting Url</h5>
              <p><a target="_blank" style={{wordBreak: "break-all"}} href={meetingEventActive.meeting_url}>{meetingEventActive.meeting_url}</a></p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <a href={meetingEventActive.meeting_url} target="_blank">
              <Button>Join now!</Button>
            </a>
          </Modal.Footer>
        </Modal>
    )
  }

  const handleMeetingEventSelect = (event)=>{
    setMeetingEventActive(event);
    setMeetingEventShowing(true);
  }


  return (
    <div className="page-wrapper">
      <HerosectionHeader name={"Case Dashboard"} />
      <div className="page-content py-5">
        <Modal
          show={eventModal}
          onHide={() => {
            setEventModal(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create New Meeting</Modal.Title>
          </Modal.Header>
          <form onSubmit={addNewEvent}>
            <Modal.Body>
              <div>
                <h5 style={{ color: "red" }}>
                  Meeting Date & Time : {selectedDate?.toDateString()}{" "}
                  {selectedTime}
                </h5>
              </div>
              <div className="mt-2">
                <label>Add Meeting Title:</label>
                <input
                  value={meetingTitle}
                  className="form-control"
                  required
                  onChange={(e) => {
                    setMeetingTitle(e.target.value);
                  }}
                  type="text"
                  placeholder="A brief title of the meeting"
                />
              </div>
              <div className="mt-3">
                <label>Add Meeting Duration:</label>
                <input
                  value={meetingTime}
                  className="form-control"
                  required
                  onChange={(e) => {
                    setMeetingTime(e.target.value);
                  }}
                  type="number"
                  placeholder="Always set meeting time in minutes"
                />
              </div>
              <div className="my-3">
                <label>Select Meeting Date:</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <DatePicker
                  selected={selectedDate}
                  value={selectedDate}
                  minDate={getMinDate()}
                  onChange={setSelectedDate}
                />
              </div>
              <div className="my-3">
                <label>Select Meeting Time:</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TimePicker
                  value={selectedTime}
                  selected={selectedTime}
                  minTime={getMinTime()}
                  onChange={setSelectedTime}
                />
              </div>
            </Modal.Body>
            <hr className="mb-0" />
            <div className="my-3 px-3 d-flex justify-content-end">
              <Button
                style={{ zIndex: "0" }}
                disabled={updating}
                color="primary"
              >
                {updating ? (
                  <Spinner animation="border" size="sm" role="status"></Spinner>
                ) : (
                  "Add Event"
                )}
              </Button>
            </div>
          </form>
        </Modal>
        <Modal
          show={fileModal}
          onHide={() => {
            setFileModal(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add File to Case</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="my-5 d-flex justify-content-between">
              <div className="pt-1">
                <input type="file" onChange={onImageChange} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              color="danger"
              onClick={() => {
                setFileModal(false);
              }}
            >
              Close
            </Button>
            <Button onClick={addFile} disabled={updating} color="primary">
              {updating ? (
                <Spinner animation="border" size="sm" role="status"></Spinner>
              ) : (
                "Add file"
              )}
            </Button>
          </Modal.Footer>
        </Modal>
        <Container>
          <Row>
            <Col md={12}>
              <Nav
                tabs
                className="nav nav-tabs mb-4"
                style={{ cursor: "pointer", borderBottom: "none" }}
              >
                <NavItem className="mb-md-0 mb-2">
                  <NavLink
                    className={
                      activeTab === "1"
                        ? "active nav-item nav-link"
                        : "nav-item nav-link"
                    }
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    Case Overview
                  </NavLink>
                </NavItem>
                <NavItem className="mb-md-0 mb-2">
                  <NavLink
                    className={
                      activeTab === "2"
                        ? "active nav-item nav-link"
                        : "nav-item nav-link"
                    }
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Case Chat
                  </NavLink>
                </NavItem>
                <NavItem className="mb-md-0 mb-2">
                  <NavLink
                    className={
                      activeTab === "4"
                        ? "active nav-item nav-link"
                        : "nav-item nav-link"
                    }
                    onClick={() => {
                      toggle("4");
                    }}
                  >
                    Documents
                  </NavLink>
                </NavItem>
                <NavItem className="mb-md-0 mb-2">
                  <NavLink
                    className={
                      activeTab === "3"
                        ? "active nav-item nav-link"
                        : "nav-item nav-link"
                    }
                    onClick={() => {
                      toggle("3");
                    }}
                  >
                    Meetings
                  </NavLink>
                </NavItem>
                <NavItem className="mb-md-0 mb-2">
                  <NavLink
                    className={
                      activeTab === "5"
                        ? "active nav-item nav-link"
                        : "nav-item nav-link"
                    }
                    onClick={() => {
                      toggle("5");
                    }}
                  >
                    Reviews
                  </NavLink>
                </NavItem>
                <NavItem className="mb-md-0 mb-2">
                  <NavLink
                    className={
                      activeTab === "6"
                        ? "active nav-item nav-link"
                        : "nav-item nav-link"
                    }
                    onClick={() => {
                      toggle("6");
                    }}
                  >
                    Legal Research
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent
                activeTab={activeTab}
                className="px-2 px-md-4 pt-3"
                style={{ border: "1px solid lightgray", borderRadius: "6px" }}
              >
                <TabPane tabId="1" className="tab-pane fade show">
                  {loading ? (
                    <LargeSpinner />
                  ) : (
                    <>
                      <Row className="align-items-center">
                        <Col lg={12}>
                          <div className="product-details">
                            <div className="d-flex mt-2 justify-content-between">
                              <h4>{activeCase?.title}</h4>
                              {moment(activeCase?.createdAt).fromNow()}
                            </div>

                            <ul className="list-unstyled my-4">
                              <li className="mb-2 text-black">
                                Visibility:{" "}
                                <span className="text-muted">
                                  {activeCase.isVisible
                                    ? "Visible"
                                    : "Not Visible"}
                                </span>
                              </li>
                              <li className="mb-2 text-black">
                                Location:{" "}
                                <span className="text-muted">
                                  {activeCase.city}
                                </span>
                              </li>
                            </ul>
                            <p className="mb-4">{activeCase.summary}</p>
                          </div>
                        </Col>
                      </Row>
                      <hr />
                      {activeCase?.activeProposal && 
                      <>
                        <h4 className="mb-4">Your Proposal:</h4>
                        <div className="row align-items-center mb-5">
                          <div className="col-lg-12">
                            <div className="card-body">
                              <div className="card-head">
                                <div className="d-flex">
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
                                          src={
                                            activeCase.activeProposal.owner
                                              .photoUrl
                                          }
                                          alt="avatar"
                                          className=""
                                          width="55px"
                                          height="55px"
                                        />
                                        {/* <div className='status-circle bg-primary'></div> */}
                                      </div>
                                    </div>
                                    <div>
                                      <h6 className="mb-0">
                                        {activeCase?.activeProposal.owner.name}
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <i className="la la-clock"></i>{" "}
                                  {moment(
                                    activeCase.activeProposal.createdAt
                                  ).fromNow()}
                                </div>
                                <div className="col">
                                  <i className="la la-map-marked"></i>{" "}
                                  {activeCase.activeProposal.owner.city}
                                </div>
                                {/* <div className="col"><i className="la la-eye"></i>{" "}{job.isVisible ? "Visible" : "Not Visible"}</div> */}
                              </div>
                              <p
                                className="mt-2 mb-0"
                                style={{ fontSize: "14px" }}
                              >
                                {activeCase.activeProposal.summary}
                                ...
                              </p>
                            </div>
                          </div>
                        </div>
                      </>}
                    </>
                  )}
                </TabPane>
                <TabPane tabId="2" className="tab-pane fade show mb-5">
                  {loading ? (
                    <LargeSpinner />
                  ) : (
                    <Container>
                      <div className="d-flex justify-content-between flex-wrap flex-lg-row flex-column-reverse">
                        <div className="col-md-8">
                          <h4 style={{ color: "red" }}>
                            Jarvis Gathered Information of your client
                          </h4>
                          <p>
                            You can read your client gathered information history.
                          </p>
                        </div>
                        <div className="">
                          <div className="d-flex justify-content-end">
                            <button
                              onClick={() => {
                                contactLawyer();
                              }}
                              className={"btn btn-primary px-3 mb-4 py-1"}
                            >
                              <i className="las la-paper-plane"></i> Message your
                              Client
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="prompt-outputs-box">
                        {activeCase.jobChat.map((data, index) => (
                            index >= 1 && index <= 10?
                            <>
                              {index === 1 && <p className="px-4 mt-4"><small><strong>Q/A between Jarvis and {activeCase?.jobChat[index+1].sender}</strong></small></p>}
                              <div className="px-4">
                                {index % 2 === 0?
                                <input
                                  type="text"
                                  value={data.msg}
                                  readOnly
                                  className="form-control"
                                />
                                :
                                <p className="mt-4">{data.msg}</p>}
                              </div>
                              {index === 10 && <hr/>}
                            </>
                            :
                            <div key={index} className="prompt-outputs py-2 px-4">
                              <Row>
                                {data.sender === "Jarvis"?
                                <Col>
                                  <strong style={{marginRight: "10px"}}> Jarvis</strong> {"  "}
                                  <i className="la  la-mail-reply "></i>
                                </Col>
                                :
                                <Col>
                                  <strong style={{marginRight: "10px"}}> {data.sender}</strong> {"  "}
                                  <i className="las la-clock"></i>
                                  <span style={{ fontSize: "13px" }} > {moment(data.time).fromNow()}</span>
                                </Col>
                                }
                                <Col className="d-flex justify-content-end">
                                  <CopyToClipboard text={data.msg}>
                                    <button className={"btn btn-sm btn-primary px-3 py-1"}>
                                      <i className="las la-copy"></i>
                                    </button>
                                  </CopyToClipboard>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  {
                                    data.sender === "Jarvis" && data.msg.slice(-1) === "?" ?
                                    <p style={{ fontSize: "16px" }}><strong>{data.msg}</strong></p>
                                    :
                                    <p style={{ fontSize: "16px" }}>{data.msg}</p>
                                  }
                                </Col>
                              </Row>
                            </div>
                        ))}
                      </div>
                    </Container>
                  )}
                </TabPane>
                <TabPane tabId="3" className="tab-pane fade show mb-5">
                  {loading ? (
                    <LargeSpinner />
                  ) : activeCase.isActive ? (
                    <>
                      <div className="row">
                        <div className="col-md-8">
                          <h4 style={{ color: "red" }}>Event and Meetings</h4>
                          <p>
                            You can add events or create meetings with our
                            lawyer.
                          </p>
                        </div>
                        <div className="col-md-4">
                          <div className="d-flex justify-content-end">
                            <button
                              onClick={() => {
                                setEventModal(true);
                              }}
                              className={"btn btn-primary px-3 py-1"}
                            >
                              <i className="las la-plus"></i> Add new meeting
                            </button>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <MyCalendar events={meetings} onHandleMeetingEvent={handleMeetingEventSelect} />
                      <MeetingModalPop show={meetingEventShowing} handleClose={()=>setMeetingEventShowing(false)} />
                    </>
                  ) : (
                    "You can schedule your meeting with your client."
                  )}
                </TabPane>
                <TabPane tabId="4" className="tab-pane fade show mb-5">
                  {loading ? (
                    <LargeSpinner />
                  ) : activeCase.isActive ? (
                    <>
                      <div className="row">
                        <div className="col-md-8">
                          <h4 style={{ color: "red" }}>Documents and Files</h4>
                          <p>You can add files to this case for your client.</p>
                        </div>
                        <div className="col-md-4">
                          <div className="d-flex justify-content-end">
                            <button
                              onClick={() => {
                                setFileModal(true);
                              }}
                              className={"btn btn-primary px-3 mb-4 py-1"}
                            >
                              <i className="las la-plus"></i> Add New Document
                            </button>
                          </div>
                        </div>
                      </div>
                      <hr />

                      {caseDocuments.length > 0 ? (
                        caseDocuments.map((data, index) => (
                          <div key={index} className="prompt-outputs p-3">
                            <Row>
                              <Col>
                                <strong>{data.sender}</strong> :{" "}
                                <span> {moment(data.time).fromNow()}</span>
                              </Col>
                              <Col className="d-flex justify-content-end">
                                <button
                                  style={{ marginLeft: "10px" }}
                                  onClick={() => {
                                    saveAs(data.url, data.name);
                                  }}
                                  className={"btn btn-primary px-3 py-1"}
                                >
                                  <i className="las la-download"></i>
                                </button>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <p style={{ fontSize: "13px" }}>{data.name}</p>
                              </Col>
                            </Row>
                          </div>
                        ))
                      ) : (
                        <p>No Documents uploaded</p>
                      )}
                    </>
                  ) : (
                    "You have not uploaded any documents"
                  )}
                </TabPane>
                <TabPane tabId="5" className="tab-pane fade show mb-5">
                  {loading ? (
                    <LargeSpinner />
                  ) : activeCase.isActive ? (
                    <>
                      <div className="row">
                        <div className="col-md-8">
                          <h4 style={{ color: "red" }}>Reviews and Ratings</h4>
                          <p>
                            You can add reviews to your client about this job.
                          </p>
                        </div>
                        <div className="col-md-4"></div>
                      </div>
                      <hr />
                      <Row>
                        <Col
                          md={6}
                          className="px-5"
                          style={{ borderRight: "1px solid gray" }}
                        >
                          {activeCase.lawyerReview ? (
                            <>
                              <h6 className="mb-4" style={{ color: "red" }}>
                                Your review to your client
                              </h6>
                              <Rating
                                edit={false}
                                readonly={true}
                                initialValue={activeCase.lawyerReview.rating}
                              />
                              <p className="mt-3">
                                {activeCase.lawyerReview.review}
                              </p>
                            </>
                          ) : (
                            <>
                              <h5>you haven't reviewed your client yet</h5>
                              <h6>Review your client now</h6>
                              <h4>
                                <Rating onClick={(r) => setRating(r)} />
                                {" - "}
                                <Badge className="ml-3" bg="secondary">
                                  {rating}
                                </Badge>
                              </h4>
                              <form
                                id="contact-form"
                                onSubmit={addReview}
                                className="row"
                              >
                                <div
                                  className="form-group col-md-12 py-2 mt-3"
                                  style={{
                                    border: "1px solid lightgray",
                                    borderRadius: "8px",
                                  }}
                                >
                                  <textarea
                                    value={newReview}
                                    onChange={(e) => {
                                      setNewReview(e.target.value);
                                    }}
                                    className="form-control h-auto"
                                    placeholder="Write down your proposal here..."
                                    rows={5}
                                    required="required"
                                  />
                                  <div className="help-block with-errors" />
                                </div>
                                <div className="col mt-2">
                                  <button
                                    type="submit"
                                    disabled={updating}
                                    className="btn btn-primary"
                                  >
                                    {updating ? (
                                      <Spinner size="sm" />
                                    ) : (
                                      "Review Client"
                                    )}
                                  </button>
                                </div>
                              </form>
                            </>
                          )}
                        </Col>
                        <Col md={6} className="px-5">
                          {activeCase.clientReview ? (
                            <>
                              <h6 className="mb-4" style={{ color: "red" }}>
                                your client reviewed you.
                              </h6>
                              <Rating
                                edit={false}
                                readonly={true}
                                initialValue={activeCase.clientReview.rating}
                              />
                              <p className="mt-3">
                                {activeCase.clientReview.review}
                              </p>
                            </>
                          ) : (
                            <h5>your client haven't reviewed you yet.</h5>
                          )}
                        </Col>
                      </Row>
                    </>
                  ) : (
                    "job review will be shown here."
                  )}
                </TabPane>
                <TabPane tabId="6" className="tab-pane fade show mb-5">
                  {loading ? (
                    <LargeSpinner />
                  ) : (
                    <>
                      {/* <div className="row">
                        <div className="col-md-8">
                          <h4 style={{ color: "red" }}>Legal Research</h4>
                        </div>
                        <div className="col-md-4"></div>
                      </div>
                      <hr /> */}
                      <LegalResearch job={activeCase} />
                    </>
                  )}
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default LawyerDashboard;
