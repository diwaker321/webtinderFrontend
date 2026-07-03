import React, { useEffect, useState } from "react";
import axios from "axios";
import feedusericon from "../assets/feedusericon.png";
import { BASE_URL } from "../utils/constant";
import { useSelector } from "react-redux";

const Profile = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setage] = useState("");

  const [about, setAbout] = useState("");
  const [gender, setGender] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [skills, setSkills] = useState("");
  const [erromsg, setErrormsg] = useState("");
  const userData = useSelector((store) => store.user);
  console.log("userData: ", userData);
  const EditProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstname: firstname,
          lastname: lastname,
          gender: gender,
          age: age,
          skills: skills.split(","),
          about: about,
          photoURL: photoURL,
        },
        { withCredentials: true },
      );
      console.log("res: ", res?.data);
    } catch (err) {
      console.log("err: ", err.message);
    }
  };
  useEffect(() => {
    // EditProfile();
  }, []);

  useEffect(() => {
    if (userData) {
      setFirstname(userData.firstname);
      setLastname(userData.lastname);
      setAbout(userData.about);
      setGender(userData.gender);
      setPhotoURL(userData.photoURL || "");
      setSkills(userData.skills?.join(", ") || "");
      setage(userData?.age ?? "")
    }
  }, [userData]);
  return (
    <div className="flex gap-10 p-10">
      <div className="card-body w-6/11 rounded-xl  bg-gray-200">
        <h2 className="card-title text-2xl">Edit Your Profile!</h2>
        <div className="flex gap-3">
          <input
            type="text"
            className="input"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="text"
            className="input"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>

        <div className="flex gap-3 items-center">
          <textarea
            className="textarea"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="select"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            className="input"
            placeholder="Skills (React, Node, MongoDB)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <input
            type="text"
            className="input"
            placeholder="Photo URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />

          <input
            type="number"
            className="input"
            placeholder="Your Age"
            value={age}
            onChange={(e) => setage(e.target.value)}
          />
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
        <div className="card bg-base-100 w-90 shadow-sm">
          <figure className="h-80 w-full overflow-hidden rounded-md">
            <img
              src={photoURL || feedusericon}
              className="w-full h-full object-cover"
              alt="UserImage"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {firstname} {lastname}
            </h2>
            <p>{about}</p>
            <div className="card-actions justify-center gap-5 flex">
              {/* <button className="btn btn-secondary">Ignored</button>
              <button className="btn btn-primary">Interested</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
