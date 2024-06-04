import React, { useState } from "react";

const AddNewAsset = () => {
  const [asset, setAsset] = useState({
    assetname: "",
    quantity: "",
    condition: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAsset((prevAsset) => ({
      ...prevAsset,
      [name]: value,
    }));
  };

  const submitAsset = async(e) => {
    e.preventDefault();
    // Handle form submission
    const response = await HttpClient.post("/api/assets/add", {
      assetname: asset.assetname,
      quantity: asset.quantity,
      condition: asset.condition,
      description: asset.description,
      status: "available",
      image: "https://picsum.photos/200/300"
    })
    console.log(response.data);
  };

  return (
    <div className="container">
      <div className="brand-logo"></div>
      <div className="brand-title text-center">Asset Details</div>
      <form className="inputs" onSubmit={submitAsset}>
        <div className="flex one center">
          <div>
            <div style={{ width: 200 }}>
              <label className="dropimage">
                <input title="Drop image or click me" type="file" />
              </label>
            </div>
            <div>
              <label>Asset Name</label>
              <input
                type="text"
                value={asset.assetname}
                onChange={handleInputChange}
                required
                name="assetname"
              />
            </div>
            <div>
              <label>Quantity</label>
              <input
                type="number"
                value={asset.quantity}
                onChange={handleInputChange}
                required
                name="quantity"
              />
            </div>
            <div>
              <label>Condition</label>
              <input
                type="text"
                value={asset.condition}
                onChange={handleInputChange}
                required
                name="condition"
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                name="description"
                onChange={handleInputChange}
                id="description"
                required
                value={asset.description}
              ></textarea>
            </div>
          </div>
        </div>
        <button type="submit">Submit Asset</button>
      </form>
    </div>
  );
};

export default AddNewAsset;
