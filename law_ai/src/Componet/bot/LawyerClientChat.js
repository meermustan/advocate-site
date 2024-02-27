import React, { useEffect, useState, useRef } from "react";
import { Button, Col, Container, Image, Row } from "reactstrap";
import moment from "moment";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ChatHeader from "./ChatHeader";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import LargeSpinner from "../Spinners/LargeSpinner";
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

function LawyerClientChat({ chat }) {
  const [authState] = useCookies(["myAuthUser"]);
  const promptBoxEL = useRef();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});
  const [generated, setGenerated] = useState(false);
  const api_url = process.env.REACT_APP_API_URL;

  const addMessageToChat = async (message) => {
    const result = await fetch(`${api_url}/chat/`, {
      method: "Put",
      headers: {
        Authorization: `Bearer ${authState?.myAuthUser?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: chat._id,
        message: message,
      }),
    });
    const response = await result.json();
    if (result.status === 200) {
      setMessages(response.messages);
    } else {
      toast.error(response.resultMessage.en, toastConfig);
    }
  };

  const reGenerateResponse = () => {
    // e.preventDefault();
    // setGenerated(true);
    // setPromptHistory([
    //   ...promptHistory,
    //   {
    //     bot: false,
    //     text: prompt,
    //   },
    // ]);
    // setPrompt("");
    // setTimeout(() => {
    //     setPromptHistory([
    //         ...promptHistory,
    //         {
    //             bot: true,
    //             text: "this is reponse for above pormpt"
    //         }
    //     ]);
    // }, 2000);
  };

  const generateResponse = (e) => {
    e.preventDefault();
    const newMessage = {
      msg: prompt,
      sender: authState?.myAuthUser?.name,
      time: Date.now(),
    };
    setMessages([...messages, newMessage]);
    setPrompt("");
    addMessageToChat(newMessage);
  };

  useEffect(() => {
    if (promptBoxEL.current)
      promptBoxEL.current.scrollTop = promptBoxEL.current.scrollHeight;
  }, [messages]);

  const fetchData = async () => {
    const result = await fetch(`${api_url}/chat/chat?chatId=${chat._id}`, {
      method: "Get",
      headers: {
        Authorization: `Bearer ${authState?.myAuthUser?.token}`,
        "Content-Type": "application/json",
      },
    });
    const response = await result.json();
    if (result.status === 200) {
      if (authState?.myAuthUser?.type == "client") {
        setUser(response.chat.lawyer);
      } else {
        setUser(response.chat.client);
      }
      setMessages(response.chat.messages);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(response.resultMessage.en, toastConfig);
    }
  };

  useEffect(() => {
    fetchData();

    const msgInterval = setInterval(async () => {
      const result = await fetch(
        `${api_url}/chat/get-messages?chatId=${chat._id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState?.myAuthUser?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const response = await result.json();
      if (result.status === 200) {
        setMessages(response.messages);
      }
    }, 4000);
    // clear out the interval using the id when unmounting the component
    return () => clearInterval(msgInterval);
  }, []);

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <Container>
          {loading ? (
            <LargeSpinner />
          ) : (
            <div className="prompt-outputs-box" ref={promptBoxEL}>
              <ChatHeader
                name={user.name}
                status="Online"
                photoUrl={user.photoUrl}
              />
              {messages?.map((data, index) => (
                <div key={index} className="prompt-outputs p-3">
                  <Row>
                    <Col>
                      <strong>{data.sender}</strong>
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <CopyToClipboard text={data.msg}>
                        <button className={"btn btn-primary px-3 py-1"}>
                          <i className="las la-copy"></i>
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
                  {/* <Button
                type="button"
                style={{ width: "65px", height: "35px", marginLeft: "10px" }}
                onClick={reGenerateResponse}
                disabled={!generated}
                className="bg-transparent align-self-end p-0 text-dark"
              >
                <i classNameye="las la-sync-alt"></i>
              </Button> */}
                </form>
              </div>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

export default LawyerClientChat;
