import React from "react";
import jsPDF from "jspdf";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import LandNav from "../Landpage/LandNav";
import FooterPage from "../Landpage/FooterPage";
import Techniciannavbar from "../Landpage/Techniciannavbar";


export default function Technicianreportform() {
  const [patientName, setPatientname] = useState("");
  const [testtype, setTesttype] = useState("");
  const [attendeddoctor, setAttendeddoctor] = useState("");
  const [diagnosticCenter, setDiagnosticname] = useState("");
  const [reports, setReports] = useState("");
  const [doctorName,setdoctorName]=useState("");
  const [patientEmail, setPatientemail] = useState("");
  const [doctorEmail, setDoctoremail] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const Navigate =useNavigate();
  const submit = async () => {
    const Data = {
      patientName,
      testtype,
      doctorName,
      diagnosticCenter,
      attendeddoctor,
      reports,
      patientEmail,
      doctorEmail,
      file,
    };
    try {
      const response = await axios.post(
        "http://localhost:9902/Registration/savereport",
        Data
      );
      setPatientname("");
      setDiagnosticname("");
      setTesttype("");
      setAttendeddoctor("");
      setReports("");
      setPatientemail("");
      setdoctorName("");
      setDoctoremail("");
      console.log(response);

      const pdf = new jsPDF();
      pdf.text("report", 80, 20);
      pdf.text(
        "Thank you " + patientName + " for attending " + attendeddoctor + "",
        20,
        30
      );
      pdf.text("Here are your appointment details ", 20, 40);
      pdf.text("Type of appointment: " + testtype, 20, 50);
      pdf.text("Attended Doctor: " + attendeddoctor, 20, 60);
      pdf.text("Report: " + reports, 20, 70);
      pdf.save("Diagnostic Report.pdf");

      alert("report generated succesfully");
    } catch (e) {
      setError(true);
      setErrorMessage(e.message);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  
  const sendemail = async () => {
    
    try {
      const formData = new FormData();
      formData.append("doctorEmail", doctorEmail);
      formData.append("patientEmail",patientEmail);
      formData.append("patientName",patientName);
      formData.append("doctorName",doctorName);
      formData.append("testtype",testtype);
      formData.append("diagnosticCenter",diagnosticCenter);
      formData.append("attendeddoctor", attendeddoctor);
      formData.append("reports",reports);

      formData.append("file", file);

      const response=await axios.post("http://localhost:9902/Registration/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("pdf sent successfully");
      console.log("PDF email sent successfully");
     // Navigate("/pdf",{ state: { Data: response.data } });
    } catch (error) {
      console.error("Error sending PDF email:", error);
    }
  };

  return (
    <>
      <Techniciannavbar/>
      <div className="container-fluid d-flex flex-row">
            
      <div className="col-2 technicianSidebar">
                <img src="technician.jpg" className="technicianimg"></img>
                <p><Link to='/technicianDashboard'>Profile</Link></p>
                <p><Link to='/Technicianpatientslot'>Patient slots</Link></p>
                <p><Link to='/medicalslots'>Medical slots</Link></p>
                <p><Link to='/Technicianreportform'>Report form</Link></p>
                <p><Link to='/Techniciansendreports'>Send reports</Link></p>
                <p><Link to='/Technicianlandpage'>Logout</Link></p>
            
            </div>

        <div className="col-10">
          <div className="d-flex justify-content-center">
            <table>
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
                    value={testtype}
                    required
                    onChange={(e) => setTesttype(e.target.value)}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>Doctor Name :</td>
                <td>
                  <input
                    type="doctorname"
                    value={doctorName}
                    required
                    onChange={(e) => setdoctorName(e.target.value)}
                  ></input>
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
                    value={attendeddoctor}
                    required
                    onChange={(e) => setAttendeddoctor(e.target.value)}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>Attended Doctor Email :</td>
                <td>
                  <input
                    type="email"
                    value={doctorEmail}
                    required
                    onChange={(e) => setDoctoremail(e.target.value)}
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
                  <textarea cols={40} rows={4}
  
                      value={reports}
                      required
                      onChange={(e) => setReports(e.target.value)}
                      >

                  </textarea>
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
              <button onClick={submit}>Download Report</button>
              
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

              <button onClick={sendemail}>send Email to doctor</button>
              {error && (
                <p style={{ color: "royalblue", textAlign: "center" }}>
                  {errorMessage}
                </p>
              )}
            </table>
          </div>
        </div>
      </div>
      <FooterPage></FooterPage>
    </>
  );
}
