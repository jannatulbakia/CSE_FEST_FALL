import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

const UserLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-emerald-600 to-green-600 text-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 flex flex-col`}>
        <div className="flex flex-col h-full">
          {/* Mobile Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition duration-200"
          >
            <FaTimes className="text-2xl" />
          </button>

          {/* Sidebar Header */}
          <div className="pt-16 lg:pt-24 px-8 pb-8">
            <h1 className="text-3xl font-bold tracking-wide">User Dashboard</h1>
            <div className="w-16 h-1 bg-white/50 mt-3 rounded-full"></div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center px-4 py-3 rounded-xl hover:bg-white/10 transition duration-200 text-white/90 hover:text-white font-medium"
                >
                  <span className="mr-3">🏠</span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/manage-volunteer"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center px-4 py-3 rounded-xl hover:bg-white/10 transition duration-200 text-white/90 hover:text-white font-medium"
                >
                  <span className="mr-3">🤝</span>
                  Volunteer Management
                </Link>
              </li>
              <li>
                <Link
                to="/admin/manage-event"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition duration-200 font-medium"
              >
                <span className="mr-2">🍎</span>
                Event Manager
              </Link>
              </li>
              <li>
                <Link
                  to="/admin/monitor-activity"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center px-4 py-3 rounded-xl hover:bg-white/10 transition duration-200 text-white/90 hover:text-white font-medium"
                >
                  <span className="mr-3">📊</span>
                  Activity
                </Link>
              </li>
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-3 bg-white/20 hover:bg-white/30 rounded-xl transition duration-200 font-medium backdrop-blur-sm"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md z-10">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-emerald-50 rounded-lg transition duration-200"
            >
              <FaBars className="text-2xl text-emerald-600" />
            </button>

            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Shastho Bondhu Oragnizer Area
            </h2>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:shadow-lg hover:scale-105 transform transition duration-200 font-medium text-sm sm:text-base"
            >
              <FaSignOutAlt className="mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Mobile Navigation */}
        <nav className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 overflow-x-auto">
          <ul className="flex space-x-4 whitespace-nowrap">
            <li>
              <Link
                to="/admin"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition duration-200 font-medium"
              >
                <span className="mr-2">🏠</span>
                Home
              </Link>
            </li>
            <li>
              <Link
                  to="/admin/manage-volunteer"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center px-4 py-3 rounded-xl hover:bg-white/10 transition duration-200 text-white/90 hover:text-white font-medium"
                >
                  <span className="mr-3">🤝</span>
                  Volunteer Management
                </Link>
            </li>
            <li>
              <Link
                to="/admin/manage-event"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition duration-200 font-medium"
              >
                <span className="mr-2">🍎</span>
                Event Manager
              </Link>
            </li>
            <li>
              <Link
                to="/admin/monitor-activity"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition duration-200 font-medium"
              >
                <span className="mr-2">📊</span>
                Activity
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;