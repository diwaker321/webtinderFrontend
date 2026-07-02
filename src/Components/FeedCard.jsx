import React from "react";
import feedusericon from "../assets/feedusericon.png"
import axios from "axios"
import { BASE_URL } from "../utils/constant";

const FeedCard = ({ data }) => {

  const handleConnectionRequest=async(status)=>{
    try{
      const res = await axios.post(BASE_URL + "/connectionRequest/send/" + status +"/" + data?._id,{},{withCredentials:true})
    }catch(err){
      console.log('err: ', err.message);

    }

  }
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure className="bg-amber-100">
          <img
            src={data?.photoURL || feedusericon}
            className="w-70 "
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
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
