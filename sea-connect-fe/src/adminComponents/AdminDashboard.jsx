import React, { useContext } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import {
  Users,
  Calendar,
  CreditCard,
  Vote,
  Home,
  FileUp,
  Bell,
  MessageCircle,
  LogOut
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Members', path: '/admin/members-management', icon: Users },
    { name: 'Events', path: '/admin/events-management', icon: Calendar },
    { name: 'Cotisations', path: '/admin/plans-management', icon: CreditCard },
    { name: 'Votes', path: '/admin/votes-management', icon: Vote },
    { name: 'Assemblies', path: '/admin/assemblies-management', icon: Home },
    { name: 'GED', path: '/admin/files-management', icon: FileUp },
    { name: 'Send Notification', path: '/admin/send-notification', icon: Bell },
    { name: 'Start Discussion', path: '/admin/start-discussion', icon: MessageCircle },
    { name: 'Discussions', path: '/admin/discussions', icon: MessageCircle },
  ];

  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  return (
    <main className="flex">
      <div className="bg-gray-900 fixed sm:w-60 min-h-screen w-14 pt-4 transition-all">
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="text-white cursor-pointer text-center text-3xl font-bold"
          >
            SeaConnect.
          </button>
        </div>
        <ul className="mt-11">
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => navigate(item.path)}
              className="hover:bg-gray-800 cursor-pointer sm:justify-start px-4 h-12 flex items-center justify-center gap-1 active"
            >
              <item.icon className="w-6 h-6 text-white" />
              <span className="ml-3 hidden sm:block text-gray-400 font-semibold tracking-wide hover:text-white transition-colors">
                {item.name}
              </span>
            </li>
          ))}
          <li
            onClick={logoutHandler}
            className="hover:bg-gray-800 cursor-pointer sm:justify-start px-4 h-12 flex items-center justify-center"
          >
            <LogOut className="w-6 h-6 text-white" />
            <span className="ml-3 hidden sm:block text-gray-400 font-semibold tracking-wide hover:text-white transition-colors">
              Logout
            </span>
          </li>
        </ul>
      </div>
      <section className="flex-1">
        {user ? (
          <Outlet />
        ) : (
          <div className="w[80%] ml-auto flex items-center justify-center flex-col text-4xl mt-8 gap-4">
            <h2>You are not an admin</h2>
            <button
              className="px-6 py-2.5 text-sm font-medium text-white uppercase transition duration-200 ease-in-out bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:bg-red-700 focus:outline-none focus:ring-0 active:bg-red-800"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default AdminDashboard;