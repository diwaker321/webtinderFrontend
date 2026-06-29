import React, { useEffect, useState } from "react";
import axios from "axios";
import feedusericon from "../assets/feedusericon.png";
import { BASE_URL } from "../utils/constant";
import { useSelector } from "react-redux";

const Profile = () => {
  const [erromsg, setErrormsg] = useState("");
  const userData = useSelector((store) => store.user);
  console.log("userData: ", userData);
  const EditProfile = async () => {
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit");
    } catch (err) {}
  };
  useEffect(() => {
    // EditProfile();
  }, []);
  return (
    <div className="flex gap-10 p-10">
      <div className="card-body w-6/11 rounded-xl  bg-gray-200">
        <h2 className="card-title text-2xl">Edit Your Profile!</h2>
        <div className="flex gap-3">
          <input type="text" className="input" placeholder="Your Firstname" />
          <input type="text" className="input" placeholder="Your Lastname" />
        </div>

        <div className="flex gap-3 items-center">
          <textarea
            className="textarea"
            placeholder="Your About Section"
          ></textarea>
          <select defaultValue="Your Gender" className="select">
            <option disabled={true}>Your Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </select>
        </div>

        <div className="flex gap-3">
          <input type="text" className="input" placeholder="Skills" />
          <input type="text" className="input" placeholder="Photo Url" />
        </div>
        <div className="card-actions flex items-center flex-col">
          <div>
            <p className="text-red-600 m-0 p-0">{erromsg}</p>
          </div>
          <button onClick={EditProfile} className="btn btn-primary">
            Save
          </button>
        </div>
      </div>

      <div className="card w-4/11">
        <div className="card bg-base-100 w-96 shadow-sm">
          <figure className="bg-amber-100">
            <img
              src={userData?.photoURL || feedusericon}
              className="w-70 "
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{`${userData?.firstname} ${userData?.lastname}`}</h2>
            <p>{userData?.about}</p>
            <div className="card-actions justify-center gap-5 flex">
              <button className="btn btn-secondary">Ignored</button>
              <button className="btn btn-primary">Interested</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
