import React from "react";
import PatientNav from "./PatientNav";
import FooterPage from "../Landpage/FooterPage";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import '..//Patient/search.css';

function SearchAddress()
{

    const [search, setSearch] = useState('');
    const [searchaddress,setsearchExperience]=useState('');
    const [doctors, setDoctors] = useState([]);

    
  var storedResponseString = localStorage.getItem('loggedIn');

  // Convert the string back to an object
  var storedResponse = JSON.parse(storedResponseString);
  
  // Access the particular item within the response object
  var particularItem = storedResponse.patientId;
  
const handleNavigation = () => {
  // Clear localStorage
  localStorage.clear();
};
useEffect(() => {
  // Fetch all doctors initially
  fetchDoctors();
}, []);

const fetchDoctors = async () => {
  try {
    const response = await axios.get('http://localhost:9099/api/getAll');
    setDoctors(response.data);
  } catch (error) {
    console.error('Error fetching doctors:', error);
  }
};

const filteredDoctors = doctors.filter(doctor =>
  doctor.address1.toLowerCase().includes(search.toLowerCase())
);

return (
    <>

  
<PatientNav/>


<div class="container-fluid display-table">
        <div class="row display-table-row">
            <div class="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box" style={{backgroundColor:'lightgreen'}} id="navigation">
                <div class="logo">
                  <img src="https://www.freeiconspng.com/thumbs/patient-icon/patient-icon-1.png" alt="merkery_logo" style={{height:'200px',width:'950px'}} />
                </div>
                <div class="navi">
                <ul>
                        <li class="active"><Link to='#'><i class="fa fa-home"></i> ID :{particularItem}</Link></li>
                        <li ><Link to="/patientdashboard"><i class="bi bi-house-fill" ></i>Features</Link></li>
                        <li ><Link to="/profile"> <i class="bi bi-person-fill" ></i>Profile</Link></li>
                        <li class="active"><Link to="/search"> <i class="bi bi-search" ></i>Search</Link></li>
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="bi bi-calendar2-fill"></i> Appointments</a>
                        <ul className="dropdown">
                           <li><Link to="/appointments">Consultation Appointments</Link></li>
                           <li><Link to="/medicalappointments">Medical Appointment</Link></li>
                           <li><Link to="/diagnosticappointment">Diagnostic Appointment</Link></li>                          
                        </ul>
                        </li>
                        <li ><Link to='/login' onClick={handleNavigation}><i class="bi bi-box-arrow-right"></i>Logout</Link></li>
                    </ul>
                </div>
            </div>


            <div class="col-md-10 col-sm-11 display-table-cell v-align">
            <div className='container-fluid'> 
                <div class="row">
                    <header>
                  <div class="col-md-12"> 



  <div>
  <h1>Doctors Search </h1>
            <div>
            <input
                type="text"
                placeholder="Search by specialty"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            
           
            
          </div>
           
             <div className="doctor-cards">
                {filteredDoctors.map(doctor => (
                    <div key={doctor.doctorId} className="doctor-card">
                        <h2>Dr.{doctor.doctorName}</h2>
                        <p>Speciality: {doctor.speciality}</p>
                        <p>Hospital: {doctor.hospitalName}</p>
                        <p>Experience: {doctor.experience}</p>
                        <p>Registered Number: {doctor.registrationnumber} </p>
                        <p>Registered Year: {doctor.registrationyear}</p>
                        <p>Registered Council: {doctor.registrationcouncil} </p>
                        <p>Degree: {doctor.degree}</p>
                        <p>Address: {doctor.address1}</p>
                        {/* Add more details as needed */}
                    </div>
                ))}
              
            </div>
    </div>







</div>
</header>
</div>

</div>  
</div>
</div>

</div>
<FooterPage/>
</>
)
}

export default SearchAddress;