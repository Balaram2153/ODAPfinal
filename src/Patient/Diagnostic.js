import React, { useState } from 'react';
import axios from 'axios';
import './Diagnostic.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import PatientNav from './PatientNav';
import FooterPage from '../Landpage/FooterPage';

function Diagnostic() {
  const navigate = useNavigate();
  const [patientEmail, setPatientEmail] = useState('');
  const [patientId, setPatientId] = useState(particularItem);
  const [patientName, setPatientName] = useState(name);
  const [diagnosticCenter, setDiagnosticCenter] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime,setBookingTime]=useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [address, setAddress] = useState('');
  const [patientMobileNumber, setPatientMobileNumber] = useState(phone);
  const [testServiceDetails, setTestServiceDetails] = useState('');
  const [referralDoctorName, setReferralDoctorName] = useState('');
  const [patientPreviousReports, setPreviousReports] = useState('');
  const [fee, setFee] = useState(0);

  var storedResponseString = localStorage.getItem('loggedIn');

// Convert the string back to an object
var storedResponse = JSON.parse(storedResponseString);

// Access the particular item within the response object
var particularItem = storedResponse.patientId;
var name= storedResponse.patientName;
var phone= storedResponse.patientMobileNumber;


  const handleTestServiceChange = (value) => {
    setTestServiceDetails(value);

    
    if (value === 'Pathology') {
      setFee(200);
    } else if (value === 'Radiology') {
      setFee(250);
    } else if (value === 'Physio') {
      setFee(300);
    } else if (value === 'Audiology') {
      setFee(400);
    } else {
      setFee(0);
    }
  }; 

  const submit = async () => {
    
    const digits = /[0-9]/;
    
    if (
      
      patientEmail === '' &&
      diagnosticCenter === '' &&
      bookingDate === '' &&
      bookingTime === ''&&
      selectedTimeSlot === '' &&
      address === '' &&
      testServiceDetails === '' &&
      referralDoctorName === '' &&
      patientPreviousReports === ''&&
      fee===''
    ) {
      alert('Please fill in all the fields');
      return;
    }
    
   

    if (!/^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/.test(patientEmail)) {
      alert('Please enter a valid email address');
      return;
    }
  

    

    const data = {
      patientId,
      patientEmail,
      patientName,
      diagnosticCenter,
      bookingDate,
      bookingTime: selectedTimeSlot,
      address,
      patientMobileNumber,
      testServiceDetails,
      referralDoctorName,
      patientPreviousReports,
      fee,
    };

    

    try {      
      const response = await axios.post('http://localhost:9094/api/Patient/details', data);
      console.log('Signup Success:', response.data);
      setPatientId('');
      setPatientEmail('');
      setPatientName('');
      setDiagnosticCenter('');
      setBookingDate('');
      setBookingTime('');
      setPreviousReports('');
      setReferralDoctorName('');
      setAddress('');
      setPatientMobileNumber('');
      setTestServiceDetails('');
      setSelectedTimeSlot('');
      if (patientEmail === '') {
        alert('patientEmail is a required field');
        document.getElementById('inputpatientEmail4').style.borderColor = 'red';
      }   else if (referralDoctorName === '') {
        alert('referralDoctorname is a required field');
        document.getElementById('inputreferraldoctorname').style.borderColor = 'red';
      } else if (diagnosticCenter === '') {
        alert('diagnosticCenter a required field');
        document.getElementById('inputdiagnosticCenter').style.borderColor = 'red';
      }
      
      alert('Submit successful');
      navigate('/PaymentDiagnostic');
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  
  return (
    <>
    <PatientNav/>
    <div className="container-fluid bg-body-tertiary p-5" style={{ background: "url('https://www.biospectrumindia.com/uploads/articles/file_20180516_155607_1oa4bk6-14003.jpg')" }}>
      <div className="row">
        <div className="col-12">
          <div className="container pt-4">
            <form className="row g-3">
            <div className="col-6">
                <label htmlFor="id" className="form-label text-primary fw-bold">Patient Id</label>
                <input type="text" className="form-control" id="inputid" value={particularItem}  />
              </div>
              <div className="col-6">
                <label htmlFor="name" className="form-label text-primary fw-bold">Patient Name</label>
                <input type="text" className="form-control" id="name" value={name}  />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPatientEmail4" className="form-label text-primary fw-bold">Patient Email</label>
                <input type="email" className="form-control" value={patientEmail} onChange={(e) => setPatientEmail(e.target.value)}  placeholder="Enter the Patient Email" required />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPatientMobileNumber" className="form-label text-primary fw-bold">Patient Mobile Number</label>
                <input type="tel" className="form-control" id="inputPatientMobileNumber" value={phone}   />
              </div>
              <div className="col-6">
                <label htmlFor="inputReferralDoctorName" className="form-label text-primary fw-bold">Referral Doctor Name</label>
                <input type="text" className="form-control" id="inputReferralDoctorName" value={referralDoctorName} onChange={(e) => setReferralDoctorName(e.target.value)} placeholder="Enter the Referral Doctor Name" required />
              </div>
              <div className="col-6">
                <label htmlFor="inputDiagnosticCenter" className="form-label text-primary fw-bold">Diagnostic Center</label>
                <select name="DiagnosticCenter" value={diagnosticCenter} onChange={(e) => setDiagnosticCenter(e.target.value)} required>
                  <option value="">Select Diagnostic Center</option>
                  <option value="Patient Ability">Patient Ability</option>
                  <option value="Patient Medic">Patient Medic</option>
                  <option value="Proven Positive">Proven Positive</option>
                  <option value="Path Concept">Path Concept</option>
                  <option value="Clinical Remedy">Clinical Remedy</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputDateBooking" className="form-label text-primary fw-bold">Booking Date</label>
                <input type="date" className="form-control" id="inputDateBooking" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="bookingTime" className="form-label text-primary fw-bold">Booking Time:</label>
                <select
                  id="bookingTime"
                  name="bookingTime"
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                >
                  <option value="">Select Time</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="12:30 PM">12:30 PM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="1:30 PM">1:30 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="2:30 PM">2:30 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="3:30 PM">3:30 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="4:30 PM">4:30 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                </select>
              </div>
              <div className="col-md-6">
                <strong><label type="PPR">Patient Previous Reports:</label></strong>
                <input type="file" accept=".pdf, .doc, .docx, .jpg, .jpeg, .png" />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputAddress" className="form-label text-primary fw-bold">Address</label>
                <input type="text" className="form-control" id="inputAddress" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter the Address" required />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputTestServiceDetails" className="form-label text-primary fw-bold">Test Service Details</label>
                <select value={testServiceDetails} onChange={(e) => handleTestServiceChange(e.target.value)}>
                  <option value="">Select Test Service Details</option>
                  <option value="Pathology">Pathology</option>
                  <option value="Radiology">Radiology</option>
                  <option value="Physio">Physio</option>
                  <option value="Audiology">Audiology</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="fee" className="form-label text-primary fw-bold">Fee</label>
                <input type="text" className="form-control" id="fee" value={fee} readOnly />
              </div>
              <div className="col-12">
                <button type="button" className="btn btn-primary" onClick={submit}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <FooterPage/>
    </>
  );
}

export default Diagnostic;
