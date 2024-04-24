import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
const ProviderList = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8910/getAll')
            .then(response => {
                const filteredData = response.data.map(booking => ({
                    date: booking.date,
                    time: booking.time,
                    fromLocation: booking.fromLocation,
                    toLocation: booking.toLocation,
                    fee: booking.totalFee,
                    patientId: booking.patientId,
                    mobileNumber: booking.mobileNumber,
                    email: booking.email,
                    providers: booking.providers,
                    paymentMode: booking.paymentMode // Add this line if paymentMode is available in your data
                }));
                setBookings(filteredData);
            })
            .catch(error => {
                console.error('Error fetching bookings:', error);
            });
    }, []);

   
const [isDropdownOpen, setIsDropdownOpen] = useState(false);

// Function to toggle dropdown visibility
const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
};

    return (
        <div>
            
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
                       <li><Link to="/contact"><i class="bi bi-person-lines-fill"></i>Doctor Contact</Link></li>
                       <li className='active'><Link to="/providers"><i class="bi bi-person-lines-fill"></i>Providers List</Link></li>
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
                <p className='text-center fw-bold fs-2'>Booking List</p>       
           

            <style>
        {`
          table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
          }
          th, td {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
          }
          tr:nth-child(even) {
              background-color: #f2f2f2;
          }
          @media (max-width: 768px) {
              table {
                  font-size: 14px;
              }
          }
        `}
      </style>
            <table>
                <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Mobile Number</th>
                        <th>Email</th>
                        <th>Provider</th>
                        <th>From Location</th>
                        <th>To Location</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Fee</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={index}>
                            <td>{booking.patientId}</td>
                            <td>{booking.mobileNumber}</td>
                            <td>{booking.email}</td>
                            <td>{booking.providers}</td>
                            <td>{booking.fromLocation}</td>
                            <td>{booking.toLocation}</td>
                            <td>{booking.date}</td>
                            <td>{booking.time}</td>
                            <td>{booking.fee}</td>
                        </tr>
                    ))}
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
        </div>
    );
};

export default ProviderList;
