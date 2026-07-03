import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addReqData, filterReqData } from "../Store/requestSlice";
import FeedCard from "./FeedCard";
import feedusericon from "../assets/feedusericon.png";

const Request = () => {
  const dispatch = useDispatch();
  const requestData = useSelector((store) => store.requestData);
  console.log("requestData: ", requestData);
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

  const handleConnectionRequest = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        { withCredentials: true },
      );
      console.log("res: ", res);
      const toUserID = res?.data?.data?._id;

      const filterdata = requestData.filter((res) => res._id !== toUserID);
      console.log("filterdata: ", filterdata);
      dispatch(filterReqData(filterdata));
    } catch (err) {
      console.log("err: ", err.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (requestData?.length == 0) return (<>
    <h1 className="font-semibold text-center p-5 text-4xl">
      Connection Section
    </h1>
    {/* <h1>No Request Connection Found</h1> */}
  </>
  );
  return (
    <>
      <h1 className="font-semibold text-center pt-5 text-4xl">
        Request Section
      </h1>
      <div className="flex gap-4 p-10 justify-center flex-wrap">
        {requestData?.map((res) => {
          const { about, firstname, lastname, photoURL } = res?.fromUserID;
          return (
            <>
              <div className=" card bg-base-100 w-96 shadow-sm">
                <figure className="bg-amber-100">
                  <img
                    src={photoURL || feedusericon}
                    className="w-70 "
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{`${firstname} ${lastname}`}</h2>
                  <p>{about}</p>
                  <div className="card-actions justify-center gap-5 flex">
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        handleConnectionRequest("rejected", res?._id)
                      }
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleConnectionRequest("accepted", res?._id)
                      }
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Request;
