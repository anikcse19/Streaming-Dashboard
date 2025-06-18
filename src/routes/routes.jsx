import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Banner from "../pages/Banner";
import Event from "../pages/Event";
import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // {
      //   path: "/",
      //   element: <App />,
      // },
      {
        path: "banner",
        element: <Banner></Banner>,
      },
      {
        path: "event",
        element: <Event></Event>,
      },
    ],
  },
]);
export default router;
