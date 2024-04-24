import { useState } from "react";
import React from "react";
import jsPDF from "jspdf";
import './Payment.css'
import LandNav from "../Landpage/LandNav";
import FooterPage from "../Landpage/FooterPage";
import { useNavigate ,useLocation} from "react-router-dom";
import axios from "axios";
import pic from "../img/paymentimage.jpg";
import logo from "../img/logopayments.png";

function PaymentMedical() {

    const location = useLocation();
    const { patientData } = location.state || {};

    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    
    const navigate=useNavigate();
    const [patientId,setPatientId]=useState(patientData.patientId);
    const [patientName, setPatientname] = useState(patientData.patientName);
    const [typeofservices, setTypeOfService] = useState(patientData.typeofservices);
    const [hospitalname,setHospitalName]=useState(patientData.hospitalname);
    const [procedures,setProcedures]=useState(patientData.procedures);

    const [date, setDate] = useState(patientData.bookingdate);
    const [slottime, setSlottime] = useState(patientData.slottime);
    const [amount, setAmount] = useState(patientData.amount);
    const [cash, setCash] = useState('');
    const [card, setCard] = useState('');
    const [upi, setUpi] = useState('');
    const [cardnumber, setCardnumber] = useState('');
    const [nameoncard, setNameoncard] = useState('');
    const [cardexpiry, setCardexpiry] = useState('');
    const [cardcvv, setCardcvv] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const submit=async()=>
    {
        const data = {
                    patientName,
                    patientId,
                    typeofservices,
                    hospitalname,
                    procedures,
                    date,
                    slottime,
                    amount,
                    paymenttype: selectedOption,
                };

                 
      
                //     const digits = /[0-9]/;
                //     const alphabets = /[a-z,A-Z]/;
                    
                //     if (!selectedOption) {
                //       alert("Please select a payment method");
                //       return;
                //     }   
                //     if (selectedOption === "card") {
                //       if (!cardnumber || alphabets.test(cardnumber)) {
                //         alert("Please enter a valid 16-digit card number");
                //         return;
                //       }
                    
                //       if (!nameoncard || !/^[a-zA-Z\s]+$/.test(nameoncard)) {
                //         alert("Please enter a valid name on card (only alphabets and spaces)");
                //         return;
                //       }
                    
                //       if (!cardexpiry || alphabets.test(cardexpiry)) {
                //         alert("Please enter a valid card expiry date in the format MM/YYYY");
                //         return;
                //       }
                      
                //       if (!cardcvv || alphabets.test(cardcvv) || cardcvv.length !=3) {
                //         alert("Please enter a valid 3-digit CVV");
                //         return;
                //       }
                //     }
                    
                //     else if(paymenttype === cash){
                //       alert("success")
                //   }
                  const digits = /[0-9]/;
                  const alphabets = /[a-z,A-Z]/;
                  
                  if (!selectedOption) {
                    alert("Please select a payment method");
                    return;
                  }   
                  if (selectedOption === "card") {
                    if (!cardnumber || alphabets.test(cardnumber) || cardnumber.length !== 16) {
                      alert("Please enter a valid 16-digit card number");
                      return;
                    }
                  
                    if (!nameoncard || !/^[a-zA-Z\s]+$/.test(nameoncard)) {
                      alert("Please enter a valid name on card (only alphabets and spaces)");
                      return;
                    }
                  
                    if (!cardexpiry || alphabets.test(cardexpiry) || !cardexpiry.length === 5) {
                      alert("Please enter a valid card expiry date in the format MM/YYYY");
                      return;
                    }
                    
                    if (!cardcvv || alphabets.test(cardcvv) || cardcvv.length !=3) {
                      alert("Please enter a valid 3-digit CVV");
                      return;
                    }
                  }       
            
                const pdf = new jsPDF();
                pdf.addImage(pic, 'JPG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
                pdf.addImage(logo, 'PNG', 20, 20, 40, 40);         
                pdf.text("Slot Booking Receipt", 80, 80);
                pdf.text(`Patient ID: ${patientData.patientId}`,20,90);
                pdf.text(`Medical Id: ${patientData.medicalid}`,20,100);
                pdf.text(` Date: ${currentDate}`, 140, 90);
                pdf.text(` Time: ${currentTime}`, 140, 100);
                pdf.text(`Patient Name: ${patientData.patientName}`, 20, 110);
                pdf.text("Appointment Details:", 20, 130);
                pdf.text(`Type of Service: ${patientData.typeofservices}`, 20, 140);
                pdf.text(`Hospital Name: ${patientData.hospitalname}`,20,150);
                pdf.text(`Procedures: ${patientData.procedures}`,20,160);
                pdf.text(`Date: ${patientData.bookingdate}`, 20, 170);
                pdf.text(`Slot Time: ${patientData.slottime}`, 20, 180);
                pdf.text(`Amount: ${patientData.amount}`, 20, 190);
                pdf.save("slot_receipt.pdf");
    
                
    alert("Payment successful!");   
    localStorage.clear();
    navigate('/');

       try {  
    const response = await axios.post('http://localhost:8123/api/payments/save', data);
            setPatientname('');
            setPatientId('');
            setTypeOfService('');
            setHospitalName('');
            setProcedures('');
            setDate('');
            setSlottime('');
            setPaymenttype('');
            setAmount('');
            
       

       
            console.log(response);
  
            console.log(response.status);
           
          


        }
        catch (error) {
          console.log(error);
        }
       
    };
   
    //     const data = {
    //         patientname,
    //         appointmentdetails,
    //         date,
    //         slottime,
    //         amount,
    //         paymenttype,
    //     };
    //     try {
    //         const response = await axios.post('http://localhost:9082/api/payment', data);
    //         setPatientname('');
    //         setAppointmentdetails('');
    //         setDate('');
    //         setSlottime('');
    //         setPaymenttype('');
    //         setAmount('');
            
    //         const pdf = new jsPDF();
    //         pdf.text("Slot booking receipt", 80, 20);
    //         pdf.text("Thank you " + patientname + " for booking an appointment with us.", 20, 30);
    //         pdf.text("Here are your appointment details ", 20, 40);
    //         pdf.text("Type of appointment: " + appointmentdetails, 20, 50);
    //         pdf.text("Appointment time: " + slottime, 20, 60);
    //         pdf.text("Date: " + date, 20, 70);
    //         pdf.text("Amount: " + amount, 20, 80);
    //         pdf.text("Note: Be at the hospital at least 10 minutes ahead of your appointment time", 20, 90);
    //         pdf.save('slot_receipt.pdf');
    //     } catch (error) {
    //         console.error('Error:', error.message);
    //     }
    // }
    




    return (
        <>
        <LandNav></LandNav>
            <div>
                <table>
                    <tr>
                        <td>Patient name :</td>
                        <td><input type="text" value={patientName} onChange={(e) => setPatientname(e.target.value)}></input></td>
                    </tr>
                    <tr>
                        <td>Patient ID :</td>
                        <td><input type="text" value={patientId} onChange={(e) => setPatientId(e.target.value)}></input></td>
                    </tr>
                    <tr>
                        <td>Type of Services :</td>
                        <td><input type="text" value={typeofservices} onChange={(e) => setTypeOfService(e.target.value)}></input></td>
                    </tr>
                    <tr>
                        <td>Hospital Name :</td>
                        <td><input type="text" value={hospitalname} onChange={(e) => setHospitalName(e.target.value)}></input></td>
                    </tr>
                    <tr>
                        <td>Procedure :</td>
                        <td><input type="text" value={procedures} onChange={(e) => setProcedures(e.target.value)}></input></td>
                    </tr>
                    
                    <tr>
                        <td>Date :</td>
                        <td><input type="text" value={date} onChange={(e) => setDate(e.target.value)}></input></td>
                    </tr>
                    <tr>
                        <td>Slot time :</td>
                        <td><input type="text" value={slottime} onChange={(e) => setSlottime(e.target.value)}></input></td>
                    </tr>
                    <tr>
                        <td>Amount :</td>
                        <td><input type="number" value={amount}></input></td>
                    </tr>
                    <tr>
                        <td>Payment method :</td>
                        <td>
                            {/* <input type="text" value={paymenttype} onChange={(e) => setPaymenttype(e.target.value)} /> */}
                            <label>
                                <input type="radio" value="cash" checked={selectedOption === 'cash'} onChange={handleOptionChange} />
                                Cash
                            </label>
                            <label>
                                <input type="radio" value="card" checked={selectedOption === 'card'} onChange={handleOptionChange} />
                                Card
                            </label>
                            <label>
                                <input type="radio" value="upi" checked={selectedOption === 'upi'} onChange={handleOptionChange} />
                                UPI
                            </label>
                        </td>
                        {selectedOption === 'card' && (
                            <div>
                                <p>card number :</p>
                                <input type="number" value={cardnumber} onChange={(e) => setCardnumber(e.target.value)} />
                                <p>name on card :</p>
                                <input type="text" value={nameoncard} onChange={(e) => setNameoncard(e.target.value)} />
                                <p>expiry date :</p>
                                <input type="text" placeholder="mm/yy" value={cardexpiry} onChange={(e) => setCardexpiry(e.target.value)} />
                                <p>cvv :</p>
                                <input type="number" value={cardcvv} onChange={(e) => setCardcvv(e.target.value)} />
                            </div>
                        )}
                        {selectedOption === 'upi' && (
                            <div>
                                <p>Please scan the QR code and complete your payment</p>
                                <img src="qr_code.jpg"></img>
                            </div>
                        )}
                    </tr>
                </table>
                <button onClick={submit}>Paynow</button>
            </div>
            <FooterPage></FooterPage>
        </>
    );
}

export default PaymentMedical;

