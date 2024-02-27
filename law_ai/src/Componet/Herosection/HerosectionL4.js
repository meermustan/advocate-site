import React from "react";

function HerosectionL4() {
  return (
    <>
      <section style={{padding:0}} className="position-relative hero-shape3 overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-12 mt-3 col-lg-5 col-xl-6 order-lg-2 mb-5 mb-lg-0">
              {/* <!-- Image --> */}
              <img
                src={require("../../assets/images/hero/04.png")}
                className="img-fluid"
                alt="..."
              />
            </div>
            <div className="col-12 mt-5 pt-2 col-lg-7 col-xl-6 order-lg-1">
              <h2 className=" mb-3" style={{ color: "#aa0505" }}>
                Join the Legal Revolution
              </h2>
              {/* <!-- Text --> */}
              <p className="lead text-muted mb-4">
                The first AI Legal Marketplace where innovation meets the law.
                Experience a revolutionary legal marketplace with cutting-edge
                AI tools. Find top lawyers, automate documents, and explore a
                world of legal research. Your legal journey begins here with our
                user-friendly platform. Join us in transforming the
                legal landscape.
              </p>
              {/* <!-- Buttons --> */}
              <div className="btn btn-sm btn-primary text-start me-1">
                {" "}
                <i className="la la-apple me-2 ic-2x d-inline-block"></i>
                <div className="d-inline-block">
                  {" "}
                  <small className="d-block">Available On The</small>
                  App Store
                </div>
              </div>
              <div className="btn btn-sm btn-dark text-start">
                {" "}
                <i className="la la-android me-2 ic-2x d-inline-block"></i>
                <div className="d-inline-block">
                  {" "}
                  <small className="d-block">Android App On</small>
                  Google Play
                </div>
              </div>
            </div>
          </div>
          {/* <!-- / .row --> */}
        </div>
        {/* <!-- / .container --> */}
      </section>
    </>
  );
}

export default HerosectionL4;
