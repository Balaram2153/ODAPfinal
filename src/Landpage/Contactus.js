import React from "react";
import LandNav from "./LandNav";
import FooterPage from "./FooterPage";
import './Contactus.css';
import 'bootstrap-icons/bootstrap-icons.svg';


export default function Contactus(){
    return(
      <>
      <LandNav></LandNav>
      
      <div className="contactus-bg">
        
        <div className="contactus-card">
            <h1>Contact us</h1>
            <div className="d-flex flex-row">
            <i class="bi bi-geo-alt-fill"></i>
            <div>
            <p><a className="hover" href="https://www.google.com/maps/dir//Capital+Pk+Rd,+Ayyappa+Society,+Silicon+Valley,+Madhapur,+Hyderabad,+Telangana+500081/@17.4469235,78.3037792,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bcb910d8d1c4f8b:0x6ef1b184af90fa3f!2m2!1d78.386181!2d17.4469404?entry=ttu">
              Jain Sadhguru Capital Park <br></br>
            Madhapur, Near Ayyapa Society</a></p> 
            </div>           
            </div>
            <div className="d-flex flex-row">
            <i class="bi bi-telephone-fill"></i>
            <p>9909090909</p>
            </div>
            <div className="d-flex flex-row">
            <i class="bi bi-envelope-at-fill"></i>
            <p>odaphelp@gmail.com</p>
            </div>
        </div>
        
      </div>
      
      <FooterPage></FooterPage>
      </>  
    );
}