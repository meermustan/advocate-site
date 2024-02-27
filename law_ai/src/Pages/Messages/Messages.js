import React, { useState, useEffect, useRef } from "react";
import moment from "moment/moment";
import { useLocation } from "react-router-dom";
import HerosectionHeader from "../../Componet/Herosection/HerosectionHeader";
import { Button, Col, Row } from "reactstrap";
import ChatList from "./ChatList";
import MessageList from "./MessageList";
import { useCookies } from "react-cookie";
import LargeSpinner from "../../Componet/Spinners/LargeSpinner";
import { toast } from "react-toastify";
import ChatHeader from "../../Componet/bot/ChatHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  setChats,
  setActiveChat,
  addMessage,
} from "../../store/reducer/chatReducer";
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

const Messages = () => {
  const dispatch = useDispatch();
  const { chats, activeChat } = useSelector((state) => state?.chat);
  const { state } = useLocation();
  const messageEl = useRef();
  const [authState] = useCookies(["myAuthUser"]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [chatType, setChatType] = useState();
  const api_url = process.env.REACT_APP_API_URL;

  const handleChangeChat = (chatId) => {
    dispatch(
      setActiveChat({
        chatId: chatId,
        type: authState?.myAuthUser?.type,
      })
    );
    updateStatus(chatId);
  };

  const updateStatus = async (chatId) => {
    fetch(`${api_url}/chat/update-status?chatId=${chatId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.myAuthUser?.token}`,
        "Content-Type": "application/json",
      },
    });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const message = {
      msg: newMessage,
      sender: authState?.myAuthUser?._id,
      time: Date.now(),
    };
    dispatch(addMessage({ message, chatId: activeChat._id }));

    fetch(`${api_url}/chat/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.myAuthUser?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatId: activeChat?._id, message }),
    });
    setNewMessage("");
  };

  const getChats = async () => {
    const result = await fetch(`${api_url}/chat/chats`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authState?.myAuthUser?.token}`,
        "Content-Type": "application/json",
      },
    });
    const response = await result.json();
    if (result.status === 200) {
      const chatRooms = response.chatRooms.reverse();
      dispatch(setChats(chatRooms));
      dispatch(
        setActiveChat({
          chatId: chatRooms[0]?._id,
          type: authState?.myAuthUser?.type,
        })
      );
    } else {
      toast.error(response.resultMessage.en, toastConfig);
    }
  };

  const getOrCreateChatRoom = async ({ job, user }) => {
    const result = await fetch(`${api_url}/chat/create-chat`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState?.myAuthUser?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ job, user }),
    });
    const response = await result.json();
    if (result.status === 200) {
      const chatRooms = response.chatRooms.reverse();
      dispatch(setChats(chatRooms));
      dispatch(
        setActiveChat({
          chatId: chatRooms[0]?._id,
          type: authState?.myAuthUser?.type,
        })
      );
    } else {
      toast.error(response.resultMessage.en, toastConfig);
    }
  };

  useEffect(() => {
    if (state && state.job) {
      getOrCreateChatRoom(state);
    } else {
      getChats();
    }
    setChatType(authState?.myAuthUser?.type == "client" ? "lawyer" : "client");
    setLoading(false);
  }, []);

  useEffect(() => {
    if (messageEl.current)
      messageEl.current.scrollTop = messageEl.current.scrollHeight;
  }, [activeChat]);

  return (
    <>
      <HerosectionHeader name={"Messages"} />
      <div className="page-content">
        <div className="messages-layout">
          <Row className="messages-body">
            <Col xl={4} className="messages-left p-0">
              <div className="court-rooms">
                {/* <div className="input-group">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </div> */}
                {!loading ? (
                  <ChatList
                    chatType={chatType}
                    unreadType={`${authState?.myAuthUser?.type}Unread`}
                    chatList={chats}
                    changeChat={(id) => handleChangeChat(id)}
                  />
                ) : (
                  <LargeSpinner />
                )}
              </div>
            </Col>
            <Col className="p-0 m-0" xl={8}>
              {loading ? (
                <LargeSpinner />
              ) : activeChat ? (
                <div className="messages-right" ref={messageEl}>
                  <ChatHeader
                    name={activeChat[chatType]?.name}
                    photoUrl={activeChat[chatType]?.photoUrl}
                  />
                  <MessageList
                    me={authState?.myAuthUser}
                    other={activeChat[chatType]}
                    messages={activeChat?.messages}
                  />
                  <div className="chat-footer">
                    <form className="row g-0" onSubmit={handleSendMessage}>
                      <input
                        className="form-control col mx-3"
                        type="search"
                        required
                        value={newMessage}
                        onChange={(e) => {
                          setNewMessage(e.target.value);
                        }}
                        placeholder="ask me any think i can help you with.."
                        aria-label="Search"
                      />
                      <Button
                        type="submit"
                        style={{ width: "65px", height: "35px" }}
                        disabled={newMessage === ""}
                        className="bg-transparent align-self-end p-0 text-dark"
                      >
                        <i className="las la-paper-plane"></i>
                      </Button>
                    </form>
                  </div>
                </div>
              ) : (
                <h3 className="text-center mt-5 pt-5">No chats found..</h3>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Messages;
