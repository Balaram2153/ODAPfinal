import React from "react";
import { Link } from "react-router-dom";
import "./Technicianlandpage.css";
import FooterPage from "../Landpage/FooterPage";
import LandNav from "../Landpage/LandNav";
import { useState,useEffect } from "react";


export default function Technicianlandpage() {

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });
    
    return (
        <>
        
    
  
  
  <nav class="navbar navbar-expand-lg" style={{backgroundColor:'royalblue'}}>
      <div className="container-fluid">
      <Link to="/"><a class="navbar-brand"><img src="https://tse4.mm.bing.net/th?id=OIP.FOOgadJTQepY-ICLMJkBJgAAAA&pid=Api&P=0&h=180" style={{height:'60px',width:'60px'}}/></a></Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item ">
            <p style={{fontSize:'30px',textAlign:'center',color:"white"}}>Online Doctor Appointment Portal</p>
          </li>
        </ul>
  
  
        <ul class="nav navbar-nav navbar-right">
          <li class="nav-item">
            <p style={{fontSize:'20px',color:"white"}}>{date.toLocaleDateString()}  {date.toLocaleTimeString()}</p>
          </li>
        </ul>
      
        
      </div>
      </div>
   </nav>
            <div>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#"><Link to="/Technicianregistration">sign up</Link></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#"><Link to="/technicianlogin">Sign in</Link></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div>
                    <div className="d-flex flex-row technician-card1">
                    <div className="col-xl-6 col-md-6 col-sm-12">              
                        <img className="technicianlandimg1" src="technician.jpg"></img>
                    </div>
                    <div className="col-xl-6 col-md-6 col-sm-12 technician-card1-content">
                        <p>Please register here and start your technician journey</p>
                        <Link to={"/Technicianregistration"}><button>Register</button></Link>
                    </div>
                    </div>
                </div>
                <div className="technician-card2">
                    <h1>Our Features</h1>
                    <div className="d-flex flex-row justify-content-between">
                        <div className="technician-card2-cont">
                            <p>You can revisit your patient history at anytime.</p>
                        </div>
                        <div className="technician-card2-cont">
                            <p>You can directly send the medical reports</p> <p>to the customer through email</p>
                            <p>just by clicking a button.</p>
                        </div>
                        <div className="technician-card2-cont">
                            <p>Safe and secure procedure to visit the</p> <p>patients and collect the samples </p>
                            <p>of the customers.</p>
                        </div>
                    </div>
                </div>
            </div>
            <FooterPage></FooterPage>
        </>
    );
}