import React, { useEffect, useState } from "react";
import HttpClient from "../../HttpClient";
import { Link } from "react-router-dom";

const Staff = () => {
  const [users, setUsers] = useState([]);
  const [isApproved, setIsApproved] = useState(false);

  const getUsers = async () => {
    const response = await HttpClient.get("api/staff/get");
    console.log(response.data);
    setUsers(response.data);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const approve = async function (id,message) {
    const response = await HttpClient.patch("api/staff/update", {
      id: id,
      status: message,
    });
    getUsers();
    console.log(response.data);
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Department</th>
            <th>Status</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <Link to={`/profile/${user.id}`}>
                <td data-label = "User Name">{user.username}</td>
              </Link>
            <td data-label = "Department">{user.department}</td>
            <td data-label = "Status">{user.status}</td>
            <td data-label = "Email">{user.email}</td>
            <td data-label = "Phone Number">{user.phonenumber}</td>
            <td data-label = "Action">
            <button className="shyButton" onClick={() => approve(user.id, "Approved")}>Approve</button>
            <button className="shyButton" onClick={() => approve(user.id, "Declined")}>Reject</button>
          </td>
            </tr>
          ))}
        </tbody>
      </table>
      <blockquote> Staff </blockquote>
    </>
  );
};

export default Staff;
