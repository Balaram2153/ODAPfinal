import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import React from "react";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";
import FooterPage from "../Landpage/FooterPage";


function ConsultationPayment()
{
    const [History, setHistory] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [diagnostic, setDiagnostic] = useState([]);
    const [medical,setMedical]=useState([]);
   

    useEffect(() => {
        fetchDiagnostic();
        
    }, []);

    

    const fetchDiagnostic = async () => {
        try {
            const response = await axios.get('http://localhost:9081/allpayments');
            setDiagnostic(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const filterData = () => {
        const filteredData = diagnostic.filter(patient => {
            const bookingDate = new Date(patient.bookingDate);
            const start = new Date(startDate);
            const end = new Date(endDate);
            return bookingDate >= start && bookingDate <= end;
        });
        return filteredData;
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
                        <li ><Link to="/tech"> <i class="bi bi-calendar2"></i>Technician History</Link></li>
                        <li className="dropdown">
          <a href="#" className="dropdown-toggle" onClick={toggleDropdown}>
            <i className="bi bi-calendar2-fill"></i> Payments
          </a>
          {/* Dropdown content */}
          {isDropdownOpen && (
            <ul className="dropdown">
              <li ><Link to="/paymenthistory"> <i class="bi bi-calendar2"></i>Payment Diagnostic</Link></li>
              <li className="active"><Link to="/consultpayment"> <i class="bi bi-calendar2"></i>Payment Consultation</Link></li>
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
                        <div class="col-md-12">

    <div className='profileimage' >
      <div className='container-fluid'>
       <br/>
       <div className="container" style={{width:'500px',backgroundColor:'white'}}>
                                            <label>Start Date:</label>
                                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                            <label>End Date:</label>
                                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                            <button onClick={fetchDiagnostic}>Filter</button>
                                        </div>
          
                <p className='text-center fw-bold fs-2'>Consultation Payment History</p>
                <table className="table table-hover">
                    <thead>
                        <tr>
                           
                            <th>Transaction ID</th>
                            <th>Patient Name</th>
                            <th>Booking Date</th>
                            <th>Booking Time</th>
                            <th>Doctor Name</th>
                            <th>Speciality</th>
                            <th>Type of Service</th>
                            <th>Patient Mobile</th>
                            <th>Amount</th>
                        
                            
                        </tr>
                    </thead>
                    <tbody>
                    {filterData().map(patient => (
                            <tr key={patient.patientId}>
                                <td>{patient.transactionID}</td>
                                <td>{patient.patientName}</td>
                                <td>{patient.bookingDate}</td>
                                <td>{patient.bookingTime}</td>
                                <td>{patient.doctorName}</td>
                                <td>{patient.speciality}</td>
                                <td>{patient.typeOfService}</td>
                                <td>{patient.patientMobileNumber}</td>
                                <td>{patient.totalFee}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
              </div>
</div>

            </div>
            </div>
        </div>
</div>
</div>

            
        <FooterPage/>
        
        </>
    )
}


export default ConsultationPayment;