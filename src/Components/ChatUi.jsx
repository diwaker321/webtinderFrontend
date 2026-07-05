import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addConnectionData } from "../Store/connectionSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import feedusericon from "../assets/feedusericon.png";
import { createSocketConnection } from "../utils/socket";

const ChatUi = () => {
  const [textmsg, setTextmsg] = useState("");
  const [chatmsg, setChatmsg] = useState([]);
  const chatID = useParams();
  const { fromUserId, toUserId } = chatID;
  // console.log('chatID: ', chatID);
  const connectionData = useSelector((store) => store.connectionData);
  const dispatch = useDispatch();
  const loginuser = useSelector((store) => store.user);
  // console.log('loginuser: ', loginuser);

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      dispatch(addConnectionData(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);

  const handleMsgSend = () => {
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      FromUsername: loginuser.firstname,
      fromUserId,
      text: textmsg,
      toUserId,
    });
    setTextmsg("")
  };

  const touserData = connectionData?.find(
    (res) =>
      res.fromUserID._id === chatID.toUserId ||
      res.toUserID._id === chatID.toUserId,
  );

  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit("joinChat", { fromUserId, toUserId });

    socket.on("messageReceived", (data) => {
      console.log(data);
      setChatmsg((prevmsg) => [...prevmsg, data]);
      // console.log(chatmsg);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log(chatmsg);
  }, [chatmsg]);

  return (
    <div className="chatMainContainer bg-gray-300 p-10 flex justify-center">
      <div className="mockup-window border bg-white border-base-300 w-[80%]">
        <div className="  border-t border-base-300 h-80 p-5 overflow-y-auto">
          {chatmsg?.map((messageData) => {
            return (
              <>
                <div
                  className={
                    messageData.fromUserId === loginuser._id
                      ? "chat chat-end"
                      : "chat chat-start"
                  }
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={
                          messageData.fromUserId === loginuser._id
                            ? loginuser.photoURL || feedusericon
                            : touserData.photoURL || feedusericon
                        }
                      />
                    </div>
                  </div>
                  <div className="chat-header">{messageData.FromUsername}</div>

                  <div className="chat-bubble">{messageData.text}</div>

                  <div className="chat-footer opacity-50">Delivered</div>
                </div>
              </>
            );
          })}
        </div>
        <div className="flex items-center gap-2 p-5">
          <input
            value={textmsg}
            onChange={(e) => {
              setTextmsg(e.target.value);
            }}
            type="text"
            placeholder="Type here"
            className="input w-11/12"
          />
          <button className="btn btn-soft w-1/12" onClick={handleMsgSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUi;
