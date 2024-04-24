

import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import DoctorDashboard from './DoctorDashboard';
import { getDoctorDetails } from '../Patient/Authstate';
import FooterPage from '../Landpage/FooterPage';
import { Link } from 'react-router-dom';

 
const DoctorHistory=()=>
{
   
const[ProfileData,setprofileData]=useState([]);


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
var dname = stored.doctorName;
var spec=stored.speciality;
var id=stored.doctorId;
          
useEffect(() => {
  fetchData();
},[]);
const doctor = getDoctorDetails();
const fetchData =  () => {
  axios.get(`http://localhost:8092/name/${dname}`)
      .then((response)=>{
      console.log(response);
      setprofileData(response.data);
    })
      
    .catch((error)=> {
      console.error("Error fetching data:", error);
    });
  };

    
const handleNavigation = () => {
  // Clear localStorage
  localStorage.clear();
};



// Empty dependency array ensures useEffect runs only once on component mount

  
    return (
      <>


    <DoctorDashboard/>      
     
     

        <div class="container-fluid display-table">
        <div class="row display-table-row">
        <div class="col-md-1 col-sm-1 hidden-xs display-table-cell v-align box" id="navigation">
                <div class="logo">
                        <img src="https://tse4.mm.bing.net/th?id=OIP.XsFTO6Tr5I4mfdTm3qsmBQAAAA&pid=Api&P=0&h=180" alt="merkery_logo" style={{height:'180px',width:'300px',borderRadius:'50%'}} />
                </div>
                <div class="navi">
                    <ul>
                         <li><Link to="/ddashboard"><i class="bi bi-house-fill" ></i>Home</Link></li>
                        <li ><Link to="/slots"><i class="bi bi-calendar2-fill"></i>Booked Appointments</Link></li>
                        {/* <li ><Link to="/treat"><i class="bi bi-prescription"></i>Treatment</Link></li> */}
                        <li class="active"><Link to='/patienthistory'><i class="bi bi-calendar2"></i>Log/History</Link></li>
                        <li ><Link to='/pdf'><i class="bi bi-person-lines-fill"></i>Patient Reports</Link></li>
                        <li ><Link to='/manage'><i class="bi bi-person-lines-fill"></i>Appointment and Management</Link></li>
                        <li ><Link to='/contactadmin'><i class="bi bi-person-lines-fill"></i>Contact Admin</Link></li>
                        <li ><Link to='/' onClick={handleNavigation}><i class="bi bi-box-arrow-right"></i>Logout</Link></li>

                    </ul>
                </div>
            </div>


            <div class="col-md-10 col-sm-11 display-table-cell v-align">
            <div className='container-fluid'> 
                <div class="row">
                    <header>
                  <div class="col-md-12">     
  
    <div className='profileimage' style={{backgroundImage:`url(https://www.wallpapertip.com/wmimgs/11-119970_medical-wallpapers-doctor-background-hd.jpg)`,height:'1000px'}}>
      <div className='container-fluid'>      
      <div className='doctor-info1 d-flex'>
                <div className='doctor-pic1'>
                    <img src='http://clipart-library.com/img/1306694.png' style={{height:"200px",width:'250px'}} alt='Doctor' />
                   
                </div>
                <div className='container-fluid'>
                  <div className='doctor-details1 p-5'>
                  <p>Doctor ID: {id}</p>
                  <p>Doctor Name: {dname}</p>
                  <p>Specialization: {spec}</p>
                  </div>
                </div>
            </div>
          <div className='row'>
              <div className='col-12'>
                 <p className='text-center fw-bold fs-2'> History</p>
         
  
  <div className='table'>
      <table class="table table-striped">
        <thead>
        <tr>
          <th>Date</th>         
          <th>Patient Email</th>
          <th>Patient Name</th>               
          <th>Prognosis</th>
          <th>Recommended Test</th>
          <th>Followup Date</th>


        </tr>
        </thead>
        <tbody>
        {ProfileData.map((data)=>(                
        
            <tr key={data.id}>                         
              <td>{data.bookingDate}</td>             
              <td>{data.patientEmail}</td>
              <td>{data.patientName}</td>                     
              <td>{data.prognosis}</td>   
              <td>{data.recommendedTest}</td> 
              <td>{data.followupDate}</td>          
            </tr>
         ) )
        }
        </tbody>
      </table>
    </div>
          </div>
        </div>
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

export default DoctorHistory;

