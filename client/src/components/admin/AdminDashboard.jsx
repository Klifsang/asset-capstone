import React, { useState } from "react";
import AvailableAssets from "../common/AvailableAssets";
import MyAssets from "../common/MyAssets";
import AllRequests from "./AllRequests";
import MyRequests from "../common/MyRequests";
import Profile from "../common/Profile";
import Notifications from "../common/Notifications";
import profilePic from "../../assets/download.jpg";
import Staff from "./Staff";
import AddNewAsset from "./AddNewAsset";

const AdminDashboard = () => {
  const [display, setDisplay] = useState("dashboard");
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
      component: AvailableAssets,
    },
    { id: "users", label: "Staff", path: "/staff", component: Staff },
    {
      id: "myAssets",
      label: "My Assets",
      path: "/my-assets",
      component: MyAssets,
    },
    {
      id: "addAssets",
      label: "Add Assets",
      path: "/addnewasset",
      component: AddNewAsset,
    },
    {
      id: "requests",
      label: "All Requests",
      path: "/requests",
      component: AllRequests,
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
        <div className="bottom">
          {display === "dashboard" && <AvailableAssets />}
          {display === "users" && <Staff />}
          {display === "myAssets" && <MyAssets />}
          {display === "addAssets" && <AddNewAsset />}
          {display === "requests" && <AllRequests />}
          {display === "myRequests" && <MyRequests />}
          {display === "notifications" && <Notifications />}
        </div>
      </main>
      {display === "profile" && <Profile />}
    </>
  );
};

export default AdminDashboard;
