import React, { useContext, useEffect, useRef, useState } from "react";
import HttpClient from "../../HttpClient.jsx";
import { AuthContext } from "../../AuthContext.jsx";

const AvailableAssets = () => {
  const [assets, setAssets] = useState([]);
  const [pickedAsset, setPickedAsset] = useState(null);
  const modalCheckboxRef = useRef(null);
  const { user } = useContext(AuthContext);

  const getAssets = async () => {
    const response = await HttpClient.get("api/assets/get");
    console.log(response.data);
    setAssets(response.data);
  };

  useEffect(() => {
    getAssets();
  }, []);

  const handleAssetClick = (asset) => {
    setPickedAsset(asset);
  };

  const requestAsset = async (id) => {
    const response = await HttpClient.post("api/requests/add", {
      assetId: id,
      userId: user.id,
      comment: "urgent request",
      quantity: 1,
    });
    console.log(response.data);
  };

  const handleActionClick = () => {
    // Close the modal by unchecking the checkbox
    requestAsset(pickedAsset.id);
    if (modalCheckboxRef.current) {
      modalCheckboxRef.current.checked = false;
    }
  };

  return (
    <div className="flex two three-600 four-1200 five-1300 center">
      {assets.map((asset) => (
        <div
          key={asset.id}
          className="ant-card ant-card-hoverable ant-card-bordered"
          htmlFor="modal_1"
        >
          <img src={asset.image_url} alt="" />
          <p>{asset.assetname}</p>
          <p>Condition: {asset.condition}</p>
          <p>{asset.description}</p>
          <p>Quantity: {asset.quantity}</p>
          <label
            htmlFor="modal_1"
            className="button"
            onClick={() => handleAssetClick(asset)}
            style={{ marginBottom: "0px", alignSelf: "flex-end" }}
          >
            Request Asset
          </label>
        </div>
      ))}

      <div className="modal">
        <input id="modal_1" type="checkbox" ref={modalCheckboxRef} />
        <label htmlFor="modal_1" className="overlay"></label>
        <article>
          <section className="content">
            {pickedAsset && (
              <table>
              <tbody style={{ width: "100%" }}>
                <tr>
                  <td rowSpan="4">
                    <img
                      src={pickedAsset.image_url}
                      alt=""
                      style={{ width: "100%" }}
                    />
                  </td>
                  <td>{pickedAsset.assetname}</td>
                </tr>
                <tr>
                  <td>Condition: {pickedAsset.condition}</td>
                </tr>
                <tr>
                  <td>{pickedAsset.description}</td>
                </tr>
                <tr>
                  <td>Quantity: {pickedAsset.quantity}</td>
                </tr>
              </tbody>
            </table>
            
            )}
          </section>
          <footer>
            <a className="button" href="#" onClick={handleActionClick}>
              Take Action
            </a>
            <label htmlFor="modal_1" className="button dangerous">
              Close
            </label>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default AvailableAssets;
