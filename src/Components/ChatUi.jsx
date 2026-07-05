import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addConnectionData } from "../Store/connectionSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import feedusericon from "../assets/feedusericon.png"

const ChatUi = () => {
  const chatID = useParams();
  const connectionData = useSelector((store) => store.connectionData);
  const dispatch = useDispatch();

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

  const touserData = connectionData?.find(
    (res) =>
      res.fromUserID._id === chatID.toUserId ||
      res.toUserID._id === chatID.toUserId,
  );


  return (
    <div className="chatMainContainer bg-gray-300 p-10 flex justify-center">
      <div className="mockup-window border bg-white border-base-300 w-[80%]">
        <div className="  border-t border-base-300 h-80 p-5">
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={touserData?.toUserID?.photoURL || feedusericon}
                />
              </div>
            </div>
            <div className="chat-header">
              {touserData?.toUserID?.firstname + touserData?.toUserID?.lastname}
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble">You were the Chosen One!</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={touserData?.fromUserID?.photoURL || feedusericon}
                />
              </div>
            </div>
            <div className="chat-header">
              {touserData?.fromUserID?.firstname + touserData?.fromUserID?.lastname}
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble"><p>Good Morning</p></div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-5">
          <input
            type="text"
            placeholder="Type here"
            className="input w-11/12"
          />
          <button className="btn btn-soft w-1/12">Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatUi;
