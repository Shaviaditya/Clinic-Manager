import React, { useState } from 'react';
import ComplaintsPopup from './ComplaintsPopup.tsx';
import { Complaint } from '../../interfaces/IComplaints.tsx';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const Complaints = ({ handleComplaints }) => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addComplaint = (newComplaint: Complaint) => {
    setComplaints([...complaints, newComplaint]);
    handleComplaints([...complaints, newComplaint]);
  };

  const deleteComplaint = (index: number) => {
    const updatedComplaints = complaints.filter((_, i) => i !== index);
    setComplaints(updatedComplaints);
    handleComplaints(updatedComplaints);
  };

  const handleEditClick = (complaint: Complaint, index: number) => {
    setSelectedComplaint(complaint);
    setEditingIndex(index);
    setIsEditModalOpen(true);
  };

  const handleEditSave = () => {
    if (editingIndex !== null && selectedComplaint) {
      const updatedComplaints = complaints.map((complaint, index) => 
        index === editingIndex ? selectedComplaint : complaint
      );
      setComplaints(updatedComplaints);
      handleComplaints(updatedComplaints);
      setIsEditModalOpen(false);
      setSelectedComplaint(null);
      setEditingIndex(null);
    }
  };

  return (
    <div>
      <Typography variant='h6'>Complaints</Typography>
      <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
        Add New Complaint
      </Button>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Chief Complaints</TableCell>
              <TableCell>Clinical Findings</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {complaints.map((complaint, index) => (
              <TableRow key={index}>
                <TableCell>{complaint.chiefComplaints}</TableCell>
                <TableCell>{complaint.clinicalFindings}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(complaint, index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteComplaint(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
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
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <DialogTitle>Edit Complaint</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the fields below and save the changes.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Chief Complaint"
            type="text"
            fullWidth
            value={selectedComplaint?.chiefComplaints || ''}
            onChange={(e) => setSelectedComplaint({ ...selectedComplaint, chiefComplaints: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Clinical Findings"
            type="text"
            fullWidth
            value={selectedComplaint?.clinicalFindings || ''}
            onChange={(e) => setSelectedComplaint({ ...selectedComplaint, clinicalFindings: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Complaints;
