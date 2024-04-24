import React, { useState } from "react";
import "../Patient/MedicalService.css";
import LandNav from "../Landpage/LandNav.js";
import FooterPage from "../Landpage/FooterPage.js";
import axios from 'axios';
import {useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import PatientNav from "./PatientNav.js";

 

function Audiology() {

 

  var storedResponseString = localStorage.getItem('loggedIn');

// Convert the string back to an object
var storedResponse = JSON.parse(storedResponseString);

// Access the particular item within the response object
var particularItem = storedResponse.patientId;
var name= storedResponse.patientName;
var phone= storedResponse.patientMobileNumber;


  const [patientName, setPatientName] = useState(name);
  const [patientId,setPatientId]=useState(particularItem);
  const [referaldoctorname, setReferalDoctorName] = useState('');
  const [bookingdate, setBookingdate] = useState('');
  const [typeofservices, setTypeofservices] = useState('Audiology');
  const [hospitalname, setHospitalName] = useState('');
  const [slottime, setSlottime] = useState('');
  const [procedures, setProcedures] = useState('');
  const [paymentmode, setPaymentmode] = useState('');
  const [amount, setAmount] = useState('1000');
  const [email, setEmail] = useState('');
  const [patientMobileNumber, setPatientMobileNumber] = useState(phone);
  const [attendee, setAttendee] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate('');
  
  
  // function paymode(){
  //   selectedvalue = document.getElementById("paymentmode")
    
  //   if (selectedvalue == "insurance"){
      
  //   }
  // }

  const submit = async () => {


    const Data = {
      patientName,
      patientId,
      referaldoctorname,
      bookingdate,
      typeofservices,
      hospitalname,
      slottime,
      procedures,
      amount,
      email,
      patientMobileNumber,
      attendee,

    };
    try {

      setError(false);
      const digits = /[0-9]/;
      const emaildigit = /^[0-9]/;
      const startswith = /^[6,7,8,9]/
      const emailend = "@gmail.com"
      const alphabets = /[a-z,A-Z]/;
      const splchars = /[~!@#$%^&*()_+{}|":?><`\;',./]/;
      
            
      const isValidEmail = (email) =>{
        const validDomains = ['gmail.com','gmail.in','gmail.org','hotmail.com','hotmail.in','hotmail.org','yahoo.com','yahoo.in','yahoo.org'];
        const emailRegex = new RegExp(`^[A-Za-z0-9._%+-]+@(${validDomains.join('|')})$`);
        return emailRegex.test(email);
    }

     
      if (referaldoctorname==="")
      throw new Error("please enter Doctor name ")   
   
      if (bookingdate === "")
      throw new Error("Select a booking date")
            
            const selectedDate = new Date(bookingdate); 
            const currentDate = new Date();
            const currentDateString = currentDate.toDateString();
            const selectedDateString = selectedDate.toDateString();
            
      if (selectedDateString < currentDateString) {
          alert('Please select a future or present date.');
          return;
       } 
    
    if (typeofservices === "")
      throw new Error("Select a service")
    if (hospitalname === "")
      throw new Error("Select a hospital  name")    
    if (slottime === "")
      throw new Error("Select a slot")
    if (procedures === "")
      throw new Error("Select a procedure")
   if (attendee==="")
      throw new Error("please enter attendee name ")
     
    
     if (digits.test(referaldoctorname) || splchars.test(referaldoctorname))
     throw new Error("referal doctor name sholud not contain numbers, special characters")    
     if (referaldoctorname.length < 5)
     throw new Error("Doctor name should have more than 5 chars")
     if (!isValidEmail(email)) {
      throw new Error('Enter a valid email address');
    }
      if(digits.test(attendee) || splchars.test(attendee))
      throw new Error("attendee name accepts only characters")
    
      const response = await axios.post('http://localhost:9085/api/Msdata', Data);
      setPatientName('');
      setReferalDoctorName('');
      setPatientId('');
      setBookingdate('');
      setTypeofservices('');
      setHospitalName('');
      setSlottime('');
      setProcedures('');
      setAmount('');
      setEmail('');
      setPatientMobileNumber('');
      setAttendee('');
      alert("please select ok to make payment to book your slot");
      console.log(response);      
      navigate('/PaymentMedical' ,{ state: { patientData: response.data }})
      
      const pdf = new jsPDF();
      pdf.text("slot booking reciept", 80, 20);
      pdf.text("Thank you "+patientName+" for booking an appointment with us.")
      pdf.text("Here are your appointment details ", 80, 30);
      pdf.text("Type of appointment :"+typeofservices,80,40);
      pdf.text("Appointmenttime:"+slottime,80,50);
      pdf.text("Note : Be at the hospital atleast 10 minutes ahead of your appointment time",80,60);
      pdf.save('slot reciept.pdf');
      
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    catch (e) {
      setError(true);
      setErrorMessage(e.message);
    }
  }

  
  function onclick(){
    submit();
    // handleSendEmail();
    
  }
    


  function showForm() {
    var selectedOption = document.getElementById("Paymentmode").value;
    var hiddenForm = document.getElementById("Paymentoptions");
    if (selectedOption === "insurance") {
      hiddenForm.style.display = "block";
    } else {
      hiddenForm.style.display = "none";
    }
  }


  return (
    <>

    <PatientNav/>
      <div className="body" style={{ width: '100%',height: '100%', backgroundSize:'cober'}}>

      <h3 style={{textAlign:'center',height:'50px'}}>Book Your Slot</h3>

      <div className="Therapy-slot-container d-flex flex-column">
        <table>
          
        <tr>
            <td >Typeofservices :</td>
            <td><input id='Typeofservices' class="form-control" value={typeofservices} onChange={(e) => setTypeofservices(e.target.value)} readOnly
    aria-label=".form-select-sm example"  >
              {/* <option >services</option>
              <option >Therapy</option>
              <option>Dialysis</option>
              <option>PhysioTherapy</option> */}

            </input></td>
          </tr>
          <tr>
            <td>Hospitalname:</td>
            <td><select id='hospitalname' class="form-select form-select-sm" value={hospitalname} onChange={(e) => setHospitalName(e.target.value)} aria-label=".form-select-sm example" >
              <option></option>
              <option>Apollo</option>
              <option>Care</option>
              <option>Yashoda</option>
            </select></td>
          </tr>
          <tr>
            <td text-primary fw-bold>Patient Name :</td>
            <td><input type='text' className="form-control" id='Patientname' value={name}  placeholder='enter patientname' required /></td>
          </tr>
          <tr>
            <td text-primary fw-bold>Patient ID :</td>
            <td><input type='text' className="form-control" id='PatientId' value={particularItem}  placeholder='enter patientid' required /></td>
          </tr>
          <tr>
            <td text-primary fw-bold>ReferalDoctorname:</td>
            <td><input type='text' className="form-control" id='ReferalDoctorname' value={referaldoctorname} onChange={(e) => setReferalDoctorName(e.target.value)} placeholder='enter doctorname' required /></td>
          </tr>
          <tr>
            <td for='date' >Date :</td>
            <td>            <input type='date' className="form-control" id='Bookingdate' value={bookingdate} onChange={(e) => setBookingdate(e.target.value)} placeholder='enter mobile number' required />
            </td>
          </tr>
          <tr>
            <td>slot :</td>
            <td>  <select id='slot' class="form-select form-select-sm" value={slottime} onChange={(e) => setSlottime(e.target.value)} aria-label=".form-select-sm example" >
              <option></option>
              <option>10:00am </option>
              <option>11:00am</option>
              <option>12:00pm</option>
            </select></td>
          </tr>

          <tr>
            <td>procedures :</td>
            <td><select id='procedures' class="form-select form-select-sm" value={procedures} onChange={(e) => setProcedures(e.target.value)} aria-label=".form-select-sm example" >
              <option ></option>
              <option>procedure 1</option>
              <option>procedure 2</option>
              <option>procedure 3</option>
              <option>procedure 4</option>
            </select></td>
          </tr>
          {/* <tr>
            <td>Payment mode:</td>
            <td><select id="Paymentmode" value={paymentmode} onChange={(e)=>setPaymentmode(e.target.value)}  className="form-select form-select-sm">
              <option></option>
              <option>Cash</option>
              <option>Online</option>
              <option value="insurance">Insurance</option>
            </select></td>
            <div className="Paymentoptions" id="Paymentoptions">
              <p>please select the insurance you are willing to provide</p>
              <select>
                <option>Government insurance</option>
                <option>LIC</option>
                <option>Private Insurances</option>
              </select>
            </div>
          </tr> */}
          <tr>
            <td>Amount :</td>
            <td><input type='text' className="form-control" id='inputMedicalInformation' value={amount} readOnly
    aria-label=".form-select-sm example"  onChange={(e) => setAmount(e.target.value)}/>
            </td>
          </tr>

          <tr>
            <td>Email :</td>
            <td><input type='email' name='email' className="form-control" id='inputEmail' value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder='enter your email' />
            </td>
          </tr>

          <tr>
            <td>Mobile :</td>
            <td><input type='tel' className="form-control" id='inputMobile' value={phone}  placeholder='enter mobile number' required />
            </td>
          </tr>
          <tr>
            <td>Attendee Name :</td>
            <td><input type='text' className="form-control" id='Attendee' value={attendee} onChange={(e) => setAttendee(e.target.value)}  required />
            </td>
          </tr>
        </table>
        {error && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="button" className="therapy-btn" onClick={onclick}>Book slot</button>
      </div>


      </div>
      <FooterPage></FooterPage>


    </>
  )
}
export default Audiology;