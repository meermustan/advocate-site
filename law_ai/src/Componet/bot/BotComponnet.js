import React, { useEffect, useState, useRef } from "react";
import { Button, Col, Container, Image, Row } from "reactstrap";
import moment from "moment";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ChatHeader from "./ChatHeader";

function BotComponent() {
  const promptBoxEL = useRef();
  const [prompt, setPrompt] = useState("");
  const [generated, setGenerated] = useState(false);
  const [promptHistory, setPromptHistory] = useState([
    {
      bot: true,
      text: "Provide me data about your case.   (مجھے اپنے کیس کے بارے میں ڈیٹا فراہم کریں۔)",
    },
  ]);

  const generateResponse = (e) => {
    e.preventDefault();
    setGenerated(true);
    setPromptHistory([
      ...promptHistory,
      {
        bot: false,
        text: prompt,
      },
    ]);
    setPrompt("");
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

  const reGenerateResponse = () => {
    setPromptHistory([
      ...promptHistory,
      {
        bot: true,
        text: "this is regenrated reponse for above pormpt",
      },
    ]);
  };

  useEffect(() => {
    if (promptBoxEL.current)
      promptBoxEL.current.scrollTop = promptBoxEL.current.scrollHeight;
  }, [promptHistory]);

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <Container>
          <div>
            <div className="prompt-outputs-box" ref={promptBoxEL}>
              <ChatHeader
                name="Jarvis"
                status="Online"
                photoUrl={require("../../assets/images/favicon.png")}
              />
              {promptHistory.map((data, index) => (
                <div className="prompt-outputs p-3">
                  <Row>
                    <Col>
                      <strong> {data.bot ? "Jarvis :" : "You :"}</strong>
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <CopyToClipboard text={data.text}>
                        <button className={"btn btn-primary px-3 py-1"}>
                          <i className="las la-copy"></i>
                        </button>
                      </CopyToClipboard>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p style={{ fontSize: "13px" }}>{data.text}</p>
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
                <i className="las la-sync-alt"></i>
              </Button> */}
                  </form>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default BotComponent;
