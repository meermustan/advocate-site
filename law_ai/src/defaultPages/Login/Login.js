import React, { useState } from "react";
import HerosectionHeader from "../../Componet/Herosection/HerosectionHeader";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import OTPVerification from "./Component/OTPVerification";
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

function Login() {
  
  const navigate = useNavigate();

  const [authState, setAuthState] = useCookies(["myAuthUser"]);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [page, setPage] = useState("sign-in");

  const api_url = process.env.REACT_APP_API_URL;

  const doLogin = async () => {
    const result = await fetch(`${api_url}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const response = await result.json();

    if (result.status === 200) {
      setAuthState("myAuthUser", {
        photoUrl: response.user.photoUrl,
        name: response.user.name,
        type: response.user.type,
        token: response.accessToken,
        _id: response.user._id,
      });
      toast.success(response.resultMessage.en, toastConfig);
    } else {
      toast.error(response.resultMessage.en, toastConfig);
      
      if (response.resultCode === "00044") {
        try {
          const sendCode = await fetch(`${api_url}/user/send-verification-code`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, mode: "registration" }),
          });
          const res = await sendCode.json();
  
          if (sendCode.status !== 200) {
            throw new Error(res.resultMessage.en);
          }
          setPage("code-verification");
        } catch (error) {
          console.log(error.messsage);
          navigate("/login");
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await doLogin();
  }

  const handleCodeVerified = async () => {
    await doLogin();
  }

  if (page === "code-verification") {
    return <OTPVerification email={email} handleCodeVerified={handleCodeVerified} />
  }

  return (
    <>
      <HerosectionHeader name={"Login"} />
      <div className="page-content my-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-12">
              <img
                className="img-fluid"
                src={require("../../assets/images/login.png")}
                alt=""
              />
            </div>
            <div className="col-lg-5 col-12">
              <div>
                <h2 className="mb-3">Log In</h2>
                <form id="contact-form" onSubmit={handleSubmit}>
                  <div className="messages"></div>
                  <div className="form-group">
                    <input
                      id="form_name"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="User name"
                      required="required"
                      data-error="Username is required."
                    />
                    <div className="help-block with-errors"></div>
                  </div>
                  <div className="form-group">
                    <input
                      id="form_password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      required="required"
                      data-error="password is required."
                    />
                    <div className="help-block with-errors"></div>
                  </div>
                  <div className="form-group mt-4 mb-5">
                    <div className="remember-checkbox d-flex align-items-center justify-content-between">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="check1"
                        />
                        <label className="form-check-label" for="check1">
                          Remember me
                        </label>
                      </div>{" "}
                      <a className="btn-link" href="/forgot-password">
                        Forgot Password?
                      </a>
                    </div>
                  </div>
                  <button className="btn btn-primary">Login Now</button>
                </form>
                <div className="d-flex align-items-center mt-4">
                  {" "}
                  <span className="text-muted me-1">
                    Don't have an account?
                  </span>
                  <Link to="/client/sign-up">Sign Up</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
