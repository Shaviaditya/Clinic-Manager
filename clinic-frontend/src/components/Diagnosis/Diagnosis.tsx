import React, { useState } from 'react';
import DiagnosisPopup from './DiagnosisPopup.tsx';
import { IDiagnosis } from '../../interfaces/IDiagnosis.tsx';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
const Diagnosis = ({addDiagnosis}) => {
  const [diagnosis, setDiagnosis] = useState<IDiagnosis[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<IDiagnosis | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const handleDiagnosis = (newDiagnosis: IDiagnosis) => {
    setDiagnosis([...diagnosis, newDiagnosis]);
    addDiagnosis([...diagnosis, newDiagnosis])
  };
  const handleEditDiagnosis = (diagnosis: IDiagnosis, index: number) => {
    setSelectedDiagnosis(diagnosis)
    setEditingIndex(index)
    setIsEditModalOpen(true)
  }

  const handleEditDiagnosisSave = () => {
    if(editingIndex !== null && selectedDiagnosis) {
      const updatedDiagnosis = diagnosis.map((data,index) => 
          index === editingIndex ? selectedDiagnosis: data
      )
      setDiagnosis(updatedDiagnosis)
      addDiagnosis(updatedDiagnosis)
      setIsEditModalOpen(false)
      setSelectedDiagnosis(null)
      setEditingIndex(null)
    }
  }

  const handleDeleteDiagnosis = (index: number) => {
    const updatedDiagnosis = diagnosis.filter((data,id) => id!==index)
    setDiagnosis(updatedDiagnosis)
    addDiagnosis(updatedDiagnosis)
  }
  return (
    <div>
      <Typography variant='h6'>
      Diagnosis
      </Typography> 
      <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
        Add New Diagnosis
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Diagnosis</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {diagnosis.map((diagnosis, index) => (
              <TableRow key={index}>
                <TableCell>{diagnosis.diagnosis}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditDiagnosis(diagnosis, index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteDiagnosis(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DiagnosisPopup
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleDiagnosis={handleDiagnosis}
      />
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <DialogTitle>Edit Diagnosis</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the fields below and save the changes.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Diagnosis"
            type="text"
            fullWidth
            value={selectedDiagnosis?.diagnosis || ''}
            onChange={(e) => setSelectedDiagnosis({ ...selectedDiagnosis, diagnosis: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditDiagnosisSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Diagnosis;
