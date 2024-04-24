import React from "react";
import "./ProfilePopup.css";
const ProfilePopup = ({ patient, onClose }) => {
  console.log(patient); // Check if patient data is logged properly

  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Patient Profile</h2>
        {patient && (
          <>
            <p>Patient Name: {patient.patientName}</p>
            <p>Patient ID: {patient.patientId}</p>
            <p>Patient Mobile Number: {patient.patientMobileNumber}</p>
            <p>Hospital Name: {patient.hospitalName}</p>
            <p>Type of Service: {patient.typeOfService}</p>
            <p>Patient Description: {patient.patientDescription}</p>
            <p>Slot Time: {patient.bookingTime}</p>
            <p>Booking Date: {patient.bookingDate}</p>

            <p>Web Link: {patient.webLink}</p>
            <p>Type of Service: {patient.typeOfService}</p>
            <p>Specialization: {patient.speciality}</p>
            <p>Total Fee: {patient.totalFee}</p>
            <p>Gender: {patient.gender}</p>
            <p>Chronic Disease: {patient.chronicDisease}</p>
            <p>Age: {patient.age}</p>
            <p>Address: {patient.address}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePopup;
