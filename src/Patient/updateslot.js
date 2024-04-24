import React, { useEffect, useState } from "react";
import "./SlotBooking.css";
import FooterPage from "../Landpage/FooterPage";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import PatientNav from "./PatientNav";
import { setAppointDetails } from "./Authstate";

function Updateslot() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialAppointmentId = searchParams.get("appointmentId");
  const [appointmentId, setAppointmentId] = useState(
    initialAppointmentId || ""
  );
  
  

  const initialpatientEmail = searchParams.get("patientEmail");
  const [patientEmail, setPatientEmail] = useState("");
  const [] = useState('');

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [unavailableSlots, setUnavailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slotDates, setSlotDates] = useState([]);
  const [Id, setDoctorsId] = useState("");

  const [allTimeSlots] = useState([
    "10:00 AM",
    "10:20 AM",
    "10:40 AM",
    "11:00 AM",
    "11:20 AM",
    "11:40 AM",
    "12:00 PM",
    "12:20 PM",
    "12:40 PM",
    "2:00 PM",
    "2:20 PM",
    "2:40 PM",
    "3:00 PM",
    "3:20 PM",
    "3:40 PM",
    "4:00 PM",
    "4:20 PM",
    "4:40 PM",
    "5:00 PM",
    "5:20 PM",
  ]);
  const [doctorNames, setDoctorNames] = useState([]);
  const [hospitalNames, setHospitalNames] = useState([]);
  const [speciality, setspeciality] = useState([]);
  const [address, setAddress] = useState([]);
  const [experience, setExperiences] = useState([]);

  const [doctorId, setDoctorId] = useState("");
  const [ProfileData, setprofileData] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const navigate = useNavigate("");
  const [unavailableSlotsDate, setUnavailableSlotsDate] = useState([]);

  const [typeOfService, setTypeOfService] = useState("");

  const [data, setData] = useState("");

  const handleServiceChange = (e) => {
    setTypeOfService(e.target.value);
    // Calculate fee based on selected service
    switch (e.target.value) {
      case "Online Consulting":
        break;
      case "In-Patient/Walk-In":
        break;

      default:
    }
  };

  useEffect(() => {
    async function fetchSpecialities() {
      try {
        const response = await axios.get("http://localhost:9099/api/getAll");
        const data = response.data;

        if (Array.isArray(data)) {
          const specialityList = [
            ...new Set(data.map((item) => item.speciality)),
          ];
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
      const response = await axios.get(
        `http://localhost:9099/api/weeklySlotDates/${Id}`
      ); // Replace '/weeklySlotDates/1' with your endpoint
      const data = response.data;

      // Update the state with the fetched slot dates
      setSlotDates(data.slotDates);
    } catch (error) {
      console.error("Error fetching slot dates:", error);
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
      const response = await axios.get(
        `http://localhost:9099/api/getSpecility/${selectedValue}`
      );
      const data = response.data;

      if (Array.isArray(data)) {
        const doctorNames = data.map((doctor) => ({ name: doctor.doctorName }));
        const hospitals = data.map((doctor) => ({
          name: doctor.hospitalName,
          id: doctor.hospitalId,
        }));
        const addresses = data.map((doctor) => ({
          name: doctor.address2,
          id: doctor.address2,
        }));
        const Id = data.map((doctor) => ({
          name: doctor.doctorId,
          id: doctor.doctorId,
        }));

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
        setDoctorsId(Id);
        // setMails(Mails);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(speciality === ''){
      alert("please select a specialization");
      return;
    }
    if(patientEmail === ''){
      alert("Enter the patient email please");
      return;
    }
    
    const pojoData = {
      bookingDate: selectedDate,
      bookingTime: selectedTimeSlot,

      patientEmail: e.target.patientEmail.value,

      speciality: e.target.speciality.value,
      appointmentId: e.target.appointmentId.value,
    };

    try {
      const response12 = await axios.put(
        `http://localhost:9081/api/v1/updateservice/${appointmentId}`,
        pojoData
      );
      const response1 = await axios.post(
        "http://localhost:9081/api/v1/details",
        pojoData
      );

      alert("booking updated successful");

      console.log(response12);
      console.log(response1);

      setData(response12.data);
      navigate("/");
      const res = response12.data;

      setUnavailableSlots((prevUnavailableSlots) => [
        ...prevUnavailableSlots,
        res.bookingTime,
      ]);
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
      <div className="container-fluid">
        <div className="opconslut">
          <form className="form-container" onSubmit={handleSubmit}>
            <h3 style={{ textAlign: "center" }}>Update Consultation</h3>

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
            <h5>Available Dates:</h5>
            <div className="slot-dates-container">
              {slotDates.map((date) => (
                <div
                  key={date}
                  onClick={() => handleDateSelect(date)}
                  className={`slot-date ${
                    date === selectedDate ? "selected" : ""
                  }`}
                >
                  {date}
                </div>
              ))}
            </div>
            {selectedDate && (
              <div>
                {allTimeSlots.map((time, index) => {
                  const isUnavailable =
                    unavailableSlots.includes(time) &&
                    unavailableSlotsDate.includes(selectedDate) &&
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
              <label htmlFor="appointmentId">Appointment ID:</label>
              <input
                type="text"
                id="appointmentId"
                value={appointmentId}
                onChange={(e) => setAppointmentID(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="patientEmail">Patient Email:</label>
              <input
                type="email"
                id="patientEmail"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading || formSubmitted || !selectedTimeSlot}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <FooterPage></FooterPage>
    </>
  );
}

export default Updateslot;
