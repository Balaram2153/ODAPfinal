import React from "react";
import LandNav from "../Landpage/LandNav";
import FooterPage from "../Landpage/FooterPage";
import Technicianpatientslot from "./Technicianpatientsslot";
import { Link } from "react-router-dom";
import './technician.css';
import TechnicianProfile from "./TechnicianProfile";
import Techniciannavbar from "../Landpage/Techniciannavbar";

export default function Techniciandashboard(){
    
    return(
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
                <TechnicianProfile/>
            </div>
            
         </div>
         
         <FooterPage></FooterPage>
      </>  
    );
}