import React, { useState } from 'react';

const AddNewAsset = () => {
  const [asset, setAsset] = useState({
    assetname: '',
    quantity: '',
    condition: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAsset((prevAsset) => ({
      ...prevAsset,
      [name]: value,
    }));
  };

  const submitAsset = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="container">
      <div className="brand-logo"></div>
      <div className="brand-title text-center">Asset Details</div>
      <form className="inputs" onSubmit={submitAsset}>
        <div className="flex one center">
          <div>
            <label>Asset Name</label>
            <input
              type="text"
              value={asset.assetname}
              onChange={handleInputChange}
              required
              name="assetname"
            />
            <label>Quantity</label>
            <input
              type="number"
              value={asset.quantity}
              onChange={handleInputChange}
              required
              name="quantity"
            />
            <label>Condition</label>
            <input
              type="text"
              value={asset.condition}
              onChange={handleInputChange}
              required
              name="condition"
            />
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
        <button type="submit">Submit Asset</button>
      </form>
    </div>
  );
};

export default AddNewAsset;
