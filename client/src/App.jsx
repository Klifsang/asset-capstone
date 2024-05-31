import { useContext, useEffect, useState } from "react";
import "./App.css";
import AdminDashboard from "./components/admin/AdminDashboard";
import { assets } from "./assets";
import { AuthContext } from "./AuthContext";
import Login from "./components/common/Login";
import StaffDashboard from "./components/staff/StaffDashboard";
function App() {
  const preloadAssets = () => {
    assets.forEach((asset) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = asset;
      link.as = "image";
      document.head.appendChild(link);
    });
  };
  preloadAssets();

  const { user } = useContext(AuthContext);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log("User updated:", user);
    if (user) {
      setLoggedIn(true);
      console.log("User object when logged in:", user);
    } else {
      setLoggedIn(false);
    }
  }, [user]);

  return (
    <>
      {loggedIn && user.level === "admin" && <AdminDashboard />}
      {loggedIn && user.level === "staff" && <StaffDashboard />}
      {!loggedIn && <Login />}
    </>
  );
}

export default App;
