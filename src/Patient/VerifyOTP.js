import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
  const [patientEmail, setPatientEmail] = useState('');
  const [enteredOTP, setEnteredOTP] = useState('');
  const [verificationResult, setVerificationResult] = useState('');
  const navigate=useNavigate(); 

  const handleVerifyOTP = async () => {

    try {
      const response = await axios.post(`http://localhost:8098/verify/${patientEmail}/${enteredOTP}`);
      const result = response.data;
      setVerificationResult(result ? 'OTP verified successfully' : 'OTP verification failed');
      navigate('/change');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setVerificationResult('Error verifying OTP');
    }
  };

  return (
    <div className='container' style={{marginTop:'200px'}}>
      <h2 style={{textAlign:'center'}}>Verify OTP</h2>
      <label>
        Patient Email:
        <input type="text" value={patientEmail} onChange={(e) => setPatientEmail(e.target.value)} />
      </label>
      <label>
        Entered OTP:
        <input type="text" value={enteredOTP} onChange={(e) => setEnteredOTP(e.target.value)} />
      </label>
      <button onClick={handleVerifyOTP}>Verify OTP</button>
      {verificationResult && <p>{verificationResult}</p>}
    </div>
  );
};

export default VerifyOTP;
