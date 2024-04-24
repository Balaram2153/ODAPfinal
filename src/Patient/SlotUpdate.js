import React, { useEffect, useState } from "react";
import "./SlotBooking.css";
import axios from "axios";
import Select from 'react-select'
import { useNavigate } from "react-router-dom";
function SlotUpdate() {

  var storedResponseString = localStorage.getItem('loggedIn');

  var storedResponse = JSON.parse(storedResponseString);
  var particularItem = storedResponse.patientId;
  var name= storedResponse.patientName;
  var phone= storedResponse.patientMobileNumber;
  var disease=storedResponse.chronicDisease;
  var Age=storedResponse.age;
  var genders=storedResponse.gender;


 
  const [city, setCity] = useState(''); // City input field value
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Track selected doctor for booking
  const [showBooking, setShowBooking] = useState(false); // Track if booking details should be shown
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [unavailableSlots, setUnavailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [patientName,setPatientName]=useState(name);
  const [slotDates, setSlotDates] = useState([]);
  const [doctorName, setDoctorName] = useState('');
  const [experience,setExperience]=useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [bookingDate, setBookingDate] = useState(null);
  const [bookingTime, setBookingTime] = useState(null);
  const [patientEmail, setPatientEmail] = useState('');
  const [patientMobileNumber, setPatientMobileNumber] = useState(phone);
  const [patientDescription, setPatientDescription] = useState('');
  const [address1, setAddress] = useState('');
  const [webLink, setWebLink] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [age,setAge]=useState(Age);
  const [gender,setGender]=useState(genders);
  const [chronicDisease,setChronicDisease]=useState(disease);
  const [patientId,setPatientId]=useState(particularItem);



 
  

 


  const [allTimeSlots] = useState([
    "10:00 AM", "10:20 AM", "10:40 AM",
    "11:00 AM", "11:20 AM", "11:40 AM",
    "12:00 PM", "12:20 PM", "12:40 PM",
    "2:00 PM", "2:20 PM", "2:40 PM",
    "3:00 PM", "3:20 PM", "3:40 PM",
    "4:00 PM", "4:20 PM", "4:40 PM",
    "5:00 PM", "5:20 PM"
  ]);


  const [typeOfService, setTypeOfService] = useState('');
  const [fee,setFee]=useState(0);
  const [gst,setGst]=useState(0);
  const [totalFee, setTotalFee] = useState(0);

const navigate=useNavigate();


  const handleServiceChange = (e) => {
    setTypeOfService(e.target.value);
    // Calculate fee based on selected service
    switch (e.target.value) {
    
      case 'Online Consulting':
        setFee(1000);
        setGst(1000*0.18);
        setTotalFee(1000*0.18+1000); // Fee for service 1
        break;
      case 'In-Patient/Walk-In':
        setFee(800);
        setGst(800*0.18);
        setTotalFee(800*0.18+800); // Fee for service 2
        break;
     
      default:
        setFee(0); // Default fee
    }
  };


    
  const handleDateSelect = (date) => {
    // Update the selected date state
    setSelectedDate(date);
  };

  const fetchSlotDates = async (doctorId) => {
    try {
      const response = await axios.get(`http://localhost:9099/api/weeklySlotDates/${doctorId}`);
      const data = response.data;
      setSlotDates(data.slotDates);
    } catch (error) {
      console.error('Error fetching slot dates:', error);
    }
  };
  
  useEffect(() => {
    if (selectedDoctor) {
      fetchSlotDates(selectedDoctor.doctorId);
    }
  }, [selectedDoctor]);
  



  const [formSubmitted, setFormSubmitted] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [unavailableSlotsDate, setUnavailableSlotsDate] = useState([]);
  const handleSearch = async () => {
    setLoading(true);
    setError(null); // Clear previous error if any

    try {
      const response = await fetch(`http://localhost:9099/api/getAll?address1=${encodeURIComponent(city)}`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Filter doctors based on the entered address1 (ignoring case and spaces)
      const filteredDoctors = data.filter(doctor => doctor.address1.toLowerCase().replace(/\s/g, '') === city);
      setSearchResults(filteredDoctors);
  } catch (error) {
      setError('Error fetching data. Please try again.');
  } finally {
      setLoading(false);
  }
  };

  const handleBookNow = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBooking(true); // Show booking details section
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

  const handleSlotClick = (clickedTime) => {
    if (
      !formSubmitted &&
      !unavailableSlots.includes(clickedTime) &&
      !bookedSlots.some(
        (slot) => slot.time === clickedTime && slot.date === selectedDate
      )
    ) {
      setSelectedTimeSlot(clickedTime);
    }
  };



  const [emailError, setEmailError] = useState('');
  const [typeofserviceError, setTypeofserviceError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [dateError, setDateError] = useState('');
  const [slotError, setSlotError] = useState('');


  const validateTypeOfService = () => {
    if (!typeOfService) {
      setTypeofserviceError('typeofservice is required');
      return;
    }
    return true;
  };

  const validateEmail = () => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patientEmail || !pattern.test(patientEmail)) {
      setEmailError('please enter patientEmail');
      return;
    }
    setEmailError('');
    return true;
  };

  const validateDescription = () => {
    const splchars = /[~!@#$%^&*()_+{}|:"?><`[\];']/;
    if (!patientDescription || splchars.test(patientDescription)) {
      setDescriptionError('Please enter a valid description');
      return false; // Validation failed
    }
    setDescriptionError('');
    return true; // Validation passed
  };
  

  const validateDate = () => {
    if (!selectedDate) {
      setDateError('Please select a date');
      return false; // Validation failed
    }
    setDateError('');
    return true; // Validation passed
  };
  

  const validateSlot = () => {
    if (!selectedTimeSlot) {
      setSlotError('Please select a time slot');
      return false; // Validation failed
    }
    setSlotError('');
    return true; // Validation passed
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    const isTypeOfServiceValid = validateTypeOfService();
    const isEmailValid = validateEmail();
    const isDescriptionValid = validateDescription();
    const isDateValid = validateDate();
    const isSlotValid = validateSlot();


    if (isTypeOfServiceValid && isEmailValid && isDescriptionValid && isDateValid && isSlotValid) {
      // Perform form submission logic
      console.log('Form submitted successfully');

    } 

    else {
      // Handle validation errors
      console.log('Form submission failed due to validation errors');

    }

  
  // const pojoData = {
  //   doctorName: e.target.doctorName.value,
  //   hospitalName: e.target.hospitalName.value,
  //   bookingDate: selectedDate,
  //   bookingTime: selectedTimeSlot,
  //   patientName:e.target.patientName.value,
  //   patientId:e.target.patientId.value,
  //   patientEmail: e.target.patientEmail.value,
  //   patientMobileNumber: e.target.patientMobileNumber.value,
  //   typeOfService: e.target.typeOfService.value,
  //   patientDescription: e.target.patientDescription.value,
  //   address:e.target.address.value,   
  //   age:e.target.age.value,
  //   gender:e.target.gender.value,
  //   chronicDisease:e.target.chronicDisease.value,
  //   webLink:e.target.webLink.value,
  //   speciality:e.target.speciality.value,
  //   totalFee:e.target.totalFee.value,
  //   fee:e.target.fee.value,
  // };
  
  
const pojoData = {
  doctorName: searchResults[0]?.doctorName ?? '',
  hospitalName: searchResults[0]?.hospitalName ?? '',
  bookingDate: selectedDate,
  bookingTime: selectedTimeSlot,
  patientName: patientName,
  patientId: patientId,
  patientEmail: patientEmail,
  patientMobileNumber: patientMobileNumber,
  patientDescription: patientDescription,
  gender:gender,
  webLink:searchResults[0]?.webLink??  '',
  chronicDisease:chronicDisease,
  age:age,
  fee: fee,
  totalFee: totalFee,
  speciality: searchResults[0]?.speciality??  '',
  address: searchResults[0]?.address1??  '',
  slotDates: '',
  typeOfService: typeOfService,
};

   



    try {
      
      if(!selectedDate){
        alert("Please select a date");
        return;
      }      
      if(!patientEmail){
        alert("Enter the patient email");
        return;
      }
      if(!typeOfService){
        alert("selcet the type of service")
        return;
      }
      if(!patientDescription){
        alert("enter the patient description")
        return;
      }
      
      const response12 = await axios.post('http://localhost:9081/api/v1/save', pojoData);
      
      const response1 = await axios.post('http://localhost:9081/api/v1/details', pojoData);
      
      const appointment = response12.data.appointmentId; // Assuming the ID is in the response data

      localStorage.setItem("appointmentId",appointment);

  // Pass the ID as a query parameter when navigating
  
      alert('booking successful');

      console.log(response12);
      console.log(response1);

      // setSlotDetails(response12);
      // var responseconsultant = JSON.stringify(response12);

      // localStorage.setItem('response12', responseconsultant);
      // navigate(`/paymentconsult?id=${doctorId}`);

      navigate('/Payment',{state: {patientData: response12.data}});
     const res = response12.data;     

      setUnavailableSlots((prevUnavailableSlots) => [...prevUnavailableSlots, res.bookingTime]);
      setBookedSlots((prevBookedSlots) => [...prevBookedSlots, res]);
      setFormSubmitted(true);
      setLoading(false);
      e.target.reset();

      if (res.statusCode === "OK") {
        setUnavailableSlots([]);
        setBookedSlots([]);
        console.log(res);
        //setAppointDetails(res);
       
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  // const validateForm = () => {
  //   let isValid = true;

  //   // Add your form validation logic here

  //   return isValid;
  // };
  
  
  return (
    <>
      <div className='container-fluid' style={{ padding: '50px' }}>
        <form
          className="d-flex"
          onSubmit={(e) => {
            e.preventDefault(); // Prevent form submission
            handleSearch();
          }}
        >
          <input
            type="text"
            className="form-control me-2"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Search Doctors
          </button>
        </form><br />
        <div className='container'>
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}

        
          <div className='doctor-cards'>
            {searchResults.length > 0 ? (
              searchResults.map((doctor) => (
                <div key={doctor.doctorId}>
                  <div className='doctor-card col-md-12 bg-primary' style={{ color: 'white', borderRadius: '5px', padding: '20px' }}>
                    <h2>Dr. {doctor.doctorName}</h2>
                    <p>Speciality: {doctor.speciality}</p>
                    <p>Doctor ID: {doctor.doctorId}</p>
                    <p>Hospital: {doctor.hospitalName}</p>
                    <p>Experience: {doctor.experience}</p>
                    <p>Registered Number: {doctor.registrationnumber}</p>
                    <p>Registered Year: {doctor.registrationyear}</p>
                    <p>Registered Council: {doctor.registrationcouncil}</p>
                    <p>Degree: {doctor.degree}</p>
                    <p>Weblink: {doctor.webLink}</p>
                    <p>Address1: {doctor.address1}</p>
                    <p>Address2: {doctor.address2}</p>
                    <p>CurrentWorkPlace: {doctor.currentworkplace}</p>
                    <p>OtherWorkPlace: {doctor.otherworkplace}</p>
                    <center>
                      <button type='button' className='btn btn-success' onClick={() => handleBookNow(doctor)}>Book now</button>
                    </center>
                  </div>
                </div>
              ))
            ) : (
              <div className='container'>
                No doctors found for the entered city.
              </div>
            )}
          </div>
        </div>
        {selectedDoctor && showBooking && (
          <div className='container'>
            <h3>Booking Details</h3>
            <form>
              <div className="mb-3">
                <label htmlFor="experience" className="form-label">Experience:</label>
                <input type="text" className="form-control" id="experience" name="experience" value={selectedDoctor.experience} readOnly />
              </div>
              <div className="mb-3">
                <label htmlFor="specialty" className="form-label">Specialty:</label>
                <input type="text" className="form-control" id="specialty" name="specialty" value={selectedDoctor.speciality} readOnly />
              </div>
              <div className="mb-3">
                <label htmlFor="hospital" className="form-label">Hospital Name:</label>
                <input type="text" className="form-control" id="hospital" name="hospital" value={selectedDoctor.hospitalName} readOnly />
              </div>
              <div className="mb-3">
                <label htmlFor="hospital" className="form-label">Doctor Name:</label>
                <input type="text" className="form-control" id="doctorName" name="doctorName" value={selectedDoctor.doctorName} readOnly />
              </div>

              <div className="mb-3">
                <label htmlFor="webLink" className="form-label">Web Link:</label>
                <input type="text" className="form-control" id="webLink" name="webLink" value={selectedDoctor.webLink} readOnly />
              </div>

              <div className="mb-3">
                <label htmlFor="addressLine1" className="form-label">Address:</label>
                <input type="text" className="form-control" id="addressLine1" name="addressLine1" value={selectedDoctor.address1} readOnly />
              </div>

            
              <h5>Available Dates:</h5>
         <div className="slot-dates-container">
             


{slotDates.map((date) => (
    <div
      key={date}
      onClick={() => handleDateSelect(date)} // Update this line
      className={`slot-date ${date === selectedDate ? 'selected' : ''}`}
    >
      {date}
    </div>

  ))}
            {dateError && <div className="error">{dateError}</div>}

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
                <input
                  type="radio"
                  className="option-input radio"
                  name="timeSlot"
                  onChange={() => handleSlotClick(time)}
                  disabled={isUnavailable}
                  checked={selectedTimeSlot === time}
                />
                {time}
              </label>
            );
          })}
                    {slotError && <div className="error">{slotError}</div>}

            </div>
          )}          
            <div className="form-group">
            <label htmlFor="patientEmail">Patient Email:</label>
            <input type="email" id="patientEmail" name="patientEmail" value={patientEmail} onChange={(e)=>setPatientEmail(e.target.value)} />
            {emailError && <div className="error">{emailError}</div>}

          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input type="text" id="age" name="age" value={Age}  />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <input type="text" id="gender" name="gender" value={genders}  />
          </div>
          <div className="form-group">
            <label htmlFor="patientId">Patient ID:</label>
            <input type="text" id="patientId" name="patientId" value={particularItem} onChange={(e)=>setPatientId(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="chronicDisease">chronicDisease</label>
            <input type="text" id="chronicDisease" name="chronicDisease" value={disease} onChange={(e)=>setChronicDisease(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="patientName">Patient Name:</label>
            <input type="text" id="patientName" name="patientName" value={name} onChange={(e)=>setPatientName(e.target.value)} />
          </div>      
           <div className="form-group">
            <label htmlFor="typeOfService">Type of Service:</label>
            <select id="typeOfService" name="typeOfService" onChange={handleServiceChange}>
              <option value="service">Select Consulting</option>
              <option value="Online Consulting">Online Consulting</option>
              <option value="In-Patient/Walk-In">In-Patient/Walk-in </option>
            </select>
            {typeofserviceError && <div className="error">{typeofserviceError}</div>}

          </div>

          
          <div className="form-group">
            <label htmlFor="patientDescription">Patient Description:</label>
            <textarea
              id="patientDescription"
              name="patientDescription"
              value={patientDescription} onChange={(e)=>setPatientDescription(e.target.value)}
            />
            {descriptionError && <div className="error">{descriptionError}</div>}

          </div>
          {/* <div className="form-group">
            <label htmlFor="webLink">Web Link:</label>
            <input type="text" id="webLink" value={link} name="webLink"/>
          </div> */}
              
          <div className="form-group">
            <label htmlFor="fee">Fees:</label>
            <input
              id="fee"
              name="fee"
              value={fee}
            />
          </div>
       
          <div className="form-group">
            <label htmlFor="totalFee">TotalFee : 18% GST {gst} </label>
            <input
              id="totalFee"
              name="totalFee"

              value={totalFee}
            />
          </div>



          <button type="submit" onClick={handleSubmit}>Submit
          </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default SlotUpdate;
