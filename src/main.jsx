import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, BrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./Components/Body.jsx";
import Profile from "./Components/Profile.jsx";
import Feed from "./Components/Feed.jsx";
import {Provider} from "react-redux"
import appStore from "./Store/appStore";
import Connections from "./Components/Connections.jsx";
import Request from "./Components/Request.jsx";
import ChatUi from "./Components/ChatUi.jsx";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path:"/feed",
        element:<Feed/>
      },
      {
        path:"/connections",
        element:<Connections/>
      },
      {
        path:"/request",
        element:<Request/>
      },
      {
        path:"/chat/:fromUserId/:toUserId",
        element:<ChatUi/>
      }
    ],
  },
]);

// createRoot(document.getElementById("root")).render(<App />);
createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter} />
  </Provider>
);

