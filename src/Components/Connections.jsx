import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnectionData } from "../Store/connectionSlice";
import FeedCard from "./FeedCard";
import feedusericon from "../assets/feedusericon.png"

const Connections = () => {
    const dispatch = useDispatch()
    const connectionData = useSelector(store=>store.connectionData)
    const loggedinUser = useSelector(store=>store.user)
    const getConnections = async()=>{
        try{
            const res =await axios.get(BASE_URL+"/user/connection",{withCredentials:true})
            dispatch(addConnectionData(res?.data?.data))


        }catch(err){
            console.log(err);
            
        }

    }
    useEffect(()=>{
        getConnections()
    },[])

    const Conncetion = connectionData?.map((res)=>{
        return loggedinUser._id===res.fromUserID._id ? res.toUserID : res.fromUserID
    })
    
    
  return (
    <>
    <h1 className="font-semibold text-center pt-5 text-4xl">
        Connection Section
      </h1>
    <div className="flex justify-center flex-wrap gap-4 p-10">
      {/* {Conncetion?.map(res=> <FeedCard data={res} />)} */}
      {Conncetion?.map((data)=>{
        return(
          <>
          <>
                <div className="card bg-base-100 w-80 overflow-hidden shadow-sm">
                  <figure className="h-70 w-80 overflow-hidden rounded-md">
                    <img
                      src={data?.photoURL || feedusericon}
                      className="w-full h-full object-cover "
                      alt="Shoes"
                    />
                  </figure>
                  <div className=" card-body bg-base-300">
                    <h2 className="card-title">{`${data?.firstname} ${data?.lastname}`}</h2>
                    <p>
                    {data?.about}
                    </p>
                  </div>
                </div>
              </>
          
          </>
        )
      })}

    </div>
    </>
  );
};

export default Connections;
