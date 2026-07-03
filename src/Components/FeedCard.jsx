import React from "react";
import feedusericon from "../assets/feedusericon.png"
import axios from "axios"
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { filterFeed } from "../Store/feedSlice";

const FeedCard = ({ data }) => {
  const dispatch = useDispatch()
  const feedData = useSelector(store=>store.feed)

  const handleConnectionRequest=async(status)=>{
    try{
      const res = await axios.post(BASE_URL + "/connectionRequest/send/" + status +"/" + data?._id,{},{withCredentials:true})
      const toUserID = res?.data?.data?.toUserID;
      const filterdata = feedData.filter(res=>res._id!==toUserID)
      dispatch(filterFeed(filterdata))

    }catch(err){
      console.log('err: ', err.message);

    }

  }
  return (
    <>
      <div className="card bg-base-100 w-80 overflow-hidden shadow-sm">
          <figure className="h-70 w-80 overflow-hidden rounded-md">
            <img
              src={data?.photoURL || feedusericon}
              className="w-full h-full object-cover"
              alt="UserImage"
            />
          </figure>
        <div className="card-body bg-base-300">
          <h2 className="card-title">{`${data?.firstname} ${data?.lastname}`}</h2>
          <p>
          {data?.about}
          </p>
          <div className="card-actions justify-center gap-5 flex">
            <button className="btn btn-secondary" onClick={()=>handleConnectionRequest('ignored')}>Ignored</button>
            <button className="btn btn-primary" onClick={()=>handleConnectionRequest('interested')}>Interested</button>

          </div>
        </div>
      </div>
    </> 
  );
};

export default FeedCard;
