import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Components/Home/Home";
import About from "../Components/About/About";
import HealthCheckIn from "../Components/HealthCheckIn/HealthCheckIn";
import Signup from "../Components/Signup/Signup";
import Login from "../Components/Login/Login";
import AnonymousHelp from "../Components/AnonymousHelp/AnonymousHelp";
import CommunityMap from "../Components/CommunityMap/CommunityMap";
import HealthTipsApp from "../Components/HealthTipsApp/HealthTipsApp";
import Symptops from "../Components/Symptoms/Symptops";

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
        path: "/anonymous-help",
        element: <AnonymousHelp/>,
      },
      {
        path: "/mental-health-checkin",
        element: <HealthCheckIn/>,
      },
      {
        path: "/community-map",
        element: <CommunityMap/>,
      },
      {
        path: "/signup",
        element: <Signup/>,

      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/health-tips",
        element: <HealthTipsApp></HealthTipsApp>
      },
      {
        path: "/symptoms",
        element: <Symptops></Symptops>
      },
    ],
  },
]);