import React, { useState } from 'react';
import SymptomPopup from './SymptomsPopup.tsx';
import { Symptom } from '../../interfaces/ISymptoms.tsx';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
interface SymptomsProps {
  addSymptoms: (symptom: Symptom[])=> void;
}
const Symptoms: React.FC<SymptomsProps> = ({addSymptoms}) => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const addSymptom = (newSymptom: Symptom) => {    
    setSymptoms([...symptoms, newSymptom]);
    addSymptoms(symptoms)
  };

  return (
    <div>
      <h2>Symptoms</h2>
      <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
        Add New Symptom
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Symptoms</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {symptoms.map((symptom, index) => (
              <TableRow key={index}>
                <TableCell>{symptom.symptom}</TableCell>
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
    </div>
  );
};

export default Symptoms;
