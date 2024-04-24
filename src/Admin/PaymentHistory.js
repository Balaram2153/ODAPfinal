import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";
import FooterPage from "../Landpage/FooterPage";

function PaymentHistory() {
    const [diagnostic, setDiagnostic] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // useEffect(() => {
    //     fetchDiagnostic();
    // }, []);

    const fetchDiagnostic = async () => {
    
        try {           
            
            if (!startDate || !endDate) {
                alert("Please select both start date and end date.");
                return []; 
              }
              
              const start = new Date(startDate);
              const end = new Date(endDate);
      
              // Check if any future date is selected
              if (start > new Date() || end > new Date()) {
                  alert("Future dates are not allowed.");
                  return;
              }
             
            const response = await axios.get('http://localhost:8080/api/patients/getpayments');
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
            <AdminDashboard />
            <div className="container-fluid display-table">
                <div className="row display-table-row">
                    {/* Sidebar */}
                    <div className="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box" id="navigation" style={{ backgroundColor: "lightblue" }}>
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
              <li className="active"><Link to="/paymenthistory"> <i class="bi bi-calendar2"></i>Payment Diagnostic</Link></li>
              <li><Link to="/consultpayment"> <i class="bi bi-calendar2"></i>Payment Consultation</Link></li>
              <li ><Link to="/medicalspayment"> <i class="bi bi-calendar2"></i>Payment Medical</Link></li>                     
            </ul>
          )}
        </li>        
                                     <li ><Link to="/contact"><i class="bi bi-person-lines-fill"></i>Doctor Contact</Link></li>
                                     <li ><Link to="/providers"><i class="bi bi-person-lines-fill"></i>Providers List</Link></li>

                        <li><Link to="/"><i class="bi bi-box-arrow-right"></i>Log-Out</Link></li>
                   
                    </ul>
                </div>                    </div>

                    {/* Main Content */}
                    <div className="col-md-10 col-sm-11 hidden-xs display-table-cell v-align">
                        <div className="row">
                            <div className="col-md-12">
                                <div className='profileimage'>
                                    <div className='container-fluid'>
                                        <br />
                                        <p className='text-center fw-bold fs-2'>Diagnostic Payment History</p>
                                        
                                        {/* Date Filter */}
                                        <div className="container" style={{width:'500px',backgroundColor:'white'}}>
                                            <label>Start Date:</label>
                                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                            <label>End Date:</label>
                                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                            <button onClick={fetchDiagnostic}>Filter</button>
                                        </div><br/><br/>

                                        {/* Table */}
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Patient Name</th>
                                                    <th>Diagnostic Center</th>
                                                    <th>Booking Date</th>
                                                    <th>Booking Time</th>
                                                    <th>Tests</th>
                                                    <th>Address</th>
                                                    <th>Collection</th>
                                                    <th>Patient Mobile</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filterData().map(patient => (
                                                    <tr key={patient.patientId}>
                                                        <td>{patient.patientName}</td>
                                                        <td>{patient.diagnosticCenter}</td>
                                                        <td>{patient.bookingDate}</td>
                                                        <td>{patient.bookingTime}</td>
                                                        <td>{patient.tests}</td>
                                                        <td>{patient.addressLine1}</td>
                                                        <td>{patient.collection}</td>
                                                        <td>{patient.patientMobileNumber}</td>
                                                        <td>{patient.amount}</td>
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

            <FooterPage />
        </>
    )
}

export default PaymentHistory;
