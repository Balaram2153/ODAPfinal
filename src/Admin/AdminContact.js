


import React, { useEffect, useState } from 'react';

import axios from 'axios';
import deleteDataById from './deleteDataById';
import FooterPage from '../Landpage/FooterPage';
import AdminDashboard from './AdminDashboard';
import { Link } from 'react-router-dom';
 
const AdminContact=()=>
{
   
const[ProfileData,setprofileData]=useState([]);

useEffect(() => {
  fetchData();
},[]);
  const fetchData =  () => {
    axios.get(`http://localhost:9099/getallcontacts`)
      .then((response)=>{
      console.log(response);
      setprofileData(response.data);
    })
      
    .catch((error)=> {
      console.error("Error fetching data:", error);
    });
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
                        <img src="https://tse3.mm.bing.net/th?id=OIP._R4XgIfrkq4ZFFF55wxhWQHaHa&pid=Api&P=0&h=180" alt="merkery_logo" style={{height:'200px',width:'950px'}} />
                </div>
                <div class="navi">
                    <ul>
                        <li><Link to="/admindoctor"><i class="bi bi-calendar2"></i>Doctor History</Link></li>
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
                       <li className='active'><Link to="/contact"><i class="bi bi-person-lines-fill"></i>Doctor Contact</Link></li>
                       <li ><Link to="/providers"><i class="bi bi-person-lines-fill"></i>Providers List</Link></li>

                        <li><Link to="/"><i class="bi bi-box-arrow-right"></i>Log-Out</Link></li>
                   
                        
                    </ul>
                </div>
            </div>
            <div className='container-fluid'>
                <div class="col-md-10 col-sm-11 hidden-xs display-table-cell v-align box display-table-cell v-align">
                <div class="row">
                    <header>
                   
                    <div className='profileimage' style={{backgroundImage:`url(https://www.wallpapertip.com/wmimgs/11-119970_medical-wallpapers-doctor-background-hd.jpg)`,height:'1000px'}}>
                <div className='container-fluid'>
                <br/>
                <p className='text-center fw-bold fs-2'>Doctor Contact History</p>       
           
      <table class="table table-striped">
        <thead>
        <tr>
          
          <th>Doctor ID</th>
          <th>Doctor Name</th>          
          <th>Doctor PhoneNumber</th>
          <th>Doctor Email</th>
          <th>Description</th>
     
          {/* <th>View</th> */}
          
      
        </tr>
        </thead>
        <tbody>
        {ProfileData.map((data)=>(         
       
        
            <tr key={data.doctorId}>
                         
              <td>{data.doctorId}</td>
              <td>{data.doctorName}</td>
              <td>{data.phoneNumber}</td>
              <td>{data.email}</td>
              <td>{data.description}</td>
           
              
            </tr>
         ) )
        }
        </tbody>
      </table>
      
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

export default AdminContact;

