import React, { useState } from 'react';
// import './Complaints.css'; // Add your styles here
import ComplaintsPopup from './ComplaintsPopup.tsx';
import { Complaint } from '../../interfaces/IComplaints.tsx';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Complaints: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const addComplaint = (newComplaint: Complaint) => {
    setComplaints([...complaints, newComplaint]);
  };

  return (
    <div>
      <h2>Medicines</h2>
      <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
        Add New Complaint
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Chief Complaints</TableCell>
              <TableCell>Clinical Findings</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {complaints.map((complaint, index) => (
              <TableRow key={index}>
                <TableCell>{complaint.chiefComplaint}</TableCell>
                <TableCell>{complaint.findings}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ComplaintsPopup
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        addComplaint={addComplaint}
      />
    </div>
  );
};

export default Complaints;
