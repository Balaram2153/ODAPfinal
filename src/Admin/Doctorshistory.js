

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import deleteDataById from './deleteDataById';
import FooterPage from '../Landpage/FooterPage';
import AdminDashboard from './AdminDashboard';
import { Link } from 'react-router-dom';

 
const Doctorshistory=()=>
{
   
const[ProfileData,setprofileData]=useState([]);

useEffect(() => {
  fetchData();
},[]);
  const fetchData =  () => {
    axios.get(`http://localhost:9081/api/v1/all`)
      .then((response)=>{
      console.log(response);
      setprofileData(response.data);
    })
      
    .catch((error)=> {
      console.error("Error fetching data:", error);
    });
  };



  const handleDeleteById = async (appointmentId) => {
    try {
      await deleteDataById(appointmentId);
      setprofileData((prevData) => prevData.filter(data => data.appointmentId !== appointmentId));
    } catch (error) {
      // Handle error if needed
    }
  };

  
const [isDropdownOpen, setIsDropdownOpen] = useState(false);

// Function to toggle dropdown visibility
const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
};


  
  
    return (
      <>

<AdminDashboard/>

<div class="container-fluid display-table" >
        <div class="row display-table-row">
            <div class="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box" id="navigation" style={{backgroundColor:"lightblue"}}>
                <div class="logo">
                        <img src="https://tse3.mm.bing.net/th?id=OIP._R4XgIfrkq4ZFFF55wxhWQHaHa&pid=Api&P=0&h=180"  className='img-fluid'   />
                </div>
                <div class="navi">
                    <ul>
                    <li class="active"><Link to="/admindoctor"><i class="bi bi-calendar2"></i>Doctor History</Link></li>
                        <li><Link to="/adminpatienthistory"> <i class="bi bi-calendar2"></i>Patient History</Link></li>
                        <li><Link to="/tech"> <i class="bi bi-calendar2"></i>Technician History</Link></li>
                        <li className="dropdown">
          <a href="#" className="dropdown-toggle" onClick={toggleDropdown}>
            <i className="bi bi-calendar2-fill"></i> Payments
          </a>
          {/* Dropdown content */}
          {isDropdownOpen && (
            <ul className="dropdown">
              <li ><Link to="/paymenthistory"> <i class="bi bi-calendar2"></i>Payment Diagnostic</Link></li>
              <li><Link to="/consultpayment"> <i class="bi bi-calendar2"></i>Payment Consultation</Link></li>
              <li ><Link to="/medicalspayment"> <i class="bi bi-calendar2"></i>Payment Medical</Link></li>                     
            </ul>
          )}
        </li>      
                                          <li ><Link to="/contact"><i class="bi bi-person-lines-fill"></i>Doctor Contact</Link></li>
                                          <li ><Link to="/providers"><i class="bi bi-person-lines-fill"></i>Providers List</Link></li>

                        <li><Link to="/"><i class="bi bi-box-arrow-right"></i>Log-Out</Link></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-10 col-sm-11 hidden-xs display-table-cell v-align">
                <div class="row">
                    <header>
                        <div class="col-md-12">

    <div className='profileimage' >
      <div className='container-fluid'>
       <br/>
          <p className='text-center fw-bold fs-2'>Admin Doctor History</p>       
           
          <Link to="/doctorregister"><button>Add Doctor</button></Link>
      <table class="table table-striped">
        <thead>
        <tr>
          
          <th>Doctor Name</th>
          <th>Hospital Name</th>
          <th>Appointment ID</th>
          <th>Date</th>
          <th>Slot time</th>
          <th>Patient Email</th>
          <th>Patient PhoneNumber</th>
          <th>Patient ID</th>
          <th>Doctor Specialization</th>
          <th>Update</th>
          <th>Delete</th>
          {/* <th>View</th> */}
          
      
        </tr>
        </thead>
        <tbody>
        {ProfileData.map((data)=>(         
       
        
            <tr key={data.doctorId}>
                         
              <td>{data.doctorName}</td>
              <td>{data.hospitalName}</td>
              <td>{data.appointmentId}</td>
              <td>{data.bookingDate}</td>
              <td>{data.bookingTime}</td>
              <td>{data.patientEmail}</td>
              <td>{data.patientMobileNumber}</td>
              <td>{data.patientId}</td>
              <td>{data.speciality}</td>       
              <td><Link to={`/updateslot?appointmentId=${data.appointmentId} & patientemail=${data.patientEmail}`}><button type='submit'>Update</button></Link></td>

              <td><button type='submit' onClick={() => handleDeleteById(data.appointmentId)}>Delete</button></td>
              
            </tr>
         ) )
        }
        </tbody>
      </table>
  
    </div>
          </div>

          
          </div>
                    </header>
                </div>
                
            </div>
        </div>

    </div>

   
   <FooterPage/>

        </>
    )
}

export default Doctorshistory;

