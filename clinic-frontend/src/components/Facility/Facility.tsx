import React, { useState } from 'react';
import FacilityPopup from './FacilityPopup.tsx';
import { IFacility } from '../../interfaces/IFacility.tsx';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Facility = (addFacility) => {
  const [facility, setFacility] = useState<IFacility[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleFacility = (newFacility: IFacility) => {
    setFacility([...facility, newFacility]);
    addFacility(facility)
  };

  return (
    <div>
      <h2>Facility</h2>
      <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
        Add New Facility
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Facility</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {facility.map((facility, index) => (
              <TableRow key={index}>
                <TableCell>{facility.facility}</TableCell>
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
    </div>
  );
};

export default Facility;