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
import AdminLayout from "../Layout/AdminLayout";
import Events from "../Components/Events/Events";
import EventDetails from "../Components/Events/EventDetails";
import EventManager from "../Components/Admin/EventManager/EventManager";
import Volunteers from "../Components/Volunteers/Volunteers";

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
        element: <AnonymousHelp />,
      },
      {
        path: "/mental-health-checkin",
        element: <HealthCheckIn />,
      },
      {
        path: "/community-map",
        element: <CommunityMap />,
      },
      {
        path: "/signup",
        element: <Signup />,

      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/health-tips",
        element: <HealthTipsApp></HealthTipsApp>
      },
      {
        path: "/symptoms",
        element: <Symptops></Symptops>
      },
      {
        path: "/event",
        element: <Events />,
      },
      {
        path: "/voluenteer",
        element: <Volunteers />,
      },
      {
        path: "/event/:id",
        element: <EventDetails />,
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            path: "/admin/manage-event",
            element: <EventManager />,
          },

        ]
      },
    ],
  },
]);