import React from 'react';
import 'bootstrap-icons/bootstrap-icons.svg';
import { Link } from 'react-router-dom';
import "./Footerpage.css";

function FooterPage() {
    return (
<>
        
<footer class="text-center text-lg-start" style={{backgroundColor: "royalblue"}}>

  <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom" style={{backgroundColor:'white'}}>

    <div class="me-8 d-none d-lg-block">
      <p style={{color:'purple'}} className='text'>Get connected with us on social networks:</p>
    </div>

    <div className='logos' style={{color:'white'}}>
      <a href="https://www.facebook.com" class="me-4 text-reset">
        <i class="bi bi-facebook" style={{color:'blue',fontSize: '2rem'}}></i>
      </a>
      <a href="https://twitter.com" class="me-4 text-reset">
        <i class="bi bi-twitter" style={{color:'rgb(29,161,242)',fontSize: '2rem'}}></i>
      </a>
      <a href="https://www.google.com" class="me-4 text-reset">
        <i class="bi bi-google" style={{color:'#4285F4',fontSize: '2rem'}}></i>
      </a>
      <a href="https://www.instagram.com" class="me-4 text-reset">
        <i class="bi bi-instagram"style={{color:'#833AB4',fontSize: '2rem'}}></i>
      </a>
      <a href="https://www.linkedin.com" class="me-4 text-reset">
        <i class="bi bi-linkedin" style={{color:' #0A66C2',fontSize: '2rem'}}></i>
      </a>
      
    </div>
  
  </section>

  <section style={{color:'white'}}>
    <div class="container text-center text-md-start mt-5" style={{backgroundColor:'royalblue'}}>
   
      <div class="row mt-3">
       
      <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
       
          <h6 class="text-uppercase fw-bold "style={{textAlign:'center'}}>
            Portal
          </h6>
          
          <p>
            Our Online Doctor Appointment Portal is about Providing Online and Physical Services to the Customers with userfriendly.
          </p>
        </div>
     

        <div class="col-lg-3 col-md-6 mb-4 mb-md-0 ">
        
          <h6 class="text-uppercase fw-bold  " style={{paddingLeft:'40px'}}>
            Actions
          </h6>
          <ul class="list-unstyled">
          {/* <li>
            <a href="#!" class="text-reset">Contact US</a>
          </li> */}
          <li>
            <a href="/doctor" class="text-reset">Doctor Login</a>
          </li>
          <li>
            <a href="/technicianlogin" class="text-reset">Technician Login</a>
          </li>
          <li>
            <a href="/adminlogin" class="text-reset">Admin Login</a>
          </li>
          <li>
            <a href="/register" class="text-reset">Book an Appointment</a>
          </li>
          {/* <li>
            <a href="#!" class="text-reset">Know US</a>
          </li> */}
          
          </ul>
        </div>
      
        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
   
          <h6 class="text-uppercase fw-bold " style={{paddingLeft:'40px'}}  >
            Blogs
          </h6>
          <ul class="list-unstyled" >
          <li>
            <a href="/login" class="text-reset">Online Services</a>
          </li>
          <li>
            <a href="/login" class="text-reset">Diagnostics</a>
          </li>
          <li>
            <a href="/login" class="text-reset">Medical Services</a>
          </li>
          <li>
            <a href="/login" class="text-reset">Reschedule</a>
          </li>
          <li>
            <a href="/login" class="text-reset">Ambulance Services</a>
          </li>
          </ul>
        </div>
 
        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
         
          <h6 class="text-uppercase fw-bold" style={{paddingLeft:'20px'}}>Gallery</h6>
          <ul class="list-unstyled">
        
          <li>
            <a href="https://www.medicalnewstoday.com/" class="text-reset">News </a>
          </li>
          <li>
            <a href="https://medicalevents.com/" class="text-reset">Events</a>
          </li>
          <li>
            <Link to={"/Contactus"} style={{color:"white"}}>Contact us</Link>
          </li>
         </ul>
        </div>
       
      </div>
     
    </div>
  </section>


<div className='container-fluid'>
  <div class="text-center p-4" style={{backgroundColor:'#A8A8A8'}}>
  © 2024 Company, Inc. All rights reserved.
    <a class="text-reset fw-bold" href="https://mdbootstrap.com/">anarghyacommunications.com</a>
    <a>+91-040-67932204</a>
  </div>
</div>
</footer>



</>

    );
}
export default FooterPage;