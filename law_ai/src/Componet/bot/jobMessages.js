import React, { useEffect, useState, useRef } from "react";
import { Button, Col, Container, Image, Row } from "reactstrap";
import moment from "moment";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ChatHeader from "./ChatHeader";
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

function JobMessages({ job }) {
  const [authState] = useCookies(["myAuthUser"]);
  const promptBoxEL = useRef();
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState(job.jobChat);
  const api_url = process.env.REACT_APP_API_URL;

  const addMessageToJob = async (message) => {
    const result = await fetch(`${api_url}/job/add-message`, {
      method: "Put",
      headers: {
        Authorization: `Bearer ${authState?.myAuthUser?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobId: job._id,
        message: message,
      }),
    });
    const response = await result.json();
    if (result.status === 200) {
      console.log(response);
    } else {
      toast.error(response.resultMessage.en, toastConfig);
    }
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const generateResponse = (e) => {
    e.preventDefault();
    const newMessage = {
      msg: prompt,
      sender: authState?.myAuthUser?.name,
      time: Date.now(),
    };
    setMessages([...messages, newMessage]);
    setPrompt("");
    addMessageToJob(newMessage);
  };

  const reGenerateResponse = () => {
    setMessages([
      ...messages,
      {
        bot: true,
        text: "this is regenrated reponse for above pormpt",
      },
    ]);
  };

  useEffect(() => {
    if (promptBoxEL.current)
      promptBoxEL.current.scrollTop = promptBoxEL.current.scrollHeight;
  }, [messages]);

  return (
    <div>
      <div className="prompt-outputs-box" ref={promptBoxEL}>
        {/* <ChatHeader
          name="Jarvis"
          status=""
          photoUrl={require("../../assets/images/favicon.png")}
          additionalClass="jarvis-header"
        />   */}
        {messages.map((data, index) => (
            index >= 1 && index <= 10?
              <>
                {index === 1 && <p className="px-4 mt-4"><small><strong>Q/A between Jarvis and {messages[index+1].sender}</strong></small></p>}
                <div className="px-4">
                  {index % 2 === 0?
                  <input
                    type="text"
                    value={data.msg}
                    readOnly
                    className="form-control"
                  />
                  :
                  <p className="mt-4">{data.msg}</p>}
                </div>
                {index === 10 && <hr/>}
              </>
            :
            <div className="prompt-outputs py-2 px-4 my-2">
              <Row>
                {data.sender === "Jarvis"?
                <Col>
                  <strong style={{marginRight: "10px"}}> Jarvis</strong> {"  "}
                  <i className="la  la-mail-reply "></i>
                </Col>
                :
                <Col>
                  <strong style={{marginRight: "10px"}}> {data.sender}</strong> {"  "}
                  <i className="las la-clock"></i>
                  <span style={{ fontSize: "13px" }} > {moment(data.time).fromNow()}</span>
                </Col>
                }
                <Col className="d-flex justify-content-end">
                  <CopyToClipboard text={data.msg}>
                    <button className={"btn btn-sm btn-primary px-3 py-1"}>
                      <i className="las la-copy"></i>
                    </button>
                  </CopyToClipboard>
                </Col>
              </Row>
              <Row>
                <Col>
                  {data.sender === "Jarvis" && data.msg.slice(-1) === "?" ?
                  <p style={{ fontSize: "16px" }}><strong>{data.msg}</strong></p>
                  :
                  <p style={{ fontSize: "16px" }}>{data.msg}</p>
                  }
                </Col>
              </Row>
            </div>
        ))}
        <div className="chat-footer">
          <form className="row g-0" onSubmit={generateResponse}>
            <input
              className="form-control col mx-3"
              type="search"
              required
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
              disabled={prompt === ""}
              className="bg-transparent align-self-end p-0 text-dark"
            >
              <i className="las la-paper-plane"></i>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default JobMessages;
