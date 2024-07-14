import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { Symptom, DEFAULT_Symptom } from '../../interfaces/ISymptoms.tsx';

interface SymptomsPopupProps {
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean)=> void;
  addSymptom: (symptom: Symptom)=> void;
}
const SymptomsPopup: React.FC<SymptomsPopupProps> = ({isOpen, setIsModalOpen, addSymptom }) => {
  const [symptom,setSymptom] = useState<Symptom>(DEFAULT_Symptom)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSymptom((prevSymptom) => ({ ...prevSymptom, [name]: value }));
  };

  const handleAddSymptom = () => {
    if (symptom.symptom) {
      addSymptom(symptom);
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
          Add Symptom
        </Typography>
        <TextField
          label="Symptom"
          name="symptom"
          value={symptom.symptom}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleAddSymptom}>
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

export default SymptomsPopup;
