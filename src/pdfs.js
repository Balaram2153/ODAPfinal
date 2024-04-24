// import React from 'react';
// import { jsPDF } from 'jspdf';

// function Pay() {

//   const handlePayment = () => {
//     try {
//       const currentDate = new Date().toLocaleDateString();
//       const currentTime = new Date().toLocaleTimeString();

//       const patientData=123;
//       const pdf = new jsPDF();


//       //pdf.addImage(pic, 'JPG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
//       pdf.text('Acknowledgement', 80, 20);
//       //pdf.text(`Transaction ID : ${id}`,20,30);
//       pdf.text(`Patient ID: ${patientData}`, 20, 20);
//       pdf.text(`Appointment ID: ${patientData}`, 20, 40);
//       pdf.text(` Date: ${currentDate}`, 140, 30);
//       pdf.text(` Time: ${currentTime}`, 140, 40);
//       pdf.text(`Name of Patient: ${patientData}`, 20, 50);
//       pdf.text(`Age: ${patientData}`, 20, 60);
//       pdf.text(`Phone Number: ${patientData}`,20,70);

//       pdf.text('Appointmet Details: ', 20, 90);
//       pdf.text(`Name of Doctor: ${patientData}`, 20, 100);
//       pdf.text(`Date : ${patientData}`, 20, 110);
//       pdf.text(`Time : ${patientData}`, 20, 120);
//       pdf.text(`Address : ${patientData}`, 20, 130);
//       pdf.text(`Type of Consultation: ${patientData}`, 20, 140);
//       pdf.text(`Web Link: ${patientData}`, 120, 140);

//       pdf.text('Payment Details: ', 20, 160);
//       pdf.text('Status : Success ', 20, 170);
//       pdf.text(`Amount : ${patientData}`, 20, 180);
//      // pdf.text('Mode of Payment :' +  80, 100);
//       // pdf.text('Payment Status: ',{paymentStatus}, 20, 120); 
//       pdf.save('Appointment.pdf');

//       alert("Payment successful!");
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     }
//   };

//   return (
//     <>
//       <button onClick={handlePayment}>Payment</button>


//       import React, { useState } from 'react';

// const Tutorial = () => {
//     const [city, setCity] = useState(''); // City input field value
//     const [searchResults, setSearchResults] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [selectedDoctor, setSelectedDoctor] = useState(null); // Track selected doctor for booking
//     const [showBooking, setShowBooking] = useState(false); // Track if booking details should be shown
   

//     const handleSearch = async () => {
//         setLoading(true);
//         setError(null); // Clear previous error if any

//         try {
//             const response = await fetch(`http://localhost:9988/api/getAll?address1=${encodeURIComponent(city)}`);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             // Filter doctors based on the entered address1 (ignoring case and spaces)
//             const filteredDoctors = data.filter(doctor => doctor.address1.toLowerCase().replace(/\s/g, '') === city);
//             setSearchResults(filteredDoctors);
//         } catch (error) {
//             setError('Error fetching data. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleBookNow = (doctor) => {
//         setSelectedDoctor(doctor);
//         setShowBooking(true); // Show booking details section
//     };

//     return (
//         <>
//             <div className='container-fluid' style={{ padding: '50px' }}>
//                 <form
//                     className="d-flex"
//                     onSubmit={(e) => {
//                         e.preventDefault(); // Prevent form submission
//                         handleSearch();
//                     }}
//                 >
//                     <input
//                         type="text"
//                         className="form-control me-2"
//                         placeholder="Enter city name"
//                         value={city}
//                         onChange={(e) => setCity(e.target.value)}
//                     />
//                     <button className="btn btn-primary" type="submit">
//                         Search Doctors
//                     </button>
//                 </form><br></br>
//                 <div className='container'>
//                     {loading && <div>Loading...</div>}
//                     {error && <div>Error: {error}</div>}
//                     <div className='container'>
//                         {searchResults.length > 0 ? (
//                             searchResults.map((doctor) => (
//                                 <div key={doctor.id}>
//                             <div className='col-sm-3 mb-4 bg-primary' style={{ color: 'white', borderRadius: '5px', padding: '20px' }}>
//                             <h2>Dr. {doctor.doctorName}</h2>
//                             <p>Speciality: {doctor.speciality}</p>
//                             <p>Hospital: {doctor.hospitalName}</p>
//                             <p>Experience: {doctor.experience}</p>
//                             <p>Registered Number: {doctor.registrationnumber}</p>
//                             <p>Registered Year: {doctor.registrationyear}</p>
//                             <p>Registered Council: {doctor.registrationcouncil}</p>
//                             <p>Degree: {doctor.degree}</p>
//                             <p>Weblink: {doctor.webLink}</p>
//                             <p>Address1: {doctor.address1}</p>
//                             <p>Address2: {doctor.address2}</p>
//                             <p>CurrentWorkPlace: {doctor.currentworkplace}</p>
//                             <p>OtherWorkPlace: {doctor.otherworkplace}</p>
//                                         {/ Add more doctor details as needed /}
//                                         <center>
//                                             <button type='button' className='btn btn-success' onClick={() => handleBookNow(doctor)}>Book now</button>
//                                         </center>
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <div className='container'>
//                                 No doctors found for the entered city.
//                             </div>
//                         )}
//                     </div>
//                 </div>
                
                
                
//                 {selectedDoctor && showBooking && (
//                     <div className='container'>
//                         <h3>Booking Details</h3>
//                         <form>
//                             <div className="mb-3">
//                                 <label htmlFor="experience" className="form-label">Experience:</label>
//                                 <input type="text" className="form-control" id="experience" name="experience" value={selectedDoctor.experience} readOnly />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="specialty" className="form-label">Specialty:</label>
//                                 <input type="text" className="form-control" id="specialty" name="specialty" value={selectedDoctor.speciality} readOnly />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="hospital" className="form-label">Hospital:</label>
//                                 <input type="text" className="form-control" id="hospital" name="hospital" value={selectedDoctor.hospitalName} readOnly />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="webLink" className="form-label">Web Link:</label>
//                                 <input type="text" className="form-control" id="webLink" name="webLink" value={selectedDoctor.webLink} readOnly />
//                             </div>
//                             {/ Add submit button or submit logic here /}
//                         </form>
//                     </div>
//                 )}





//             </div>
//         </>
//     );
// };

// export default Tutorial;





//     </>
//   );
// };

// export default Pay;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// const UpdateComponent = () => {
// //   const { appointmentId } = useParams();
//   const [appointmentId,setAppointmentId]=useState('');
//   const [selectedPatient, setSelectedPatient] = useState(null);

//   useEffect(() => {
//     // Fetch the selected patient data using the patientId from the URL params
//     fetchData(appointmentId);
//   }, [appointmentId]);

//   const fetchData = (appointmentId) => {
//     axios.get(`http://localhost:9081/api/v1/raju/${appointmentId}`)
//       .then((response) => {
//         setSelectedPatient(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   // Render your update form with selectedPatient data
//   return (
//     <div>
//         <h2>jgvcjg</h2>

        
//       {selectedPatient && (
//         <div>
//           <h2>Update Patient Information</h2>
//           <p>Patient Name: {selectedPatient.patientName}</p>
//           <p>Patient ID: {selectedPatient.patientId}</p>
//           {/* Add other fields as needed */}
//         </div>
//       )}
//     </div>
//   );
// };



    const UpdateComponent = ({ selectedPatient }) => {

      const [patientData, setPatientData] = useState(null);
    
      useEffect(() => {
        if (selectedPatient) {
          // Fetch additional data for the selected patient if needed
          fetchPatientData(selectedPatient.appointmentId);
        }
      }, [selectedPatient]);
    
      const fetchPatientData = (appointmentId) => {
        // Fetch additional data for the selected patient
        axios
          .get(`http://localhost:9081/api/v1/raju/${appointmentId}`)
          .then((response) => {
            setPatientData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching patient data:", error);
          });
      };
    
      return (
        <div>
          <h2>Treatment Form</h2>
          {patientData ? (
            <div>
              <p>Patient ID: {patientData.patientId}</p>
              <p>Patient Name: {patientData.patientName}</p>
              {/* Display other patient data here */}
            </div>
          ) : (
            <p>Loading patient data...</p>
          )}
        </div>
      );
    };
    
    
   export default UpdateComponent;

   