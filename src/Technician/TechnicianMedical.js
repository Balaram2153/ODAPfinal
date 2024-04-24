import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Technicianpatientslot.css";
import FooterPage from "../Landpage/FooterPage";
import Techniciannavbar from "../Landpage/Techniciannavbar";
// import ProfilePopup from "./ProfilePopup";
import ReportPopup from "./ReportPopup";
import TechProfilePopup from "./TechPopfilePopup";

 export default function MedicalSlots() {
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
      .get(`http://localhost:9085/api/Msdata`)
      .then((response) => {
        console.log("Response Data:", response.data);
        setPatients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const openProfilePopup = (data) => {
    setSelectedPatientForProfile(data);
    fetchPatientDetails(data.medicalid);
    setPatientId(data.patientId);
  };

  const openReportPopup = (patient) => {
    setSelectedPatientForReport(patient);
    fetchPatientDetails(patient.medicalid);
  };


  const fetchPatientDetails = (medicalId) => {
    axios
      .get(`http://localhost:9085/api/Msdata/${medicalId}`)
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
                <img src="technician.jpg" className="technicianimg"></img>
                <p><Link to='/technicianDashboard'>Profile</Link></p>
                <p><Link to='/Technicianpatientslot'>Patient slots</Link></p>
                <p><Link to='/medicalslots'>Medical slots</Link></p>
                {/* <p><Link to='/Technicianreportform'>Report form</Link></p> */}
                <p><Link to='/Techniciansendreports'>Send reports</Link></p>
                <p><Link to='/Technicianlandpage'>Logout</Link></p>
            
            </div>
        <div className="col-10">
          <div>
            <div className="container" style={{ backgroundColor: "white" }}>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">BookingId</th>
                      <th scope="col">PatientId</th>
                      <th scope="col">Patient Name</th>
                      <th scope="col">Type of services</th>
                      <th scope="col">Booking date</th>
                      <th scope="col">Booking time</th>
                      <th scope="col">Mobile Number</th>
                      <th scope="col">Patient Email</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient) => (
                      <tr key={patient.medicalid}>
                        <td>{patient.medicalid}</td>
                        <td>{patient.patientId}</td>
                        <td>{patient.patientName}</td>
                        <td>{patient.typeofservices}</td>
                        <td>{patient.bookingdate}</td>
                        <td>{patient.slottime}</td>
                        <td>{patient.patientMobileNumber}</td>
                        <td>{patient.email}</td>
                        <td className="d-flex">
                          <button
                            style={{ marginRight: "5px" }}
                            onClick={() => openProfilePopup(patient)}
                          >
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
      </div>
      <FooterPage />
    

      {selectedPatientForProfile && (
        <TechProfilePopup
          patient={selectedPatientForProfile}
          onClose={closeProfilePopup}
          patientId={patientId}
          patientDetails={patientDetails}
        />
      )}
      {selectedPatientForReport && (
        <ReportPopup
          patient={selectedPatientForReport}
          onClose={closeReportPopup}
          patientDetails={patientDetails}
         
        />
      )}
    </>
  );
}

