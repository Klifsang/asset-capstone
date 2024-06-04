import React, { useEffect, useState } from "react";
import HttpClient from "../../HttpClient";
import Celebrate from "./Celebrate";
import sadPic from "../../../public/pictures/declined.jpg";

const Collapsible = ({ title, children, onRead, id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
    handleReadClick()
  };

  const handleReadClick = () => {
    if (onRead) {
      onRead(id);
    }
  };

  return (
    <div className="collapsible">
      <div className="collapsible-header" onClick={toggle}>
        <h2>{title}</h2>
        <span>{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && (
        <div className="collapsible-content">
          {children}
        </div>
      )}
    </div>
  );
};

const Notifications = () => {
  const [notifs, setNotifs] = useState([]);

  const getNotifications = async () => {
    const response = await HttpClient.get(`/api/notifications`);
    console.log(response)
    setNotifs(response.data);
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const handleRead = async (key) => {
    console.log(key);
    const notificationId = parseInt(key);
    const response = await HttpClient.post(
      `/api/mark_as_read/${notificationId}`
    );
    getNotifications();
    console.log(response);
  };

  return (
    <div className="App">
      <h1>Notifications</h1>
      {notifs.map((notification) => (
        <Collapsible
          key={notification.id}
          id={notification.id}
          title={`Request for ${notification.assetname} was ${notification.status}`}
          onRead={handleRead}
        >
          {notification.status === "Approved" && <Celebrate />}
          {notification.status === "Rejected" && (
            <div className="rejected">
              <h2>Request Rejected</h2>
              <img src={sadPic} alt="Sorry to disappoint" />
            </div>
          )}
        </Collapsible>
      ))}
    </div>
  );
};

export default Notifications;
