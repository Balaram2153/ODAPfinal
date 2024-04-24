import React, { useState } from "react";

import axios from 'axios';

import { getPatientDetails, setAllPatients } from "./Authstate";
import LandNav from "../Landpage/LandNav";
import FooterPage from "../Landpage/FooterPage";


 function OnlineService(){
 
  const patient =getPatientDetails();
  
  const[doctorFirstname, setDoctorFirstName] = useState('');
  const[bookingdate, setBookingdate] = useState('');
  const[typeofservices, setTypeofservices] = useState('');
  const[hospitalname, setHospitalName] = useState('');
  const[slottime, setSlottime] = useState('');
  const[patientName,setPatientName]=useState(patient.patientName);
  const [phoneNumber, setPhoneNumber] = useState(patient.phoneNumber);
  const [email, setEmail] = useState('');


  
  const submit = async() =>{
    
    
    const Data  = { 

      doctorFirstname,
      bookingdate,
      typeofservices,
      hospitalname,
      slottime,
      email,
      phoneNumber,
      patientName,
      
    };

    try{
      
      

      const response1 = await axios.post('http://localhost:8094/booking' ,Data);
      setDoctorFirstName('');
      setBookingdate('');
      setTypeofservices('');
      setHospitalName('');
      setSlottime('');
      setEmail('');
      setPhoneNumber('');
      setPatientName('');
      alert("Booking succesful");
      console.log(response1);
    
      
    }
    catch(error){
      console.log(error);
    }
  }
  
    return(
      <>
  <LandNav/>
     <div className="container-fluid bg-body-tertiary p-5">
        <div className="row">
        <div className="col-12">
          <div className="container pt-4">
            <form className="row g-3">      
        
            <div className='col-md-6'>
            <label for='patientName'  text-primary fw-bold>Doctor Name :</label> 
            <input type='text' className="form-control" id='doctorname' value={doctorFirstname} onChange={(e)=>setDoctorFirstName(e.target.value)} required/>
          </div>
          <div className='col-md-6'>
            <label for='doctorname'  text-primary fw-bold>Hospital Name:</label> 
            <input type='text' className="form-control" id='hospitalname' value={hospitalname} onChange={(e)=>setHospitalName(e.target.value)} placeholder='enter doctor name' required/>
          </div>
          <div className='col-md-6'>
            <label for='date' >Booking Date:</label>
            <input type='date' className="form-control" id='Bookingdate'value={bookingdate} onChange={(e)=>setBookingdate(e.target.value)}  required/>
          </div>
          <div className='col-md-6'>
            <label for='services' >Type of Service:</label>
            <select id='Typeofservices' class="form-select form-select-sm" value={typeofservices} onChange={(e)=>setTypeofservices(e.target.value)} aria-label=".form-select-sm example" >
                <option selected>services</option>
                <option>Online</option>
                <option>Physical</option>
                                            
            </select>
          </div>
         
          <div className='col-md-6'>
            <label for='slot' >slot :</label>
            <select id='slot' class="form-select form-select-sm" value={slottime} onChange={(e)=>setSlottime(e.target.value)} aria-label=".form-select-sm example" >
                <option selected>slot </option>
                <option>10:00am </option>
                <option>11:00am</option>
                <option>12:00pm</option>
                           
            </select>
          </div>

          <div className='col-md-6'>
            <label for='name' >Patient Name :</label>
            <input type='text' name='patientname' className="form-control" id='inputname' value={patient.patientName} onChange={(e)=>setPatientName()}
            placeholder='enter your email'/>
          </div>
          <div className='col-md-6'>
            <label for='email' >Email :</label>
            <input type='email' name='email' className="form-control" id='inputEmail' value={email} onChange={(e)=>setEmail(e.target.value)}
            placeholder='enter your email'/>
          </div>
          <div className='col-md-6'>
            <label for='mobileNumber' >Mobile :</label>
            <input type='tel' className="form-control" id='inputMobile'value={patient.phoneNumber} onChange={(e)=>setPhoneNumber()} required/>
          </div>         
         
          
         

            
            
            
            
            
            
            
            
            
           
          <div className='text-center'>
            <button type="button" className="btn btn-primary" onClick={submit}>Book</button>
          </div> 
           
            </form>
          </div>  
          </div>
        </div>
        </div>
  <FooterPage/>
      </>  
    )
    }
    export default OnlineService;