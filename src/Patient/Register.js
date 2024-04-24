
import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import Navbar from '../Navbar';
import LandNav from '../Landpage/LandNav';
import FooterPage from '../Landpage/FooterPage';

function Register(){

 
    const [patientName, setPatientName] = useState('');
    const [patientMobileNumber, setPatientMobileNumber] = useState('');
    const [patientEmail, setPatientEmail] = useState('');
    const [medicalInformation, setMedicalInformation] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [chronicDisease, setChronicDisease] = useState('');
    const [familyDoctorName, setFamilyDoctorName] = useState('');
    const [attendeeName, setAttendeeName]=useState('');
    const [emergencyContact, setEmergencyContact] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [age,setAge]=useState('');
    const [gender, setGender] = useState('');
    const [dOB,setDOB]=useState('');
    const [medicalInsurances, setMedicalInsurances] = useState('');
    const [medicalInsuranceNumber,setMedicalInsuranceNUmber]=useState('');
    const [aadhar, setAadhar] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate('');    
  

    const submit = async () => {
        
     
    
  
        if(patientName === '' ){
            alert("patient name is required field");
            document.getElementById('inputPatientName').style.borderColor= 'red';
        }
        else if (patientMobileNumber === ''){
            alert("mobile number is required field");
            document.getElementById('inputMobile').style.borderColor= 'red'; 
        }
        else if (patientEmail === ''){
            alert("email id is required field ");
            document.getElementById('inputEmail').style.borderColor = 'red';
        }
        else if (medicalInformation === '') {
            alert('medical information is a required field');
            document.getElementById('inputMedicalInformation').style.borderColor = 'red';
          } else if (bloodGroup === '') {
            alert('Blood group is a required field');
            document.getElementById('inputBloodGroup').style.borderColor = 'red';
          } else if (chronicDisease === '') {
            alert('diseases is a required field');
            document.getElementById('inputchronicdiseases').style.borderColor = 'red';
          } else if (familyDoctorName === '') {
            alert('family doctor name is a required field');
            document.getElementById('inputfamilydoctorname').style.borderColor = 'red';
          } else if (attendeeName === '') {
            alert('attendee name is a required field');
            document.getElementById('inputattendeePerson').style.borderColor = 'red';
          } 
           else if (emergencyContact === '') {
            alert('emergency contact number is a required field');
            document.getElementById('inputemergencycontactnumber').style.borderColor = 'red';
          } else if (addressLine1 === '') {
            alert('address line 1 is a required field');
            document.getElementById('inputaddressline1').style.borderColor = 'red';
          } else if (addressLine2 === '') {
            alert(' address line 2 is a required field');
            document.getElementById('inputaddressline2').style.borderColor = 'red';
          } else if (city === '') {
            alert('city is a required field');
            document.getElementById('inputcity').style.borderColor = 'red';
          }  else if (state === '') {
            alert('state is a required field');
            document.getElementById('inputstate').style.borderColor = 'red';
          }else if (pincode === '' || pincode.length !== 6) {
            alert('Enter a valid 6-digit Pincode');
            document.getElementById('inputpincode').style.borderColor = 'red';
          }else if (gender === '') {
            alert('gender is a required field');
            document.getElementById('inputgender').style.borderColor = 'red';
          }else if (dOB === '') {
            alert('Date of birth is a required field');
            document.getElementById('dOB').style.borderColor = 'red';
          }else if (age === '' || age.length >2 || age === '0') {
            alert('Enter valid age details');
            document.getElementById('age').style.borderColor = 'red';
          }

           else if (medicalInsurances === '') {
            alert('medical insurance is a required field');
            document.getElementById('inputmedicalinsurance').style.borderColor = 'red';
          }else if (medicalInsuranceNumber === '') {
            alert('Insurance Number is a required field');
            document.getElementById('inputmedicalnumber').style.borderColor = 'red';
          }
           else if (aadhar === '' || aadhar.length !==12) {
            alert('Enter a valid 12-digit aadhar card number');
            document.getElementById('inputaadhar').style.borderColor = 'red';
          }else if (password === '') {
            alert('password is a required field');
            document.getElementById('inputpassword').style.borderColor = 'red';
          } else if (confirmPassword === '') {
            alert('confirm password is a required field');
            document.getElementById('inputrepassword').style.borderColor = 'red';   
          }
          else if(!inputPatientName(patientName)){
            alert('must enter patient name with only alphabets');
            document.getElementById('inputPatientName').style.borderColor= 'red';
          }           
          else if(!inputmobileNumber(patientMobileNumber)){
            alert('mobile number must contain only 10 numbers');
            document.getElementById('inputMobile').style.borderColor= 'red';
          }
          
          else if (!isValidEmail(patientEmail)) {
            alert('Enter a valid email address');
            document.getElementById('inputEmail').style.borderColor = 'red';
          }
          else if(!inputfamilydoctorname(familyDoctorName)){
            alert('must enter family doctor name with only alphabets');
            document.getElementById('inputfamilydoctorname').style.borderColor= 'red';
          }else if(!inputattendeePerson(attendeeName)){
            alert('must enter attendee name with only alphabets');
            document.getElementById('inputattendeePerson').style.borderColor= 'red';
          }
          else if(!inputCity(city)){
            alert('must enter city name with only alphabets');
            document.getElementById('inputcity').style.borderColor = 'red';            
          }else if(!inputState(state)){
            alert('must enter state name with only alphabets');
            document.getElementById('inputstate').style.borderColor = 'red';
          }
          else if(!inputemergencyNumber(emergencyContact)){
            alert('emergency contact number must contain only 10 numbers');
            document.getElementById('inputemergencycontactnumber').style.borderColor = 'red';
          }else if (!isValidPassword(password)) {
            alert(
              'Password must be 8 to 16 characters long and include at least one letter, one number, and one special character.'
            );
            document.getElementById('inputpassword').style.borderColor = 'red';
          }else if (!isValidRePassword(confirmPassword)) {
            alert(
              'RePassword must be 8 to 16 characters long and include at least one letter, one number, and one special character.'
            );
            document.getElementById('inputrepassword').style.borderColor = 'red';
          }else if(password!==confirmPassword){
            alert('password doesnot match');
          }
          
          
        else{
            const data = {
                patientName,
                patientMobileNumber,
                patientEmail,
                medicalInformation,
                bloodGroup,
                chronicDisease,
                familyDoctorName,
                attendeeName,
                emergencyContact,
                addressLine1,
                addressLine2,
                city,
                age,
                state,
                pincode,
                gender,
                dOB,
                medicalInsurances,
                medicalInsuranceNumber,
                aadhar,
                password,
                confirmPassword,               
          
                
            };
        

                
    try {
      const response = await axios.post('http://localhost:8098/patient/register' ,data);
        setPatientName('');
        setPatientMobileNumber('');
        setPatientEmail('');
        setMedicalInformation('');
        setBloodGroup('');
        setChronicDisease('');
        setFamilyDoctorName('');
        setAttendeeName('');
        setEmergencyContact('');
        setAddressLine1('');
        setAddressLine2('');
        setCity('');
        setState('');
        setPincode('');
        setGender('');
        setDOB('');
        setAge('');
        setMedicalInsurances('');
        setMedicalInsuranceNUmber('');
        setAadhar('');
        setPassword('');
        setConfirmPassword(''); 
        alert(" Registration successful... " );      
        console.log(response);
        navigate('/login')    
 
      }catch(error){
      
      if (error.response.status === 500) {
          alert("email already exists");
      }
      else {
          console.log("error occured"+error);
      }
       
      }
    }
    };
  
    const isValidEmail = (patientEmail) =>{
        const validDomains = ['gmail.com','gmail.in','gmail.org','hotmail.com','hotmail.in','hotmail.org','yahoo.com','yahoo.in','yahoo.org'];
        const emailRegex = new RegExp(`^[A-Za-z0-9._%+-]+@(${validDomains.join('|')})$`);
        return emailRegex.test(patientEmail);
    }
    const isValidPassword = (password) =>{
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        return passwordRegex.test(password);
    }
    const isValidRePassword = (confirmPassword) =>{
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        return passwordRegex.test(confirmPassword);
    }
  
  
    const inputState = (state) => {

        const stateRegex= /^[a-zA-Z]+$/;
        return stateRegex.test(state);          
      }
      
    
    
      const inputmobileNumber = (patientMobileNumber)=>
      {
        const mobileRegex=/^\d{10}$/;
        return mobileRegex.test(patientMobileNumber);
      }

      const inputemergencyNumber = (emergencyContact)=>
      {
        const numberRegex=/^\d{10}$/;
        return numberRegex.test(emergencyContact);
      }

       
    
    const inputCity = (city) => {
        const cityRegex=/^[a-zA-Z]+$/;
        return cityRegex.test(city);
      }
    
      const inputPatientName = (patientName) => {
       const nameRegex=/^[a-zA-Z]+$/;
       return nameRegex.test(patientName);
      }

      const inputfamilydoctorname = (familyDoctorName) => {
        const nameRegex=/^[a-zA-Z]+$/;
        return nameRegex.test(familyDoctorName);
       }
      
       const inputattendeePerson = (attendeePerson) => {
        const nameRegex=/^[a-zA-Z]+$/;
        return nameRegex.test(attendeePerson);
       }
    
    
    
   return(
        <>
    <LandNav/>
    <div className="container-fluid bg-body-tertiary p-5" style={{backgroundImage:`url(https://www.wallpapertip.com/wmimgs/99-998859_background-image-for-hospital.jpg)`}}>
       <h2 style={{textAlign:'center'}}>Registration</h2>
        <div className="row">
        <div className="col-12">
          <div className="container pt-4">
            <form className="row g-3">    
          <div className='col-md-6'>
            <label for='patientName'  text-primary fw-bold>Patient Name :</label> 
            <input type='text' className="form-control" id='inputPatientName' value={patientName} onChange={(e)=>setPatientName(e.target.value)} placeholder='enter patientname' required/>
          </div>
          <div className='col-md-6'>
            <label for='mobileNumber' >Mobile :</label>
            <input type='tel' className="form-control" id='inputMobile'value={patientMobileNumber} onChange={(e)=>setPatientMobileNumber(e.target.value)} placeholder='enter mobile number' required/>
          </div>
          <div className='col-md-6'>
            <span id='check-email'></span>
            <label for='email' >Email :</label>
            <input type='email' name='email' className="form-control" id='inputEmail' value={patientEmail} onChange={(e)=>setPatientEmail(e.target.value)}
            placeholder='enter your email'/>
          </div>
          <div className='col-md-6'>
            <label for='medicalInformation' >Medical Information :</label>
            <input type='text' className="form-control" id='inputMedicalInformation' value={medicalInformation} onChange={(e)=>setMedicalInformation(e.target.value)} placeholder='enter medical information'/>
          </div>
          <div className='col-md-6'>
            <label for='bloodGroup' >Blood Group :</label>
            <select id='inputBloodGroup'  class="form-select form-select-sm" value={bloodGroup} onChange={(e)=>setBloodGroup(e.target.value)}  aria-label=".form-select-sm example">
                <option selected>select bloodGroup</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
            </select>
          </div>
          <div className='col-md-6'>
            <label for='chronicDisease' >Chronic diseases :</label>
            <select id='inputchronicdiseases' class="form-select form-select-sm" value={chronicDisease} onChange={(e)=>setChronicDisease(e.target.value)} aria-label=".form-select-sm example" >
                <option selected>select diseases</option>
                <option>Heart Disease</option>
                <option>Diabetes</option>
                <option>CKD</option>
                <option>Neurological diseases</option>
                <option>B.P</option> 
                <option>Others</option>               
            </select>
          </div>
          <div className='col-md-6'>
            <label for='familyDoctorName' >Family Doctor Name :</label>
            <input type='text' id='inputfamilydoctorname' className="form-control" value={familyDoctorName} onChange={(e)=>setFamilyDoctorName(e.target.value)} placeholder='enter family doctor name'/>
          </div>
          <div className='col-md-6'>
            <label for='attendeePerson' >Attendee Name :</label>
            <input type='text' id='inputattendeePerson' className="form-control" value={attendeeName} onChange={(e)=>setAttendeeName(e.target.value)} placeholder='enter attendee name'/>
          </div>
          <div className='col-md-6'>
            <label for='emergencyContact' >Emergency Contact Number :</label>
            <input type='tel' id='inputemergencycontactnumber' className="form-control" value={emergencyContact} onChange={(e)=>setEmergencyContact(e.target.value)} placeholder='enter emergency contact number' required/>
          </div>
          <div className='col-md-6'>
            <label for='addressLine1' >Address Line1 :</label>
            <input type='text' id='inputaddressline1' className="form-control" value={addressLine1} onChange={(e)=>setAddressLine1(e.target.value)} placeholder='enter Line 1'/>
          </div>
          <div className='col-md-6'>
            <label for='addressLine2' >Address Line2 :</label>
            <input type='text' id='inputaddressline2' className="form-control" value={addressLine2} onChange={(e)=>setAddressLine2(e.target.value)} placeholder='enter Line 2'/>
          </div>
          <div className='col-md-6'>
            <label for='city' >City :</label>
            <input type='text' id='inputcity' className="form-control" value={city} onChange={(e)=>setCity(e.target.value)} placeholder='enter city'/>
          </div>
          <div className='col-md-6'>
            <label for='state' >State :</label>
            <input type='text' id='inputstate' className="form-control" value={state} onChange={(e)=>setState(e.target.value)} placeholder='enter state'/>
          </div>
          <div className='col-md-6'>
            <label for='pincode' >Pincode :</label>
            <input type='number' id='inputpincode' className="form-control" value={pincode} onChange={(e)=>setPincode(e.target.value)} placeholder='enter pincode'/>
          </div>
          <div className='col-md-6'>
            <label for='gender' >Gender :</label>
            <select id='inputgender' class="form-select form-select-sm" value={gender} onChange={(e)=>setGender(e.target.value)} aria-label=".form-select-sm example" >
                <option selected>select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>       
            </select>
          </div>
          <div className='col-md-6'>
            <label for='dob'>Date of Birth:</label>
            <input type='date' id='dOB' className='form-control' value={dOB} onChange={(e)=>setDOB(e.target.value)}/>
          </div>

          <div className='col-md-6'>
            <label for='age'>Age:</label>
            <input type='number' id='age' className='form-control' value={age} onChange={(e)=>setAge(e.target.value)}/>
          </div>
          <div className='col-md-6'>
            <label for='medicalInsurances' >Medical Insurance :</label>
            <select id='inputmedicalinsurance' class="form-select form-select-sm" value={medicalInsurances} onChange={(e)=>setMedicalInsurances(e.target.value)} >
                <option selected>select Medical Insurances</option>
              
                <optgroup label="Govt">
                   <option value="Aroghyasree">AroghyaSree</option>
                   <option value="ESI">ESI</option>
                </optgroup>
                <optgroup label="Private">
                   <option value="private1">Aditya Birla Sun Life Insurance</option>
                   <option value="private2">HDFC Life Insurance Company</option>
                </optgroup>                            
            </select>
          </div>
          <div className='col-md-6'>
            <label for='medicalnumber'>Insurance Number</label>
            <input type='text' id='inputmedicalnumber' className='form-control' value={medicalInsuranceNumber} onChange={(e)=>setMedicalInsuranceNUmber(e.target.value)}/>
          </div>
          <div className='col-md-6'>
            <label for='aadhar' >Aadhar Card Number :</label>
            <input type='number' id='inputaadhar' className="form-control" value={aadhar} onChange={(e)=>setAadhar(e.target.value)} placeholder='enter aadhar card number'/>
          </div>
          <div className='col-md-6'>
            <label for='password' >Password :</label>
            <input type='password' id='inputpassword' className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='enter password'/>
          </div>
          <div className='col-md-6'>
            <label for='repassword' >Re-Password :</label>
            <input type='password' id='inputrepassword' className="form-control" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='re-enter password'/>
          </div>
         
        
         
          <div className='text-center'>
            <button type="button" className="btn btn-primary" onClick={submit} >Sign Up</button>
          </div> 
          <div className="p-3">
            <p>have an Account? <Link to='/login'>Login here</Link></p>
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



export default Register;

