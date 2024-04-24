

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDoctorDetails, setDoctorDetails } from '../Patient/Authstate';
import DDashboard from './DoctorDashboard1';
import FooterPage from '../Landpage/FooterPage';
import DoctorDashboard from './DoctorDashboard';



function DoctorProfile() {
 
  const [doctorProfile, setDoctorProfile] = useState([]);

  var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }  
    });
    
    var doctors = localStorage.getItem('loggedIn');

    // Convert the string back to an object
    var stored = JSON.parse(doctors);
    
    // Access the particular item within the response object
 
    var id=stored.doctorId;


  useEffect(() => {
    if (id) {
      fetch(`http://localhost:9099/api/Msdata/${id}`)
        .then((response) => response.json())
        .then((profileData) => {
          setDoctorProfile(profileData);
          console.log(profileData);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }
  }, []); 

  
  return (
    <>


<DoctorDashboard/>

  <div className='profileimage' style={{backgroundImage:`url(https://www.wallpapertip.com/wmimgs/11-119970_medical-wallpapers-doctor-background-hd.jpg)`,height:'600px'}}>
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-12'>
               <p className='text-center fw-bold fs-2'>Personal Information </p>
               {Object.keys(doctorProfile).length > 0 && (
                  <div className='profile' >
    
                <p><span className='fw-bold'>Doctor ID:</span> {doctorProfile.doctorId}</p>
                <p><span className='fw-bold'>Doctor Name:</span> {doctorProfile.doctorName}</p>
                <p><span className='fw-bold'>Specialization:</span> {doctorProfile.speciality}</p>
                <p><span className='fw-bold'>Mobile No:</span> {doctorProfile.phonenumber}</p>
                <p><span className='fw-bold'>Email:</span> {doctorProfile.email}</p>                
                <p><span className='fw-bold'>Experience:</span> {doctorProfile.experience}</p>               
                <p><span className='fw-bold'>Address Line1:</span> {doctorProfile.address1}</p>
                <p><span className='fw-bold'>Address Line2:</span> {doctorProfile.address2}</p>
                <p><span className='fw-bold'>Current WorkPlace:</span> {doctorProfile.currentworkplace}</p>
               
            </div>
          )}

        </div>
      </div>
    </div>
  </div>


<FooterPage/>
   
    </>
  );
}

export default DoctorProfile;
