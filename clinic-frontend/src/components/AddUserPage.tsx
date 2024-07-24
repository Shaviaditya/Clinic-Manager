import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser, DEFAULT_USER } from '../interfaces/IUser.tsx';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const AddUserPage: React.FC = () => {
  const [userData, setUserData] = useState<IUser>(DEFAULT_USER);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5700/users", {
        name: (userData.name)?.toLowerCase(),
        address: userData.address,
        phone: userData.phone,
        age: userData.age,
        height: userData.height,
        weight: userData.weight,
        bloodPressure: userData.bloodPressure,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data)
      navigate(`/users/${response.data.user.id}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>
        Add User
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Age"
            name="age"
            value={userData.age}
            onChange={handleInputChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Height"
            name="height"
            value={userData.height}
            onChange={handleInputChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Weight"
            name="weight"
            value={userData.weight}
            onChange={handleInputChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Blood Pressure"
            name="bloodPressure"
            value={userData.bloodPressure}
            onChange={handleInputChange}
            required
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <Button variant="outlined" onClick={handleBack}>
            Back
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddUserPage;
