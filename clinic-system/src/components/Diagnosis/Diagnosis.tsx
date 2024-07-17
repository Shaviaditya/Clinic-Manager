import React, { useState } from 'react';
import DiagnosisPopup from './DiagnosisPopup.tsx';
import { IDiagnosis } from '../../interfaces/IDiagnosis.tsx';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Diagnosis = (addDiagnosis) => {
  const [diagnosis, setDiagnosis] = useState<IDiagnosis[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDiagnosis = (newDiagnosis: IDiagnosis) => {
    setDiagnosis([...diagnosis, newDiagnosis]);
    addDiagnosis(diagnosis)
  };

  return (
    <div>
      <h2>Diagnosis</h2>
      <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
        Add New Diagnosis
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Diagnosis</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {diagnosis.map((diagnosis, index) => (
              <TableRow key={index}>
                <TableCell>{diagnosis.diagnosis}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DiagnosisPopup
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        addDiagnosis={handleDiagnosis}
      />
    </div>
  );
};

export default Diagnosis;
