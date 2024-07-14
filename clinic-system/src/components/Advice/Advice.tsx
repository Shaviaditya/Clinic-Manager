import React, { useState } from 'react';
import AdvicePopup from './AdvicePopup.tsx';
import { Advice } from '../../interfaces/IAdvices.tsx';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Advices: React.FC = () => {
  const [advices, setAdvices] = useState<Advice[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const addAdvice = (newAdvice: Advice) => {
    setAdvices([...advices, newAdvice]);
  };

  return (
    <div>
      <h2>Advices</h2>
      <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
        Add New Advice
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Advices</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {advices.map((advice, index) => (
              <TableRow key={index}>
                <TableCell>{advice.advice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AdvicePopup
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        addAdvice={addAdvice}
      />
    </div>
  );
};

export default Advices;
