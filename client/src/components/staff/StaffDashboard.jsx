import React, { useState } from "react";
import AvailableAssets from "../common/AvailableAssets";
import MyAssets from "../common/MyAssets";
import MyRequests from "../common/MyRequests";
import Profile from "../common/Profile";
import Notifications from "../common/Notifications";
import profilePic from "../../assets/download.jpg";

const StaffDashboard = () => {
  const [display, setDisplay] = useState("dashboard");
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
      component: AvailableAssets,
    },
    {
      id: "myAssets",
      label: "My Assets",
      path: "/my-assets",
      component: MyAssets,
    },
    {
      id: "myRequests",
      label: "My Requests",
      path: "/my-requests",
      component: MyRequests,
    },
    {
      id: "profile",
      label: "My Profile",
      path: "/profile/:id",
      component: Profile,
    },
    {
      id: "notifications",
      label: "Notification",
      path: "/notification",
      component: Notifications,
    },
  ];
  return (
    <>
      <nav id="side-nav" className="side-nav">
        <ul>
          <li key="profile">
            <label data-tooltip="Click to see profile" className="tooltip-top">
              <img className="profile" src={profilePic} alt="profile pic" />
            </label>
          </li>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className="button-black"
                onClick={(event) => {
                  event.stopPropagation();
                  setDisplay(item.id);
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main id="main-content">
        <h1>Click in an Asset to request</h1>
        {display !== "profile" && (
          <div className="bottom">
            {display === "dashboard" && <AvailableAssets />}
            {display === "myAssets" && <MyAssets />}
            {display === "myRequests" && <MyRequests />}
            {display === "notifications" && <Notifications />}
          </div>
        )}
      </main>
      {display === "profile" && <Profile />}
    </>
  );
};

export default StaffDashboard;
