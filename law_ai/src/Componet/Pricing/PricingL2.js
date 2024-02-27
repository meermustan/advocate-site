import React from "react";
import { Link } from "react-router-dom";

function PricingL2() {
  return (
    <>
      <section>
        <div className="container">
        <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <div className="mb-5">
                <h2><span className="font-w-4 d-block">Simple, Fair and</span> affordable prices for all.</h2>
                <p className="lead mb-0">We use the latest technologies it voluptatem accusantium doloremque laudantium.</p>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-12">
              <div className="row align-items-center">
                <div className="col-12 offset-md-2 col-md-4 mb-5 mb-lg-0">
                  {/* <!-- Card --> */}
                  <div className="card">
                    {/* <!-- Body --> */}
                    <div className="card-body py-5 px-4 text-center">
                      {/* <!-- Badge --> */}
                      <div className="mb-4">
                        {" "}
                        <span className="h5 text-uppercase text-primary">
                          LAWYER
                        </span>
                      </div>
                      {/* <!-- Price --> */}
                      <div className="d-flex justify-content-center border-bottom border-light pb-5 mb-5">
                        {" "}
                        <span className="text-muted h4 mb-0 mt-2">PKR</span>
                        <span className="price display-2 font-w-6 text-dark">
                          0
                        </span>
                        <span className="text-muted h4 align-self-end mb-1">
                          /mo
                        </span>
                      </div>
                      {/* <!-- Features --> */}
                      <ul className="list-unstyled mb-5">
                      <li className="mb-2">
                          <b>No per month charges</b>
                        </li>
                        <li className="mb-2">
                          Registration Fee Rs.<b>885</b> only one time.
                        </li>
                        <li className="mb-2">
                          <b>Access to all features</b>
                        </li>
                      </ul>
                      {/* <!-- Button -->  */}
                      <Link to={'/lawyer/sign-up'} className="btn btn-primary">
                        Get Started
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  {/* <!-- Card --> */}
                  <div className="card">
                    {/* <!-- Body --> */}
                    <div className="card-body py-5 px-4 text-center">
                      {/* <!-- Badge --> */}
                      <div className="mb-4">
                        {" "}
                        <span className="h5 text-uppercase text-primary">
                          CLIENT
                        </span>
                      </div>
                      {/* <!-- Price --> */}
                      <div className="d-flex justify-content-center border-bottom border-light pb-5 mb-5">
                        {" "}
                        <span className="text-muted h4 mb-0 mt-2">PKR</span>
                        <span className="price display-2 font-w-6 text-dark">
                          980
                        </span>
                        <span className="text-muted h4 align-self-end mb-1">
                          /mo
                        </span>
                      </div>
                      {/* <!-- Features --> */}
                      <ul className="list-unstyled mb-5">
                        <li className="mb-2">
                          <b>No registration Fee</b>
                        </li>
                        <li className="mb-2">
                          Just Rs.<b>980</b> per month per case.
                        </li>
                        <li className="mb-2">
                          <b>Access to all features</b>
                        </li>
                      </ul>
                      {/* <!-- Button -->  */}
                      <Link to={"/client/sign-up"} className="btn btn-primary">
                        Get Started
                      </Link>
                    </div>
                  </div>
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

export default PricingL2;