import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnectionData } from "../Store/connectionSlice";
import FeedCard from "./FeedCard";

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
    <div className="flex flex-wrap gap-4 p-10">
      {Conncetion?.map(res=> <FeedCard data={res} />)}
    </div>
    </>
  );
};

export default Connections;
