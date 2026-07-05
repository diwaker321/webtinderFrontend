import React, { useRef, useState } from "react";
import loginIMage from "../assets/loginimage.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant"

const Login = () => {
  const email = useRef();
  const password = useRef();
  const firstname = useRef();
  const lastname = useRef();

  const [logindata, setlogindata] = useState();
  const [erromsg, setErrormsg] = useState("")
  const [signupPage, setSignUpPage] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (signupPage) {
        const response = await axios.post(BASE_URL + "/signup", { emailID: email.current.value, password: password.current.value, firstname: firstname.current.value, lastname: lastname.current.value }, { withCredentials: true })
        console.log(response);
        dispatch(addUser(response?.data?.data));


        navigate("/profile")

      } else {
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
      }
    } catch (err) {
      setErrormsg(err?.response?.data)
    }
  };

  const handleSignup = () => {
    setSignUpPage(!signupPage)
    console.log(signupPage);


  }
  return (
    <div className="loginContainer flex justify-center item-center p-10">
      <div className="card card-side bg-base-100 shadow-sm">
        <div className="imgDiv w-5/11">
          <figure>
            <img className="w-100 h-100" src={loginIMage} alt="Movie" />
          </figure>
        </div>
        <div className="card-body w-6/11">
          <h2 className="card-title text-2xl">Please Login!</h2>
          {signupPage && (
            <>
              <legend className="fieldset-legend mt-5 p-0">
                Enter your FirstName
              </legend>
              <input
                ref={firstname}
                type="text"
                className="input"
                placeholder="Your Firstname..."
              />

              <legend className="fieldset-legend mt-5 p-0">
                Enter your Lastname
              </legend>
              <input
                ref={lastname}
                type="text"
                className="input"
                placeholder="Your Lastname..."
              />

            </>
          )}
          <legend className="fieldset-legend mt-5 p-0">
            Enter your Email
          </legend>
          <input
            ref={email}
            type="text"
            className="input"
            placeholder="Your Mail id..."
          />

          <legend className="fieldset-legend mt-5 p-0">
            Enter your Password
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
              {signupPage ? "Signup" : "Login"}
            </button>
            <p className="">
              {signupPage ? (

                <>
                  Existing User?{" "}
                  <span
                    className="cursor-pointer underline text-info"
                    onClick={handleSignup}
                  >
                    Login Here
                  </span>
                </>
              ) : (
                <>
                  Don't have an Account?{" "}
                  <span
                    className="cursor-pointer underline text-info"
                    onClick={handleSignup}
                  >
                    Register
                  </span>
                </>

              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
