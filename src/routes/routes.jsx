import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Banner from "../pages/Banner";
import Event from "../pages/Event";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // {
      //   path: "/",
      //   element: <App />,
      // },
      {
        path: "banner",
        element:<Banner></Banner>,
      },
      {
        path: "event",
        element: <Event></Event>,
      },
    ],
  },
]);
export default router;
