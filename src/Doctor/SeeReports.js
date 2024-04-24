import FullScreenPDFViewer from "../FullViewPdf";
import { useState } from "react";
import { Link } from "react-router-dom";
import React, { useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import FooterPage from "../Landpage/FooterPage";
import DoctorDashboard from "./DoctorDashboard";
function SeeReports()
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
const fetchData =  () => {
  axios.get(`http://localhost:9902/Registration/getdoctor/${dname}`)
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
   


    const [showPDF, setShowPDF] = useState(false);
const togglePDF = () => {
  setShowPDF(!showPDF);
};


const sendEmailToPatient = async (file, patientEmail) => {
  const formData = new FormData();
    formData.append('file', file);
    formData.append('patientEmail', patientEmail);
    try {
      await axios.post('http://localhost:9902/Registration/sentreportemail', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert("Report sent successfully");
        console.log('Report sent to email successfully');
      } catch (error) {
        console.error('Error sending PDF email:', error);
      }
  
};


    return(

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
                        <li ><Link to='/patienthistory'><i class="bi bi-calendar2"></i>Log/History</Link></li>                    
                        <li class="active" ><Link to='/pdf'><i class="bi bi-person-lines-fill"></i>Patient Reports</Link></li>
                        <li ><Link to='/manage'><i class="bi bi-person-lines-fill"></i>Appointment and Management</Link></li>
                        <li ><Link to='/contactadmin'><i class="bi bi-person-lines-fill"></i>Contact Admin</Link></li>
                        <li ><Link to='/' onClick={handleNavigation}><i class="bi bi-box-arrow-right"></i>Logout</Link></li>
                    </ul>
                </div>
            </div>


      
            <div className='container-fluid'> 
                <div class="row">
                    <header>
                    <div class="col-md-12"style={{backgroundImage:`url(https://universalbackground.com/wordpress/wp-content/uploads/2016/07/shutterstock_111725270.jpg)`, backgroundSize: 'cover',  height: '120vh'}}>     
          <div className='profileimage' >
            <br/>
        <h5 style={{textAlign:'center', fontSize:'30px'}}>Patient Reports</h5>
  <div className='table'>
      <table class="table table-striped" style={{marginLeft:'30px',marginTop:'40px',color:'gray'}}>
        <thead>
        <tr>
          
          <th>Patient Name</th>  
          <th>Diagnostic Center</th>
          <th>Patient Email</th>  

          <th>Report</th>
        </tr>
        </thead>
        <tbody>
        {ProfileData.map((data)=>(         
       
        
            <tr key={data.id}>                         
            <td>{data.patientName} </td>
            <th>{data.diagnosticCenter}</th>
            <th>{data.patientEmail}</th>         

          <td>
              <FullScreenPDFViewer pdfData={data.file} />
          </td>
          {/* <td>
              <button onClick={() => sendEmailToPatient(data.file, data.patientEmail)}>Approve & Send Email</button>
          </td>  */}
                       
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




export default SeeReports;





  














