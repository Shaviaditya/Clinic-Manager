import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Complaints from "./Complaints/Complaints.tsx";
import Medicines from "./Medicines/Medicines.tsx";
import Diagnosis from "./Diagnosis/Diagnosis.tsx";
import Advices from "./Advice/Advice.tsx";
import Facility from "./Facility/Facility.tsx";
import Symptoms from "./Symptoms/Symptoms.tsx";
import { Receipt, DEFAULT_RECEIPT } from "../interfaces/IReceipt.tsx";
import { Button, Container, Typography, Card, CardContent, Grid, Box, CircularProgress } from "@mui/material";

const MedicalReceipt: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [receipt, setReceipt] = useState<Receipt>(DEFAULT_RECEIPT);

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

  const handleFacility = (data: any) => {
    setReceipt((prev) => ({ ...prev, facility: data }));
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
        receipt,
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "json",
        }
      );
      if (response.data.success) {
        window.open(response.data.pdfUrl, "_blank");
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
                <Advices addAdvices={handleAdvice} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Facility addFacility={handleFacility} />
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
    </Container>
  );
};

export default MedicalReceipt;
