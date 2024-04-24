


import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import DoctorDashboard from './DoctorDashboard';
import { getDoctorDetails } from '../Patient/Authstate';
import FooterPage from '../Landpage/FooterPage';
import { Link } from 'react-router-dom';

function AppointmentManagement()
{
   
  
  var doctors = localStorage.getItem('loggedIn');
  
  // Convert the string back to an object
  var stored = JSON.parse(doctors);
  
  // Access the particular item within the response object
  var dname = stored.doctorName;
  var spec=stored.speciality;
  var id=stored.doctorId;
  
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [unavailableSlots, setUnavailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slotDates, setSlotDates] = useState([]);
  

  const [allTimeSlots] = useState([
    "10:00 AM", "10:20 AM", "10:40 AM",
    "11:00 AM", "11:20 AM", "11:40 AM",
    "12:00 PM", "12:20 PM", "12:40 PM",
    "2:00 PM", "2:20 PM", "2:40 PM",
    "3:00 PM", "3:20 PM", "3:40 PM",
    "4:00 PM", "4:20 PM", "4:40 PM",
    "5:00 PM", "5:20 PM"
  ]);
  
  

  const [loading, setLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [unavailableSlotsDate, setUnavailableSlotsDate] = useState([]);

  const fetchSlotDates = async () => {
    try {
      // Make an HTTP GET request to fetch slot dates
      const response = await axios.get(`http://localhost:9099/api/weeklySlotDates/${id}`); // Replace '/weeklySlotDates/1' with your endpoint
      const data = response.data;

      // Update the state with the fetched slot dates
      setSlotDates(data.slotDates);
    } catch (error) {
      console.error('Error fetching slot dates:', error);
    }
  };

  useEffect(() => {
    fetchSlotDates();
  }, []);



  const handleDateSelect = (date) => {
    // Update the selected date state
    setSelectedDate(date);
  };

    

  useEffect(() => {
    async function fetchBookedSlotsdata() {
      try {
        const response = await axios.get("http://localhost:9081/api/v1/all");

        const allSlots = response.data;

        const bookingTimes = allSlots.map((slot) => ({
          time: slot.bookingTime,
          date: slot.bookingDate,
        }));

        setUnavailableSlots((prevUnavailableSlots) => [
          ...prevUnavailableSlots,
          ...bookingTimes
            .filter((slot) => slot.date === selectedDate)
            .map((slot) => slot.time),
        ]);

        setUnavailableSlotsDate((prevUnavailableSlots) => [
          ...prevUnavailableSlots,
          ...bookingTimes.map((slot) => slot.date),
        ]);

        setBookedSlots((prevBookedSlots) => [
          ...prevBookedSlots,
          ...bookingTimes,
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (selectedDate) {
      fetchBookedSlotsdata();
    }
  }, [selectedDate]);

  
 
  
    
  

      
  
      
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
                          <li ><Link to='/patienthistory'><i class="bi bi-calendar2"></i>Log/History</Link></li>
                          <li ><Link to='/pdf'><i class="bi bi-person-lines-fill"></i>Patient Reports</Link></li>
                          <li class="active" ><Link to='/manage'><i class="bi bi-person-lines-fill"></i>Appointment and Management</Link></li>
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
                   <p className='text-center fw-bold fs-2'>Doctor Slots</p>
           
          <Link to='/addslots'><button >Add Slots</button></Link>
    
    <div className='table'>
        <table class="table table-striped">
        
          <tbody>
          <div>
      <h2>Slot Dates for Doctor ID: {id}</h2>
      <h5>Available Dates:</h5>
          <div className="slot-dates-container">
            {slotDates.map((date) => (
              <div
                key={date}
                onClick={() => handleDateSelect(date)}
                className={`slot-date ${date === selectedDate ? 'selected' : ''}`}
              >
                {date}
              </div>
            ))}
          </div>

        

{selectedDate && (
  <div>
   
   {allTimeSlots.map((time, index) => {
  const isUnavailable =
    unavailableSlots.includes(time) && unavailableSlotsDate.includes(selectedDate) &&
    bookedSlots.some(
      (slot) => slot.date === selectedDate && slot.time === time
    );

  return (
    <label
      key={index}
      className={`time-slot ${
        isUnavailable
          ? "unavailable"
          : selectedTimeSlot === time
          ? "selected"
          : ""
      }`}
    >
      
      {time}
    </label>
  );
})}
  </div>
)}







    </div>
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


export default AppointmentManagement;

































