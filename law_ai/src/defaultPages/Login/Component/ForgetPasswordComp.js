import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

import { Button } from "reactstrap";
import OTPVerification from './OTPVerification';
import ResetPassword from './ResetPassword';

const api_url = process.env.REACT_APP_API_URL;

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

function Forgotpass() {

    const [email, setEmail] = useState("");
    const [page, setPage] = useState("email-form");
    const [accessToken, setAccessToken] = useState("");

    const [loading, setLoading] = useState(false);

    const handleCodeVerified = (token) => {
        setAccessToken(token);
        setPage("reset-password");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await fetch(
                `${api_url}/user/send-verification-code`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, mode: "forgot-password" })
                }
            );
            const response = await result.json();
        
            if (result.status !== 200) {
                throw new Error(response.resultMessage.en);
            }
        
            toast.success(response.resultMessage.en, toastConfig);
            setPage("code-verification");
        } catch (error) {
            toast.error(error.message, toastConfig);
        }

        setLoading(false);
    }

    if (page === "code-verification") {
        return <OTPVerification email={email} handleCodeVerified={handleCodeVerified} />
    }

    if (page === "reset-password") {
        return <ResetPassword email={email} accessToken={accessToken} />
    }

    return (
        <>
            <section>
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-5">
                            <div>
                                <div className="mb-5">
                                    <h2>Forgot your password?</h2>
                                    <p>Enter your email to reset your password.</p>
                                </div>
                                <form id="contact-form" onSubmit={handleSubmit}>
                                    <div className="messages" />
                                    <div className="form-group">
                                        <input
                                            id="form_email"
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Email"
                                            required="required"
                                            data-error="Valid email is required."
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={loading}
                                        />
                                        <div className="help-block with-errors" />
                                    </div>
                                    <Button type="submit">
                                        Send Verification Code
                                    </Button>
                                </form>
                                <div className="mt-4"> 
                                <Link className="link-title" to="/login">Back to sign in</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Forgotpass;
