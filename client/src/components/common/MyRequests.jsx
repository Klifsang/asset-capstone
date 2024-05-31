import React, { useEffect, useState } from 'react'
import HttpClient from '../../HttpClient';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);

  const getRequests = async ()=> {
    const response = await HttpClient.get("api/myrequests/get");
    console.log(response.data);
    setRequests(response.data);
  }

  useEffect(() => {
    getRequests();
  }, []);

  const deleteRequest = async (id) => {
    const response = await HttpClient.delete(`api/requests/delete/${id}`);
    getRequests();
    console.log(response.data);
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
        {/* {requests.map((request) => ( */}
        {requests.map((request) => (
          <tr>
          <td data-label = "Asset">{request.assetname}</td>
          <td data-label = "Requested By">{request.username}</td>
          <td data-label = "Quantity">{request.quantity}</td>
          <td data-label = "Status">{request.status}</td>
          <td data-label = "Action">
            <button className="shyButton" onClick={() => deleteRequest(request.id)}>Delete Request</button>
          </td>
          </tr>
        ))}
      </tbody>
    </table>
    <blockquote> Staff </blockquote>
  </>
  )
}

export default MyRequests