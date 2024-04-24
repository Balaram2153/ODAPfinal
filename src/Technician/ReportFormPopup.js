
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReportPopup.css";
import jsPDF from "jspdf";
// import blue from "../img/blue.webp";
// import pdf1 from "../img/pdf1.jpg";
import blue from "../img/blue.webp";
import logo from "../img/logosymbol.jpg";
 import { getTechnicianDetails } from "../Patient/Authstate";


export default function ReportFormPopup({ patient, onClose, patientId }) {
  const [date, setDate] = useState(new Date());
  const [patientName, setPatientname] = useState("");
  const [appointmentRefId, setappointmentREFID] = useState("");
  const [tests, setTests] = useState("");
  const [typeofservices,setTypeOfService]=useState('');
  const [doctorName,setDoctorName]=useState('');
  const [referralDoctorName, setReferralDoctorName] = useState("");
  const [diagnosticCenter, setDiagnosticname] = useState("");
  const [reports, setReports] = useState("");
  const [patientEmail, setPatientemail] = useState("");
  const [doctorEmail, setDoctoremail] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [patientDetails, setPatientDetails] = useState("");
  const [appointmentdetails, setAppointmentDetails] = useState('');
  const [patientid, setPatientId] = useState("");

  const technician=getTechnicianDetails();

  const fetchPatientDetails = (patientId) => {
    axios
      .get(`http://localhost:8098/get/${patientId}`)
      .then((response) => {
        console.log("Patient Details:", response.data);
        setPatientDetails(response.data);
        // Populate input fields with patient details
        setPatientname(response.data.patientName || "");
        setPatientId(response.data.patientId || "");
        // setTesttype(response.data.testtype || "");
        // setAttendeddoctor(response.data.attendeddoctor || "");
        // setDiagnosticname(response.data.diagnosticCenter || "");
        // setDepartment(response.data.department || "");
        // setReports(response.data.reports || "");
        setPatientemail(response.data.patientEmail || "");
        // setDoctoremail(response.data.doctorEmail || "");
      })
      .catch((error) => {
        console.error("Error fetching patient details:", error);
      });
  };
  
  const fetchslotDetails = (patientId) => {
    axios
      .get(`http://localhost:8080/api/patients/getpatients/${patientId}`)
      .then((response) => {
        console.log("Patient Details:", response.data);
        setAppointmentDetails(response.data);
        // Populate input fields with patient details
        // setPatientname(response.data.patientName || "");
         setPatientId(response.data.patientId || "");
        setTypeOfService(response.data.typeofservices || "");
        setReferralDoctorName(response.data.referralDoctorName || "");
        setappointmentREFID(response.data.appointmentRefId|| "");
        //setDiagnosticname(response.data.diagnosticCenter || "");
        // setDepartment(response.data.department || "");
         setTests(response.data.tests || "");
         setPatientemail(response.data.patientEmail || "");
        // setDoctoremail(response.data.doctorEmail || "");
      })
      .catch((error) => {
        console.error("Error fetching patient details:", error);
      });
  };
  
  const fetchdoctorDetails = () => {
    axios
      .get(`http://localhost:9099/api/getname/${appointmentdetails.referralDoctorName}`)
      .then((response) => {
        console.log("Patient Details:", response.data);
        setAppointmentDetails(response.data);
        // Populate input fields with patient details
        // setPatientname(response.data.patientName || "");
        // setPatientId(response.data.patientId || "");
        // setTesttype(response.data.typeofservices || "");
        // setAttendeddoctor(response.data.attendeddoctor || "");
        // setDiagnosticname(response.data.hospitalname || "");
        // setDepartment(response.data.department || "");
        // setReports(response.data.reports || "");
        // setPatientemail(response.data.patientEmail || "");
        setDoctoremail(response.data.email || "");
      })
      .catch((error) => {
        console.error("Error fetching patient details:", error);
      });
  };
  
  useEffect(() => {
    if (patientId) {
      fetchPatientDetails(patientId);
      fetchslotDetails(patientId);
      
    }
    if (patient) {
      console.log(patient)
      setPatientId(patient.patientId);
        setPatientname(patient.patientName);
        setDiagnosticname(technician.diagnosticCenter);
        setTests(patient.tests);
        setReferralDoctorName(patient.referralDoctorName);
        setReports("");
        setTypeOfService(patient.typeofservices);
        setPatientemail(patient.patientEmail);
        setDoctoremail(patient.email);
        

    }
  }, [patientId,patient]); 
  
  useEffect(() => {
    if (appointmentdetails && appointmentdetails.referralDoctorName) {
      fetchdoctorDetails();
    }
  }, [appointmentdetails]); 
  


   
    const submit = async () => {
     // const newReportId = generateReportId(); // Generate a new report ID

      const Data = {
        patientId,
        patientName,
        tests,
        diagnosticCenter,
        referralDoctorName,
        typeofservices,
        reports,
        patientEmail,
        doctorName,
        doctorEmail,
      };
      try {
        const response = await axios.post(
          "http://localhost:9902/Registration/savereport",
          Data
        );
        setPatientId("");
        setPatientname("");
        setDiagnosticname("");
        setTests("");
        setReferralDoctorName("");
        setTypeOfService('');
        setDoctorName("");
        setReports("");
        setPatientemail("");
        setDoctoremail("");
        console.log(response);
  

        
        
      } catch (e) {
        setError(true);
        setErrorMessage(e.message);
      }
    };  

    const handlesavepdf=()=>
    {
      if (reports === '') {
        alert("Please enter the report data before generating the PDF.");
        return;
      }
      const pdf = new jsPDF();
        pdf.addImage(blue, 'WEBP', 0, 0, pdf.internal.pageSize.getWidth(), 40);
        pdf.text("Online Doctor Appointment Portal", 20, 30);
        const imgWidth = 20; 
        const imgHeight = 20;
        pdf.addImage(logo, 'JPG', 150, 20, imgWidth, imgHeight);  
        pdf.text("Thank you " + patientName + " for attending " + referralDoctorName + "here are your appointment details",20,50);        
        pdf.text("Your Didnostic Appointment Id is: ", 20, 70);
        pdf.text( appointmentRefId, 80, 70);
        pdf.text("Patient Details",20,80);
        pdf.line(20,85,190,85);
        pdf.text("Name: ",20,90);
        pdf.text(patientName,60,90);
        pdf.text("PatientEmail :",20,100);
        pdf.text(patientEmail,60,100);
        pdf.text("patient ID :",20,110)
        pdf.text(patientid,50,110);
        pdf.text("appointment details",20,120)
        pdf.line(20,125,190,125);
        pdf.text("Type of tests: ", 20, 130);
        pdf.text( tests, 75, 130);
        pdf.text("Attended Doctor: ", 20, 140);
        pdf.text( referralDoctorName, 70, 140);
        pdf.text("Type of Serices: ", 20, 150);
        pdf.text( typeofservices, 55, 150);
        pdf.text("Report: " , 20, 160);
        pdf.text( reports, 40, 160);
        pdf.text( "@Rights Reserved", 90, 250);
        pdf.text( "ODAP", 120, 260);
        pdf.save("DiagnosticReport.pdf");
  
        alert("report generated succesfully");
    }
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const sendemail = async () => {
    

    setError(false);
  const digits = /[0-9]/;
  
  if (!doctorEmail || doctorEmail.trim() === "") {
    alert("Please enter doctor's email");
    return;
  }

  if (!file) {
    alert("Please select a file");
    return;
  }
  
      const formData = new FormData();
    formData.append('doctorEmail', doctorEmail);
    formData.append('patientEmail', patientEmail);
    formData.append('patientName', patientName);
    formData.append('doctorName', doctorName);
    formData.append('tests', tests);
    formData.append("typeofservices",typeofservices);
    formData.append('diagnosticCenter', diagnosticCenter);
    formData.append('reports', reports);
    formData.append('referralDoctorName',referralDoctorName);
    formData.append('file', file);
     

    try {
      
      if (reports === '' || digits.test(reports)) {
        alert("Please enter the report data");
        return;
      }
      
      await axios.post('http://localhost:9902/Registration/sentpdfemail', formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      alert("Report sent successfully");
      console.log('Report sent to email successfully');
  } catch (error) {
      console.error('Error sending PDF email:', error);
  }

try{
      const response=await axios.post("http://localhost:9902/Registration/uploadReport", formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
        
      setDoctoremail('');
      setPatientemail('');
      setPatientname('');
      setDoctoremail('');
      setTests('');
      setTypeOfService('');
      setDiagnosticname('');
      setReports('');
      setFile(null);
      console.log(response);
      alert("Report saved successfully");
      console.log("Report saved successfully");
     // Navigate("/pdf",{ state: { Data: response.data } });
    } catch (error) {
      console.error("Error sending PDF email:", error);
    }
  };

     



  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  const handleClose = () => {
    onClose(); // Call onClose function passed from parent component
  };


  return (
    <>
      {patient && ( // Render the popup only if patient data is available
        <div className="cart-overlay" onClick={handleClose}>
          <div className="cart-page" onClick={(e) => e.stopPropagation()}>
            <h2>Patient Details</h2>
            <div className="cart-items">
              <div className="patient-details">
                <table>
                  <tr>
                    <td>Patinet Id:</td>
                    <td>
                      <input
                        type="text"
                        value={patientid}
                        required
                        onChange={(e) => setPatientId(e.target.value)}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>Patinet Name :</td>
                    <td>
                      <input
                        type="text"
                        value={patientName}
                        required
                        onChange={(e) => setPatientname(e.target.value)}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>Test Type :</td>
                    <td>
                      <input
                        type="text"
                        value={tests}
                        required
                        onChange={(e) => setTests(e.target.value)}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>Type of Serices :</td>
                    <td>
                      <input
                        type="text"
                        value={typeofservices}
                        required
                        onChange={(e) => setTypeOfService(e.target.value)}
                     />
                       
                    </td>
                  </tr>
                  <tr>
                    <td>Patient Email :</td>
                    <td>
                      <input
                        type="email"
                        value={patientEmail}
                        required
                        onChange={(e) => setPatientemail(e.target.value)}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>Attended doctor Name :</td>
                    <td>
                      <input
                        type="text"
                        value={referralDoctorName}
                        required
                        onChange={(e) => setReferralDoctorName(e.target.value)}
                      ></input>
                    </td>
                  </tr>
                 
                  <tr>
                    <td>Diagnostic name :</td>
                    <td>
                      <input
                        type="text"
                        value={diagnosticCenter}
                        required
                        onChange={(e) => setDiagnosticname(e.target.value)}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>Report Description :</td>
                    <td>
                      <textarea
                        cols={40}
                        rows={4}
                        value={reports}
                        required
                        onChange={(e) => setReports(e.target.value)}
                      ></textarea>
                    </td>
                  </tr>
                  {/* <tr>
                <td>Upload Prescription :</td>
                <td>
                  <input
                    type="file"
                    value={file}
                    required
                    onChange={(e) => setFile(e.target.value)}
                  ></input>
                </td>
              </tr> */}
                  <tr>
                    <td>doctoremail</td>
                    <td>
                      <input
                        type="email"
                        required
                        value={doctorEmail}
                        onChange={(e) => setDoctoremail(e.target.value)}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>file</td>
                    <td>
                      <input
                        type="file"
                        required
                        onChange={handleFileChange}
                      ></input>
                    </td>
                  </tr>
                </table>
                <button onClick={handlesavepdf}> Generate PDF</button><br/>
               <button onClick={sendemail}>Save and Send Email to doctor</button>
                 {error && (
                   <p style={{ color: "royalblue", textAlign: "center" }}>
                     {errorMessage}
                   </p>
                 )}
             </div>
            </div>
            <button className="close-button" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

