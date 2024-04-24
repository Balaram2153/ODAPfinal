// Technicianpatientslot.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Technicianpatientslot.css"; 
import FooterPage from "../Landpage/FooterPage";
import Techniciannavbar from "../Landpage/Techniciannavbar";
import TechProfilePopup1 from "./TechProfilepopup1";
import ReportFormPopup from "./ReportFormPopup";

export default function Technicianpatientslot() {
  const [patients, setPatients] = useState([]);
  const [selectedPatientForProfile, setSelectedPatientForProfile] = useState(null);
  const [selectedPatientForReport, setSelectedPatientForReport] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [patientId, setPatientId] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://localhost:8080/api/patients/all`)
      .then((response) => {
        console.log("Response Data:", response.data);
        setPatients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const openProfilePopup = (data) => {
    console.log("Opening profile popup for patient:", data);
    setSelectedPatientForProfile(data);
    fetchPatientDetails(data.patientId); 
    setPatientId(data.patientId);
  };

  const openReportPopup = (patient) => {
    setSelectedPatientForReport(patient);
    fetchPatientDetails(patient.patientId);
  };

  const fetchPatientDetails = (patientId) => {
    console.log("Fetching patient details for patient ID:", patientId);
    axios
      .get(`http://localhost:8098/get/${patientId}`)
      .then((response) => {
        console.log("Patient Details:", response.data);
        setPatientDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching patient details:", error);
      });
  };

  const closeProfilePopup = () => {
    setSelectedPatientForProfile(null);
    setPatientDetails(null);
  };

  const closeReportPopup = () => {
    setSelectedPatientForReport(null);
    setPatientDetails(null);
  };

  return (
    <>
      <Techniciannavbar />
      <div className="container-fluid d-flex flex-row">
        <div className="col-2 technicianSidebar">
          <img src="technician.jpg" className="technicianimg" alt="Technician" />
          <p><Link to='/technicianDashboard'>Profile</Link></p>
          <p><Link to='/Technicianpatientslot'>Patient slots</Link></p>
          <p><Link to='/medicalslots'>Medical slots</Link></p>
          <p><Link to='/Techniciansendreports'>Send reports</Link></p>
          <p><Link to='/Technicianlandpage'>Logout</Link></p>
        </div>
        <div className="col-10">
          <div className="container" style={{ backgroundColor: "white" }}>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">Patient Name</th>
                    <th scope="col">Appointment Ref ID</th>
                    <th scope="col">Diagnostic center</th>
                    <th scope="col">PatientID</th>
                    <th scope="col">Booking date</th>
                    <th scope="col">Booking time</th>
                    <th scope="col">Test details</th>
                    <th scope="col">Mobile number</th>
                    <th scope="col">Patient Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.appointmentRefId}>
                      <td>{patient.patientName}</td>
                      <td>{patient.appointmentRefId}</td>
                      <td>{patient.diagnosticCenter}</td>
                      <td>{patient.patientId}</td>
                      <td>{patient.bookingDate}</td>
                      <td>{patient.bookingTime}</td>
                      <td>{patient.tests}</td>
                      <td>{patient.patientMobileNumber}</td>
                      <td>{patient.patientEmail}</td>
                      <td>{patient.address}</td>
                      <td className="d-flex">
                        <button style={{ marginRight: "5px" }} onClick={() => openProfilePopup(patient)}>
                          View Profile
                        </button>
                        <button onClick={() => openReportPopup(patient)}>
                          Create Report
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <FooterPage />


      {selectedPatientForProfile && (
        <TechProfilePopup1
          patient={selectedPatientForProfile}
          onClose={closeProfilePopup}
          patientId={patientId}
          patientDetails={patientDetails}
        />
      )}
      {selectedPatientForReport && (
        <ReportFormPopup
          patient={selectedPatientForReport}
          onClose={closeReportPopup}
          patientDetails={patientDetails}
        />
      )}
    </>
  );
}
