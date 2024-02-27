import React, { useEffect, useState, useRef } from "react";
import { Button, Card, CardBody, CardText, Col, Container, Image, Input, Row, Spinner } from "reactstrap";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ChatHeader from "../../../Componet/bot/ChatHeader";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
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

function LegalResearch({ job }) {
  const [authState] = useCookies(["myAuthUser"]);
  const [modalView, setModalView] = useState(false);
  const [progress, setProgress] = useState(false);
  const [query, setQuery] = useState();
  const [responses, setResponses] = useState([]);
  const [selectedIntensiveResearch, setSelectedIntensiveResearch] = useState(0);
  const [helpTextWhileLoading, setHelpTextWhileLoading] = useState("");
  const promptBoxEL = useRef();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(job?.legalResearch || []);
  const api_url = process.env.REACT_APP_API_URL;
  const ai_url = process.env.REACT_APP_AI_URL;
  const legalResearchId = JSON.parse(localStorage.getItem(`${job?._id}-legalResearchId`));
  const legalResearchText = JSON.parse(localStorage.getItem(`${job?._id}-legalResearchText`));
  const [alreadyGettingResearch, setAlreadyGettingResearch] = useState({legalResearchId, legalResearchText} || null);
  // const [alreadyGettingResearch, setAlreadyGettingResearch] = useState(legalResearchId || null);

  const getDocumentStatus = async (docId) => {
    if (!docId) {
      setProgress(false);
      return;
    }
    const result = await fetch(`${ai_url}/get_job_status`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(docId),
      }),
    });
    const response = await result.json();
    let helpingTextTimer30s;
    setTimeout(() => {
      setHelpTextWhileLoading("Generating response can take few minutes, You can check it later!")
    }, 30000);
    if (result.status === 200) {
      if (response?.status == "closed") {
        setResponses(response.response);
        setProgress(false);
        setHelpTextWhileLoading("");
        clearTimeout(helpingTextTimer30s);
        localStorage.removeItem(`${job?._id}-legalResearchId`);
        localStorage.removeItem(`${job?._id}-legalResearchText`);
        setAlreadyGettingResearch(null);
      } else {
        setTimeout(() => {
          getDocumentStatus(docId);
        }, 5000);
      }
    } else {
      helpingTextTimer30s = setTimeout(() => {
        setHelpTextWhileLoading("Be Patient, this can take few minutes!");
      }, 30000);
      setProgress(false);
      toast.error(response, toastConfig);
    }
  };

  const getSummary = async (e) => {
    e?.preventDefault();
    setProgress(true);
    if(alreadyGettingResearch?.legalResearchId == null){
      const result = await fetch(`${ai_url}/get_document`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
        }),
      });
      const response = await result.json();
      if (result.status === 200) {
        getDocumentStatus(response?.job_id);
        setAlreadyGettingResearch({legalResearchId: response?.job_id, legalResearchText: query});
        localStorage.setItem(`${job?._id}-legalResearchId`,JSON.stringify(response?.job_id));
        localStorage.setItem(`${job?._id}-legalResearchText`,JSON.stringify(query));
      } else {
        setProgress(false);
        toast.error(response, toastConfig);
      }
    }else{
      getDocumentStatus(alreadyGettingResearch.legalResearchId);
    }
  };

  const askQuestion = async (e, textMessage) => {
    e?.preventDefault();
    setLoading(true);
    let promptToSend;
    if(prompt !== ""){
      promptToSend = prompt;
    }else{
      promptToSend = textMessage;
    }
    console.log("prompt to send : ", promptToSend);
    let newMessage = [];
    let lawyerMessage = {
      msg: promptToSend,
      sender: authState?.myAuthUser?.name,
      time: Date.now(),
    };
    newMessage.push(lawyerMessage);
    setMessages((prevArray) => [...prevArray, lawyerMessage]);
    setPrompt("");
    let case_history = job?.jobChat
      ?.slice(0, 20)
      .map((item) => `${item?.sender} : ${item?.msg}`);
    let memory = messages
      ?.slice(-3)
      .map((item) => `${item?.sender} : ${item?.msg}`);
    // console.log(case_history, memory);
    // return;
    const result = await fetch(`${ai_url}/ask_question`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        case_history,
        memory,
        msg: promptToSend,
      }),
    });
    const response = await result.json();
    if (result.status === 200) {
      setLoading(false);
      let jarvisMessage = {
        msg: response.reply,
        sender: "Jarvis",
        time: Date.now(),
      };
      newMessage.push(jarvisMessage);
      setMessages((prevArray) => [...prevArray, jarvisMessage]);
      addMessageToJob(newMessage);
    } else {
      setLoading(false);
      toast.error(response, toastConfig);
    }
  };

  const addMessageToJob = async (newMessages) => {
    // setMessages([...messages, ...newMessages]);
    const result = await fetch(`${api_url}/job/add-research-message`, {
      method: "Put",
      headers: {
        Authorization: `Bearer ${authState?.myAuthUser?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobId: job._id,
        newMessages,
      }),
    });
    const response = await result.json();
    if (result.status === 200) {
      console.log(response);
    } else {
      toast.error(response.resultMessage.en, toastConfig);
    }
  };

  const onIntensiveResponseFormSubmit = async(e)=>{
    e?.preventDefault();
    let selectedValue = e.target['intensive-research'].value;
    let messageText = `I got legal research regarding the project, it utilizes past case judgements to help you understand the case better. \n Please read through them in order to guide me(the lawyer) on how to handle/deal with this case better: ${'\n'} ${responses[selectedValue]}`
    setPrompt(messageText);
    askQuestion(e,messageText);
    setModalView(false);
  }


  useEffect(() => {
    if (promptBoxEL.current)
      promptBoxEL.current.scrollTop = promptBoxEL.current.scrollHeight;
  }, [messages]);

  return (
    <div>
      <Modal
        show={modalView}
        size="lg"
        onHide={() => {
          setModalView(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Intensive Legal Research</Modal.Title>
        </Modal.Header>
        {responses.length > 0 ? (
          <div className="d-flex accordion flex-column mt-2" style={{minHeight: `${window.innerHeight - window.innerHeight%10}px`}} >
            <form onSubmit={(e) => { onIntensiveResponseFormSubmit(e) }}>
              <div className="m-2 d-flex justify-content-end">
                <Button type="submit">
                  Select
                </Button>
              </div>
              {responses.map((item, index) => (
                <div className="card mx-2" style={{ marginTop: '3px' }} key={index}>
                  <div
                    className="card-header d-flex justify-content-between"
                    onClick={() => { setSelectedIntensiveResearch(index) }}
                    id={`heading-${index}`}
                    data-toggle="collapse"
                    data-target={`#collapse${index}`}
                    aria-expanded="true"
                    aria-controls={`collapse${index}`}
                  >
                    <h5 className="mb-0">
                      <button type="button" style={{ backgroundColor: 'transparent', border: 'none' }}>
                        {item.slice(0, 50)}...
                      </button>
                    </h5>
                    <Input
                      checked={selectedIntensiveResearch === index}
                      name="intensive-research"
                      value={index}
                      type="radio"
                      onClick={(e) => { e.preventDefault(); }}
                    />
                  </div>
                  <div className="collapse" id={`collapse${index}`} aria-labelledby={`heading-${index}`} data-parent="#accordion">
                    <div className="card-body">
                      {item}
                    </div>
                  </div>
                </div>
              ))}
            </form>
          </div>
        ) : (
          <form onSubmit={getSummary}>
            <Modal.Body>
              <textarea
                type="text"
                value={alreadyGettingResearch?.legalResearchText || query}
                required={true}
                readOnly={progress}
                placeholder="Enter summary here..."
                onChange={(e) => setQuery(e.target.value)}
                style={{ height: "250px", resize: "none" }}
                className="form-control"
              />
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
              <p>{helpTextWhileLoading}</p>
              {alreadyGettingResearch?.legalResearchId === null?
                <Button disabled={progress} type="submit" variant="primary">
                  {progress ? (
                    <Spinner animation="border" size="sm" role="status"></Spinner>
                  ) : (
                    "Submit"
                  )}
                </Button>
              :
                <Button disabled variant="primary">
                  <Spinner animation="border" size="sm" role="status"></Spinner>
                </Button>
              }
            </Modal.Footer>
          </form>
        )}
      </Modal>

      <div className="row">
        <div className="col-md-8">
          <h4 style={{ color: "red" }}>Legal Research</h4>
        </div>
        <div className="col-md-4">
          <div className="d-flex justify-content-end">
            <button
              onClick={() => {
                setQuery("");
                setProgress(false);
                setResponses([]);
                setModalView(true);
                getDocumentStatus(alreadyGettingResearch?.legalResearchId);
              }}
              className={"btn btn-primary px-3 mb-4 py-1"}
            >
              Intensive Research
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="prompt-outputs-box" ref={promptBoxEL}>
        <ChatHeader
          name="Jarvis"
          status="Online"
          photoUrl={require("../../../assets/images/favicon.png")}
        />
        {messages.map((data, index) => (
          <div className="prompt-outputs p-3">
            <Row>
              <Col>
                <strong> {data.sender}</strong> :{" "}
                <span> {moment(data.time).format("DD-MM-YYYY h:mm A")}</span>
              </Col>
              <Col className="d-flex justify-content-end">
                <CopyToClipboard text={data.msg}>
                  <button className={"btn btn-primary px-3 py-1"}>
                    <i class="las la-copy"></i>
                  </button>
                </CopyToClipboard>
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={{ fontSize: "13px" }}>{data.msg}</p>
              </Col>
            </Row>
          </div>
        ))}
        <div className="chat-footer mt-auto">
          <form className="row g-0" onSubmit={askQuestion}>
            <input
              className="form-control col mx-3"
              type="search"
              required
              readOnly={loading}
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
              placeholder="ask me any think i can help you with.."
              aria-label="Search"
            />
            <Button
              type="submit"
              style={{ width: "65px", height: "35px" }}
              disabled={loading}
              className="bg-transparent align-self-end p-0 text-dark"
            >
              {loading ? (
                <Spinner animation="border" size="sm" role="status"></Spinner>
              ) : (
                <i class="las la-paper-plane"></i>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LegalResearch;