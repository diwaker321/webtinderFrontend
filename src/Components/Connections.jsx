import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnectionData } from "../Store/connectionSlice";
import FeedCard from "./FeedCard";
import feedusericon from "../assets/feedusericon.png"
import { Link } from "react-router-dom";


const Connections = () => {
  const dispatch = useDispatch();
  const connectionData = useSelector((store) => store.connectionData);
  const loggedinUser = useSelector((store) => store.user);
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

  const Conncetion = connectionData?.map((res) => {
    return loggedinUser._id === res.fromUserID._id
      ? res.toUserID
      : res.fromUserID;
  });

  return (
    <>
      <h1 className="font-semibold text-center pt-5 text-4xl">
        Connection Section
      </h1>
      <div className="flex flex-wrap flex-col items-center gap-4 p-10">
        {/* {Conncetion?.map(res=> <FeedCard data={res} />)} */}
        <ul className="list bg-base-100 rounded-box shadow-md w-[40%]">
          <li className="p-4 pb-2 text-md opacity-60 tracking-wide">
            Your Connections
          </li>

          {Conncetion?.map((user) => (
            <li key={user._id} className="list-row my-1 mx-2">
              <div>
                <img
                  className="size-16 rounded-full object-cover"
                  src={user.photoURL || feedusericon}
                  alt="User"
                />
              </div>

              <div>
                <div className="font-semibold text-lg">
                  {user.firstname} {user.lastname}
                </div>

                <div className="text-xs uppercase font-semibold opacity-60">
                  Connected User
                </div>
              </div>

              <p className="list-col-wrap text-sm">{user.about}</p>

             <Link to={`/chat/${loggedinUser?._id}/${user?._id}`}> <button className="btn btn-square btn-ghost">💬</button></Link>

              {/* <button className="btn btn-square btn-ghost">❌</button> */}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Connections;
