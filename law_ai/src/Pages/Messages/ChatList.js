import moment from "moment";
const ChatList = ({ chatList, changeChat,unreadType, chatType }) => {
  return (
    <>
      {chatList.map((chat, index) => (
        <div
          className="p-2 chat-item"
          key={index}
          onClick={() => changeChat(chat._id)}
        >
          <div className="d-flex flex-row">
            <div className="d-flex align-self-center me-3">
              <div
                style={{ width: "50px", height: "50px", position: "relative" }}
              >
                <img
                  src={chat[chatType].photoUrl}
                  alt="avatar"
                  className=""
                  width="50px"
                  style={
                    chat[unreadType]
                      ? { borderRadius: "50px", border: `2px solid red` }
                      : { borderRadius: "50px", border: `2px solid gray` }
                  }
                  height="50px"
                />
                {/* <div className="status-circle bg-primary"></div> */}
              </div>
            </div>
            <div className="w-100">
              <div className="d-flex justify-content-between">
                <p className="fw-bold mb-0">{chat[chatType].name}</p>
                <p className="small mb-1">
                  {moment(
                    chat.messages[chat.messages.length - 1]?.time
                  ).fromNow()}
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <p className="mb-0" style={{ fontWeight: "600" }}>
                    {chat.job.title}
                  </p>
                  <p
                    className="small mb-0"
                    style={
                      chat[unreadType]
                        ? { "font-style": "italic" }
                        : { "font-style": "normal" }
                    }
                  >
                    {chat.messages[chat.messages.length - 1]?.msg}
                  </p>
                </div>
                <div>
                  {/* <span className="badge bg-primary rounded-pill">3</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatList;
