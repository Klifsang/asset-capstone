import React, { useContext, useEffect, useState } from "react";
import HttpClient from "../../HttpClient";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../AuthContext.jsx";

const Profile = () => {
  const { user } = useContext(AuthContext);
  let { id } = useParams();
  id = id || user.id; // Default to '1' if id is not provided

  console.log(id);

  const [profile, setProfile] = useState({
    username: "",
    fullname: "",
    address: "",
    email: "",
    phonenumber: "",
    role: "",
    status: "",
    department: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    async function getUser() {
      const response = await HttpClient.post("/api/admin/get", {
        id: user.id,
      });
      console.log(response);
      setProfile(response.data);
    }
    getUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleToggleDisable = () => {
    setIsDisabled((prevState) => !prevState);
  };

  const {
    username,
    fullname,
    address,
    email,
    phonenumber,
    role,
    status,
    department,
  } = profile;

  return (
    <div className="container h-full overflow-auto">
      <div className="brand-logo"></div>
      <div className="brand-title text-center">User Details</div>
      <form className="inputs" onSubmit={handleRegister}>
        <div className="flex one two-700 center">
          <div>
            <label>Role</label>
            <input
              disabled={isDisabled}
              type="text"
              value={role}
              onChange={handleInputChange}
              required
            />
            <label>User Name</label>
            <input
              disabled={isDisabled}
              type="text"
              value={username}
              onChange={handleInputChange}
              required
            />
            <label>Email</label>
            <input
              disabled={isDisabled}
              type="email"
              value={email}
              onChange={handleInputChange}
              required
            />
            <label>Phone Number</label>
            <input
              disabled={isDisabled}
              type="text"
              value={phonenumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Department</label>
            <input
              disabled={isDisabled}
              type="text"
              value={department}
              onChange={handleInputChange}
              required
            />
            <label>Address</label>
            <input
              disabled={isDisabled}
              type="text"
              value={address}
              onChange={handleInputChange}
              required
            />
            <label>Confirm Password</label>
            <input
              disabled={isDisabled}
              type="password"
              value={password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" onClick={handleToggleDisable}>
            Edit account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
