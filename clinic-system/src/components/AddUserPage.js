import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUserPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    address: ""
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(userData)
      await axios.post("http://localhost:5700/users",{
          name: userData.name,
          address: userData.address,
          phone: userData.phone
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
        }
      ).then(() => navigate("/"))
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="phone"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="address"
            id="address"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleBack}>Back</button>
    </div>
  );
};

export default AddUserPage;
