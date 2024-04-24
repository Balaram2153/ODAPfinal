import React, { useState, useEffect } from 'react';
import './PaymentPage.css';
import { jsPDF } from 'jspdf';
import { useNavigate,useLocation} from 'react-router-dom';
import PatientNav from './PatientNav';
import pic from "../img/paymentimage.jpg";
import logo from "../img/logopayments.png";

const PaymentPage = () => {

  const location = useLocation();
  const { ambulanceData } = location.state || {};
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  const [formData, setFormData] = useState({
    fromType: '',
    fromHospitalName: ambulanceData.fromHospitalName,
    fromResidenceLine1: ambulanceData.fromResidenceLine1,
    fromResidenceLine2: ambulanceData.fromResidenceLine2,
    fromResidenceCity: ambulanceData.fromResidenceCity,
    toHospitalName: ambulanceData.toHospitalName,
    facilities: ambulanceData.facilities,
    email: ambulanceData.email,
    mobileNumber: ambulanceData.mobileNumber,
    serviceFee: ambulanceData.serviceFee, 
    date: ambulanceData.date,
    time:ambulanceData.time,
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardHolderName: '',
    uniqueId: ''
  });
  const [searchedCandidate, setSearchedCandidate] = useState(null);
  const [searchedUniqueId, setSearchedUniqueId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchFormData().then(data => {
      console.log("Fetched data:", data);
      console.log("Service Fee:", data.serviceFee);
      setFormData(data);
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  useEffect(() => {
    const serviceFee = parseFloat(formData.serviceFee);
    const GST = 0.12;
    const total = serviceFee + (serviceFee * GST);
    console.log("Service Fee:", serviceFee);
    console.log("Total Fee:", total);
    setFormData(prevData => ({
      ...prevData,
      totalFee: total
    }));
  }, [formData.serviceFee]); 

  const fetchFormData = async () => {
    const response = await fetch(`http://localhost:8910/getCandidateByUniqueId/${searchedUniqueId}`);
    const data = await response.json();
    console.log("Fetched candidate data:", data); // Log fetched candidate data
    return data;
  };


  const handlePaymentOptionChange = (option) => {
    setSelectedPaymentOption(option);
    setPaymentStatus(option === 'Cash Payment' ? 'Pending' : 'Paid');
    setFormData(prevData => ({
      ...prevData,
      cardNumber: '',
      expiry: '',
      cvv: '',
      cardHolderName: ''
    }));
  };


  
  
  
  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePrintReceipt = () => {


    const digits = /[0-9]/;
    const alphabets = /[a-z,A-Z]/;
    
    if (!selectedPaymentOption) {
      alert("Please select a payment method");
      return false;
    }   
    if (selectedPaymentOption === "Card Payment") {
      if (!formData.cardNumber || alphabets.test(formData.cardNumber)) {
        alert("Please enter a valid 16-digit card number");
        return;
      }
    
    
      if (!formData.expiry || alphabets.test(formData.expiry) || !formData.expiry.length === 5) {
        alert("Please enter a valid card expiry date in the format MM/YYYY");
        return;
      }
      
      if (!formData.cvv || alphabets.test(formData.cvv) || formData.cvv.length !=3) {
        alert("Please enter a valid 3-digit CVV");
        return;
      }
      if(!formData.cardHolderName || digits.test(formData.cardHolderName))
      {
        alert("please enter card holder name");
        return;
      }
    }
    
    else if(selectedPaymentOption === "Cash Payment"){
      alert("success")
  }


    const doc = new jsPDF();

    doc.addImage(pic, 'JPG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
    doc.addImage(logo, 'PNG', 20, 20, 40, 40);         
    doc.text("Ambulance Booking ", 80, 80);
  
    doc.text(` Date: ${currentDate}`, 140, 90);
    doc.text(` Time: ${currentTime}`, 140, 100);
    doc.text(`Dear,`, 10, 110);
    doc.text(`You have successfully booked your Ambulance service with the facility of ${ambulanceData.facilities},`, 10, 120);
    doc.text(`From: ${ambulanceData.fromHospitalName}`, 10, 130);
    doc.text(`To: ${ambulanceData.toHospitalName}`, 10, 140);
    doc.text(`Your ID is ${ambulanceData.patientId}.`, 10, 150);
    doc.text(`You get all the details through your email: ${ambulanceData.email}.`, 10, 160);
    doc.text(`and your Mobile Number: ${ambulanceData.mobileNumber}.`, 10, 170);
    doc.text(`Total Fee: ${ambulanceData.totalFee}`, 10, 180);
    doc.text(`Payment Status: ${paymentStatus}`, 10, 190); 
    doc.save("receipt.pdf");

    console.log('Form data:', formData);
    alert("Payment successful!");
    
    navigate('/');
    localStorage.clear();
  };

  const formatCardNumber = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    const formattedValue = cleanedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formattedValue;
  };

  const formatExpiryDate = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    if (cleanedValue.length > 2) {
      return cleanedValue.slice(0, 2) + '/' + cleanedValue.slice(2);
    } else {
      return cleanedValue;
    }
  };

  const handleUniqueIdChange = async (e) => {
    const value = e.target.value;
    setSearchedUniqueId(value);
    try {
      const response = await fetch(`http://localhost:8910/getCandidateByUniqueId/${value}`);
      if (response.ok) {
        const data = await response.json();
        setSearchedCandidate(data);
      } else {
        alert("Candidate not found.");
      }
    } catch (error) {
      console.error('Error searching for candidate:', error);
      alert("Failed to search for candidate.");
    }
  };

  return (
    <>
    <PatientNav/>
    <div className="payment-page">
      
    
        <div className="candidate-details" style={{marginLeft:'30px'}}>
          <h2>Candidate Details</h2>
          <p>Patient ID: {ambulanceData.patientId}</p>
          <p>Email: {ambulanceData.email}</p>
          <p>Mobile Number: {ambulanceData.mobileNumber}</p>
          <p>From Address: {ambulanceData.fromHospitalName}</p>
          <p>To Address: {ambulanceData.toHospitalName}</p>
          <p>Facility : {ambulanceData.facilities}</p>
          <p>GST : 12%</p>
          <p>Total Fee: {ambulanceData.totalFee}</p>
          <br/>
        </div>
     
      <div className="receipt">
        <h2>Service Receipt</h2>
      

        <p>Total Fee: {ambulanceData.totalFee}</p>

      
        <h3>Select Payment Option:</h3>
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
        </div>
        {selectedPaymentOption === 'Card Payment' && (
          <div>
            <h3>Card Payment</h3>
            <label>Card Number:</label>
            <input
              type="text"
              name="cardNumber"
              value={formatCardNumber(formData.cardNumber)}
              onChange={handleFormInputChange}
              placeholder="ex: 1234-5678-9876-5432"
              maxLength="19"
              required
            />
            <label>Expiry (MM/YY):</label>
            <input
              type="text"
              name="expiry"
              value={formatExpiryDate(formData.expiry)}
              onChange={handleFormInputChange}
              placeholder="MM/YY"
              maxLength="5"
              required
            />
            <label>CVV:</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleFormInputChange}
              maxLength="3" 
              required
            />
            <label>Card Holder Name:</label>
            <input
              type="text"
              name="cardHolderName"
              value={formData.cardHolderName}
              onChange={handleFormInputChange}
              required
            />
          </div>
        )}
        <button onClick={handlePrintReceipt}>Proceed</button>
      </div>
    </div>

    </>
  );
};

export default PaymentPage;
