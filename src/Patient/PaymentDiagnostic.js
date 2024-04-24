import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentPage.css';
import { jsPDF } from 'jspdf';
import PatientNav from './PatientNav';
import FooterPage from '../Landpage/FooterPage';



const PaymentDiagnostic = () => {
  const navigate = useNavigate();
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
  const [formData, setFormData] = useState({
    Referredbydr: '',
    nameofpatient: '',
    age: '',
    allergies: '',
    Appointmentdetails: '',
    PatientAddress:'',  
    tests: '',
    date: '',
    Time: '',
    paymentDetails: '',
    Testname: '',
    code: '',
    Amount: '',
    Gst: '',
    NextTotal: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handlePaymentOptionChange = (option) => {
    setSelectedPaymentOption(option);
    setFormData((prevData) => ({
      ...prevData,
      cardNumber: '',
      expiry: '',
      cvv: '',
    }));
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    alert('Payment Successful');
  };

  const handlePrintReceipt = () => {
    const doc = new jsPDF();
    doc.text('Service Receipt', 10, 10);
    doc.text(`referred by Dr: ${formData.Referredbydr}`, 10, 20);
    doc.text(`name of patient: ${formData.nameofpatient}`, 10, 30);
    doc.text(`age: ${formData.age}`, 10, 40);
    doc.text(`allergies: ${formData.allergies}`, 10, 50);
    doc.text(`Appointmentdetails ${formData.Appointmentdetails}`, 10, 60);
    doc.text(`patientAddress: ${formData.PatientAddress}`, 10, 70);
    doc.text(`tests: ${formData.tests}`, 10, 80);
    doc.text(`Date: ${formData.date}`, 10, 90);
    doc.text(`Time: ${formData.Time}`, 10, 100);
    doc.text(`Payment Details ${formData.paymentDetails}`, 10, 110);
    doc.text(`Test Name: ${formData.Testname}`, 10, 120);
    doc.text(`Code: ${formData.code}`, 10, 130);
    doc.text(`Amount: ${formData.Amount}`, 10, 140);
    doc.text(`GST: ${formData.Gst}`, 10, 150);
    doc.text(`Next Total: ${formData.NextTotal}`, 10, 160);
  

    doc.save('receipt.pdf');
  };

  return (
    <div className="payment-page">
      <div className="left-section">
        <div className="receipt">
          <div>
            <h2>Payment Receipt</h2>
          <h2 style={{ marginRight: '120px' }}></h2>
            <label>Referredbydr:</label>
            <input
              className="xyz"
              type="text"
              name="Referredbydr"
              value={formData.Referredbydr}
              onChange={handleFormInputChange}
            />
             <h2 style={{ marginRight: '120px' }}></h2>
            <label>Nameofpatient:</label>
            <input
              className="xyz"
              type="text"
              name="nameofpatient"
              value={formData.nameofpatient}
              onChange={handleFormInputChange}
            />
            <h2 style={{ marginRight: '120px' }}></h2>
            <label>Age:</label>
            <input
              className="xyz"
              type="text"
              name="age"
              value={formData.age}
              onChange={handleFormInputChange}
            />
            <h2 style={{ marginRight: '120px' }}></h2>
            <label>Allergies:</label>
            <input
              className="xyz"
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleFormInputChange}
            />
            <h2 style={{ marginRight: '120px' }}></h2>
            <h1><label>Appointmentdetails</label></h1>
            <h2 style={{marginRight:'120px'}}></h2>
            <label>PatientAddress:</label>
            <input
            className="xyz"
            type="text"
            name="PatientAddress"
            value={formData.PatientAddress}
            onChange={handleFormInputChange}
            />
            <h2 style={{marginRight:'120px'}}></h2>
            <label>Tests:</label>
            <input
            className="xyz"
            type="text"
            name="tests"
            value={formData.tests}
            onChange={handleFormInputChange}
            />
            <h2 style={{ marginRight: '120px' }}></h2>
            <label>Time:</label>
            <input
              className="xyz"
              type="time"
              name="Time"
              value={formData.Time}
              onChange={handleFormInputChange}
            />
            <h2 style={{marginRight:'120px'}}></h2>
            <label>Date:</label>
            <input
            className='xyz'
            type='date'
            name='date'
            value={formData.date}
            onChange={handleFormInputChange}
            />
            <h2 style={{ marginRight: '120px' }}></h2>
            <h1><label>Payment Details</label></h1>
            {/* <input
              className="xyz"
              type="text"
              name="paymentDetails"
              value={formData.paymentDetails}
              onChange={handleFormInputChange}
            /> */}
             <h2 style={{ marginRight: '120px' }}></h2>
            <label>Test Name:</label>
            <input
              className="xyz"
              type="text"
              name="Testname"
              value={formData.Testname}
              onChange={handleFormInputChange}
            />
            <h2 style={{ marginRight: '120px' }}></h2>
            <label>Code:</label>
            <input
              className="xyz"
              type="text"
              name="code"
              value={formData.code}
              onChange={handleFormInputChange}
            />
            <h2 style={{ marginRight: '120px' }}></h2>
            <label>Amount:</label>
            <input
              className="xyz"
              type="text"
              name="Amount"
              value={formData.Amount}
              onChange={handleFormInputChange}
            />
            <h2 style={{ marginRight: '120px' }}></h2>
            <label>GST:</label>
            <input
              className="xyz"
              type="text"
              name="Gst"
              value={formData.Gst}
              onChange={handleFormInputChange}
            />
             <h2 style={{ marginRight: '120px' }}></h2>
            <label>Next Total:</label>
            <input
              className="xyz"
              type="text"
              name="NextTotal"
              value={formData.NextTotal}
              onChange={handleFormInputChange}
            />
          </div>
        </div>
      </div>
      <div className="right-section">
        <h2>Select Payment Option</h2>
        <div className="payment-options">
         <strong1> <label>
            <input
              type="radio"
              name="paymentOption"
              value="Cash Payment"
              checked={selectedPaymentOption === 'Cash Payment'}
              onChange={() => setSelectedPaymentOption('Cash Payment')}
            />
            Cash Payment
          </label></strong1>
          <label>
            <input
              type="radio"
              name="paymentOption"
              value="Card Payment"
              checked={selectedPaymentOption === 'Card Payment'}
              onChange={() => setSelectedPaymentOption('Card Payment')}
            />
            Card Payment
          </label>
        </div>
        {selectedPaymentOption === 'Card Payment' && (
          <form onSubmit={handleFormSubmit} className="payment-form">
            <strong>
              <h3>Card Payment</h3>
            </strong>
            <strong>
              <label>Card Number:</label>
            </strong>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleFormInputChange}
              required
            />
            <strong>
              <label>Expiry:</label>
            </strong>
            <input
              type="text"
              name="expiry"
              value={formData.expiry}
              onChange={handleFormInputChange}
              required
            />
            <strong>
              <label>CVV:</label>
            </strong>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleFormInputChange}
              required
            />
          </form>
        )}
        {selectedPaymentOption && (
         <button onClick={handlePrintReceipt}>Proceed</button>
        )}
      </div>
    </div>
  );
};

export default PaymentDiagnostic;

// const PaymentDiagnostic = () => {
//   const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
//   const [formData, setFormData] = useState({
//     patientName: '',
//     patientEmail: '',
//     patientMobileNumber: '',
//     dateBooking: '',
//     referralDoctorName: '',
//     diagnosticCenter: '',
//     bookingTime: '',
//     patientPreviousReport: '',
//     address: '',
//     testServiceDetails: '',
//     fee: '',
//     cardNumber: '',
//     expiry: '',
//     cvv: '',
//     date: '',
//     Time: '',
//     paymentDetails: '',
//     Testname: '',
//     code: '',
//     Amount: '',
//     Gst: '',
//     NextTotal: '',
//   });
//   const navigate = useNavigate();

//   const handlePaymentOptionChange = (option) => {
//     setSelectedPaymentOption(option);
//     setFormData((prevData) => ({
//       ...prevData,
//       cardNumber: '',
//       expiry: '',
//       cvv: '',
//     }));
//   };

//   const handleFormInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.uniqueId.trim()) {
//       alert('Please enter a valid Unique ID');
//       return;
//     }

//     console.log('Form data:', formData);
//     alert('Payment Successful');
//     navigate('/confirmation');
//   };

//   const handlePrintReceipt = () => {
//     const doc = new jsPDF();
//     doc.text('Service Receipt', 10, 10);
//     doc.text(`Date: ${formData.date}`, 10, 20);
//     doc.text(`Time: ${formData.Time}`, 10, 30);
//     doc.text(`Payment Details: ${formData.paymentDetails}`, 10, 40);
//     doc.text(`Test Name: ${formData.Testname}`, 10, 50);
//     doc.text(`Code: ${formData.code}`, 10, 60);
//     doc.text(`Amount: ${formData.Amount}`, 10, 70);
//     doc.text(`GST: ${formData.Gst}`, 10, 80);
//     doc.text(`Next Total: ${formData.NextTotal}`, 10, 90);

//     if (selectedPaymentOption === 'Card Payment') {
//       doc.text(`Card Number: ${formData.cardNumber}`, 10, 100);
//       doc.text(`Expiry: ${formData.expiry}`, 10, 110);
//       doc.text(`CVV: ${formData.cvv}`, 10, 120);
//     }

//     doc.save('receipt.pdf');
//   };

//   return (
//     <>
//     <PatientNav/>
   
//     <div className="payment-page">
//       <div className="left-section">
//         <div className="receipt">
//           <div>
//             <h2 style={{ marginRight: '120px' }}></h2>
//             <label>Date:</label>
//             <input
//               className="xyz"
//               type="text"
//               name="date"
//               value={formData.date}
//               onChange={handleFormInputChange}
//             />
//             <h2 style={{ marginRight: '120px' }}></h2>
//             <label>Time:</label>
//             <input
//               className="xyz"
//               type="text"
//               name="Time"
//               value={formData.Time}
//               onChange={handleFormInputChange}
//             />
//             <h2 style={{ marginRight: '120px' }}></h2>
//             <label>Payment Details:</label>
//             <input
//               className="xyz"
//               type="text"
//               name="paymentDetails"
//               value={formData.paymentDetails}
//               onChange={handleFormInputChange}
//             />
//              <h2 style={{ marginRight: '120px' }}></h2>
//             <label>Test Name:</label>
//             <input
//               className="xyz"
//               type="text"
//               name="Testname"
//               value={formData.Testname}
//               onChange={handleFormInputChange}
//             />
//             <h2 style={{ marginRight: '120px' }}></h2>
//             <label>Code:</label>
//             <input
//               className="xyz"
//               type="text"
//               name="code"
//               value={formData.code}
//               onChange={handleFormInputChange}
//             />
//             <h2 style={{ marginRight: '120px' }}></h2>
//             <label>Amount:</label>
//             <input
//               className="xyz"
//               type="text"
//               name="Amount"
//               value={formData.Amount}
//               onChange={handleFormInputChange}
//             />
//             <h2 style={{ marginRight: '120px' }}></h2>
//             <label>GST:</label>
//             <input
//               className="xyz"
//               type="text"
//               name="Gst"
//               value={formData.Gst}
//               onChange={handleFormInputChange}
//             />
//              <h2 style={{ marginRight: '120px' }}></h2>
//             <label>Next Total:</label>
//             <input
//               className="xyz"
//               type="text"
//               name="NextTotal"
//               value={formData.NextTotal}
//               onChange={handleFormInputChange}
//             />
//           </div>

//           <button onClick={handlePrintReceipt}>Print</button>
//         </div>
//       </div>
//       <div className="right-section">
//         <h2>Select Payment Option:</h2>
//         <div className="payment-options">
//           <label>
//             <input
//               type="radio"
//               name="paymentOption"
//               value="Cash Payment"
//               checked={selectedPaymentOption === 'Cash Payment'}
//               onChange={() => setSelectedPaymentOption('Cash Payment')}
//             />
//             Cash Payment
//           </label>
//           <label>
//             <input
//               type="radio"
//               name="paymentOption"
//               value="Card Payment"
//               checked={selectedPaymentOption === 'Card Payment'}
//               onChange={() => setSelectedPaymentOption('Card Payment')}
//             />
//             Card Payment
//           </label>
//         </div>
//         {selectedPaymentOption === 'Card Payment' && (
//           <form onSubmit={handleFormSubmit} className="payment-form">
//             <strong>
//               <h3>Card Payment</h3>
//             </strong>
//             <strong>
//               <label>Card Number:</label>
//             </strong>
//             <input
//               type="text"
//               name="cardNumber"
//               value={formData.cardNumber}
//               onChange={handleFormInputChange}
//               required
//             />
//             <strong>
//               <label>Expiry:</label>
//             </strong>
//             <input
//               type="text"
//               name="expiry"
//               value={formData.expiry}
//               onChange={handleFormInputChange}
//               required
//             />
//             <strong>
//               <label>CVV:</label>
//             </strong>
//             <input
//               type="text"
//               name="cvv"
//               value={formData.cvv}
//               onChange={handleFormInputChange}
//               required
//             />
//           </form>
//         )}
//         {selectedPaymentOption && (
//           <button onClick={handleFormSubmit}>Payment</button>
//         )}
//       </div>
//     </div>

//     </>
//   );
// };

// export default PaymentDiagnostic;
