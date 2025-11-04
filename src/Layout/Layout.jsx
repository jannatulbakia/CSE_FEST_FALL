import React from "react";
import Navbar from "../Components/Navabr/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Chatbot from "../Components/Chabot/Chatbot";


const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Chatbot></Chatbot>
    </div>
  );
};

export default Layout;
