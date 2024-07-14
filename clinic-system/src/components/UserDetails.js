import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5700/users/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUser(response.data.users);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Phone: {user.phone}</p>
      <p>Address: {user.address}</p>
      {/* Add more fields as needed */}
      <Link to={`/users/medical-receipt/${id}`}>
        <button>Create Medical Receipt</button>
      </Link>
    </div>
  );
};

export default UserDetail;
