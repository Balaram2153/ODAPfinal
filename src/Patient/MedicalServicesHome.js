import React from "react";
 import "../Patient/MedicalHome.css";
import LandNav from "../Landpage/LandNav";
import FooterPage from "../Landpage/FooterPage";
import "bootstrap";

import { Link } from "react-router-dom";
import PatientNav from "./PatientNav";



export default function MedicalServicesHome() {
  return (
    <>
<PatientNav/>

      <div className="container1-fluid d-flex flex-column">
        <div className="row MDfirstcard">
          <div className="MDfirstcard-cont col-md-6">
            <h1>Online Medical Services</h1>
            <p>book your slot today</p>
          </div>
          <div className="MDfirstcard-img col-md-3 "><img src="animateddoctor.jpg"></img></div>
        </div>
        
        <div className="d-flex flex-row helpnumber">
          <div><h1>Need help booking your slot :</h1>
            <p>Our team is here to help you.</p></div>
            <div><p>+91 9909090989</p></div>
            
          </div>
          
          
          <div>
          <h3 className="heading" style={{textAlign:'center',height:'40px'}}>Top booked Medical services.</h3>
          <div className="d-flex flex-row justify-content-spacearound">
            <div className="col-md-5 col-xl-2 topservicescard">
              <p>Therapy</p>
              <p>Book a therapy session with out best Therapists</p>
              <p>rupees:400/-</p>
            </div>
            <div className="topservicescard col-md-5 col-xl-2 ">
              <p>Blood transfusion</p>
              <p>Book a blood transfusion session today</p>
              <p>rupees:600/-</p>
            </div>
            <div className="col-md-5 col-xl-2 topservicescard">
              <p>Dialysis</p>
              <p>Book a dialysis session today. </p>
              <p>rupees:500/-</p>
            </div>
            <div className="topservicescard col-md-5 col-xl-2 ">
              <p>Physiotherapy</p>
              <p>Book a physiotheray session.</p>
              <p>rupees:400/-</p>              
            </div>
            <div className="topservicescard col-md-5 col-xl-2 ">
              <p>Day care</p>
              <p>We are introducing our new service form tomorrow</p>
              <p>rupees:---</p>
            </div>
          </div>
        </div>
        
        <div className="row services-section">
          <div className="col-sm-12 col-md-2 col-xl-2 card1">
            <img className="therapyimage" alt="" src="therapy.jpg" />
            <div className="card-bottom">
              <p>Book your Therapy session</p>
              <Link to="/medicalservice"><button className="msbtn">Bookslot</button></Link>
            </div>
          </div>
          <div className="col-sm-12 col-md-2 col-xl-2 card1">
            <img className="therapyimage" src="dialysis.jpg" alt="" />
            <div className="card-bottom">
              <p>Book your Radiology session</p>
              <Link to="/radiology"><button className="msbtn">Bookslot</button></Link>
            </div>
          </div>
          <div className="col-sm-12 col-md-2 col-xl-2 card1">
            <img className="therapyimage" src="physiotherapy.jpg" alt="" />
            <div className="card-bottom">
              <p>Book your Pathology session</p>
              <Link to="/pathology"><button className="msbtn">Bookslot</button></Link>
            </div>
          </div>
          <div className="col-sm-12 col-md-2 col-xl-2 card1">
            <img className="therapyimage" src="bloodtransfusion.jpg" alt="" />
            <div className="card-bottom">
              <p>Book your bloddtransfusion session</p>
              <Link to="/dialysis"><button className="msbtn">Bookslot</button></Link>
            </div>
          </div>
          <div className="col-sm-12 col-md-2 col-xl-2 card1">
            <img className="therapyimage" src="audio.jpg" alt="" />
            <div className="card-bottom">
              <p>Book your Audiology session</p>
              <Link to="/audiology"><button className="msbtn">Bookslot</button></Link>
            </div>
          </div>
        </div>
        <div>
          <br/>
          <br/>

          <div className="container1-fluid">
            <div className="row doctorcards">
              <h1 className="ourdocs">Our Doctors</h1><br/>
              <div className="col-12 col-md-3 col-xl-3 doctorprofile d-flex flex-row">
                <div>
                  <img className="docimage" src="doctorimage.jpg" alt=""></img>
                  <p>Dr.Agarwal</p>
                </div>
                <div className="docdetails">
                  <p>About me</p>
                  <p>Experience:10years</p>
                  <p>Speciality:Therapy</p>
                  <p>Qualifications:MBBS,FRCS</p>
                  <p>Practice License:123987665</p>
                </div>
              </div>
              <div className="col-12 col-md-3 col-xl-3 doctorprofile d-flex flex-row">
                <div>
                  <img className="docimage" src="doctorimage.jpg" alt=""></img>
                  <p>Dr.Reddy</p>
                </div>
                <div className="docdetails">
                  <p>About me</p>
                  <p>Experience:10years</p>
                  <p>Speciality:Cardilogy</p>
                  <p>Qualifications:MBBS,FRCS</p>
                  <p>Practice License:123987665</p>
                </div>
              </div>
              <div className="col-12 col-md-3 col-xl-3 doctorprofile d-flex flex-row">
                <div>
                  <img className="docimage" src="doctorimage.jpg" alt=""></img>
                  <p>Dr.rakash</p>
                </div>
                <div className="docdetails">
                  <p>About me</p>
                  <p>Experience:10years</p>
                  <p>Speciality:Respiratory</p>
                  <p>Qualifications:MBBS,FRCS</p>
                  <p>Practice License:123987665</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr></hr>

        <div className="d-flex flex-row">
          <div className="articlecontent">
            <h1>Read top articles from health experts</h1>
            <p>Health articles that keep you informed about good health practices and achieve your goals.</p>
          </div>
          <div className="d-flex flex-row">
            <div className="articleacard">
              <a href="https://www.practo.com/healthfeed/12-coronavirus-myths-and-facts-that-you-should-be-aware-of-40556/post">

                <img className="articleimg" src="coronovirus.jpg" style={{height:'300px'}}></img>
              </a>
              <p>CORONOVIRUS</p>
              <h3 className="heading">Know the facts about the corono virus</h3>
            </div>

            
          </div>
          
        
        <hr></hr>


      </div>
      <div id="carouselExampleFade" class="MScorousel carousel slide carousel-fade">
            <div class="carousel-inner">
              <div class="carousel-item active MScorouselcard">
                <h1>What our users have to say.</h1>
                <p>Very helpful. Far easier than doing the slot booking physically</p>
              </div>
              <div class="carousel-item  MScorouselcard">
                <h1>What our users have to say.</h1>
                <p>Very Good app easy to access and services provided are easy to access and very effective</p>
              </div>
              <div class="carousel-item  MScorouselcard">
                <h1>What our users have to say</h1>
                <p></p>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      <FooterPage></FooterPage>
    </>
  );
}
