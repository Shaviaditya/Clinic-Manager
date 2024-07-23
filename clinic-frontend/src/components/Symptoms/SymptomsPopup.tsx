import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { ISymptoms, DEFAULT_Symptom } from '../../interfaces/ISymptoms.tsx';

interface SymptomsPopupProps {
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean)=> void;
  addSymptom: (symptom: ISymptoms)=> void;
}
const SymptomsPopup: React.FC<SymptomsPopupProps> = ({isOpen, setIsModalOpen, addSymptom }) => {
  const [symptoms,setSymptoms] = useState<ISymptoms>(DEFAULT_Symptom)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSymptoms((prevSymptoms) => ({ ...prevSymptoms, [name]: value }));
  };

  const handleAddSymptoms = () => {
    if (symptoms.symptom) {
      addSymptom(symptoms);
      setIsModalOpen(false);
      setSymptoms(DEFAULT_Symptom)
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
          Add Symptoms
        </Typography>
        <TextField
          label="Symptoms"
          name="symptom"
          value={symptoms.symptom}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleAddSymptoms}>
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
