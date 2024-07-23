import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { IFacility, DEFAULT_Facility } from '../../interfaces/IFacility.tsx';

interface FacilityPopupProps {
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean)=> void;
  addFacility: (facility: IFacility)=> void;
}
const FacilityPopup: React.FC<FacilityPopupProps> = ({isOpen, setIsModalOpen, addFacility }) => {
  const [facility,setFacility] = useState<IFacility>(DEFAULT_Facility)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFacility((prevFacility) => ({ ...prevFacility, [name]: value }));
  };

  const handleAddFacility = () => {
    if (facility.facility) {
      addFacility(facility);
      setIsModalOpen(false);
      setFacility(DEFAULT_Facility)
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
          Add Facility
        </Typography>
        <TextField
          label="Facility"
          name="facility"
          value={facility.facility}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleAddFacility}>
            Add Item
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => setIsModalOpen(false)} style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        </Box>
      </Box>
      </Modal>
  )
};

export default FacilityPopup;
