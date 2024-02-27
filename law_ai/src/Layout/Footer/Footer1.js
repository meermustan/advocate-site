import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Footer1() {
  const [Visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(true);
  const handleScroll = () => {
    var scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    if (scrollTop > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (loader === true) {
      setTimeout(() => setLoader(false), 2000);
    }
  }, [loader]);
  const gototop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <footer
        className="mt-5"
        style={{ borderTop: "4px solid #aa0505", borderRadius: "20px" }}
      >
        <div className="container mt-4">
          <div className="row">
            <div className="col-12 text-center">
              <Link
                className="footer-logo h2 text-primary mb-0 font-w-7"
                to="/"
              >
                <img
                  height={60}
                  src={require("../../assets/images/logo.png")}
                />
              </Link>
              <h2 className="my-3" style={{ color: "#aa0505" }}>
                Join the Legal Revolution
              </h2>
              <p className="my-4">
                The first AI Legal Marketplace where innovation meets the law.
                Experience a revolutionary legal marketplace with cutting-edge
                AI tools. Find top lawyers, automate documents, and explore a
                world of legal research. Your legal journey begins here with our
                user-friendly platform. Join us in transforming the legal
                landscape.
              </p>
              <ul className="list-inline">
                <li className="list-inline-item">
                  <a
                    className="border rounded px-2 py-1 text-dark"
                    target={"_blank"}
                    href="https://www.facebook.com/profile.php?id=61552344133483&mibextid=ZbWKwL"
                  >
                    <i className="la la-facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className="border rounded px-2 py-1 text-dark"
                    target={"_blank"}
                    href="https://youtube.com/@Advocate_Iron_Tech?si=kntMqVrDOnnboX_5"
                  >
                    <i className="la la-youtube"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className="border rounded px-2 py-1 text-dark"
                    target={"_blank"}
                    href="https://instagram.com/advocateiron_tech?utm_source=qr&igshid=MzNlNGNkZWQ4Mg=="
                  >
                    <i className="la la-instagram"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className="border rounded px-2 py-1 text-dark"
                    target={"_blank"}
                    href="https://x.com/AdvocateIron?s=09"
                  >
                    <i className="la la-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className="border rounded px-2 py-1 text-dark"
                    target={"_blank"}
                    href="https://www.linkedin.com/in/advocate-iron-tech-417123224?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  >
                    <i className="la la-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row mt-4 mb-3">
            <div className="col">
              <hr className="m-0" />
            </div>
          </div>
          <div className="row align-items-center pb-4">
            <div className="col-md-6">Copyright ©2023 All rights reserved.</div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <ul className="list-inline mb-0">
                <li className="me-3 list-inline-item">
                  <Link className="list-group-item-action" to="/about-us">
                    About-us
                  </Link>
                </li>
                <li className="me-3 list-inline-item">
                  <Link className="list-group-item-action" to="/contact-us">
                    Contact-us
                  </Link>
                </li>
                <li className="me-3 list-inline-item">
                  <Link className="list-group-item-action" to="/pricing">
                    Pricing
                  </Link>
                </li>
                <li className="me-3 list-inline-item">
                  <Link className="list-group-item-action" to="/blogs">
                    Blogs
                  </Link>
                </li>
                <li className="me-3 list-inline-item">
                  <Link className="list-group-item-action" to="/faq">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div className={`${Visible ? "scroll-top" : ""} d-md-block d-none`}>
        <div className="smoothscroll" onClick={gototop}>
          {Visible ? "Scroll Top" : ""}
        </div>
      </div>
    </>
  );
}

export default Footer1;
