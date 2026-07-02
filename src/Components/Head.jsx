import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../Store/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const Head = () => {
    const Username = useSelector(store=>store?.user?.firstname)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout =async ()=>{
      try{
        const res = await axios.post(BASE_URL+"/logout" ,{}, {withCredentials:true})
        dispatch(removeUser())
        navigate("/")
      }catch(err){
        console.error(err.message);
        
      }

      
    }
  return (
    <>
      <div className="navbar bg-primary-content px-5 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Dev Tinder</a>
        </div>
        {Username && (
          <>
        <div className="flex gap-2">
          <div className="dropdown dropdown-end flex items-center gap-4">
            {Username && <p>Hello {Username}</p>}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu absolute top-7.5 menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"}  className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <Link to="/connections">
              <li>
              
                Connections
              
              </li>
              </Link>
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
          </>
        )}
      </div>
    </>
  );
};

export default Head;

