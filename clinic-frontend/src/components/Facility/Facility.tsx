import React, { useState } from 'react';
import FacilityPopup from './FacilityPopup.tsx';
import { IFacility } from '../../interfaces/IFacility.tsx';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const Facility = ({addFacility}) => {
  const [facility, setFacility] = useState<IFacility[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedFacility, setSelectedFacility] = useState<IFacility | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const handleFacility = (newFacility: IFacility) => {
    setFacility([...facility, newFacility]);
    addFacility([...facility, newFacility])
  };

  const handleFacilityDelete = (index: number) => {
    const updatedFacility = facility.filter((_,id) => id!==index)
    setFacility(updatedFacility)
    addFacility(updatedFacility)
  }

  const handleFacilityEdit = (facility: IFacility, index: number) => {
    setSelectedFacility(facility)
    setEditingIndex(index)
    setIsEditModalOpen(true)
  }

  const handleFacilityEditSave = () => {
    if(editingIndex!==null && selectedFacility){
      const updatedFacility = facility.map((facility,index) => index===editingIndex?selectedFacility:facility)
      setFacility(updatedFacility)
      addFacility(updatedFacility)
      setIsEditModalOpen(false)
      setSelectedFacility(null)
      setEditingIndex(null)

    }
  }
  return (
    <div>
      <Typography variant='h6'> Facility </Typography>
      <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
        Add New Facility
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Facility</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {facility.map((facility, index) => (
              <TableRow key={index}>
                <TableCell>{facility.facility}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleFacilityEdit(facility, index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleFacilityDelete(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FacilityPopup
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        addFacility={handleFacility}
      />
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <DialogTitle>Edit Facility</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the fields below and save the changes.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Facility"
            type="text"
            fullWidth
            value={selectedFacility?.facility || ''}
            onChange={(e) => setSelectedFacility({ ...selectedFacility, facility: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleFacilityEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Facility;
