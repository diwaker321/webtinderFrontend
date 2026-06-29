import Head from "./Components/Head";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { addUser } from "./Store/userSlice";
import { useEffect } from "react";
import { BASE_URL } from "./utils/constant";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const getProfile = async () => {
    try {
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(response?.data));
    } catch (err) {
      if (err.status == "401") {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Head />
      <Outlet />
    </>
  );
}

export default App;
