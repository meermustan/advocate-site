import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HerosectionHeader from "../../Componet/Herosection/HerosectionHeader";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import OTPVerification from '../Login/Component/OTPVerification';

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

function SignupLawyer() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const api_url = process.env.REACT_APP_API_URL;
  const [page, setPage] = useState("sign-up");

  const doSignup = async (e) => {
    let postData = { ...userData, type: "lawyer", lawyerId: "1234" };
    e.preventDefault();

    if (postData.password !== postData.cPassword) {
      toast.error("Your password doesn't match.", toastConfig);
      return;
    }

    delete postData.cPassword;

    if (postData.password.length < 6) {
      toast.error("Password is too short.", toastConfig);
      return;
    }
    const result = await fetch(`${api_url}/user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const response = await result.json();

    if (result.status === 200) {
      toast.success(response.resultMessage.en, toastConfig);
      
      try {
        const sendCode = await fetch(`${api_url}/user/send-verification-code`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: postData.email, mode: "registration" }),
        });
        const res = await sendCode.json();

        if (sendCode.status !== 200) {
          throw new Error(res.resultMessage.en);
        }
      } catch (error) {
        navigate("/login");
      }
      setPage("code-verification");
    } else {
      toast.error(response.resultMessage.en, toastConfig);
    }
  };

  const handleCodeVerified = () => {
    navigate("/login");
  }

  if (page === "code-verification") {
    return <OTPVerification email={userData.email} handleCodeVerified={handleCodeVerified} />
  }

  return (
    <div>
      <HerosectionHeader name={"SignUp"} folder1={"Lawyer"} />
      <div className="page-content">
        <div className="container py-4">
          <div className="row mx-auto">
            <div className="col-6 text-end">
              <Link
                className="btn btn-primary"
                style={{ width: "150px" }}
                to="/client/sign-up"
              >
                Client
              </Link>
            </div>
            <div className="col-6 text-start">
              <Link
                className="btn btn-primary active"
                style={{ width: "150px" }}
                to="/lawyer/sign-up"
              >
                Lawyer
              </Link>
            </div>
          </div>
          <div className="row justify-content-center mt-4 text-center">
            <div className="col-lg-8 col-md-12">
              <div className="mb-4">
                <h2>
                  <span className="font-w-4">Simple And</span> Easy To Sign Up
                </h2>
                <p className="lead">
                  We use the latest technologies it voluptatem accusantium
                  doloremque laudantium, totam rem aperiam.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-10 ms-auto me-auto">
              <div className="register-form text-center">
                <form onSubmit={doSignup}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          value={userData.name}
                          onChange={(e) => {
                            setUserData({ ...userData, name: e.target.value });
                          }}
                          className="form-control"
                          placeholder="Full Name"
                          required="required"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          value={userData.email}
                          onChange={(e) => {
                            setUserData({ ...userData, email: e.target.value });
                          }}
                          className="form-control"
                          placeholder="Email Address"
                          required="required"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <select
                          onChange={(e) => {
                            setUserData({
                              ...userData,
                              gender: e.target.value,
                            });
                          }}
                          className="form-control"
                          required="required"
                        >
                          <option selected disabled>
                            Gender
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          value={userData.city}
                          onChange={(e) => {
                            setUserData({ ...userData, city: e.target.value });
                          }}
                          className="form-control"
                          placeholder="City Name"
                          required="required"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="password"
                          value={userData.password}
                          onChange={(e) => {
                            setUserData({
                              ...userData,
                              password: e.target.value,
                            });
                          }}
                          className="form-control"
                          placeholder="Password"
                          required="required"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="password"
                          value={userData.cPassword}
                          onChange={(e) => {
                            setUserData({
                              ...userData,
                              cPassword: e.target.value,
                            });
                          }}
                          className="form-control"
                          placeholder="Confirm Password"
                          required="required"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <div className="remember-checkbox clearfix mb-4">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input float-none"
                            id="customCheck1"
                          />
                          <label
                            className="form-check-label"
                            for="customCheck1"
                          >
                            I agree to the term of use and privacy policy
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Button className="btn btn-primary">
                        Create Account
                      </Button>
                      <span className="mt-4 d-block">
                        Have An Account ?{" "}
                        <Link to="/login">
                          <i>Sign In!</i>
                        </Link>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupLawyer;
