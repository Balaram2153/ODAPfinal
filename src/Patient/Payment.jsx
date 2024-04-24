
import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FooterPage from '../Landpage/FooterPage';
import PatientNav from './PatientNav';
import pic from "../img/paymentimage.jpg";
import logo from "../img/logopayments.png";


const Payment = () => {

  const location = useLocation();

  const { patientData } = location.state || {};

  
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  const [selectedPaymentOption, setSelectedPaymentOption] = useState('');

  const [patientName, setPatientName] = useState(patientData.patientName);
  const [patientEmail, setPatientEmail] = useState(patientData.patientEmail);
  const [patientMobileNumber, setPatientMobileNumber] = useState(patientData.patientMobileNumber);
  const [typeOfService, setTypeOfService] = useState(patientData.typeOfService);
  const [doctorName, setDoctorName] = useState(patientData.doctorName);
  const [hospitalName, setHospitalName] = useState(patientData.hospitalName);
  const [address, setAddress] = useState(patientData.address);
  const [speciality, setSpeciality] = useState(patientData.speciality);
  const [fee, setFee] = useState(patientData.fee);
  const [totalFee, setTotalFee] = useState(patientData.totalFee);
  const [bookingDate, setBookingDate] = useState(patientData.bookingDate);
  const [bookingTime, setBookingTime] = useState(patientData.bookingTime);
  const [modeOfPayment, setModeOfPayment] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCVV] = useState('');
  const [upiID, setUPIID] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
 const [Error,setError]=useState('');


    const handleOptionChange = (e) => {
        setSelectedPaymentOption(e.target.value);
    };



  const navigatehome = useNavigate();





  const handlePayment = async (event) => {

    event.preventDefault();


    const formData =
    {
      patientName,
      patientEmail,
      patientMobileNumber,
      doctorName,
      hospitalName,
      address,
      speciality,
      typeOfService,
      fee,
      totalFee,
      bookingDate,
      bookingTime,
      
    };

    const digits = /[0-9]/;
    const alphabets = /[a-z,A-Z]/;
    
    if (!selectedPaymentOption) {
      alert("Please select a payment method");
      return;
    }   
    if (selectedPaymentOption === "card") {
      if (!cardNumber || alphabets.test(cardNumber) || cardNumber.length !== 16) {
        alert("Please enter a valid 16-digit card number");
        return;
      }
    
      if (!expiry || alphabets.test(expiry) || expiry.length > 5 || expiry[2] !== '/') {
        alert("Please enter a valid card expiry date in the format MM/YY");
        return;
      }
      
      if (!cvv || alphabets.test(cvv) || cvv.length !==3) {
        alert("Please enter a valid 3-digit CVV");
        return;
      }
    }
    
    else if(selectedPaymentOption === "Cash Payment"){
      alert("success")
  }
    const pdf = new jsPDF();

    
    pdf.addImage(pic, 'JPG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    pdf.addImage(logo, 'PNG', 20, 20, 40, 40); 
    pdf.text('Acknowledgement', 80, 60);
    //pdf.text(`Transaction ID : ${id}`,20,30);
   pdf.text(`Patient ID: ${patientData.patientId}`,20,70);
   pdf.text(`Appointment ID: ${patientData.appointmentId}`,20,80);
   pdf.text(` Date: ${currentDate}`, 140, 70);
   pdf.text(` Time: ${currentTime}`, 140, 80);
    pdf.text(`Name of Patient: ${patientData.patientName}`, 20, 90);
    pdf.text(`Age: ${patientData.age}`,20,100);
    pdf.text(`Phone Number: ${patientData.patientMobileNumber}`,20,110);

    pdf.text('Appointmet Details: ', 20, 130);
    pdf.text(`Name of Doctor: ${patientData.doctorName}`, 20, 140);
    pdf.text(`Date : ${patientData.bookingDate}`, 20, 150);
    pdf.text(`Time : ${patientData.bookingTime}`, 20, 160);
    pdf.text(`Address : ${patientData.address}`, 20, 170);
    pdf.text(`Type of Consultation: ${patientData.typeOfService}`,20,180);
    pdf.text(`Web Link: ${patientData.webLink}`,20,190);
    pdf.text('Payment Details: ', 20, 210);
    pdf.text('Status : Success ', 20, 220);
    pdf.text(`Amount : ${patientData.totalFee}`, 20, 230);
    pdf.text('Mode of Payment :' + selectedPaymentOption, 20, 240);
    pdf.save('Appointment.pdf');



    alert("Payment successful!");
    navigatehome('/');
    localStorage.clear();
      


    try {
      const response = await axios.post('http://localhost:9081/payment', formData);
      setPatientEmail('');
      setPatientName('');
      setPatientMobileNumber('');
      setAddress('');
      setFee('');
      setTotalFee('');
      setTypeOfService('');
      setSpeciality('');
      setBookingDate('');
      setBookingTime('');
      setDoctorName('');
      setHospitalName('');
      setModeOfPayment('');
      setCardNumber('');
      setCVV('');
      setExpiry('');
      setUPIID('');

      console.log(response);

      console.log(response.status);


    

     


    }
    catch (error) {
      console.log(error);
    }



  };

  const formatCardNumber = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    const formattedValue = cleanedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formattedValue;
  };

 

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;

    setCardNumber(prevData => ({
      ...prevData,
      [name]: value

    }));

    setCVV(prevData =>
    ({
      ...prevData,
      [name]: value
    }));

    setExpiry(prevData => ({
      ...prevData,
      [name]: value
    }));

  };
  const formatExpiryDate = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    if (cleanedValue.length > 2) {
      return cleanedValue.slice(0, 2) + '/' + cleanedValue.slice(2);
    } else {
      return cleanedValue;
    }
  };

  


  return (
    <>
      <PatientNav />

      <br />

      <div className='container-fluid'>


        <form className="form-container">
          <h2 style={{ textAlign: "center" }}>Patient Details:-</h2>


          <div className="form-group">
            <label >Patient Name:</label>
            <input type='text' id='patientName' value={patientData.patientName} />
          </div>
          <div className="form-group">
            <label >Patient Email:</label>
            <input type='text' value={patientData.patientEmail} />
          </div>
          <div className="form-group">
            <label >Patient Mobile Number:</label>
            <input type='text' value={patientData.patientMobileNumber} />
          </div>
          <h2 style={{ textAlign: 'center' }}>Appointment Details:-</h2>
          <div className="form-group">
            <label>Doctor Name:</label>
            <input type='text' value={patientData.doctorName} />
          </div>
          <div className="form-group">
            <label >Hospital Name:</label>
            <input type='text' value={patientData.hospitalName} />
          </div>
          <div className="form-group">
            <label htmlFor="Specialization">Specialization:</label>
            <input type='text' value={patientData.speciality} />
          </div>
          <div className="form-group">
            <label htmlFor="bookingDate">Booking Date:</label>
            <input type='text' value={patientData.bookingDate} />
          </div>
          <div className="form-group">
            <label htmlFor="bookingTime">Booking Time:</label>
            <input type='text' value={patientData.bookingTime} />
          </div>
          <div className="form-group">
            <label htmlFor="bookingTime">Service Type:</label>
            <input type='text' value={patientData.typeOfService} />
          </div>

          <h2 style={{ textAlign: 'center' }}>Payment Details:-</h2>
          <div className="form-group">
            <label htmlFor="fee">Fees :</label>
            <input type='text' value={patientData.fee} />
          </div>
          <div className="form-group">
            <label htmlFor="totalFee">Total Fees:</label>
            <input type='text' value={patientData.totalFee} />
          </div>

       

          <tr>
                        <td>Payment method :</td>
                        <td>
                            {/* <input type="text" value={paymenttype} onChange={(e) => setPaymenttype(e.target.value)} /> */}
                            <label>
                                <input type="radio" value="cash" checked={selectedPaymentOption === 'cash'} onChange={handleOptionChange} />
                                Cash
                            </label>
                            <label>
                                <input type="radio" value="card" checked={selectedPaymentOption === 'card'} onChange={handleOptionChange} />
                                Card
                            </label>
                            <label>
                                <input type="radio" value="upi" checked={selectedPaymentOption === 'upi'} onChange={handleOptionChange} />
                                UPI
                            </label>
                        </td>
                        {selectedPaymentOption === 'card' && (
                            <div>
                                <p>card number :</p>
                                <input type="number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                               
                                <p>expiry date :</p>
                                <input type="text" placeholder='mm/yy' value={expiry} onChange={(e) => setExpiry(e.target.value)} />
                                <p>cvv :</p>
                                <input type="number" value={cvv} onChange={(e) => setCVV(e.target.value)} />
                            </div>
                        )}
                        {selectedPaymentOption === 'upi' && (
                            <div>
                                <p>Please scan the QR code and complete your payment</p>
                                <img src="qr_code.jpg"></img>
                            </div>
                        )}
                    </tr>

        
         
            <button style={{ alignItems: "center" }} onClick={handlePayment}>Proceed</button>
            {/* <button onClick={PaymentReciept}>PDF</button> */}
        
        </form>
      </div>

      <FooterPage />
    </>
  );
};

export default Payment;
