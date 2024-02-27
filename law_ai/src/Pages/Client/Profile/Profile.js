import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Col,
  Container,
  Nav,
  NavItem,
  Input,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import HerosectionHeader from "../../../Componet/Herosection/HerosectionHeader";
import { useCookies } from "react-cookie";
import LargeSpinner from "../../../Componet/Spinners/LargeSpinner";
import { toast } from "react-toastify";
import Reviews from "../../../Componet/Reviews/Reviews";
import { Rating } from "react-simple-star-rating";
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

function ClientProfile() {
  const selecteImageRef = useRef();
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [editProfile, setEditProfile] = useState({});
  const [authState, setAuthState] = useCookies(["myAuthUser"]);
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState({});
  const [rating, setRating] = useState(0);
  const api_url = process.env.REACT_APP_API_URL;

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

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

  const fetchData = async () => {
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
      setProfile(response.user.profile);
      calculateAverageRating(response.user.profile.reviews);
    } else {
      toast.error(response.resultMessage.en, toastConfig);
    }
    setLoading(false);
  };

  const updateProfile = async () => {
    setUpdating(true);
    if (editProfile.type == "profile") {
      const formData = new FormData();
      formData.append("profileImage", editProfile.profileImage);
      formData.append("name", editProfile.name);
      const result = await fetch(`${api_url}/user/edit-user`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState.myAuthUser.token}`,
        },
        body: formData,
      });
      const response = await result.json();
      if (result.status === 200) {
        setAuthState("myAuthUser", {
          ...authState.myAuthUser,
          photoUrl: response.user.photoURL,
          name: response.user.name,
        });
        setUser({
          ...user,
          photoUrl: response.user.photoURL,
          name: response.user.name,
        });
        toast.success(response.resultMessage.en, toastConfig);
      } else {
        toast.error(response.resultMessage.en, toastConfig);
      }
    } else {
      const result = await fetch(`${api_url}/user/edit-profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authState.myAuthUser.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileId: user.profile._id,
          about: editProfile.about,
        }),
      });
      const response = await result.json();
      if (result.status === 200) {
        setProfile({
          ...profile,
          about: editProfile.about,
        });
        toast.success(response.resultMessage.en, toastConfig);
      } else {
        toast.error(response.resultMessage.en, toastConfig);
      }
    }
    setEditProfileModal(false);
    setUpdating(false);
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setEditProfile({
        ...editProfile,
        profileChanged: true,
        profileImage: event.target.files[0],
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="page-wrapper">
      <HerosectionHeader name={"Profile"} />
      <div className="page-content py-5">
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
                        ? " active ms-0 nav-item nav-link"
                        : " ms-0 nav-item nav-link"
                    }
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    Profile Settings
                  </NavLink>
                </NavItem>
                <NavItem className="mb-md-0 mb-2">
                  <NavLink
                    className={
                      activeTab === "2"
                        ? "active  nav-item nav-link"
                        : " nav-item nav-link"
                    }
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Rating & Reviews
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
                      <div
                        className="d-flex justify-content-between px-2 px-md-4 pt-2"
                        style={{
                          borderBottom: "1px solid rgb(178, 178, 178, 0.5)",
                        }}
                      >
                        <div className="row pb-4">
                          <div className="col align-self-center me-3">
                            <div
                              style={{
                                width: "120px",
                                height: "120px",
                                position: "relative",
                              }}
                            >
                              <img
                                src={user.photoUrl}
                                alt="avatar"
                                height="120px"
                                style={{ borderRadius: "50px" }}
                                width="120px"
                              />
                            </div>
                          </div>
                          <div className="col pt-md-1 pt-2">
                            <p className="fw-bold mb-0">{user.name}</p>
                            <p className="small text-muted">{user.email}</p>
                            <Rating
                              edit={false}
                              readonly={true}
                              initialValue={rating}
                            />
                          </div>
                        </div>
                        <div className="pt-1">
                          <Button
                            style={{ height: "35px" }}
                            onClick={() => {
                              setEditProfile({
                                name: user.name,
                                profileChanged: false,
                                type: "profile",
                                profileImage: user.photoUrl,
                              });
                              setEditProfileModal(true);
                            }}
                            className="btn btn-primary align-self-end py-0 px-3"
                          >
                            <i className="la la-pencil"></i>
                          </Button>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-between px-1 px-md-3 pt-2"
                        style={{
                          borderBottom: "1px solid rgb(178, 178, 178, 0.5)",
                        }}
                      >
                        <div className="d-flex flex-row pb-3">
                          <div className="pt-1">
                            <p className="fw-bold mb-0">ABOUT</p>
                            <p className="small text-muted">
                              {profile && profile.about
                                ? profile.about
                                : "Plesae complete your profile by setting about."}
                            </p>
                          </div>
                        </div>
                        <div className="pt-1">
                          <Button
                            style={{ height: "35px" }}
                            onClick={() => {
                              setEditProfile({
                                about: profile.about,
                                type: "about",
                              });
                              setEditProfileModal(true);
                            }}
                            className="btn btn-primary align-self-end py-0 px-3"
                          >
                            <i className="la la-pencil"></i>
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </TabPane>
                <TabPane tabId="2" className="tab-pane fade show">
                  {loading ? (
                    <LargeSpinner />
                  ) : (
                    <>
                      <div className="row total-rating">
                        <div className="col-12">
                          <div className="bg-dark shadow-sm rounded text-center p-5">
                            <h5 className="text-white">Overall</h5>
                            <h4 className="text-white">{rating}</h4>
                            <h6 className="text-white">
                              ({profile.reviews.length} Reviews)
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div style={{ paddingLeft: "30px" }}>
                        <Reviews reviews={profile.reviews} />
                      </div>
                    </>
                  )}
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>
      </div>

      <Modal
        show={editProfileModal}
        onHide={() => {
          setEditProfileModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update {editProfile.type} Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editProfile.type == "profile" ? (
            <>
              <span style={{ fontWeight: "bold" }}>Profile Picture :</span>
              <div className="mt-2 d-flex justify-content-between">
                <div className="d-flex flex-row pb-4">
                  <div className="d-flex align-self-center me-3">
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        position: "relative",
                      }}
                    >
                      <img
                        src={
                          editProfile?.profileChanged
                            ? URL.createObjectURL(editProfile?.profileImage)
                            : editProfile?.profileImage
                        }
                        alt="avatar"
                        className=""
                        width="80px"
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-1">
                  <input
                    type="file"
                    ref={selecteImageRef}
                    className="d-none"
                    onChange={onImageChange}
                  />
                  <Button
                    style={{ height: "35px" }}
                    onClick={() => {
                      selecteImageRef?.current?.click();
                    }}
                    className="btn btn-primary align-self-end py-0 px-3"
                  >
                    <i className="la la-pencil"></i>
                  </Button>
                </div>
              </div>
              <span style={{ fontWeight: "bold" }}>Name :</span>
              <input
                type="text"
                value={editProfile.name}
                onChange={(e) => {
                  setEditProfile({ ...editProfile, name: e.target.value });
                }}
                className="form-control"
              />
            </>
          ) : (
            <textarea
              type="text"
              value={editProfile.about}
              onChange={(e) => {
                setEditProfile({ ...editProfile, about: e.target.value });
              }}
              style={{ height: "250px", resize: "none" }}
              className="form-control"
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setEditProfileModal(false);
            }}
          >
            Close
          </Button>
          <Button onClick={updateProfile} disabled={updating} variant="primary">
            {updating ? (
              <Spinner animation="border" size="sm" role="status"></Spinner>
            ) : (
              "Save Changes"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ClientProfile;
