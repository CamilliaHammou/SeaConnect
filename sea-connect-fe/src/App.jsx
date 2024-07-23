import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./views/HomePage";
import Login from "./views/Auth/Login";
import Signup from "./views/Auth/Signup";
import AdminDashboard from "./adminComponents/AdminDashboard";
import MembersManagements from "./views/MembersManagements";
import EventsManagement from "./views/EventsManagement";
import EventsPage from "./views/Events";
import PlansManagement from "./views/PlansManagement";
import MembershipPlans from "./views/MembershipPlans";
import Contributions from "./views/Contributions";
import MyContributions from "./views/MyContributions";
import VotesManagementPage from "./views/VotesManagementPage";
import VotingPage from "./views/VotingPage";
import AssembliesManagement from "./views/AssembliesManagement";
import AssembliesPage from "./components/AssembliesPage";
import SendNotification from "./views/SendNotification";
import UserNotifications from "./views/UserNotifications";
import StartDiscussion from "./views/StartDiscussion";
import Discussions from "./views/Discussions";
import FileManagement from "./views/FileManagement";
import Header from "./components/Header";
import  WhoWeArePage from "./views/WhoarePage";
import NewsPage from "./views/News";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/WhoWeArePage" element={<WhoWeArePage/>} />
        <Route path="/News" element={<NewsPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/membership-plans" element={<MembershipPlans />} />
        <Route path="/contributions" element={<Contributions />} />
        <Route path="/my-contributions" element={<MyContributions />} />
        <Route path="/votes" element={<VotingPage />} />
        <Route path="/assemblies" element={<AssembliesPage />} />
        <Route
          path="/user-files"
          element={
            <>
              {" "}
              <Header />
              <div className="w-[80%] mx-auto  pr-5">
                <FileManagement />
              </div>
            </>
          }
        />

        <Route
          path="/user-notificattions"
          element={
            <>
              {" "}
              <Header />
              <div className="w-[80%] mx-auto  pr-5">
                <UserNotifications />
              </div>
            </>
          }
        />

        <Route
          path="/discussions"
          element={
            <>
              {" "}
              <Header />
              <div className="w-[80%] mx-auto  pr-5">
                <Discussions />
              </div>
            </>
          }
        />

        <Route path="/admin" element={<AdminDashboard />}>
          <Route
            path="/admin/members-management"
            element={<MembersManagements />}
          />
          <Route
            path="/admin/events-management"
            element={<EventsManagement />}
          />
          <Route
            path="/admin/votes-management"
            element={<VotesManagementPage />}
          />
          <Route path="/admin/plans-management" element={<PlansManagement />} />
          <Route
            path="/admin/files-management"
            element={
              <div className="w-[80%] ml-auto  pr-5">
                <FileManagement />
              </div>
            }
          />

          <Route
            path="/admin/assemblies-management"
            element={<AssembliesManagement />}
          />
          <Route
            path="/admin/send-notification"
            element={<SendNotification />}
          />

          <Route
            path="/admin/start-discussion"
            element={<StartDiscussion />}
          />

          <Route
            path="/admin/discussions"
            element={<Discussions />}
          />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
