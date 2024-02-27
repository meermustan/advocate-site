import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { Stepper } from "react-form-stepper";
import { Spinner, Button, Row } from "react-bootstrap";

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


const estimatedBudget = [
  {
    "label": "10k",
    "value": 10,
  },
  {
    "label": "20k",
    "value": 20,
  },
  {
    "label": "30k",
    "value": 30,
  },
  {
    "label": "40k",
    "value": 40
  },
  {
    "label": "50k",
    "value": 50,
  },
  {
    "label": "60k",
    "value": 60,
  },
  {
    "label": "70k",
    "value": 70,
  },
  {
    "label": "80k",
    "value": 80,
  },
  {
    "label": "90k",
    "value": 90
  },
  {
    "label": "100k and more",
    "value": 100,
  },
]



function AddNewCase() {
  const navigate = useNavigate();
  const api_url = process.env.REACT_APP_API_URL;
  const ai_url = process.env.REACT_APP_AI_URL;

  const [authState] = useCookies(["myAuthUser"]);
  const [step1, setStep1] = useState({});
  const [step2, setStep2] = useState({});
  const [step3, setStep3] = useState({});
  const [jobChat, setJobChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);


  const submitStep1 = async (e) => {
    e.preventDefault();
    if (!step1.procedure) {
      toast.warn("Please select your case type.", toastConfig);
    }
    setLoading(true);
    const result = await fetch(`${ai_url}/additional_questions`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        procedure: step1.procedure,
        description: step1.description,
      }),
    });
    const response = await result.json();
    if (result.status === 200) {
      setStep2({
        additional_questions: response.additional_questions,
        case_type: response.case_type,
      });
      setLoading(false);
      setActiveStep(2);
      let newMessages = [
        {
          msg: step1.description,
          sender: authState?.myAuthUser?.name,
          time: Date.now(),
        },
      ];
      setJobChat([...jobChat, ...newMessages]);
    } else {
      setLoading(false);
      toast.error(response, toastConfig);
    }
  };

  const submitStep2 = async (e) => {
    e.preventDefault();
    const nextData = {
      procedure: step1.procedure,
      description: step1.description,
      case_type: step2.case_type,
      questions_responses: {
        [step2.additional_questions[0]]: step2[0], // step2.array.index : step2.key
        [step2.additional_questions[1]]: step2[1],
        [step2.additional_questions[2]]: step2[2],
        [step2.additional_questions[3]]: step2[3],
        [step2.additional_questions[4]]: step2[3],
      },
    };
    setLoading(true);
    const result = await fetch(`${ai_url}/ai_summary`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nextData),
    });
    const response = await result.json();
    if (result.status === 200) {
      setStep3({
        AI_description: response.AI_description,
      });
      setLoading(false);
      setActiveStep(3);
      let newMessages = [];
      await step2.additional_questions.map((question, index) => {
        newMessages.push({
          msg: question,
          sender: "Jarvis",
          time: Date.now(),
        });
        newMessages.push({
          msg: step2[index],
          sender: authState?.myAuthUser?.name,
          time: Date.now(),
        });
      });
      newMessages.push({
        msg: response.AI_description,
        sender: "Jarvis",
        time: Date.now(),
      });
      setJobChat([...jobChat, ...newMessages]);
    } else {
      setLoading(false);
      toast.error(response, toastConfig);
    }
  };

  const submitStep3 = async (e) => {
    e.preventDefault();
    const nextData = {
      procedure: step1.procedure,
      description: step1.description,
      case_type: step2.case_type,
      questions_responses: {
        [step2.additional_questions[0]]: step2[0],
        [step2.additional_questions[1]]: step2[1],
        [step2.additional_questions[2]]: step2[2],
        [step2.additional_questions[3]]: step2[3],
        [step2.additional_questions[4]]: step2[3],
      },
      new_suggestions: step3.new_suggestions,
    };
    setLoading(true);
    const result = await fetch(`${ai_url}/improve_ai_summary`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nextData),
    });
    const response = await result.json();
    if (result.status === 200) {
      let newMessages = [
        {
          msg: step3.new_suggestions,
          sender: authState?.myAuthUser?.name,
          time: Date.now(),
        },
        {
          msg: response.refined_AI_description,
          sender: "jarvis",
          time: Date.now(),
        },
      ];
      setStep3({
        ...step3,
        new_suggestions: "",
        AI_description: response.refined_AI_description,
      });
      setJobChat([...jobChat, ...newMessages]);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(response, toastConfig);
    }
  };

  const submitStep4 = async (e) => {
    e.preventDefault();
    const nextData = {
      title: `${step1.procedure} : ${step2.case_type}`,
      city: step1.city,
      summary: step3.AI_description,
      jobChat: jobChat,
      visibility: step1.visibility,
      estimatedBudget: step1.estimatedBudget,
    };
    setLoading(true);
    const result = await fetch(`${api_url}/job`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState?.myAuthUser?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nextData),
    });
    const response = await result.json();
    if (result.status === 200) {
      toast.success(response.resultMessage.en, toastConfig);
      navigate("/");
    } else {
      toast.error(response.resultMessage.en, toastConfig);
    }
  };

  return (
    <div className="container mt-3 mb-5">
      <Stepper
        style={{ padding: "0px" }}
        steps={[
          { label: "Describe Case" },
          { label: "Add Information" },
          { label: "Improve Case" },
          { label: "Submit Case" },
        ]}
        activeStep={activeStep}
      />
      {activeStep === 1 ? (
        <div className="row mt-5">
          <div className="col-12">
            <div>
              <div>
                <h5 className="mb-3">Describe your case.</h5>
              </div>
              <form onSubmit={submitStep1} className="row">
                <div className="form-group col-md-6">
                  <select
                    onChange={(e) => {
                      setStep1({ ...step1, procedure: e.target.value });
                    }}
                    value={step1.procedure}
                    className="form-control"
                    required
                  >
                    <option selected disabled>
                      Select Case Procedure
                    </option>
                    <option value="Defend your Case">Defend your Case</option>
                    <option value="File a Case">File a Case</option>
                    <option value="Apply a Bail">Apply a Bail</option>
                    <option value="Legal Notices">Legal Notices</option>
                    <option value="Legal Advisory">Legal Advisory</option>
                  </select>
                  <div className="help-block with-errors"></div>
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    value={step1.city}
                    onChange={(e) => {
                      setStep1({ ...step1, city: e.target.value });
                    }}
                    className="form-control"
                    placeholder="City"
                    required="required"
                  />
                </div>
                <div className="form-group col-12 mt-4 mb-4">
                  <input 
                    placeholder="Estimated Budget" 
                    className="form-control" 
                    value={step1?.estimatedBudget} 
                    type="number" 
                    required 
                    onChange={(e)=>{setStep1({...step1, estimatedBudget: e.target.value})}} 
                  />
                  <div className="help-block with-errors"></div>
                </div>
                <div className="form-group col-md-12 mt-4">
                  <textarea
                    value={step1.description}
                    onChange={(e) => {
                      setStep1({ ...step1, description: e.target.value });
                    }}
                    className="form-control h-auto"
                    placeholder="Describe your case in details..."
                    rows={6}
                    required="required"
                  />
                </div>
                <p>*Please don't share your personal details outside of the case</p>
                <div className="col-12 text-end mt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                  >
                    {loading ? <Spinner size="sm" /> : "Next"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : activeStep === 2 ? (
        <div className="row mt-3">
          <div className="col-12">
            <div>
              <div>
                <h5 className="mb-3">Add More Information.</h5>
              </div>
              <form onSubmit={submitStep2} className="row">
                {step2.additional_questions &&
                  step2.additional_questions.map((question, index) => (
                    <div key={index} className="form-group col-12">
                      <p>{question}</p>
                      <input
                        type="text"
                        value={step2[index]}
                        onChange={(e) => {
                          setStep2({ ...step2, [index]: e.target.value });
                        }}
                        className="form-control"
                        placeholder="Answer here..."
                        required="required"
                      />
                    </div>
                  ))}
                <div className="row mt-4">
                  <div className="col-6">
                    <button
                      onClick={() => {
                        setActiveStep(1);
                      }}
                      disabled={loading}
                      className="btn btn-primary"
                    >
                      Previous
                    </button>
                  </div>
                  <div className="col-6 text-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary"
                    >
                      {loading ? <Spinner size="sm" /> : "Next"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : activeStep === 3 ? (
        <div className="row mt-3">
          <div className="col-12">
            <div>
              <div>
                <h5>Improve your case.</h5>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <p style={{ color: "red" }}>
                    Here is your case summary, if you want some improvement tell
                    us in bellow field.
                  </p>
                  <p style={{ fontSize: "14px", color: "black" }}>
                    {step3.AI_description}
                  </p>
                </div>
              </div>

              <Row className="px-md-5 px-0 mt-5">
                <form className="row g-0" onSubmit={submitStep3}>
                  <input
                    className="form-control col"
                    type="text"
                    value={step3.new_suggestions}
                    onChange={(e) => {
                      setStep3({ ...step3, new_suggestions: e.target.value });
                    }}
                    placeholder="have some extra information..?"
                  />
                  <Button
                    style={{
                      width: "90px",
                      height: "35px",
                      marginLeft: "15px",
                    }}
                    typeof="submit"
                    className="bg-transparent align-self-end p-0 text-dark"
                  >
                    {loading ? <Spinner size="sm" /> : "Improve"}
                  </Button>
                </form>
              </Row>
              <div className="row mt-5">
                <div className="col-6">
                  <button
                    onClick={() => {
                      setActiveStep(2);
                    }}
                    disabled={loading}
                    className="btn btn-primary"
                  >
                    Previous
                  </button>
                </div>
                <div className="col-6 text-end">
                  <button
                    onClick={() => {
                      setActiveStep(4);
                    }}
                    disabled={loading}
                    className="btn btn-primary"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : activeStep === 4 ? (
        <div className="row mt-3">
          <div className="col-12">
            <div>
              <div>
                <h5>Submit Your Case</h5>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <p>
                    Here is improved summary for your Case. Now you can summit
                    you case to AdvocateIron.
                  </p>
                  <p style={{ fontSize: "14px", color: "black" }}>
                    {step3.AI_description}
                  </p>
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <select
                      onChange={(e) => {
                        setStep1({ ...step1, visibility: e.target.value });
                      }}
                      value={step1.visibility}
                      className="form-control"
                    >
                      <option selected value="public">
                        Public
                      </option>
                      <option value="private">Private</option>
                    </select>
                    <p className="mt-1 " >
                        {step1?.visibility == "private"? 
                          "*Not visible on Find Work page, only accessible to lawyers who are invited"  
                          : "*Can visible to everyone and publically available"
                        }
                    </p>
                    <div className="help-block with-errors"></div>
                  </div>
                  <div className="col-md-6 mt-4 mb-4">
                    <p className="text-end"><strong>Est. Bugdet {`${step1['estimatedBudget']}`}</strong></p>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-6">
                    <button
                      onClick={() => {
                        setActiveStep(3);
                      }}
                      disabled={loading}
                      className="btn btn-primary"
                    >
                      Previous
                    </button>
                  </div>
                  <div className="col-6 text-end">
                    <button
                      onClick={submitStep4}
                      disabled={loading}
                      className="btn btn-primary"
                    >
                      {loading ? <Spinner size="sm" /> : "Submit Case"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AddNewCase;
