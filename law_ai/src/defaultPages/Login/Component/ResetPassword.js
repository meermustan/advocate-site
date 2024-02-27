import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function ResetPassword({ accessToken }) {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      if (password !== repeatPassword) {
        throw new Error("New password doesn't match!");
      }

      const result = await fetch(
        `${api_url}/user/forgot-password`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password })
        }
      );
      const response = await result.json();
  
      if (result.status !== 200) {
        throw new Error(response.resultMessage.en);
      }

      toast.success(response.resultMessage.en, toastConfig);
      navigate("/login");
    } catch (error) {
      toast.error(error.message, toastConfig);
    }

    setLoading(false);
  }

  return (
    <section>
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-5">
            <div>
              <div className="mb-5">
                <h2>Reset your password</h2>
              </div>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label style={{ fontWeight: "bold" }}>New Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label style={{ fontWeight: "bold" }}>Repeat New Password</Label>
                  <Input
                    type="password"
                    name="repeatPassword"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                </FormGroup>
                <Button type="submit" variant="primary" disabled={loading}>
                  Reset Password
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
