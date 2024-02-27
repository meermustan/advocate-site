import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  Navbar,
  UncontrolledDropdown,
} from "reactstrap";
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import Modal from "react-bootstrap/Modal";
import { useCookies } from "react-cookie";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { useSelector } from "react-redux";

const Header1 = ({ user }) => {
  const unSeen = useSelector((state) => state?.notification?.unSeen);
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [authState, setAuthState] = useCookies(["myAuthUser"]);
  const [visible, setVisible] = useState(false);
  const website = process.env.REACT_APP_URL;
  const [headerStyle, setHeaderStyle] = useState({});

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // window.innerWidth
  }, []);

  const toggleMenu = (index) => {
    if (openMenus.includes(index)) {
      setOpenMenus(openMenus.filter((item) => item !== index));
    } else {
      setOpenMenus([...openMenus, index]);
    }
  };

  const closeAllMenus = () => {
    setOpenMenus([]);
  };

  const handleScroll = () => {
    var scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    if (scrollTop > 0) {
      setHeaderStyle({boxShadow: '0 0px 10px 0px rgba(0, 0, 0, 0.267)'});
      setVisible(true);
    } else {
      setVisible(false);
      setHeaderStyle({boxShadow: 'none'});
    }
  };

  const doLogout = () => {
    setAuthState("myAuthUser", null);
  };

  return (
    <header id="site-header" style={{height: `80px`}} className="header">
      <div id="header-wrap" style={headerStyle} className={`fixed-header`}>
        <div className="container px-0">
          <Modal
            show={showModal}
            onHide={() => {
              setShowModal(false);
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Invite Friends</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="text-center">Invite people on AdvocateIron Tech.</p>
              <div
                style={{ display: "flex", "justify-content": "space-around" }}
              >
                <EmailShareButton
                  url={website}
                  subject="Advocate-iron Tech"
                  body={`Hi, I have found an innovative site a legal marketplace, please check blew link. ${website}`}
                >
                  <EmailIcon size={50} round />
                </EmailShareButton>
                <WhatsappShareButton
                  title={`Advocate Iron - Hi, I have found an innovative site a legal marketplace, please check blew link. ${website}`}
                  url={website}
                >
                  <WhatsappIcon size={50} round />
                </WhatsappShareButton>
                <FacebookShareButton
                  url={website}
                  quote={`Hi, I have found an innovative site a legal marketplace, please check blew link.  ${website}`}
                  hashtag="#advocate-iron"
                >
                  <FacebookIcon size={50} round />
                </FacebookShareButton>
                <TwitterShareButton
                  url={website}
                  title={`Hi, I have found an innovative site a legal marketplace, please check blew link. ${website}`}
                  hashtags={["AdvocateIron"]}
                >
                  <TwitterIcon size={50} round />
                </TwitterShareButton>
                <LinkedinShareButton
                  url={website}
                  source={website}
                  title={`Hi, I have found an innovative site a legal marketplace, please check blew link. ${website}`}
                  hashtags={["AdvocateIron"]}
                >
                  <LinkedinIcon size={50} round />
                </LinkedinShareButton>
              </div>
            </Modal.Body>
          </Modal>

          <div className="row">
            <div className="col">
              {/* Navbar */}
              <Navbar className="navbar navbar-expand-lg navbar-light">
                <div className="d-sm-flex align-items-center justify-content-start">
                  <Nav className="mx-auto" navbar>
                    <NavItem>
                      <UncontrolledDropdown
                        nav
                        inNavbar
                        isOpen={openMenus.includes("u2")}
                        toggle={() => toggleMenu("u2")}
                        onMouseLeave={closeAllMenus}
                      >
                        <DropdownToggle
                          nav
                          caret
                          style={{ width: "4rem", height: "35px" }}
                          className="btn btn-primary btn-sm"
                        >
                          <i className="las la-bars"></i>
                        </DropdownToggle>
                        <DropdownMenu
                          id={"submenu_u2"}
                          className="dropdown-menu"
                          style={{
                            left: 0,
                            top: 36,
                            position: "absolute",
                          }}
                        >
                          <ul className="list-unstyled">
                            <li>
                              <DropdownItem
                                className={
                                  location.pathname == "/" ? "active" : ""
                                }
                                tag={Link}
                                to="/"
                              >
                                Home
                              </DropdownItem>
                            </li>
                            {user && user.type === "client" ? (
                              <>
                                <li>
                                  <DropdownItem
                                    className={
                                      location.pathname == "/client-cases"
                                        ? "active"
                                        : ""
                                    }
                                    tag={Link}
                                    to="/client-cases"
                                  >
                                    My Cases
                                  </DropdownItem>
                                </li>
                                <li>
                                  <DropdownItem
                                    className={
                                      location.pathname == "/lawyers"
                                        ? "active"
                                        : ""
                                    }
                                    tag={Link}
                                    to="/lawyers"
                                  >
                                    Find Lawyers
                                  </DropdownItem>
                                </li>
                              </>
                            ) : user && user.type === "lawyer" ? (
                              <>
                                <li>
                                  <DropdownItem tag={Link} to="/proposals">
                                    My Proposals
                                  </DropdownItem>
                                </li>
                                <li>
                                  <DropdownItem
                                    className={
                                      location.pathname == "/cases"
                                        ? "active"
                                        : ""
                                    }
                                    tag={Link}
                                    to="/cases"
                                  >
                                    Find Cases (jobs)
                                  </DropdownItem>
                                </li>
                              </>
                            ) : (
                              ""
                            )}
                            <li>
                              <DropdownItem
                                className={
                                  location.pathname == "/about-us"
                                    ? "active"
                                    : ""
                                }
                                tag={Link}
                                to="/about-us"
                              >
                                About-Us
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                className={
                                  location.pathname == "/contact-us" ? "active" : ""
                                }
                                tag={Link}
                                to="/contact-us"
                              >
                                Contact Us
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                className={
                                  location.pathname == "/pricing" ? "active" : ""
                                }
                                tag={Link}
                                to="/pricing"
                              >
                                Pricing
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                className={
                                  location.pathname == "/blogs" ? "active" : ""
                                }
                                tag={Link}
                                to="/blogs"
                              >
                                Blogs
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </NavItem>
                  </Nav>
                </div>
                <Link
                  className="navbar-brand logo text-primary mb-0 font-w-7o"
                  to="/"
                >
                  {/* W<span className="text-dark font-w-4">inck.</span> */}
                  <img
                    className="d-none d-md-flex"
                    height={50}
                    src={require("../../assets/images/logo.png")}
                  />
                  <img
                    className="d-flex d-md-none"
                    height={50}
                    src={require("../../assets/images/logo2.png")}
                  />
                </Link>

                {/* full menu 
                 <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => {
                      setIsOpenNav(!isOpenNav);
                    }}
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <Collapse
                    isOpen={isOpenNav}
                    className="collapse navbar-collapse"
                    navbar
                  >
                    <Nav className="mx-auto" navbar>
                      {navLinks.map((navLink, index) => (
                        <NavItem key={index}>
                          <NavLink
                            className={
                              location.pathname == navLink.path ? "active" : ""
                            }
                            onClick={() => {
                              setIsOpenNav(false);
                            }}
                            tag={Link}
                            to={navLink.path}
                          >
                            {navLink.menu_title}
                          </NavLink>
                        </NavItem>
                      ))}
                    </Nav>
                  </Collapse> */}

                <div className="d-flex align-items-center justify-content-end">
                  {!user ? (
                    <>
                      <Link
                        className="btn btn-primary btn-sm ms-3"
                        style={{
                          height: "36px",
                        }}
                        to="/login"
                      >
                        Login
                      </Link>
                      <Link
                        className="btn btn-primary btn-sm ms-3 d-sm-inline-block d-none"
                        to="/client/sign-up"
                        style={{
                          height: "36px",
                        }}
                      >
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        style={{
                          margin: "0 10px",
                          position: "relative",
                        }}
                        to="/notifications"
                      >
                        <i
                          style={{ fontSize: "30px" }}
                          className="la la-bell"
                        ></i>
                        {unSeen > 0 && (
                          <div className="notification-circle bg-primary"></div>
                        )}
                      </Link>
                      <Nav className="mx-auto" navbar>
                        <NavItem>
                          <UncontrolledDropdown
                            nav
                            inNavbar
                            isOpen={openMenus.includes("u1")}
                            toggle={() => toggleMenu("u1")}
                            onMouseLeave={closeAllMenus}
                          >
                            <DropdownToggle nav caret>
                              <img
                                height={40}
                                width={40}
                                className="rounded-circle"
                                src={user.photoUrl}
                              />
                            </DropdownToggle>
                            <DropdownMenu
                              id={"submenu_u1"}
                              className="dropdown-menu"
                              style={{
                                right: 0,
                                top: 50,
                                position: "absolute",
                              }}
                            >
                              {user && user.type === "client" ? (
                                <ul className="list-unstyled">
                                  <li>
                                    <DropdownItem
                                      tag={Link}
                                      to="/client-profile"
                                    >
                                      Profile
                                    </DropdownItem>
                                  </li>
                                  <li>
                                    <DropdownItem tag={Link} to="/messages">
                                      Messages
                                    </DropdownItem>
                                  </li>
                                  <li>
                                    <DropdownItem
                                      onClick={() => {
                                        setShowModal(true);
                                      }}
                                    >
                                      Invite a Friend
                                    </DropdownItem>
                                  </li>
                                  <li>
                                    <DropdownItem onClick={doLogout}>
                                      Logout
                                    </DropdownItem>
                                  </li>
                                </ul>
                              ) : user && user.type === "lawyer" ? (
                                <ul className="list-unstyled">
                                  <li>
                                    <DropdownItem
                                      tag={Link}
                                      to="/lawyer-profile"
                                    >
                                      Profile
                                    </DropdownItem>
                                  </li>
                                  <li>
                                    <DropdownItem tag={Link} to="/messages">
                                      Messages
                                    </DropdownItem>
                                  </li>
                                  <li>
                                    <DropdownItem
                                      onClick={() => {
                                        setShowModal(true);
                                      }}
                                    >
                                      Invite a Friend
                                    </DropdownItem>
                                  </li>
                                  <li>
                                    <DropdownItem onClick={doLogout}>
                                      Logout
                                    </DropdownItem>
                                  </li>
                                </ul>
                              ) : (
                                <>
                                  <li>
                                    <DropdownItem onClick={doLogout}>
                                      Logout
                                    </DropdownItem>
                                  </li>
                                </>
                              )}
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </NavItem>
                      </Nav>
                    </>
                  )}
                </div>
              </Navbar>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header1;
