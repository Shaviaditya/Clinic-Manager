import React, { useState } from 'react';
import MedicinesPopup from './MedicinesPopup.tsx';
import { Medicine } from '../../interfaces/IMedicines.tsx';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Medicines: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const addMedicine = (newMedicine: Medicine) => {
    setMedicines([...medicines, newMedicine]);
  };

  return (
    <div>
      <h2>Medicines</h2>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {medicines.map((medicine, index) => (
              <TableRow key={index}>
                <TableCell>{medicine.name}</TableCell>
                <TableCell>{medicine.dosage}</TableCell>
                <TableCell>{medicine.quantity}</TableCell>
                <TableCell>{medicine.duration}</TableCell>
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
    </div>
  );
};

export default Medicines;
