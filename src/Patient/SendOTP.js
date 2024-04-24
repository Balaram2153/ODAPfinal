import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SendOTP = () => {
  const [patientEmail, setPatientEmail] = useState('');
  
  const navigate =useNavigate();
  const handleSendOTP = async () => {

     if(patientEmail==='')
    {
      alert("enter email id");
    }
  
    try {
      await axios.post(`http://localhost:8098/getotp/${patientEmail}`);
      alert('OTP sent successfully');
      navigate('/verifyotp');
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Error sending OTP');
    }
  };

  return (
    <div className='container' style={{marginTop:'200px', height:'350px',width:'500px'}}>
      <h2 style={{textAlign:'center'}}>Send OTP</h2>
      <label>
        Patient Email:
        <input type="text" value={patientEmail} onChange={(e) => setPatientEmail(e.target.value)} />
      </label>
      <button onClick={handleSendOTP}>Send OTP</button>
    </div>
  );
};

export default SendOTP;
