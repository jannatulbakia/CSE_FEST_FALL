import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Components/Home/Home";
import About from "../Components/About/About";
import HealthCheckIn from "../Components/HealthCheckIn/HealthCheckIn";
import Signup from "../Components/Signup/Signup";
import Login from "../Components/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/mental-health-checkin",
        element: <HealthCheckIn/>,
      },
      {
        path: "/signup",
        element: <Signup/>,

      },
      {
        path: "/login",
        element: <Login/>,
      }
    ],
  },
]);
