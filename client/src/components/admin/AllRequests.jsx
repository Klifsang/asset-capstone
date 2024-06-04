import React, { useEffect, useState } from "react";
import HttpClient from "../../HttpClient";

const AllRequests = () => {
  const [requests, setRequests] = useState([]);

  const getRequests = async () => {
    const response = await HttpClient.get("api/requests/get");
    setRequests(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getRequests();
  }, []);

  const approve = async (id, message) => {
    const response = await HttpClient.patch("api/requests/update", {
      id: id,
      status: message,
    });
    getRequests();
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Asset</th>
            <th>Requested By</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr>
              <td data-label="Asset">{request.assetname}</td>
              <td data-label="Requested By">{request.username}</td>
              <td data-label="Quantity">{request.quantity}</td>
              <td data-label="Status">
                <span className={request.status}>{request.status}</span>
              </td>
              <td data-label="Action">
                <span>
                  {request.status === "Approved" && (
                    <button className="shyButton" onClick={() => approve(request.id, "Recalled")}>
                      Recall
                    </button>
                  )}
                  {request.status !== "Approved" && (
                    <>
                      <button className="shyButton" onClick={() => approve(request.id, "Approved")}>
                        Approve
                      </button>
                      <button className="shyButton" onClick={() => approve(request.id, "Rejected")}>
                        Reject
                      </button>
                    </>
                  )}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <blockquote> All Requests </blockquote>
    </>
  );
};

export default AllRequests;
