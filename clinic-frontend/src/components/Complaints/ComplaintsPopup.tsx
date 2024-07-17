import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { Complaint, DEFAULT_Complaint } from '../../interfaces/IComplaints.tsx';

interface ComplaintsPopupProps {
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean)=> void;
  addComplaint: (complaint: Complaint)=> void;
}
const ComplaintsPopup: React.FC<ComplaintsPopupProps> = ({isOpen, setIsModalOpen, addComplaint }) => {
  const [complaint,setComplaint] = useState<Complaint>(DEFAULT_Complaint)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setComplaint((prevComplaint) => ({ ...prevComplaint, [name]: value }));
  };

  const handleAddComplaint = () => {
    if (complaint.chiefComplaint && complaint.findings) {
      addComplaint(complaint);
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
          Add New Medicine
        </Typography>
        <TextField
          label="Chief Complaint"
          name="chiefComplaint"
          value={complaint.chiefComplaint}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Clinical Findings"
          name="findings"
          value={complaint.findings}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleAddComplaint}>
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

export default ComplaintsPopup;
