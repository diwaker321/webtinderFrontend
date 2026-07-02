import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addReqData } from "../Store/requestSlice";
import FeedCard from "./FeedCard";

const Request = () => {
  const dispatch = useDispatch();
  const requestData = useSelector((store) => store.requestData);
  const getData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/pendingRequest", {
        withCredentials: true,
      });
      dispatch(addReqData(res?.data?.data));
    } catch (err) {
      console.log("err: ", err.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (requestData?.length == 0) return <h1>empty</h1>;
  return (
    <>
      <h1 className="font-semibold text-center pt-5 text-4xl">
        Request Section
      </h1>
      <div className="requestSection flex flex-wrap justify-around p-10">
        {requestData?.map((res) => (
          <FeedCard data={res?.fromUserID} />
        ))}
      </div>
    </>
  );
};

export default Request;
