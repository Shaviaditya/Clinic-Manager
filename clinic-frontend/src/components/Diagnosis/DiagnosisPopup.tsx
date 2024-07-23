import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { IDiagnosis, DEFAULT_Diagnosis } from '../../interfaces/IDiagnosis.tsx';

interface DiagnosisPopupProps {
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean)=> void;
  handleDiagnosis: (diagnosis: IDiagnosis)=> void;
}
const DiagnosisPopup: React.FC<DiagnosisPopupProps> = ({isOpen, setIsModalOpen, handleDiagnosis }) => {
  const [diagnosis,setDiagnosis] = useState<IDiagnosis>(DEFAULT_Diagnosis)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDiagnosis((prevDiagnosis) => ({ ...prevDiagnosis, [name]: value }));
  };

  const handleAddDiagnosis = () => {
    if (diagnosis.diagnosis) {
      handleDiagnosis(diagnosis)
      setDiagnosis(DEFAULT_Diagnosis)
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
          Add Diagnosis
        </Typography>
        <TextField
          label="Diagnosis"
          name="diagnosis"
          value={diagnosis.diagnosis}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleAddDiagnosis}>
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

export default DiagnosisPopup;
