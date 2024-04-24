import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FooterPage from '../Landpage/FooterPage';
import AdminDashboard from './AdminDashboard';

const AdminPatientHistory = () => {
    const [patientHistory, setPatientHistory] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [slots, setSlots] = useState([]);


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedRows, setExpandedRows] = useState([]);

    useEffect(() => {
        fetchPatientHistory();
        fetchData();
        // fetchSlots();
    }, []);

    const fetchPatientHistory = () => {
        axios.get('http://localhost:8098/getall/patients')
            .then(response => {
                setPatientHistory(response.data);
            })
            .catch(error => {
                console.error('Error fetching patient history:', error);
            });
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:9081/api/v1/all');
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    // const fetchSlots = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8080/api/patients/all');
    //         setSlots(response.data);
    //     } catch (error) {
    //         console.error('Error fetching slots:', error);
    //     }
    // };


    const handleDelete = async (patientId) => {
            
        try {            
            await axios.delete(`http://localhost:8098/api/delete/${patientId}`);
            setPatientHistory(patientHistory.filter(patient => patient.patientId !== patientId));
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

    
const [isDropdownOpen, setIsDropdownOpen] = useState(false);

// Function to toggle dropdown visibility
const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
};

const toggleRowExpansion = (index) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(index)
        ? prevExpandedRows.filter((rowIndex) => rowIndex !== index)
        : [...prevExpandedRows, index]
    );
  };

    return (
        <>
            <AdminDashboard />
            
            <div class="container-fluid display-table" >
        <div class="row display-table-row">
            <div class="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box" id="navigation" style={{backgroundColor:"lightblue"}}>
                <div class="logo">
                        <img src="https://tse3.mm.bing.net/th?id=OIP._R4XgIfrkq4ZFFF55wxhWQHaHa&pid=Api&P=0&h=180" alt="merkery_logo" style={{height:'200px',width:'950px'}} />
                </div>
                <div class="navi">
                    <ul>
                    <li><Link to="/admindoctor"><i class="bi bi-calendar2"></i>Doctor History</Link></li>
                        <li className="active"><Link to="/adminpatienthistory"> <i class="bi bi-calendar2"></i>Patient History</Link></li>
                        <li ><Link to="/tech"> <i class="bi bi-calendar2"></i>Technician History</Link></li>
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
                        <div class="col-md-12">

    <div className='profileimage' >
      <div className='container-fluid'>
       <br/>
             
                <p className='text-center fw-bold fs-2'>Patient History</p>
                <table className="responsive-table " style={{overflowX:"auto"}}>
                    <thead>
                        <tr>
                            <th>Patient ID</th>
                            <th>Name</th>
                            <th>Mobile Number</th>
                            <th>Insurance</th>
                            <th>Disease</th>
                            {expandedRows.length > 0 && (
                                <>
                            <th>Doctor Name</th>
                            <th>Hospital Name</th>
                            <th>Slot Date</th>
                            <th>Time</th>                        
                            <th>Delete</th>
                            </>
                          )}
                <th style={{ padding: '8px' }}>Actions</th>
            
                        </tr>
                    </thead>
                    <tbody>
                        {patientHistory.map(patient => (
                            <tr key={patient.patientId}>
                                <td>{patient.patientId}</td>
                                <td>{patient.patientName}</td>
                                <td>{patient.patientMobileNumber}</td>
                                <td>{patient.medicalInsurances}</td>
                                <td>{patient.chronicDisease}</td>
                                {expandedRows.includes(appointments) && (
                                    <>
                                {appointments.map(appointment => (
                                    
                                    appointment.patientId === patient.patientId &&
                                    <React.Fragment key={appointment.appointmentId}>
                                        <td>{appointment.doctorName}</td>
                                        <td>{appointment.hospitalName}</td>
                                        <td>{appointment.bookingDate}</td>
                                        <td>{appointment.bookingTime}</td>
                                    </React.Fragment>
                                    
                                ))}
                                </>
                            )}
                             <td style={{ padding: '8px' }}>
                      <button 
                        style={{ width:'100px',height:'40px', marginRight:'10px', border:'none',borderRadius:'5px', color:'white' ,backgroundColor:'royalblue' }} 
                        type="button" 
                        onClick={() => toggleRowExpansion(appointments)}
                      >
                        {expandedRows.includes(appointments) ? 'Hide Details' : 'View More Details'}
                      </button>
                    </td>
                                {/* {slots.map(slot => (
                                    slot.patientId === patient.patientId &&
                                    <React.Fragment key={slot.slotId}>
                                        <td>{slot.diagnosticCenter}</td>
                                        <td>{slot.testServiceDetails}</td>
                                        <td>{slot.bookingDate}</td>
                                        <td>{slot.bookingTime}</td>
                                    </React.Fragment>
                                ))} */}
                                {/* <td>
                                <Link to="/slotupdate"><button type='button'>Update</button></Link> 
                                </td> */}
                                <td>
                                    <button type='button' onClick={() => handleDelete(patient.patientId)}>Delete</button>
                                </td>
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
    );
};

export default AdminPatientHistory;







