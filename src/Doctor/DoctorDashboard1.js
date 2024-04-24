import { getDoctorDetails } from "../Patient/Authstate";
import React from "react";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import'./Ddashboard.css';
import '../App.css';
import FooterPage from "../Landpage/FooterPage";
import DoctorDashboard from "./DoctorDashboard";

function DDashboard()
{

    const doctor=getDoctorDetails();
    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }  
    });
    
const [patientId, setPatientId] = useState('');
const [patientsData, setPatientsData] = useState(null);
const [error, setError] = useState(null);

  
const handleNavigation = () => {
    // Clear localStorage
    localStorage.clear();
  };


const fetchPatientData = async () => {
    try {
        const response = await axios.get(`http://localhost:8098/get/${patientId}`);
        setPatientsData(response.data);
        setError(null);
    } catch (error) {
        setError(`Failed to fetch data for patient with ID ${patientId}. Error: ${error.message}`);
        setPatientsData(null);
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
                        <li class="active"><Link to="/ddashboard"><i class="bi bi-house-fill" ></i>Home</Link></li>
                        <li ><Link to="/slots"><i class="bi bi-calendar2-fill"></i>Booked Appointments</Link></li>
                        {/* <li ><Link to="/treat"><i class="bi bi-prescription"></i>Treatment</Link></li> */}
                        <li ><Link to='/patienthistory'><i class="bi bi-calendar2"></i>Log/History</Link></li>
                        <li ><Link to='/pdf'><i class="bi bi-person-lines-fill"></i>Patient Reports</Link></li>
                        <li ><Link to='/manage'><i class="bi bi-person-lines-fill"></i>Appointment and Management</Link></li>
                        <li ><Link to='/contactadmin'><i class="bi bi-person-lines-fill"></i>Contact Admin</Link></li>
                        <li ><Link to='/' onClick={handleNavigation}><i class="bi bi-box-arrow-right"></i>Logout</Link></li>

                </ul>

                
                </div>
            </div>
            <div class="col-md-10 col-sm-11 display-table-cell v-align" >
                <div class="row">
                    <header>
                        <div class="col-md-10" style={{marginLeft:'80px'}}>     

                        <h5 style={{textAlign:'center',fontSize:'30px'}}>Search Patient Data</h5>
                            <div class="search hidden-xs hidden-sm">
                   
                            <input type="text" value={patientId} onChange={(e) => setPatientId(e.target.value)} placeholder="Enter Patient ID" />
                            <button onClick={fetchPatientData}>Fetch Data</button>

                            
                            <table class="table table-striped">
        <thead>
        <tr>
        <th>
          <td>Patient ID</td>
          <td>Patient Name</td>          
          <td>Patient Email</td>
          <td>Patient PhoneNumber</td>
          <td>Blood Group</td>
          <td>Address</td>
          <td>Disease</td>
          <td>Gender</td>
        </th> 
      
        </tr>
        </thead>
        <tbody>
        
                                {error && <p>{error}</p>}
                                    {patientsData && (
                                    <div>
                                    <tr>
                                        <td>{patientsData.patientId}</td>
                                        <td>{patientsData.patientName}</td>
                                        <td>{patientsData.patientEmail}</td>
                                        <td>{patientsData.patientMobileNumber}</td>
                                        <td>{patientsData.bloodGroup}</td>
                                        <td>{patientsData.addressLine1}</td>
                                        <td>{patientsData.chronicDisease}</td>
                                        <td>{patientsData.gender}</td>
                                    </tr>
                                    </div>
                                        )}
      
        </tbody>
      </table>



                        </div>
 
                                            {/* <button type="button" className="btn btn-primary" onClick={handleAddWeeklyUpdate}>Add Weekly Update</button> */}


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

export default DDashboard;





        