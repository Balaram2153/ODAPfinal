
import React, { useState,useEffect} from "react";
import axios from "axios";
import { getTechnicianDetails } from "../Patient/Authstate";



function ProfilesPopup({ show, handleClose, patient }) {
  const showHideClassName = show ? "popup display-block" : "popup display-none";

  const [patients,setpatients]=useState('');


  useEffect(() => {
    fetchData();
  },[]);
   const technician = getTechnicianDetails();
  const fetchData =  () => {
    axios.get(`http://localhost:9085/api/getname/${technician.typeofservices}`)
        .then((response)=>{
        console.log(response);
        setpatients(response.data);
      })
        
      .catch((error)=> {
        console.error("Error fetching data:", error);
      });
    };

  return (
    <div className={showHideClassName}>
      <section className="popup-main">
        <div>
          <h2>Profile Details</h2>
          <p><strong>Patient Name:</strong> {patient.patientName}</p>
          <p><strong>Patient ID:</strong> {patient.patientId}</p>
        </div>
        <button onClick={handleClose}>Close</button>
      </section>
    </div>
  );
}

export default ProfilesPopup;
