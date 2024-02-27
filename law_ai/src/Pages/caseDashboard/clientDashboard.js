import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { saveAs } from "file-saver";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import {
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
  Badge,
} from "reactstrap";
import Modal from "react-bootstrap/Modal";
import { Rating } from "react-simple-star-rating";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HerosectionHeader from "../../Componet/Herosection/HerosectionHeader";
import LargeSpinner from "../../Componet/Spinners/LargeSpinner";
import JobMessages from "../../Componet/bot/jobMessages";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import MyCalendar from "../../Componet/MyCalendar";
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

function ClientDashboard() {
  const { state } = useLocation();
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
  const addEventFormRef = useRef();
  const api_url = process.env.REACT_APP_API_URL;

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

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
        profile: activeCase?.activeProposal?.owner?.profile,
        client: activeCase?.owner?._id,
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
        clientReview: response?.newReview,
      });
    } else {
      setUpdating(false);
      toast.error(response.resultMessage.en, toastConfig);
    }
  };

  const inviteLawyers = ()=>{
    navigate("/lawyers", {
      state: {
        privateRequest: activeCase.isVisible? false : true,
        caseId: activeCase?._id
      },
    });
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
        user: activeCase?.activeProposal?.owner?._id,
      }),
    });
    const response = await result.json();
    console.log(response);
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

  const addFile = async () => {
    if (!newFile) {
      toast.warn("Choose a file to upload", toastConfig);
      return;
    }
    setUpdating(true);
    const formData = new FormData();
    formData.append("caseFile", newFile);
    formData.append("sender", "client");
    formData.append("job", caseId);
    formData.append("user", activeCase?.activeProposal?.owner?._id);
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
      setActiveCase(response.job);
      setCaseDocuments(response.job.jobDocuments);
      setMeetings(response.job.events);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(response.resultMessage.en, toastConfig);
    }
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setNewFile(event.target.files[0]);
    }
  };

  const contactLawyer = () => {
    navigate("/messages", {
      state: {
        job: activeCase?._id,
        user: activeCase?.activeProposal?.owner?._id,
      },
    });
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

  useEffect(() => {
    if (!state) {
      navigate("/");
    } else {
      setCaseId(state);
      fetchData(state);
    }
  }, []);

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
          <form ref={addEventFormRef} onSubmit={addNewEvent}>
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
                  min={1}
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
                  minDate={getMinDate()}
                  selected={selectedDate}
                  value={selectedDate}
                  onChange={setSelectedDate}
                />
              </div>
              <div className="my-3">
                <label>Select Meeting Time:</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TimePicker
                  minTime={getMinTime()}
                  value={selectedTime}
                  selected={selectedTime}
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
                onClick={addNewEvent}
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
              variant="secondary"
              onClick={() => {
                setFileModal(false);
              }}
            >
              Close
            </Button>
            <Button onClick={addFile} disabled={updating} variant="primary">
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
                              <div>
                                <h4>{activeCase.title}</h4>
                                <p>{moment(activeCase.createdAt).fromNow()}</p>
                              </div>
                              <div>
                                <Button onClick={inviteLawyers}>Invite Lawyers</Button>
                              </div>
                            </div>
                            <ul className="list-unstyled mt-2 mb-4">
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
                            <div className="mt-3">
                              <p><i className="las la-coins" style={{fontSize: "20px"}}></i> {" "}Est. Budget {`${activeCase.estimatedBudget}`}</p>
                            </div>
                            <p className="mb-4">{activeCase.summary}</p>
                          </div>
                        </Col>
                      </Row>
                      <hr />
                      {activeCase.activeProposal ? (
                        <>
                          <h4 className="mb-4">Proposal</h4>
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
                                          {activeCase.activeProposal.owner.name}
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
                                  {activeCase.activeProposal.summary.substring(
                                    0,
                                    350
                                  )}
                                  ...
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <h6 className="mb-6">
                          Active proposal will be shown here.
                        </h6>
                      )}
                    </>
                  )}
                </TabPane>
                <TabPane tabId="2" className="tab-pane fade show mb-5">
                  {loading ? (
                    <LargeSpinner />
                  ) : (
                    <Container>
                      <div className="d-flex justify-content-between flex-wrap flex-lg-row flex-column-reverse">
                        <div className="">
                          <h4 style={{ color: "red" }}>
                            Jarvis Gathered Information
                          </h4>
                          <p>
                            You can add more information to improve
                            your case.
                          </p>
                        </div>
                        {activeCase.isActive && (
                          <div className="">
                            <div className="d-flex justify-content-end">
                              <button
                                onClick={() => {
                                  contactLawyer();
                                }}
                                className={"btn btn-primary px-3 mb-4 py-1"}
                              >
                                <i className="las la-paper-plane"></i> Message your
                                Lawyer
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="mt-2">
                        <JobMessages job={activeCase} />
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
                    "You can schedule your meetings after hiring your lawyer"
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
                          <p>You can add files to this case for your lawyer.</p>
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
                    "You can upload documents after hiring your lawyer"
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
                            You can add reviews to your lawyer about his
                            performance on this job.
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
                          {activeCase.clientReview ? (
                            <>
                              <h6 className="mb-4" style={{ color: "red" }}>
                                Your review to your Lawyer
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
                            <>
                              <h5>you haven't reviewed your lawyer yet</h5>
                              <h6>Review your Lawyer</h6>
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
                                      "Review Lawyer"
                                    )}
                                  </button>
                                </div>
                              </form>
                            </>
                          )}
                        </Col>
                        <Col md={6} className="px-5">
                          {activeCase.lawyerReview ? (
                            <>
                              <h6 className="mb-4" style={{ color: "red" }}>
                                Lawyer reviews about you
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
                            <h5>your lawyer haven't reviewed you yet.</h5>
                          )}
                        </Col>
                      </Row>
                    </>
                  ) : (
                    "job review full be show here."
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

export default ClientDashboard;
