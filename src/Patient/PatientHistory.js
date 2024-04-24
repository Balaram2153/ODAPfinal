
import React, { useState, useEffect } from "react";
import axios from "axios";
import './PatientHistory.css';
import LandNav from "../Landpage/LandNav";
import FooterPage from "../Landpage/FooterPage";
import PatientNav from "./PatientNav";
import { getPatientDetails } from "./Authstate";

export default function PatientHistory() {
    const [patient, setpatient] = useState([]);

    
useEffect(() => {
    fetchData();
  },[]);
  const patientdet = getPatientDetails();
  const fetchData =  () => {
    axios.get(`http://localhost:9081/api/v1/get/${patientdet.patientName}`)
        .then((response)=>{
        console.log(response);
        setpatient(response.data);
      })
        
      .catch((error)=> {
        console.error("Error fetching data:", error);
      });
    };

 // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <>
    <PatientNav/>
    <div className="container1">
      <div className="table-responsive1">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Doctor Name</th>
              <th scope="col">Hospital Name</th>
              <th scope="col">Booking Date</th>
              <th scope="col">Booking Time</th>
              <th scope="col">Type of Service</th>
              <th scope="col">ReSchadule Slot</th>
              <th scope="col">Priscription</th>
            </tr>
          </thead>
          <tbody>
          {patient.map((data) => (
  <tr key={data.id}>
    {/* <th scope="row">{index + 1}</th> */}
    <td >{data.patientId}</td>
    <td >{data.patientMobileNumber}</td>
    <td>{data.patientEmail}</td>
    <td >{data.doctorName}</td>
    <td >{data.hospitalName}</td>
    <td>{data.bookingDate}</td>
    <td >{data.bookingTime}</td>
    <td >{data.typeofService}</td>
    <td >{data.Reschadule}</td>
    <td >{data.prescription}</td>
  </tr>
))}
          </tbody>
        </table>
      </div>
    </div>
    <FooterPage></FooterPage>
    </>
  );
}