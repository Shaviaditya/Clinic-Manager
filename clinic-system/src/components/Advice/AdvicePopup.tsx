import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { Advice, DEFAULT_Advice } from '../../interfaces/IAdvices.tsx';

interface AdvicesPopupProps {
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean)=> void;
  addAdvice: (advice: Advice)=> void;
}
const AdvicesPopup: React.FC<AdvicesPopupProps> = ({isOpen, setIsModalOpen, addAdvice }) => {
  const [advice,setAdvice] = useState<Advice>(DEFAULT_Advice)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdvice((prevAdvice) => ({ ...prevAdvice, [name]: value }));
  };

  const handleAddAdvice = () => {
    if (advice.advice) {
      addAdvice(advice);
      setIsModalOpen(false);
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
          Add Advice
        </Typography>
        <TextField
          label="Advice"
          name="advice"
          value={advice.advice}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleAddAdvice}>
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

export default AdvicesPopup;
