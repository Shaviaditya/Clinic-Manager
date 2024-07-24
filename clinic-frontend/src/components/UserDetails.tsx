import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const UserDetail: React.FC = () => {  
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [editFields, setEditFields] = useState<any>({ id: id });
  const [about, setAbout] = useState(true);
  const [openedPdfId, setOpenedPdfId] = useState<string | null>(null);
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
  }, [id]);

  const handleClick = async (filename: string, appointmentId: string) => {
    if (openedPdfId === appointmentId) {
      setOpenedPdfId(null);
      setPdfBlob(null);
    } else {
      const response = await axios.get(`http://localhost:5700/app/pdf?path=${filename}`, {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "blob",
      });
      console.log(response)
      if (response.status === 200) {
        setOpenedPdfId(appointmentId);
        setPdfBlob(response.data);
      } else {
        setOpenedPdfId(null);
        setPdfBlob(null);
      }
    }
  };

  const handleEditChange = (field: string, value: string) => {
    setEditFields({ ...editFields, [field]: value });
  };

  const handleEdit = (field: string) => {
    setEditFields({ ...editFields, [field]: user[field] });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5700/users/${id}`, editFields, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUser({ ...user, ...editFields });
      setEditFields({});
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const handleCancel = () => {
    setEditFields({});
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
        {user.name}
      </Typography>
      <Box mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAbout(true)}
        >
          About
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setAbout(false)}
          style={{ marginLeft: 10 }}
        >
          History
        </Button>
      </Box>
      {about ? (
        <>
          <Card style={{ marginTop: 20 }}>
            <CardContent>
              <Typography variant="h6">Personal Details</Typography>
              <Grid container spacing={2}>
                {[
                  "phone",
                  "address",
                  "age",
                  "height",
                  "weight",
                  "bloodPressure",
                ].map((field) => (
                  <Grid item xs={12} sm={6} key={field}>
                    {editFields[field] !== undefined ? (
                      <TextField
                        fullWidth
                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={editFields[field]}
                        onChange={(e) =>
                          handleEditChange(field, e.target.value)
                        }
                      />
                    ) : (
                      <Box display="flex" alignItems="center">
                        <Typography style={{ flexGrow: 1 }}>
                          {`${
                            field.charAt(0).toUpperCase() + field.slice(1)
                          }: ${user[field]}`}
                        </Typography>
                        <IconButton onClick={() => handleEdit(field)}>
                          <EditIcon />
                        </IconButton>
                      </Box>
                    )}
                  </Grid>
                ))}
              </Grid>
              {Object.keys(editFields).length > 1 && (
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancel}
                    startIcon={<CancelIcon />}
                    style={{ marginLeft: 10 }}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <Typography variant="h6">Medical History</Typography>
          {user.appointments.map((history: any) => (
            <Card key={history.id} style={{ marginTop: 10 }}>
              <CardContent>
                <Typography>Medical ID: {history.id}</Typography>
                <Typography>Date: {history.date.split("T")[0]}</Typography>
                <button
                  key={history.id}
                  onClick={() => handleClick(history.uri, history.id)}
                >
                  {openedPdfId === history.id ? "Close Prescription" : "View Prescription"}
                </button>
                {(openedPdfId === history.id) ? (
                  ( pdfBlob !== null) ? (<>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                      <Viewer fileUrl={URL.createObjectURL(pdfBlob)} />
                    </Worker>
                    </>): ( <>
                  <Typography variant="h6"> Prescription Removed or Deleted. </Typography>
                </>)
                ) : <></>}
              </CardContent>
            </Card>
          ))}
        </>
      )}
      <Button
        variant="contained"
        color="primary"
        href={`/users/medical-receipt/${id}`}
        style={{ marginTop: 20 }}
      >
        Create Medical Receipt
      </Button>
    </Container>
  );
};

export default UserDetail;
