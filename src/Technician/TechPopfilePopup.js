// TechProfilePopup.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TechProfilePopup.css';

export default function TechProfilePopup({ patient, onClose, patientDetails }) {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (patientDetails) {
            fetchPatientDetails(patientDetails.patientId);
        }
    }, [patientDetails]);
    
    const fetchPatientDetails = (patientId) => {
        axios
          .get(`http://localhost:8098/get/${patientId}`)
          .then((response) => {
            console.log(response);
            setProfile(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      };

    const handleClose = () => {
        onClose(); 
    };

    return (
        <>
            {profile && (
                <div className="cart-overlay">
                    <div className="cart-page">
                        <div className="cart-items">
                            <div className="patient-details">
                                <h2>Patient Details</h2>
                                <p><strong>Patient Name:</strong> {profile.patientName}</p>
                                <p><strong>Patient ID:</strong> {profile.patientId}</p>
                                <p><strong>Mobile number:</strong> {profile.patientMobileNumber}</p>
                                <p><strong>Blood group:</strong> {profile.bloodGroup}</p>
                                <p><strong>Medical Information:</strong> {profile.medicalInformation}</p>
                                <p><strong>Diseases:</strong> {profile.chronicDisease}</p>
                                <p><strong>AddressLine1:</strong> {profile.addressLine1}</p>
                                <p><strong>AddressLine2:</strong> {profile.addressLine2}</p>
                                <p><strong>City:</strong> {profile.addressLine2}</p>
                                <p><strong>Gender:</strong> {profile.gender}</p>
                                <p><strong>Medical insurance:</strong> {profile.medicalInsurances}</p>
                            </div>
                        </div>
                        <button className="close-button" style={{ marginLeft: "270px" }} onClick={handleClose}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
}
