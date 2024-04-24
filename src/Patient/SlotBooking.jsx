

import React, { useEffect, useState } from "react";
import "./SlotBooking.css";
import FooterPage from "../Landpage/FooterPage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PatientNav from "./PatientNav";
import { setAppointDetails, setSlotDetails } from "./Authstate";

function TimeSlots() {


  var storedResponseString = localStorage.getItem('loggedIn');

// Convert the string back to an object
var storedResponse = JSON.parse(storedResponseString);
// Access the particular item within the response object
var particularItem = storedResponse.patientId;
var name= storedResponse.patientName;
var phone= storedResponse.patientMobileNumber;
var disease=storedResponse.chronicDisease;
var Age=storedResponse.age;
var genders=storedResponse.gender;

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
  const [doctorNames, setDoctorNames] = useState([]);
  const [hospitalNames, setHospitalNames] = useState([]);
  const [speciality, setspeciality] = useState([]);
  const [address, setAddress] = useState([]);
  const [experience,setExperiences]=useState([]);
  const [patientEmail,setPatientEmail]=useState('');
  const [patientDescription,setPatientDescription]=useState('');
  const [patientPreviousReports,SetPreviousReports]=useState(null);
  const [age,setAge]=useState('');

  const [links,setLinks]=useState([]);
  const [chronicDisease,setChronicDisease]=useState('');
  const [gender,setGender]=useState('');
  const [RegistrationNumber,setRegistrationNumbers]=useState([]);
  const [RegistrationYear,setRegistrationYears]=useState([]);
  const [Mail,setMails]=useState([]);
  const [PhoneNumber,setPhoneNumbers]=useState([]);
  const [RegistrationCouncil,setRegistrationCouncils]=useState([]);

 const [Id,setDoctorId]=useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const navigate = useNavigate('');
  const [unavailableSlotsDate, setUnavailableSlotsDate] = useState([]);

  const [typeOfService, setTypeOfService] = useState('');
  const [fee,setFee]=useState(0);
  const [gst,setGst]=useState(0);
  const [totalFee, setTotalFee] = useState(0);

  const [data,setData]=useState('');


    const [search, setSearch] = useState('');
    const [searchaddress,setsearchExperience]=useState('');
    const [doctors, setDoctors] = useState([]);


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


  useEffect(() => {
    // Fetch all doctors initially
    fetchDoctors();
  }, []);
  
  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:9099/api/getAll');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };
  
  const filteredDoctors = doctors.filter(doctor =>
    doctor.address1.toLowerCase().includes(search.toLowerCase())
  );


  const handleFileChange = (e) => {
    SetPreviousReports(e.target.files[0]);
  };
  
  // const handleFileChange = (e) => {
  //   SetPreviousReports({ patientPreviousReports: e.target.files[0] });
  // };

  useEffect(() => {
    async function fetchSpecialities() {
      try {
        const response = await axios.get("http://localhost:9099/api/getAll");
        const data = response.data;

        if (Array.isArray(data)) {
          const specialityList = [...new Set(data.map((item) => item.speciality))];
          setspeciality(specialityList);
        } else {
          console.error("Invalid data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching specialities:", error);
      }
    }

    fetchSpecialities();
  }, []);

  const fetchSlotDates = async (Id) => {
    try {
      // Make an HTTP GET request to fetch slot dates
      const response = await axios.get(`http://localhost:9099/api/weeklySlotDates/${Id}`); // Replace '/weeklySlotDates/1' with your endpoint
      const data = response.data;

      // Update the state with the fetched slot dates
      setSlotDates(data.slotDates);
    } catch (error) {
      console.error('Error fetching slot dates:', error);
    }
  };

  useEffect(() => {
    fetchSlotDates(Id[0]);
  }, [Id]);



  const handleDateSelect = (date) => {
    // Update the selected date state
    setSelectedDate(date);
  };

  
  const handleSpecialityChange = async (selectedValue) => {
    try {
      const response = await axios.get(`http://localhost:9099/api/getSpecility/${selectedValue}`);
      const data = response.data;

      if (Array.isArray(data)) {
        const doctorNames = data.map(doctor => ({ name: doctor.doctorName }));
        const hospitals = data.map(doctor => ({ name: doctor.hospitalName, id: doctor.hospitalId }));
        const addresses = data.map(doctor => ({ name: doctor.address2, id: doctor.address2 }));
        const Id=data.map(doctor=>({name:doctor.doctorId,id:doctor.doctorId}));
        const links=data.map(doctor=>({name:doctor.webLink}));

        // const experiences=data.map(doctor => ({name:doctor.experience,id:doctor.experience}));
        // const RegistrationNumbers=data.map(doctor => ({name:doctor.Registrationnumber,id:doctor.Registrationnumber}));
        // const RegistrationYears=data.map(doctor => ({name:doctor.Registrationyear,id:doctor.Registrationyear}));
        // const RegistrationCouncils=data.map(doctor => ({name:doctor.Registrationcouncil,id:doctor.Registrationcouncil}));
        // const PhoneNumbers=data.map(doctor => ({name:doctor.Phonenumber,id:doctor.Phonenumber}));
        // const Mails=data.map(doctor => ({name:doctor.Email,id:doctor.Email}));

        setDoctorNames(doctorNames);
        setHospitalNames(hospitals);
        setAddress(addresses);
        // setExperiences(experiences);
        // setRegistrationNumbers(RegistrationNumbers);
        // setRegistrationCouncils(RegistrationCouncils);
        // setRegistrationYears(RegistrationYears);
        // setPhoneNumbers(PhoneNumbers);
        setDoctorId(Id);
        // setMails(Mails);
        setLinks(links);

        if (Id.length > 0) {
          fetchSlotDates(Id[0].id); // Pass the Id to fetchSlotDates function
        }
      } else {
        console.error("Invalid data structure:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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

  const handleDateChange = (e) => {
    e.preventDefault();
    const selectedDate = e.target.value;
    const currentDate = new Date().toISOString().split('T')[0];

    if (selectedDate >= currentDate) {
      setSelectedDate(selectedDate);
    }
    if(selectedDate>=currentDate+7)
    {
      setSelectedDate(selectedDate);
      alert("please select date between current date to 7 days");
    }
     else {
      alert("Please select a future date");
    }
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

   
  else if(doctorNames === '')
  {
    alert("doctorName is required field");
    document.getElementById('doctorName').style.borderColor = 'red';

  }
  else if(speciality === '')
  {
    alert("Speciality is required field");
    document.getElementById('speciality').style.borderColor = 'red';

  }
  else if(hospitalNames === '')
  {
    alert("Hospital Name is required field");
    document.getElementById('hospitalName').style.borderColor = 'red';

  }
  else if(address === '')
  {
    alert("Address is required field");
    document.getElementById('address').style.borderColor = 'red';

  }
  else if(typeOfService === '')
  {
    alert("Type of Service is required field");
    document.getElementById('typeOfService').style.borderColor = 'red';

  }
  



    const pojoData = {
      doctorName: e.target.doctorName.value,
      hospitalName: e.target.hospitalName.value,
      bookingDate: selectedDate,
      bookingTime: selectedTimeSlot,
      patientName:e.target.patientName.value,
      patientId:e.target.patientId.value,
      patientEmail: e.target.patientEmail.value,
      patientMobileNumber: e.target.patientMobileNumber.value,
      typeOfService: e.target.typeOfService.value,
      patientDescription: e.target.patientDescription.value,
      address:e.target.address.value,   
      age:e.target.age.value,
      gender:e.target.gender.value,
      chronicDisease:e.target.chronicDisease.value,
      webLink:e.target.webLink.value,
      // experience:e.target.experience.value,
      speciality:e.target.speciality.value,
      totalFee:e.target.totalFee.value,
      fee:e.target.fee.value,
    };

   



    try {
      const response12 = await axios.post('http://localhost:9081/api/v1/save', pojoData);
      const response1 = await axios.post('http://localhost:9081/api/v1/details', pojoData);
      
      const appointment = response12.data.appointmentId; // Assuming the ID is in the response data

      localStorage.setItem("appointmentId",appointment);

  // Pass the ID as a query parameter when navigating
  
      alert('booking successful');

      console.log(response12);
      console.log(response1);

      setData(response12.data);
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
        setAppointDetails(res);
       
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  const validateForm = () => {
    let isValid = true;

    // Add your form validation logic here

    return isValid;
  };

  return (
    <>
      <PatientNav></PatientNav>
      {/* <div className="container-fluid">
          <img className="img-fluid" src="https://i.pinimg.com/736x/97/53/52/975352ebd5f32f0bdaab8255379f5b3b.jpg" style={{width:'400px',marginTop:'400px'}}></img>
          <p>Skip the travel!</p>
            <p> Take A Slot For Doctor Consultation</p>
      </div> */}
      <div className="container-fluid">  
      <div className="opconslut">
        <form className="form-container" onSubmit={handleSubmit}>
          <h3 style={{textAlign:"center"}}>Online And In-Patient Consulting</h3>

            <h5>Patient Info</h5>
          <div className="form-group">
            <label htmlFor="patientName">Patient Name:</label>
            <input type="text" id="patientName" value={name} name="patientName"/>
          </div>
          <div className="form-group">
            <label htmlFor="patientId">Patient ID:</label>
            <input type="text" id="patientId" value={particularItem} name="patientId"/>
          </div>

          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input type="text" id="age" value={Age} name="age"/>
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <input type="text" id="gender" value={genders} name="gender"/>
          </div>          

          <div className="form-group">
            <label htmlFor="chronicDisease">Chronic Diseases:</label>
            <input type="text" id="chronicDisease" value={disease} name="chronicDisease"/>
          </div>


          <div>
            <h1>Search  Doctor </h1>
            <div>
            <input
                type="text"
                placeholder="Search by address"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            
          </div>
           
             <div className="doctor-cards">
                {filteredDoctors.map(doctor => (
                    <div key={doctor.doctorId} className="doctor-card">
                        <h5 style={{color:'blue'}}>Dr.{doctor.doctorName}</h5>
                        <p>Speciality: {doctor.speciality}</p>
                        <p>Hospital: {doctor.hospitalName}</p>
                        <p>Experience: {doctor.experience}</p>
                        <p>Registered Number: {doctor.registrationnumber} </p>
                        <p>Registered Year: {doctor.registrationyear}</p>
                        <p>Registered Council: {doctor.registrationcouncil} </p>
                        <p>Degree: {doctor.degree}</p>
                        <p>Adress: {doctor.address1}</p>
                        {/* Add more details as needed */}
                    </div>
                ))}
              
            </div>
    </div>




          <div className="form-group">
            <label htmlFor="speciality">Specialisation:</label>
            <select
              id="speciality"
              name="speciality"
              onChange={(e) => handleSpecialityChange(e.target.value)}
            >
              <option value="">Select Specialisation</option>
              {speciality.map((speciality, index) => (
                <option key={index} value={speciality}>
                  {speciality}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="doctorName">Doctor Name:</label>
            <select id="doctorName" name="doctorName">
              <option value="">Select Doctor</option>
              {doctorNames.map((doctor, index) => (
                <option key={index} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="hospitalName">Hospital Name:</label>
            <select id="hospitalName" name="hospitalName">
              <option value="">Select Hospital</option>
              {hospitalNames.map((hospital, index) => (
                <option key={index} value={hospital.id}>
                  {hospital.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <select id="address" name="address">
              <option value="">Select Address</option>
              {address.map((address, index) => (
                <option key={index} value={address.id}>
                  {address.name}
                </option>
              ))}
            </select>
          </div>
          
        
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
            </div>
          )}


          
          <div className="form-group">
            <label htmlFor="patientEmail">Patient Email:</label>
            <input type="email" id="patientEmail" name="patientEmail" />
          </div>

         

          {/* <div className="mb-3">
          <label htmlFor="patientPreviousReports" className="form-label">Previous Reports</label>
          <input type="file" id="patientPreviousReports" name="patientPreviousReports" onChange={handleFileChange} accept=".pdf" required />

          <input type="file" className="form-control" id="patientPreviousReports" name="patientPreviousReports" onChange={handleFileChange} accept=".pdf,.jpg" required /> 
        </div> */}

          <div className="form-group">
            <label htmlFor="patientMobileNumber">Patient Mobile Number:</label>
            <input type="tel" id="patientMobileNumber" value={phone} name="patientMobileNumber" />
          </div>

          <div className="form-group">
            <label htmlFor="typeOfService">Type of Service:</label>
            <select id="typeOfService" name="typeOfService" onChange={handleServiceChange}>
              <option value="service">Select Consulting</option>
              <option value="Online Consulting">Online Consulting</option>
              <option value="In-Patient/Walk-In">In-Patient/Walk-in </option>
            </select>
          </div>

          
          <div className="form-group">
            <label htmlFor="patientDescription">Patient Description:</label>
            <textarea
              id="patientDescription"
              name="patientDescription"
              defaultValue={""}
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="webLink">Web Link:</label>
            <input type="text" id="webLink" value={link} name="webLink"/>
          </div> */}
           <div className="form-group">
            <label htmlFor="webLink">Web Link:</label>
            <select id="webLink" name="webLink">
              <option value="">Select Link</option>
              {links.map((doctor, index) => (
                <option key={index} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>       
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



          <button type="submit" disabled={loading || formSubmitted || !selectedTimeSlot}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      </div>
      <FooterPage></FooterPage>
    </>
  );
}

export default TimeSlots;
