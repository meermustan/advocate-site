import { useState } from "react";
import { toast } from "react-toastify";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";

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

export default function OTPVerification({ email, handleCodeVerified }) {
  const [inputCode, setInputCode] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const verifyCode = await VerifyCode({ email, verificationCode: inputCode });
      if (!verifyCode.success) {
        throw new Error(verifyCode.message);
      }
      toast.success(verifyCode.message, toastConfig);
      handleCodeVerified(verifyCode.result.accessToken);
    } catch (error) {
      toast.error(error.message, toastConfig);
    }
    setLoading(false);
  };

  return (
    <section>
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-5">
            <div>
              <div className="mb-5">
                <h2>Enter verification code</h2>
                <p>
                  Verification code sent to{" "}
                  <span style={{ fontWeight: "bold" }}>{email}</span>
                </p>
              </div>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label style={{ fontWeight: "bold" }}>Verification Code</Label>
                  <Input
                    name="inputCode"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    disabled={loading}
                    required
                  />
                </FormGroup>
                <Button type="submit" variant="primary" disabled={loading}>
                  Verify
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

async function VerifyCode({ email, verificationCode }) {
  try {

    const result = await fetch(
      `${api_url}/user/verify-code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          verification_code: verificationCode
        })
      }
    );
    const response = await result.json();

    if (result.status !== 200) {
      throw new Error(response.resultMessage.en);
    }

    return {
      success: true,
      message: "Verification code matched!",
      result: {
        accessToken: response.result.accessToken
      }
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}
