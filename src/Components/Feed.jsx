import axios from 'axios'
import React, { useEffect } from 'react'
// import BASE_URL from "../utils/constant"
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../Store/userSlice'
import { useNavigate } from 'react-router-dom'
import { addFeed } from '../Store/feedSlice'
import FeedCard from './FeedCard'

const Feed = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(store=>store?.user)
  const feedCards = useSelector(store=>store?.feed)
  console.log('feedCards: ', feedCards);

  // const getProfile = async()=>{
  //   try{
  //     const response =await axios.get(BASE_URL+"/profile/view",{withCredentials:true})
  //     dispatch(addUser(response?.data))
  //   }catch(err){
  //     if(err.status == '401') {
  //       navigate("/")
  //     }
      
  //   }
  // }

  const getFeedData = async()=>{
    const res = await axios.get(BASE_URL + "/user/feed" , {withCredentials:true})
    dispatch(addFeed(res.data))
  }

  useEffect(()=>{
      // getProfile()
      getFeedData()
    
  },[])

  return (
    <div className='flex gap-3 flex-wrap justify-center items-center py-5'>
    {feedCards?.map(res=> <FeedCard data ={res}/>)}
    </div>
  )
}

export default Feed
