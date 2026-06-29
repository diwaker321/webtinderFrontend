import React, { useRef, useState } from "react";
import loginIMage from "../assets/loginimage.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Store/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const [logindata, setlogindata] = useState();
  const [erromsg , setErrormsg] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          emailID: email.current.value,
          password: password.current.value,
        },
        { withCredentials: true },
      );
      console.log(response.data);

      dispatch(addUser(response?.data));
      navigate("/feed");
    } catch (err) {
      setErrormsg(err?.response?.data)
    }
  };
  return (
    <div className="loginContainer flex justify-center item-center mt-10">
      <div className="card card-side bg-base-100 shadow-sm">
        <div className="imgDiv w-5/11">
          <figure>
            <img className="w-100 h-100" src={loginIMage} alt="Movie" />
          </figure>
        </div>
        <div className="card-body w-6/11">
          <h2 className="card-title text-2xl">Please Login!</h2>
          <legend className="fieldset-legend mt-5 p-0">
            Enter your Email*
          </legend>
          <input
            ref={email}
            value={"teju@gmail.com"}
            type="text"
            className="input"
            placeholder="Your Mail id..."
          />

          <legend className="fieldset-legend mt-5 p-0">
            Enter your Password*
          </legend>
          <input
            ref={password}
            value={"Common@123"}
            type="password"
            className="input"
            placeholder="Your Password..."
          />
          <div className="card-actions flex items-center flex-col">
          <div>
          <p className="text-red-600 m-0 p-0">{erromsg}</p>
          </div>
            <button onClick={handleLogin} className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
