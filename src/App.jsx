
import Head from "./Components/Head";
import { Outlet } from "react-router-dom";
function App() {

  return (
    <>
    <Head/>
    <Outlet/>
      
    </>
  );
}

export default App;
