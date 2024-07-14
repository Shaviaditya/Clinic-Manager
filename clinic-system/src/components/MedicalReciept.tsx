import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Complaints from "./Complaints/Complaints.tsx";
import Medicines from "./Medicines/Medicines.tsx";
import Diagnosis from "./Diagnosis/Diagnosis.tsx";
import Advices from "./Advice/Advice.tsx";
import Facility from "./Facility/Facility.tsx";
import Symptoms from "./Symptoms/Symptoms.tsx";

const MedicalReceipt = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [symptoms, setSymptoms] = useState("");
  const [medicines, setMedicines] = useState("");

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5700/users/${id}`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       setUser(response.data.users);
  //     } catch (error) {
  //       console.error("Error fetching user details:", error);
  //     }
  //   };

  //   fetchUser();
  // }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5700/app",
        {
          id,
          symptoms,
          medicines,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      );
      // console.log("Form submitted successfully:", response.data);
      // Create a URL for the PDF file
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      // Create a link element and trigger a download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "medical_receipt.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Handle successful form submission (e.g., show a success message or redirect)
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (e.g., show an error message)
    }
  };

  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <h1>Medical Receipt</h1>
      {/* <p>Name: {user.name}</p>
      <p>Address: {user.address}</p>
      <p>Phone: {user.phone}</p> */}
      <form onSubmit={handleSubmit}>
        <Complaints />
        <Symptoms />
        <Diagnosis />
        <Medicines />
        <Advices />
        <Facility />
        {/* <div>
          <label>Symptoms:</label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Medicines:</label>
          <textarea
            value={medicines}
            onChange={(e) => setMedicines(e.target.value)}
            required
          />
        </div> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MedicalReceipt;
