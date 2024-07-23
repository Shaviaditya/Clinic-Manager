import React, { useState } from 'react';
import SymptomPopup from './SymptomsPopup.tsx';
import { ISymptoms } from '../../interfaces/ISymptoms.tsx';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const Symptoms = ({addSymptoms}) => {
  const [symptoms, setSymptoms] = useState<ISymptoms[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedSymptom, setSelectedSymptom] = useState<ISymptoms | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const addSymptom = (newSymptom: ISymptoms) => {    
    setSymptoms([...symptoms, newSymptom]);
    addSymptoms([...symptoms, newSymptom])
  };

  const handleEditSymptom = (symptoms: ISymptoms, index: number) => {
    setSelectedSymptom(symptoms)
    setEditingIndex(index)
    setIsEditModalOpen(true)
  }

  const handleEditSymptomSave = () => {
    if(editingIndex !== null && selectedSymptom) {
      const updatedSymptom = symptoms.map((data,index) => 
          index === editingIndex ? selectedSymptom: data
      )
      setSymptoms(updatedSymptom)
      addSymptoms(updatedSymptom)
      setIsEditModalOpen(false)
      setSelectedSymptom(null)
      setEditingIndex(null)
    }
  }

  const handleDeleteSymptom = (index: number) => {
    const updatedSymptom = symptoms.filter((data,id) => id!==index)
    setSymptoms(updatedSymptom)
    addSymptoms(updatedSymptom)
  }

  return (
    <div>
      <Typography variant='h6'>
        Symptoms
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
        Add New Symptom
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Symptoms</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {symptoms.map((symptom, index) => (
              <TableRow key={index}>
                <TableCell>{symptom.symptom}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditSymptom(symptom, index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteSymptom(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SymptomPopup
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        addSymptom={addSymptom}
      />
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <DialogTitle>Edit Symptom</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the fields below and save the changes.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Symptom"
            type="text"
            fullWidth
            value={selectedSymptom?.symptom || ''}
            onChange={(e) => setSelectedSymptom({ ...selectedSymptom, symptom: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSymptomSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Symptoms;
