import React, { useState } from 'react';
import MedicinesPopup from './MedicinesPopup.tsx';
import { Medicine } from '../../interfaces/IMedicines.tsx';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const Medicines = ({addMedicines}) => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addMedicine = (newMedicine: Medicine) => {
    setMedicines([...medicines, newMedicine]);
    addMedicines([...medicines, newMedicine])
  };

  const deleteMedicine = (index: number) => {
    const updatedMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(updatedMedicines);
    addMedicines(updatedMedicines);
  };

  const handleEditClick = (medicine: Medicine, index: number) => {
    setSelectedMedicine(medicine);
    setEditingIndex(index);
    setIsEditModalOpen(true);
  };

  const handleEditSave = () => {
    if (editingIndex !== null && selectedMedicine) {
      const updatedMedicines = medicines.map((medicine, index) => 
        index === editingIndex ? selectedMedicine : medicine
      );
      setMedicines(updatedMedicines);
      addMedicines(updatedMedicines);
      setIsEditModalOpen(false);
      setSelectedMedicine(null);
      setEditingIndex(null);
    }
  };

  return (
    <div>
      <Typography variant='h6'>
        Medicines
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
        Add New Medicine
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Medicine Name</TableCell>
              <TableCell>Dosage</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicines.map((medicine, index) => (
              <TableRow key={index}>
                <TableCell>{medicine.name}</TableCell>
                <TableCell>{medicine.dosage}</TableCell>
                <TableCell>{medicine.quantity}</TableCell>
                <TableCell>{medicine.duration}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(medicine, index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteMedicine(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MedicinesPopup
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        addMedicine={addMedicine}
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
            value={selectedMedicine?.name || ''}
            onChange={(e) => setSelectedMedicine({ ...selectedMedicine, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Clinical Findings"
            type="text"
            fullWidth
            value={selectedMedicine?.dosage || ''}
            onChange={(e) => setSelectedMedicine({ ...selectedMedicine, dosage: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Clinical Findings"
            type="text"
            fullWidth
            value={selectedMedicine?.quantity || ''}
            onChange={(e) => setSelectedMedicine({ ...selectedMedicine, quantity: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Clinical Findings"
            type="text"
            fullWidth
            value={selectedMedicine?.duration || ''}
            onChange={(e) => setSelectedMedicine({ ...selectedMedicine, duration: e.target.value })}
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

export default Medicines;
