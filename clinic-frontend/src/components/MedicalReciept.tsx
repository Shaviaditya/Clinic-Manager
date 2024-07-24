import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Complaints from "./Complaints/Complaints.tsx";
import Medicines from "./Medicines/Medicines.tsx";
import Diagnosis from "./Diagnosis/Diagnosis.tsx";
import Advices from "./Advice/Advice.tsx";
import Symptoms from "./Symptoms/Symptoms.tsx";
import { Receipt, DEFAULT_RECEIPT } from "../interfaces/IReceipt.tsx";
import { Button, Container, Typography, Card, CardContent, Grid, Box, CircularProgress } from "@mui/material";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const MedicalReceipt: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [receipt, setReceipt] = useState<Receipt>(DEFAULT_RECEIPT);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5700/users/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUser(response.data.users);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUser();
    setReceipt((prev) => ({ ...prev, id: id }));
  }, [id]);

  const handleSymptom = (data: any) => {
    setReceipt((prev) => ({ ...prev, symptom: data }));
  };

  const handleDiagnosis = (data: any) => {
    setReceipt((prev) => ({ ...prev, diagnosis: data }));
  };

  const handleMedicine = (data: any) => {
    setReceipt((prev) => ({ ...prev, medicines: data }));
  };

  const handleComplaint = (data: any) => {
    setReceipt((prev) => ({ ...prev, complaints: data }));
  };

  const handleAdvice = (data: any) => {
    setReceipt((prev) => ({ ...prev, advice: data }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5700/app",
        JSON.stringify(receipt),
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      );
      if (response.status === 200) {
        setPdfBlob(response.data);
      } else {
        console.error("Error creating appointment:", response.data.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (!user) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Medical Receipt
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Complaints handleComplaints={handleComplaint} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Symptoms addSymptoms={handleSymptom} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Diagnosis addDiagnosis={handleDiagnosis} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Medicines addMedicines={handleMedicine} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Advices adviceHandler={handleAdvice} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
      {pdfBlob && (
        <div style={{ height: '750px' }}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer
              fileUrl={URL.createObjectURL(pdfBlob)}
            />
          </Worker>
        </div>
      )}
    </Container>
  );
};

export default MedicalReceipt;
