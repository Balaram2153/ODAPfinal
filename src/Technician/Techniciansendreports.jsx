import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import './Techniciansendreports.css'
import LandNav from "../Landpage/LandNav";
import FooterPage from "../Landpage/FooterPage";
import Techniciannavbar from "../Landpage/Techniciannavbar";
import Techniciandashboard from "./TechnicianDashboard";


export default function Techniciansendreports() {

    const [patientEmail, setEmail] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            alert('Please select a PDF file.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('patientEmail', patientEmail);
            formData.append('file', selectedFile);

            await axios.post('http://localhost:9902/Registration/sentreportemail', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert("pdf sent successfully");
            console.log('PDF email sent successfully');
        } catch (error) {
            console.error('Error sending PDF email:', error);
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
                {/* <p><Link to='/Technicianreportform'>Report form</Link></p> */}
                <p><Link to='/Techniciansendreports'>Send reports</Link></p>
                <p><Link to='/Technicianlandpage'>Logout</Link></p>
            
            </div>
            <div className="col-10">
          
            <div className="TRcontainer">

<div className="technicianreports">
    <h1 className="sendreportsh1">Send Email with PDF</h1>
    <p>* Please send the reprots to the patient by uploading the reports and filling the email.</p>
    <div className="reportform">
    <table>
        <tr>
            <td>Patient Email :</td>
            <td>
                <input
                    type="email"
                    required
                    value={patientEmail}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
            </td>
        </tr>
        <tr>
            <td>file :</td>
            <td>
                <input
                    type="file"
                    required
                    onChange={handleFileChange}
                ></input>
            </td>
        </tr>

    </table>
    </div>
    <button style={{marginLeft:"30px"}} onClick={handleFormSubmit}>send Email to doctor</button>
    
   
</div>
</div>

           
           
           </div>
            
         </div>
         
         <FooterPage></FooterPage>
           
        </>
    );
}