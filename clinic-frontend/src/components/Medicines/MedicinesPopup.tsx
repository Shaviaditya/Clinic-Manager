import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { Medicine, DEFAULT_Medicine } from '../../interfaces/IMedicines.tsx';

interface MedicinesPopupProps {
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  addMedicine: (medicine: Medicine) => void;
}

const MedicinesPopup: React.FC<MedicinesPopupProps> = ({ isOpen, setIsModalOpen, addMedicine }) => {
  const [medicine, setMedicine] = useState<Medicine>(DEFAULT_Medicine);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMedicine((prevMedicine) => ({ ...prevMedicine, [name]: value }));
  };

  const handleAddMedicine = () => {
    if (medicine.name && medicine.dosage && medicine.quantity && medicine.duration) {
      addMedicine(medicine);
      setIsModalOpen(false);
      setMedicine(DEFAULT_Medicine);
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsModalOpen(false)}
    >
      <Box 
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Add New Medicine
        </Typography>
        <TextField
          label="Medicine Name"
          name="name"
          value={medicine.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Dosage"
          name="dosage"
          value={medicine.dosage}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantity"
          name="quantity"
          value={medicine.quantity}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Duration"
          name="duration"
          value={medicine.duration}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleAddMedicine}>
            Add Item
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => setIsModalOpen(false)} style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default MedicinesPopup;
