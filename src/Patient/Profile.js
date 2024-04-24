
import React, { useEffect, useState } from 'react';
import {getPatientDetails } from './Authstate';
import PatientNav from './PatientNav';
import { Link } from 'react-router-dom';
import FooterPage from '../Landpage/FooterPage';

function Profile() {
 
  const [patientProfile, setPatientProfile] = useState([]);

  
var storedResponseString = localStorage.getItem('loggedIn');

// Convert the string back to an object
var storedResponse = JSON.parse(storedResponseString);

// Access the particular item within the response object
var particularItem = storedResponse.patientId;
var name= storedResponse.patientName;
var phone= storedResponse.patientMobileNumber;
var mail= storedResponse.patientEmail;
var disease =storedResponse.chronicDisease;
var pin=storedResponse.pincode;
var city =storedResponse.city;
var st=storedResponse.state;


const handleNavigation = () => {
  // Clear localStorage
  localStorage.clear();
};

  useEffect(() => {
    const patientDetails = getPatientDetails();
    if (patientDetails) {
      fetch(`http://localhost:8098/get/${particularItem}`)
        .then((response) => response.json())
        .then((profileData) => {
          setPatientProfile(profileData);
          console.log(profileData);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }
  }, []); 

  
const [isDropdownOpen, setIsDropdownOpen] = useState(false);

// Function to toggle dropdown visibility
const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
};

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
                        <li class="active"><Link to="/profile"> <i class="bi bi-person-fill" ></i>Profile</Link></li>
                        <li ><Link to="/search"> <i class="bi bi-search" ></i>Search</Link></li>
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" onClick={toggleDropdown}>
                               <i className="bi bi-calendar2-fill"></i> Appointments
                            </a>
          {/* Dropdown content */}
                      {isDropdownOpen && (
                         <ul className="dropdown">
                      <li>
                       <Link to="/appointments">Consultation Appointments</Link>
                      </li>
                      <li>
                      <Link to="/medicalappointments">Medical Appointment</Link>
                      </li>
                      <li>
                      <Link to="/diagnosticappointment">Diagnostic Appointment</Link>
                      </li>
                   </ul>
                      )}
                    </li>
                        <li ><Link to='/' onClick={handleNavigation}><i class="bi bi-box-arrow-right"></i>Logout</Link></li>
                    </ul>
                </div>
            </div>


            <div class="col-md-10 col-sm-11 display-table-cell v-align">
            <div className='container-fluid'> 
            <div className='profileimage' style={{backgroundImage:`url(https://www.wallpapertip.com/wmimgs/11-119970_medical-wallpapers-doctor-background-hd.jpg)`,height:'1000px'}}>

                {/* <div class="row">
                    <header>
                  <div class="col-md-12">  */}
   

    {/* <div className='container-fluid'>
        <div className='row'>
            <div className='col-12'> */}
              <br/>
              <br/>
               <p className='text-center fw-bold fs-2'>Personal Information </p>
              
                <div className='profile' style={{paddingLeft:'20px'}} >
    
                <p><span className='fw-bold'>Patient ID:</span> {particularItem}</p>
                <p><span className='fw-bold'>Patient Name:</span> {name}</p>
                <p><span className='fw-bold'>Mobile No:</span> {phone}</p>
                <p><span className='fw-bold'>Email:</span> {mail}</p>                
                <p><span className='fw-bold'>Chronic Disease:</span> {disease}</p>               
                <p><span className='fw-bold'>city:</span> {city}</p>
                <p><span className='fw-bold'>state:</span> {st}</p>
                <p><span className='fw-bold'>Pincode:</span> {pin}</p>
               
            </div>
       
        {/* </div> */}
      {/* </div>
    </div>
  </div> */}

     
{/*   
</header>
</div> */}
</div>
</div>  
</div>
</div>

</div>
<FooterPage/>
   
    </>
  );
}

export default Profile;
