import React, { useState } from 'react';
import AdvicePopup from './AdvicePopup.tsx';
import { Advice } from '../../interfaces/IAdvices.tsx'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
const Advices = ({adviceHandler}) => {
  const [advices, setAdvices] = useState<Advice[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedAdvice, setSelectedAdvice] = useState<Advice | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const handleAdvice = (newAdvice: Advice) => {
    setAdvices([...advices, newAdvice]);
    adviceHandler([...advices, newAdvice])
  };
  const handleEditAdvice = (advice: Advice, index: number) => {
    setSelectedAdvice(advice)
    setEditingIndex(index)
    setIsEditModalOpen(true)
  }

  const handleEditAdviceSave = () => {
    if(editingIndex !== null && selectedAdvice) {
      const updatedAdvice = advices.map((data,index) => 
          index === editingIndex ? selectedAdvice: data
      )
      setAdvices(updatedAdvice)
      adviceHandler(updatedAdvice)
      setIsEditModalOpen(false)
      setSelectedAdvice(null)
      setEditingIndex(null)
    }
  }

  const handleDeleteAdvice = (index: number) => {
    const updatedAdvice = advices.filter((data,id) => id!==index)
    setAdvices(updatedAdvice)
    adviceHandler(updatedAdvice)
  }
  return (
    <div>
      <Typography variant='h6'>
          Advices
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
        Add New Advice
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Advices</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {advices.map((advice, index) => (
              <TableRow key={index}>
                <TableCell>{advice.advice}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditAdvice(advice, index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteAdvice(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AdvicePopup
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        addAdvice={handleAdvice}
      />
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <DialogTitle>Edit Advice</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the fields below and save the changes.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Advice"
            type="text"
            fullWidth
            value={selectedAdvice?.advice || ''}
            onChange={(e) => setSelectedAdvice({ ...selectedAdvice, advice: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditAdviceSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Advices;
