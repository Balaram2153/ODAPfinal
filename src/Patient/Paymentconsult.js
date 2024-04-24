
import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FooterPage from '../Landpage/FooterPage';
import PatientNav from './PatientNav';
import pic from "../img/paymentimage.jpg";





const PaymentConsult = () => {

    const location = useLocation();
    const [data, setData] = useState(null);
    const doctorId = localStorage.getItem("doctorid");

  
    useEffect(() => {
  
        // Fetch data using the ID
       fetch(`http://localhost:9081/api/v1/${doctorId}`)
          .then(response => response.json())
          .then(value=>setData(value))
          .catch(error=>console.error(error));
         
      
    }, [doctorId]);

  const [selectedPaymentOption, setSelectedPaymentOption] = useState('');

  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientMobileNumber, setPatientMobileNumber] = useState('');
  const [typeOfService, setTypeOfService] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [address, setAddress] = useState();
  const [speciality, setSpeciality] = useState('');
  const [fee, setFee] = useState('');
  const [totalFee, setTotalFee] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [modeOfPayment, setModeOfPayment] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCVV] = useState('');
  const [upiID, setUPIID] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  console.log(data.patientName);




  const navigate = useNavigate();


  useEffect(() => {
    // Update state variables with fetched data when it's available
    if (data) {
        setPatientName(data.patientName);
        setPatientEmail(data.patientEmail);
        setAddress(data.address);
        // Update other state variables similarly
    }
}, [data]);


  const handlePayment = async () => {

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
      cardNumber,
      expiry,
      cvv,
      upiID,
    };




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

      const pdf = new jsPDF();

    pdf.addImage(pic, 'JPG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    pdf.text('Acknowledgement', 80, 20);
    //pdf.text(`Transaction ID : ${id}`,20,30);
    pdf.text(`Name of Patient: ${patientName}`, 20, 40);
    pdf.text('Appointmet Details: ', 20, 50);
    pdf.text(`Name of Doctor: ${doctorName}`, 20, 60);
    pdf.text(`Date : ${bookingDate}`, 20, 70);
    pdf.text(`Time : ${bookingTime}`, 80, 70);
    pdf.text(`Address : ${address}`, 20, 80);
    pdf.text('Payment Details: ', 20, 90);
    pdf.text('Status : Success ', 20, 100);
    pdf.text(`Amount : ${totalFee}`, 20, 110);
    pdf.text('Mode of Payment :' + selectedPaymentOption, 80, 100);
    // pdf.text('Payment Status: ',{paymentStatus}, 20, 120); 
    pdf.save('Appointment.pdf');



    alert("Payment successful!");
    navigate('/');
    localStorage.clear();

      



     


    }
    catch (error) {
      console.log(error);
    }




    


  }

  const formatCardNumber = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    const formattedValue = cleanedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formattedValue;
  };

  const handlePaymentOptionChange = (option) => {
    setSelectedPaymentOption(option);
    setPaymentStatus(option === 'Cash Payment' ? 'Pending' : 'Paid');
    setCardNumber(
      prevData => ({
        ...prevData,
        cardNumber: '',
      }));
    setCVV(prevData => ({
      ...prevData,
      expiry: '',
    }));
    setExpiry(prevData => ({
      ...prevData,
      cvv: '',
    }));

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
            <input type='text' id='patientName' value={patientName} onChange={(e)=>setPatientName(e.target.value)} />
          </div>
          <div className="form-group">
            <label >Patient Email:</label>
            <input type='text' value={patientEmail} />
          </div>
          <div className="form-group">
            <label >Patient Mobile Number:</label>
            <input type='text' value={patientMobileNumber} />
          </div>
          <h2 style={{ textAlign: 'center' }}>Appointment Details:-</h2>
          <div className="form-group">
            <label>Doctor Name:</label>
            <input type='text' value={doctorName} />
          </div>
          <div className="form-group">
            <label >Hospital Name:</label>
            <input type='text' value={hospitalName} />
          </div>
          <div className="form-group">
            <label htmlFor="Specialization">Specialization:</label>
            <input type='text' value={speciality} />
          </div>
          <div className="form-group">
            <label htmlFor="bookingDate">Booking Date:</label>
            <input type='text' value={bookingDate} />
          </div>
          <div className="form-group">
            <label htmlFor="bookingTime">Booking Time:</label>
            <input type='text' value={bookingTime} />
          </div>
          <div className="form-group">
            <label htmlFor="bookingTime">Service Type:</label>
            <input type='text' value={typeOfService} />
          </div>

          <h2 style={{ textAlign: 'center' }}>Payment Details:-</h2>
          <div className="form-group">
            <label htmlFor="fee">Fees :</label>
            <input type='text' value={fee} />
          </div>
          <div className="form-group">
            <label htmlFor="totalFee">Total Fees:</label>
            <input type='text' value={totalFee} />
          </div>

        </form>


        <form className='form-container'>
          <div>
            <h2 style={{ paddingLeft: "50px" }}>Payment Mode</h2>

            {/* <p style={{paddingLeft:"50px"}}>Total Fee: {patientData.totalFee}</p> */}


            <h5 style={{ paddingLeft: "50px" }}>Select Payment Option:</h5>

            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  name="paymentOption"
                  value="Cash Payment"
                  checked={selectedPaymentOption === 'Cash Payment'}
                  onChange={() => handlePaymentOptionChange('Cash Payment')}
                />
                Cash Payment
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentOption"
                  value="Card Payment"
                  checked={selectedPaymentOption === 'Card Payment'}
                  onChange={() => handlePaymentOptionChange('Card Payment')}
                />
                Card Payment
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentOption"
                  value="UPI Payment"
                  checked={selectedPaymentOption === 'UPI'}
                  onChange={() => handlePaymentOptionChange('UPI Payment')}
                />
                UPI Payment
              </label>
            </div>
            {selectedPaymentOption === 'Card Payment' && (
              <div>
                <h3>Card Payment</h3>
                <label>Card Number:</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="ex: 1234-5678-9876-5432"
                  maxLength="19"
                  required
                />
                <label>Expiry (MM/YY):</label>
                <input
                  type="text"
                  name="expiry"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                />
                <label>CVV:</label>
                <input
                  type="text"
                  name="cvv"
                  value={cvv}
                  onChange={(e) => setCVV(e.target.value)}
                  maxLength="3"
                  required
                />

              </div>
            )}

            <button style={{ alignItems: "center" }} onClick={handlePayment}>Proceed</button>
            {/* <button onClick={PaymentReciept}>PDF</button> */}
          </div>
        </form>
      </div>

      <FooterPage />
    </>
  );
};

export default PaymentConsult;
