import React, { useEffect, useState } from "react";
import HttpClient from "../../HttpClient";

const Collapsible = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible">
      <div className="collapsible-header" onClick={toggle}>
        <h2>{title}</h2>
        <span>{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && <div className="collapsible-content">{children}</div>}
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
    const response = await HttpClient.delete(
      `/api/notifications/${notificationId}`
    );
    getNotifications();
    console.log(response);
  };

  return (
    <div className="App">
      <h1>Notifications</h1>
      {notifs.map((notification) => (
        <Collapsible title="Section 1">
          <p>This is the content of section 1.</p>
        </Collapsible>
      ))}
    </div>
  );
};

export default Notifications;
